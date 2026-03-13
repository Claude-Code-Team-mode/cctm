import { Command } from 'commander'
import { execSync } from 'node:child_process'
import { resolve, join } from 'node:path'
import { ensureDir, copyDir, getTemplatesDir, fileExists } from './utils.js'

const program = new Command()

program
  .name('cctm')
  .description('Install Claude Code team management into your project')
  .version('0.1.0')

function runInit(targetPath: string, force: boolean): void {
  const target = resolve(targetPath)
  const claudeDir = join(target, '.claude')

  if (!fileExists(claudeDir)) {
    ensureDir(claudeDir)
    console.log(`Created ${claudeDir}`)
  }

  const hasOpenSpec = (() => {
    try {
      execSync('which openspec', { stdio: 'ignore' })
      return true
    } catch {
      return false
    }
  })()

  if (!hasOpenSpec) {
    console.log('OpenSpec not detected. Installing...')
    try {
      execSync('npm i -g openspec', { stdio: 'inherit' })
      console.log('✓ OpenSpec installed')
    } catch (error) {
      console.error('Failed to install OpenSpec. Install manually: npm i -g openspec')
      process.exit(1)
    }
  }

  const openspecDir = join(target, 'openspec')
  if (!fileExists(openspecDir)) {
    console.log('Initializing OpenSpec...')
    try {
      execSync('openspec init', { cwd: target, stdio: 'inherit' })
      console.log('✓ OpenSpec initialized')
    } catch (error) {
      console.error('Failed to initialize OpenSpec. Run manually: openspec init')
      process.exit(1)
    }
  }

  const templatesDir = getTemplatesDir()

  const skillsSrc = join(templatesDir, 'skills')
  const skillsDest = join(claudeDir, 'skills')
  const skillsResult = copyDir(skillsSrc, skillsDest, force)

  const commandsSrc = join(templatesDir, 'commands', 'cctm')
  const commandsDest = join(claudeDir, 'commands', 'cctm')
  const commandsResult = copyDir(commandsSrc, commandsDest, force)

  const allCopied = [...skillsResult.copied, ...commandsResult.copied]
  const allSkipped = [...skillsResult.skipped, ...commandsResult.skipped]

  if (allCopied.length > 0) {
    console.log(`\nCopied ${allCopied.length} file(s):`)
    for (const f of allCopied) {
      console.log(`  + ${f}`)
    }
  }

  if (allSkipped.length > 0) {
    console.log(`\nSkipped ${allSkipped.length} existing file(s):`)
    for (const f of allSkipped) {
      console.log(`  ~ ${f}`)
    }
  }

  console.log('\n✓ CCTM installed successfully!')
  console.log('  Use /cctm:create to create a team')
  console.log('  Use /cctm:resume to resume unfinished projects')
}

program
  .command('init')
  .description('Install CCTM templates into a project')
  .argument('[path]', 'Target project directory', '.')
  .option('-f, --force', 'Overwrite existing files', false)
  .action((path: string, opts: { force: boolean }) => {
    console.log('Installing CCTM templates...')
    runInit(path, opts.force)
  })

program
  .command('update')
  .description('Update CCTM templates (overwrites existing files)')
  .argument('[path]', 'Target project directory', '.')
  .action((path: string) => {
    console.log('Updating CCTM templates...')
    runInit(path, true)
  })

program.parse()
