import fs from 'fs'
import { SourceMapConsumer } from 'source-map'
import { execSync } from 'child_process'
import path from 'path'

// for win: https://github.com/oven-sh/bun/issues/12696
const needTarWorkaround = typeof Bun !== "undefined" && process.platform === "win32"
if (needTarWorkaround) process.env.__FAKE_PLATFORM__ = "linux"
const { extract } = await import("tar")
if (needTarWorkaround) delete process.env.__FAKE_PLATFORM__

// download and extract
const pkg = '@anthropic-ai/claude-code@2.1.88'
const filename = 'anthropic-ai-claude-code-2.1.88.tgz'
const project = 'claudecode'

if (!fs.existsSync(`${filename}`)) {
  console.log(`Downloading ${pkg}...`)
  execSync(`npm pack ${pkg}`)
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
SourceMapConsumer.with(rawSourceMap, null, consumer => {
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
console.log(`Done!`)
