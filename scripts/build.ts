import { join } from 'path'
import { PROJECT_ROOT } from './constants'

const version = process.env.VERSION ||
  (await import(join(import.meta.dir, '..', PROJECT_ROOT, 'package.json'))).version
const buildTime = new Date().toISOString()

console.log(`Building v${version}...`)

const result = await Bun.build({
  entrypoints: [`${PROJECT_ROOT}/src/entrypoints/cli.tsx`],
  outdir: 'dist',
  target: 'bun',
  sourcemap: 'linked',
  define: {
    'MACRO.VERSION': JSON.stringify(version),
    'MACRO.BUILD_TIME': JSON.stringify(buildTime),
    'MACRO.FEEDBACK_CHANNEL': JSON.stringify('#claw-code'),
    'MACRO.ISSUES_EXPLAINER': JSON.stringify(
      'report the issue at https://github.com/openclawcode',
    ),
  },
  external: ['sharp'],
})

if (!result.success) {
  console.error('Build failed:')
  for (const log of result.logs) {
    console.error(log)
  }
  process.exit(1)
}

console.log(`Build succeeded: dist/cli.js (${(result.outputs[0]!.size / 1024 / 1024).toFixed(1)} MB)`)
