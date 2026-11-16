import { expect, mock, test } from 'claude-code/testing'
import type { On } from 'claude-code'

const ROOT = 'C:/Edit with AI/Projects'

const PANE = {
  plugin: 'reel-control-room',
  component: 'Pane',
  requestId: 'reel-control-room',
  props: {
    title: 'غرفة تحكم الريل',
    isFocused: false,
    bodyColumns: 60,
    placement: 'dock',
    scroll: { offset: 0, bodyRows: 30 },
    view: {},
  },
} as const

/**
 * A disk in memory: `files` maps "<project>/status.json" to its text, or a
 * project folder alone ("<project>/") to nothing. The engine's other answers
 * stand in for a session. Returns the files (to change them) and the toasts.
 */
function world(on: On, files: Record<string, string> | undefined) {
  const toasts: string[] = []
  const disk = { ...(files ?? {}) }
  const clock = mock.clock(on, { now: 1_000 })
  mock.store(on)
  const mtimes: Record<string, number> = {}
  const touch = (name: string) => (mtimes[name] = clock.now())
  for (const name of Object.keys(disk)) touch(name)

  const norm = (path: string) => path.replace(/\\/g, '/')
  const rel = (path: string) => norm(path).slice(ROOT.length + 1)
  const projects = () => [...new Set(Object.keys(disk).map(name => name.split('/')[0]!))]

  on('fs.exists', (_, e) => ({ value: files !== undefined && norm(e.path) === ROOT }))
  on('fs.list', () => ({
    value: projects().map(name => ({ name, kind: 'dir' as const, size: 0, mtimeMs: 0, isLink: false })),
  }))
  on('fs.stat', (_, e) => {
    const name = rel(e.path)
    if (projects().includes(name)) {
      return { value: { kind: 'dir' as const, size: 0, mtimeMs: 0, isLink: false } }
    }
    const text = disk[name]
    if (text === undefined || name.endsWith('/')) throw new Error(`ENOENT: ${e.path}`)

    return { value: { kind: 'file' as const, size: text.length, mtimeMs: mtimes[name] ?? 0, isLink: false } }
  })
  on('fs.read', (_, e) => {
    const text = disk[rel(e.path)]
    if (text === undefined) throw new Error(`ENOENT: ${e.path}`)

    return { value: text }
  })
  on('ui.toast', (_, e) => {
    toasts.push(e.text)

    return { value: undefined }
  })
  on('command.register', (_, e) => ({ value: { command: e.name } }))
  on('ui.open', () => ({ value: { isPlaced: true } }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))

  const write = async (name: string, text: string) => {
    disk[name] = text
    touch(name)
    await clock.advance(3_000)
  }

  return { toasts, write, clock }
}

const start = ($: Parameters<Parameters<typeof test>[1]>[0]) =>
  $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })

const status = (stages: Record<string, string>) =>
  JSON.stringify({ reel: 'ريل الكهرباء', stages })

test('no Projects folder: a clear empty state, on every surface', async ($, on) => {
  world(on, undefined)
  await start($)
  for (const surface of ['terminal', 'desktop', 'vscode', 'mobile'] as const) {
    const ui = await $.ui.mount({ ...PANE, surface })
    expect((await ui.find({ type: 'Text', text: /لا يوجد مشروع ريل بعد/ }))?.text).toBeDefined()
    await ui.unmount()
  }
})

test('a Projects folder with no reel in it is empty too', async ($, on) => {
  world(on, {})
  await start($)
  const ui = await $.ui.mount({ ...PANE, surface: 'terminal' })
  expect((await ui.find({ type: 'Text', text: /المجلد فارغ/ }))?.text).toBeDefined()
  await ui.unmount()
})

test('an empty status.json says so', async ($, on) => {
  world(on, { 'reel-a/status.json': '  \n' })
  await start($)
  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })
  expect((await ui.find({ type: 'Text', text: /status\.json فارغ/ }))?.text).toBeDefined()
  await ui.unmount()
})

test('a broken status.json says it cannot be read, with the reason', async ($, on) => {
  const { toasts } = world(on, { 'reel-a/status.json': '{ "stages": { "script": "جاهز", ' })
  await start($)
  const ui = await $.ui.mount({ ...PANE, surface: 'terminal' })
  expect((await ui.find({ type: 'Text', text: /تالف/ }))?.text).toBeDefined()
  expect((await ui.find({ type: 'Text', text: /ليس JSON صالحًا/ }))?.text).toBeDefined()
  expect(toasts).toEqual([])
  await ui.unmount()
})

test('a JSON array is refused as broken', async ($, on) => {
  world(on, { 'reel-a/status.json': '[1, 2]' })
  await start($)
  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })
  expect((await ui.find({ type: 'Text', text: /كائن JSON/ }))?.text).toBeDefined()
  await ui.unmount()
})

test('the stages show, and a finished stage is announced exactly once', async ($, on) => {
  const { toasts, write } = world(on, {
    'reel-a/status.json': status({ script: 'جاهز', edit: 'قيد العمل' }),
  })
  await start($)
  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })
  expect((await ui.find({ type: 'Text', text: /ريل الكهرباء/ }))?.text).toBeDefined()
  expect((await ui.find({ type: 'Text', text: /المونتاج: قيد العمل/ }))?.text).toBeDefined()
  expect((await ui.find({ type: 'Text', text: /الصوت: لم يبدأ/ }))?.text).toBeDefined()
  // What was already done when the project was first seen is not announced.
  expect(toasts).toEqual([])

  await write('reel-a/status.json', status({ script: 'جاهز', edit: 'جاهز' }))
  expect(toasts).toEqual(['ريل الكهرباء: اكتملت مرحلة المونتاج'])
  expect((await ui.find({ type: 'Text', text: /تنبيه:/ }))?.text).toBeDefined()

  await write('reel-a/status.json', status({ script: 'جاهز', edit: 'جاهز' }))
  expect(toasts.length).toBe(1)

  await write('reel-a/status.json', status({ script: 'جاهز', edit: 'جاهز', sound: 'بانتظار قراري' }))
  expect(toasts).toEqual([
    'ريل الكهرباء: اكتملت مرحلة المونتاج',
    'ريل الكهرباء: الصوت بانتظار قرارك',
  ])
  await ui.unmount()
})

test('quiet mode keeps the alert in the pane and raises no toast', async ($, on) => {
  const { toasts, write } = world(on, { 'reel-a/status.json': status({ script: 'قيد العمل' }) })
  await start($)
  const ui = await $.ui.mount({ ...PANE, surface: 'terminal' })
  await ui.press({ key: 'quiet' })
  expect((await ui.find({ type: 'Text', text: /وضع الهدوء مفعّل/ }))?.text).toBeDefined()

  await write('reel-a/status.json', status({ script: 'جاهز' }))
  expect(toasts).toEqual([])
  expect((await ui.find({ type: 'Text', text: /اكتملت مرحلة السكربت/ }))?.text).toBeDefined()
  await ui.unmount()
})

test('an unknown status word is flagged, English codes are read', async ($, on) => {
  world(on, { 'reel-a/status.json': status({ script: 'done', edit: 'in_progress', cover: 'تقريبًا' }) })
  await start($)
  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })
  expect((await ui.find({ type: 'Text', text: /السكربت: جاهز/ }))?.text).toBeDefined()
  expect((await ui.find({ type: 'Text', text: /حالة غير مفهومة في الكفر/ }))?.text).toBeDefined()
  await ui.unmount()
})
