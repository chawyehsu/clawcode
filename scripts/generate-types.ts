/**
 * Generates src/entrypoints/sdk/coreTypes.generated.ts from the Zod schemas
 * in coreSchemas.ts. Derives TypeScript types via z.infer.
 */
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { PROJECT_ROOT } from './constants'

const schemasPath = join(import.meta.dir, '..', PROJECT_ROOT, 'src/entrypoints/sdk/coreSchemas.ts')
const outputPath = join(import.meta.dir, '..', PROJECT_ROOT, 'src/entrypoints/sdk/coreTypes.generated.ts')

const content = readFileSync(schemasPath, 'utf-8')

// Extract all exported schema names
const schemaNames: string[] = []
const regex = /^export const (\w+Schema)\b/gm
let match: RegExpExecArray | null
while ((match = regex.exec(content)) !== null) {
  schemaNames.push(match[1]!)
}

// Generate type exports
const lines = [
  '// AUTO-GENERATED from coreSchemas.ts — do not edit manually',
  "import { z } from 'zod/v4'",
  "import * as schemas from './coreSchemas.js'",
  '',
]

for (const schemaName of schemaNames) {
  const typeName = schemaName.replace(/Schema$/, '')
  lines.push(`export type ${typeName} = z.infer<ReturnType<typeof schemas.${schemaName}>>;`)
}

writeFileSync(outputPath, lines.join('\n') + '\n')
console.log(`Generated ${schemaNames.length} types to ${outputPath}`)
