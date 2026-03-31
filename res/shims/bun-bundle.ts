// Runtime shim for bun:bundle - all feature flags return false
// (internal/ant-only features won't be available)
export function feature(_name: string): boolean {
  return false
}
