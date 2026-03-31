// Stub: ant-only tool
import { buildTool } from '../../Tool.js'

export const TungstenTool = buildTool({
  name: 'tungsten',
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
