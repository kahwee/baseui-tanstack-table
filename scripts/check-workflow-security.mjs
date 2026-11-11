import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import test from 'node:test'

const directory = new URL('../.github/workflows/', import.meta.url)
const workflows = readdirSync(directory)
  .filter((name) => /\.ya?ml$/.test(name))
  .map((name) => [name, readFileSync(new URL(name, directory), 'utf8')])

test('dependency updates require manual review and merging', () => {
  for (const [name, source] of workflows) {
    assert.doesNotMatch(source, /gh\s+pr\s+(?:review|merge)\b/, name)
    assert.doesNotMatch(
      source,
      /(?:auto-approve|enable-pull-request-automerge|merge-me|automerge-action)@/i,
      name,
    )
    assert.doesNotMatch(source, /pull-requests:\s*write/, name)
  }
})

test('PR build workflows explicitly use read-only tokens', () => {
  const pullRequestWorkflows = workflows.filter(([, source]) => source.includes('pull_request:'))
  for (const [name, source] of pullRequestWorkflows) {
    assert.match(source, /^permissions:\n  contents: read\n/m, name)
    assert.doesNotMatch(source, /:\s*write\b|write-all|secrets\./, name)
  }
})

test('only the isolated Pages deploy job has deployment authority', () => {
  const source = readFileSync(new URL('deploy-storybook.yml', directory), 'utf8')
  const [build, deploy] = source.split('\n  deploy:\n')
  assert.match(build, /^permissions:\n  contents: read\n/m)
  assert.doesNotMatch(build, /:\s*write\b|write-all/)
  assert.match(deploy, /^    permissions:\n      pages: write\n      id-token: write\n/)
  assert.doesNotMatch(deploy, /checkout@|bun (?:ci|install|run)|npm |pnpm /)
  assert.match(deploy, /needs: build/)
})
