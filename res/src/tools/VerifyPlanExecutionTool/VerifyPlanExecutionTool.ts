// Stub: gated by CLAUDE_CODE_VERIFY_PLAN env var
import { buildTool } from '../../Tool.js'

export const VerifyPlanExecutionTool = buildTool({
  name: 'verify_plan_execution',
  description: async () => 'Not available',
  call: async () => {
    return { data: {} }
  },
  inputSchema: undefined,
  maxResultSizeChars: 0,
  prompt: function (): Promise<string> {
    throw new Error('Function not implemented.')
  },
  renderToolUseMessage() {
    return null
  },
  mapToolResultToToolResultBlockParam: function (content: any, toolUseID: string) {
    throw new Error('Function not implemented.')
  }
})
