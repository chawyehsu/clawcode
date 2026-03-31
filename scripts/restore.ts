import fs from 'fs'
import { SourceMapConsumer } from 'source-map'
import { execSync } from 'child_process'
import path, { join } from 'path'
import { styleText } from 'node:util'
import { PROJECT_ROOT, PACKAGE_IDENTIFIER, PACKAGE_FILENAME } from './constants'

// for windows: https://github.com/oven-sh/bun/issues/12696
const needTarWorkaround = typeof Bun !== "undefined" && process.platform === "win32"
if (needTarWorkaround) process.env.__FAKE_PLATFORM__ = "linux"
const { extract } = await import("tar")
if (needTarWorkaround) delete process.env.__FAKE_PLATFORM__

// download and extract
const filename = join(import.meta.dir, '../.cache', PACKAGE_FILENAME)
const project = join(import.meta.dir, '..', PROJECT_ROOT)

if (!fs.existsSync(`${filename}`)) {
  console.log(`Downloading ${PACKAGE_IDENTIFIER}...`)
  try {
    execSync(`npm pack ${PACKAGE_IDENTIFIER}`)
  } catch (error: any) {
    console.warn(styleText(['yellow'], `Failed to download package tarball, you might put the tarball in .cache folder manually.`))
    process.exit(1)
  }
}
if (fs.existsSync(`${project}`)) {
  console.log(`Removing existing ${project} directory...`)
  fs.rmSync(`${project}`, { recursive: true, force: true })
}

fs.mkdirSync(`${project}`)
console.log(`Extracting ${filename}...`)
extract({
  file: filename,
  cwd: `${project}`,
  sync: true,
  strict: true,
  preserveOwner: false,
})

// change working directory to the extracted package
process.chdir(`${project}/package`)

console.log(`Recovering source...`)
const rawSourceMap = JSON.parse(fs.readFileSync('cli.js.map', 'utf8'))
await SourceMapConsumer.with(rawSourceMap, null, consumer => {
  const sources = consumer.sources

  sources.forEach(source => {
    const content = consumer.sourceContentFor(source, true)
    if (content) {
      const parent = path.dirname(source)
      if (!fs.existsSync(parent)) {
        fs.mkdirSync(parent, { recursive: true })
      }
      fs.writeFileSync(source, content)
    }
  })
})
console.log(`Source recovered.`)

// restore workspace
process.chdir(join(import.meta.dir, '..'))
fs.cpSync('res', `${project}`, { recursive: true })
// restore dependencies
console.log(`Generating project package.json...`)
const targetPackageJson = JSON.parse(fs.readFileSync(`${project}/package/package.json`, 'utf8'))
const stored = JSON.parse(fs.readFileSync('res/package.json', 'utf8'))
targetPackageJson.devDependencies = stored.devDependencies
targetPackageJson.scripts = {}
fs.writeFileSync(`${project}/package.json`, JSON.stringify(targetPackageJson, null, 2))

console.log(`Workspace restored!`)
