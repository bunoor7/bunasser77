import type { Snapshot, Stage, StageId, StageStatus } from '../types'

export const STAGES: readonly StageId[] = [
  'script',
  'edit',
  'sound',
  'cover',
  'delivery',
]

export const STAGE_LABEL: Record<StageId, string> = {
  script: 'السكربت',
  edit: 'المونتاج',
  sound: 'الصوت',
  cover: 'الكفر',
  delivery: 'التسليم',
}

export const STATUS_LABEL: Record<StageStatus, string> = {
  not_started: 'لم يبدأ',
  in_progress: 'قيد العمل',
  needs_decision: 'بانتظار قراري',
  done: 'جاهز',
  unknown: 'غير مفهوم',
}

/** Arabic keys accepted beside the English ones in status.json. */
const STAGE_ALIASES: Record<StageId, readonly string[]> = {
  script: ['script', 'السكربت', 'سكربت', 'النص'],
  edit: ['edit', 'montage', 'المونتاج', 'مونتاج'],
  sound: ['sound', 'audio', 'sfx', 'الصوت', 'صوت'],
  cover: ['cover', 'thumbnail', 'الكفر', 'كفر', 'الغلاف'],
  delivery: ['delivery', 'deliver', 'التسليم', 'تسليم'],
}

/** Strips diacritics and tatweel, unifies alef forms, folds case and spaces. */
export function normalize(text: string): string {
  return text
    .replace(/[ً-ْـ]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/[_\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

const STATUS_WORDS: Record<Exclude<StageStatus, 'unknown'>, readonly string[]> = {
  not_started: ['not started', 'todo', 'لم يبدا', 'لم تبدا', 'لم يبدا بعد'],
  in_progress: ['in progress', 'wip', 'working', 'قيد العمل', 'جاري العمل'],
  needs_decision: [
    'needs decision',
    'waiting',
    'decision',
    'بانتظار قراري',
    'بانتظار قرار',
    'بانتظار قرارك',
  ],
  done: ['done', 'ready', 'جاهز', 'جاهزه', 'مكتمل'],
}

export function parseStageStatus(value: string): StageStatus {
  const word = normalize(value)
  for (const [status, words] of Object.entries(STATUS_WORDS)) {
    if (words.some(one => normalize(one) === word)) return status as StageStatus
  }

  return 'unknown'
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readStage(id: StageId, source: Record<string, unknown>): Stage {
  const keys = Object.keys(source)
  const aliases = STAGE_ALIASES[id].map(normalize)
  const key = keys.find(one => aliases.includes(normalize(one)))
  const value = key === undefined ? undefined : source[key]

  if (value === undefined || value === null) return { id, status: 'not_started' }

  if (typeof value === 'string') {
    const status = parseStageStatus(value)

    return status === 'unknown' ? { id, status, raw: value } : { id, status }
  }

  if (isRecord(value) && typeof value.status === 'string') {
    const status = parseStageStatus(value.status)
    const note = typeof value.note === 'string' ? value.note.slice(0, 200) : undefined
    const stage: Stage = { id, status }
    if (status === 'unknown') stage.raw = value.status
    if (note) stage.note = note

    return stage
  }

  return { id, status: 'unknown', raw: JSON.stringify(value).slice(0, 60) }
}

/** Turns the text of one project's status.json into what the pane shows. */
export function parseStatus(project: string, text: string): Snapshot {
  const body = text.replace(/^﻿/, '')
  if (body.trim() === '') return { kind: 'empty', project }

  let data: unknown
  try {
    data = JSON.parse(body)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)

    return { kind: 'broken', project, reason: `ليس JSON صالحًا: ${message.slice(0, 160)}` }
  }

  if (!isRecord(data)) {
    return { kind: 'broken', project, reason: 'الملف يجب أن يكون كائن JSON بين { }' }
  }

  if (data.stages !== undefined && !isRecord(data.stages)) {
    return { kind: 'broken', project, reason: 'الحقل "stages" يجب أن يكون كائنًا' }
  }

  const source = isRecord(data.stages) ? data.stages : data
  const stages = STAGES.map(id => readStage(id, source))
  const warnings = stages
    .filter(stage => stage.status === 'unknown')
    .map(stage => `حالة غير مفهومة في ${STAGE_LABEL[stage.id]}: "${stage.raw ?? ''}"`)
  const named = typeof data.reel === 'string' ? data.reel : data.title
  const reel = typeof named === 'string' && named.trim() !== '' ? named.trim() : project

  return { kind: 'ok', project, reel, stages, warnings }
}
