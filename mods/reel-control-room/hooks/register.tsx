import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Alert, Snapshot, StageStatus } from '../types'
import { parseStatus, STAGE_LABEL, STATUS_LABEL } from './parse'

// Everything here is local: the files under ROOT are read with $.fs, nothing
// calls a model, the network or another process.
const ROOT = 'C:/Edit with AI/Projects'
const ROOT_SHOWN = 'C:\\Edit with AI\\Projects'
const PANE = 'reel-control-room'
const TITLE = 'غرفة تحكم الريل'
const POLL_MS = 3000

const snapshot = atom(
  { plugin: 'reel-control-room', key: 'snapshot' } as const,
  { kind: 'loading' } as Snapshot,
  { shape: 'snapshot-1' },
)
const alert = atom(
  { plugin: 'reel-control-room', key: 'alert' } as const,
  null as Alert,
  { shape: 'alert-1' },
)
const quiet = atom({ plugin: 'reel-control-room', key: 'quiet' } as const, false)

type Seen = Record<string, Record<string, StageStatus>>

/** Finds the current reel: the project whose status.json changed last. */
async function locate($: EngineInterface): Promise<Snapshot> {
  if (!(await $.fs.exists(ROOT))) return { kind: 'no-root', root: ROOT_SHOWN }

  const dirs = (await $.fs.list(ROOT)).filter(
    entry => entry.kind === 'dir' && !entry.name.startsWith('.'),
  )
  if (dirs.length === 0) return { kind: 'no-project', root: ROOT_SHOWN }

  let best: { name: string; mtimeMs: number } | undefined
  for (const dir of dirs) {
    const stat = await $.fs
      .stat(`${ROOT}/${dir.name}/status.json`)
      .catch(() => undefined)
    if (stat && stat.kind === 'file' && (!best || stat.mtimeMs > best.mtimeMs)) {
      best = { name: dir.name, mtimeMs: stat.mtimeMs }
    }
  }

  if (!best) {
    let newest = { name: dirs[0]!.name, mtimeMs: -1 }
    for (const dir of dirs) {
      const stat = await $.fs.stat(`${ROOT}/${dir.name}`).catch(() => undefined)
      if (stat && stat.mtimeMs > newest.mtimeMs) newest = { name: dir.name, mtimeMs: stat.mtimeMs }
    }

    return { kind: 'no-status', project: newest.name, root: ROOT_SHOWN }
  }

  const text = await $.fs
    .read(`${ROOT}/${best.name}/status.json`)
    .catch((error: unknown) => (error instanceof Error ? error : new Error(String(error))))
  if (text instanceof Error) {
    return { kind: 'broken', project: best.name, reason: `تعذّرت قراءة الملف: ${text.message.slice(0, 120)}` }
  }

  return parseStatus(best.name, text)
}

/**
 * Raises one in-app alert per change into "done" or "needs decision", per
 * project and stage, remembered in $.store so a reload or a new session does
 * not raise it again. The first time a project is seen, stages already done
 * are recorded quietly; a stage waiting for a decision is still raised.
 */
async function alertOnChanges($: EngineInterface, snap: Snapshot): Promise<void> {
  if (snap.kind !== 'ok') return

  const seen = ((await $.store.get('seen')) as Seen | undefined) ?? {}
  const before = seen[snap.project]
  const isFirstSight = before === undefined
  const after: Record<string, StageStatus> = { ...(before ?? {}) }
  const lines: string[] = []

  for (const stage of snap.stages) {
    if (after[stage.id] === stage.status) continue
    after[stage.id] = stage.status
    if (stage.status === 'done' && !isFirstSight) lines.push(`اكتملت مرحلة ${STAGE_LABEL[stage.id]}`)
    if (stage.status === 'needs_decision') lines.push(`${STAGE_LABEL[stage.id]} بانتظار قرارك`)
  }

  if (JSON.stringify(after) !== JSON.stringify(before ?? {})) {
    await $.store.set('seen', { ...seen, [snap.project]: after })
  }
  if (lines.length === 0) return

  const text = `${snap.reel}: ${lines.join('، ')}`
  const at = await $.clock.now()
  await update($, alert, () => ({ text, at }))
  if (!(await read($, quiet))) $.ui.toast(text, { timeoutMs: 8000 })
}

let isRefreshing = false

async function refresh($: EngineInterface): Promise<void> {
  if (isRefreshing) return
  isRefreshing = true
  try {
    const snap = await locate($).catch(
      (error: unknown): Snapshot => ({
        kind: 'broken',
        project: '?',
        reason: error instanceof Error ? error.message.slice(0, 160) : 'خطأ غير معروف',
      }),
    )
    const current = await read($, snapshot)
    if (JSON.stringify(current) !== JSON.stringify(snap)) await update($, snapshot, () => snap)
    await alertOnChanges($, snap)
  } finally {
    isRefreshing = false
  }
}

async function setQuiet($: EngineInterface, isQuiet: boolean): Promise<void> {
  await update($, quiet, () => isQuiet)
  await $.store.set('quiet', isQuiet)
}

const MARK: Record<StageStatus, string> = {
  not_started: '○',
  in_progress: '◐',
  needs_decision: '!',
  done: '✓',
  unknown: '?',
}

