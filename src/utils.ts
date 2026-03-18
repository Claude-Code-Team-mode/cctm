import { existsSync, mkdirSync, readdirSync, statSync, copyFileSync } from 'node:fs'
import { join, relative, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

export function ensureDir(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
}

export function fileExists(path: string): boolean {
  return existsSync(path)
}

export function getTemplatesDir(): string {
  const currentFile = fileURLToPath(import.meta.url)
  const projectRoot = join(dirname(currentFile), '..')
  return join(projectRoot, 'templates')
}

export function getSchemasDir(): string {
  const currentFile = fileURLToPath(import.meta.url)
  const projectRoot = join(dirname(currentFile), '..')
  return join(projectRoot, 'schemas')
}

export function copyDir(
  src: string,
  dest: string,
  force: boolean
): { copied: string[]; skipped: string[] } {
  const copied: string[] = []
  const skipped: string[] = []

  function walk(currentSrc: string, currentDest: string): void {
    ensureDir(currentDest)

    const entries = readdirSync(currentSrc)
    for (const entry of entries) {
      const srcPath = join(currentSrc, entry)
      const destPath = join(currentDest, entry)
      const stat = statSync(srcPath)

      if (stat.isDirectory()) {
        walk(srcPath, destPath)
      } else {
        const relPath = relative(dest, destPath)
        if (!force && existsSync(destPath)) {
          skipped.push(relPath)
        } else {
          ensureDir(dirname(destPath))
          copyFileSync(srcPath, destPath)
          copied.push(relPath)
        }
      }
    }
  }

  walk(src, dest)
  return { copied, skipped }
}
