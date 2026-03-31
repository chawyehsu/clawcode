// Stub: SDK runtime types
import type { z } from 'zod/v4'
import type { SDKMessage, SDKResultMessage, SDKSessionInfo, SDKUserMessage } from './coreTypes.js'

export type EffortLevel = 'low' | 'medium' | 'high' | 'max'
export type AnyZodRawShape = Record<string, z.ZodTypeAny>
export type InferShape<T extends AnyZodRawShape> = { [K in keyof T]: z.infer<T[K]> }

export type Options = {
  abortController?: AbortController
  cwd?: string
  permissions?: Record<string, any>
  model?: string
  maxTurns?: number
  systemPrompt?: string
  mcpServers?: Record<string, any>
  allowedTools?: string[]
}
export type InternalOptions = Options & { internal?: boolean }

export type Query = AsyncIterable<SDKMessage> & {
  result: Promise<SDKResultMessage>
  abort(): void
}
export type InternalQuery = Query

export type SessionMessage = SDKMessage

export type SDKSessionOptions = {
  model?: string
  systemPrompt?: string
  cwd?: string
  permissions?: Record<string, any>
}

export interface SDKSession {
  readonly id: string
  send(message: string | AsyncIterable<SDKUserMessage>): Query
  getInfo(): Promise<SDKSessionInfo>
  close(): Promise<void>
}

export type SdkMcpToolDefinition<_Schema extends AnyZodRawShape = AnyZodRawShape> = {
  name: string
  description: string
  inputSchema: any
  handler: (...args: any[]) => Promise<any>
}

export type McpSdkServerConfigWithInstance = {
  server: any
  transport: any
}

export type ForkSessionOptions = { fromMessageId?: string }
export type ForkSessionResult = { sessionId: string }
export type GetSessionInfoOptions = { sessionId: string }
export type GetSessionMessagesOptions = { sessionId: string }
export type ListSessionsOptions = { limit?: number; offset?: number }
export type SessionMutationOptions = { sessionId: string }
