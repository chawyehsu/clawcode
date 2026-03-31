// Stub: optional react-devtools-core integration (dev only)
try {
  // @ts-ignore - optional dependency
  const { connectToDevTools } = await import('react-devtools-core')
  connectToDevTools()
} catch {
  // react-devtools-core not installed
}
