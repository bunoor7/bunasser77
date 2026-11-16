export type StageId = 'script' | 'edit' | 'sound' | 'cover' | 'delivery'

export type StageStatus =
  | 'not_started'
  | 'in_progress'
  | 'needs_decision'
  | 'done'
  | 'unknown'

export type Stage = {
  id: StageId
  status: StageStatus
  /** The value as written in status.json, kept when it was not understood. */
  raw?: string
  note?: string
}

/** What the pane shows: one of the empty or error states, or the stages. */
export type Snapshot =
  | { kind: 'loading' }
  | { kind: 'no-root'; root: string }
  | { kind: 'no-project'; root: string }
  | { kind: 'no-status'; project: string; root: string }
  | { kind: 'empty'; project: string }
  | { kind: 'broken'; project: string; reason: string }
  | {
      kind: 'ok'
      project: string
      reel: string
      stages: Stage[]
      warnings: string[]
    }

export type Alert = { text: string; at: number } | null

declare module 'claude-code' {
  interface PluginState {
    'reel-control-room': {
      snapshot: Shaped<Snapshot>
      alert: Shaped<Alert>
      quiet: boolean
    }
  }
}