const COLOR: Record<StageStatus, 'subtle' | 'suggestion' | 'warning' | 'success' | 'error'> = {
  not_started: 'subtle',
  in_progress: 'suggestion',
  needs_decision: 'warning',
  done: 'success',
  unknown: 'error',
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const stored = await $.store.get('quiet')
    await update($, quiet, () => stored === true)
    await $.command.register({
      name: 'reel-room',
      description: 'افتح لوحة مراحل الريل الحالي',
    })
    await $.command.register({
      name: 'reel-room-quiet',
      description: 'شغّل وضع الهدوء أو أوقفه في لوحة الريل',
    })
    await refresh($)
    $.clock.every(POLL_MS, () => {
      void refresh($)
    })
    void $.ui.open({ id: PANE, title: TITLE })

    return next(e)
  })

  on('command.run', { command: 'reel-room' }, async $ => {
    await refresh($)
    await $.ui.open({ id: PANE, title: TITLE })

    return { text: 'فُتحت لوحة الريل.' }
  })

  on('command.run', { command: 'reel-room-quiet' }, async $ => {
    const isQuiet = !(await read($, quiet))
    await setQuiet($, isQuiet)

    return { text: isQuiet ? 'وضع الهدوء مفعّل: لا تنبيهات منبثقة.' : 'وضع الهدوء متوقف: التنبيهات تعمل.' }
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text, Button } = $.ui.resolve(e)
    const snap = await read($, snapshot)
    const isQuiet = await read($, quiet)
    const last = await read($, alert)

    const controls = (
      <Box flexDirection="row" gap={1}>
        <Button
          key="quiet"
          label={isQuiet ? 'إيقاف وضع الهدوء' : 'وضع الهدوء'}
          onPress={() => setQuiet($, !isQuiet)}
        />
        <Button key="refresh" label="تحديث" onPress={() => refresh($)} />
      </Box>
    )

    const hint = (
      <Text dimColor>
        {'{ "reel": "…", "stages": { "script": "جاهز", "edit": "قيد العمل", "sound": "لم يبدأ", "cover": "لم يبدأ", "delivery": "لم يبدأ" } }'}
      </Text>
    )

    let body
    if (snap.kind === 'loading') {
      body = <Text dimColor>جارٍ القراءة…</Text>
    } else if (snap.kind === 'no-root' || snap.kind === 'no-project') {
      body = (
        <Box flexDirection="column">
          <Text bold>لا يوجد مشروع ريل بعد</Text>
          <Text dimColor>
            {snap.kind === 'no-root' ? `المجلد غير موجود: ${snap.root}` : `المجلد فارغ: ${snap.root}`}
          </Text>
          <Text dimColor>أنشئ مجلدًا باسم الريل وضع فيه status.json مثل:</Text>
          {hint}
        </Box>
      )
    } else if (snap.kind === 'no-status') {
      body = (
        <Box flexDirection="column">
          <Text bold>{snap.project}</Text>
          <Text color="warning">لا يوجد status.json في هذا المشروع</Text>
          <Text dimColor>أضف الملف بهذا الشكل:</Text>
          {hint}
        </Box>
      )
    } else if (snap.kind === 'empty') {
      body = (
        <Box flexDirection="column">
          <Text bold>{snap.project}</Text>
          <Text color="warning">status.json فارغ</Text>
          <Text dimColor>املأه بهذا الشكل:</Text>
          {hint}
        </Box>
      )
    } else if (snap.kind === 'broken') {
      body = (
        <Box flexDirection="column">
          <Text bold>{snap.project}</Text>
          <Text color="error">status.json تالف، لا أستطيع قراءته</Text>
          <Text dimColor>{snap.reason}</Text>
          <Text dimColor>صحّحه ثم احفظ، وستتحدّث اللوحة خلال ثوانٍ.</Text>
        </Box>
      )
    } else {
      body = (
        <Box flexDirection="column">
          <Text bold>{snap.reel}</Text>
          {snap.reel !== snap.project && <Text dimColor>{snap.project}</Text>}
          {snap.stages.map(stage => (
            <Box key={stage.id} flexDirection="column">
              <Text>
                <Text color={COLOR[stage.status]}>{MARK[stage.status]} </Text>
                {STAGE_LABEL[stage.id]}: <Text color={COLOR[stage.status]}>{STATUS_LABEL[stage.status]}</Text>
              </Text>
              {stage.note && <Text dimColor>   {stage.note}</Text>}
            </Box>
          ))}
          {snap.warnings.map(line => (
            <Text color="error">{line}</Text>
          ))}
        </Box>
      )
    }

    return (
      <Box flexDirection="column" gap={1}>
        {body}
        {last && (
          <Box flexDirection="row" gap={1}>
            <Text color="warning">تنبيه: {last.text}</Text>
            <Button key="dismiss" label="تم" onPress={() => update($, alert, () => null)} />
          </Box>
        )}
        {isQuiet && <Text dimColor>وضع الهدوء مفعّل: التنبيهات تظهر هنا فقط.</Text>}
        {controls}
      </Box>
    )
  })
}
