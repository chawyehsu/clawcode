// Stub: ant-only tool
import { buildTool } from '../../Tool.js'

// Stub: ant-only tool
export const REPLTool = buildTool({
  name: 'repl',
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
