// Stub: file persistence types
export const DEFAULT_UPLOAD_CONCURRENCY = 5
export const FILE_COUNT_LIMIT = 100
export const OUTPUTS_SUBDIR = 'outputs'

export type FailedPersistence = {
  path: string
  error: string
}

export type FilesPersistedEventData = {
  files: PersistedFile[]
  failed: FailedPersistence[]
}

export type PersistedFile = {
  path: string
  size: number
}

export type TurnStartTime = number
