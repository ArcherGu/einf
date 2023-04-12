import path from 'node:path'
import { beforeAll, describe, expect, test } from 'vitest'
import { execa } from 'execa'

const mockDir = path.resolve(__dirname, './mock')

async function run() {
  const { stdout, stderr } = await execa(
    'npx',
    ['vite'],
    {
      cwd: mockDir,
    },
  )

  const logs = stdout + stderr
  return logs
}

describe('Einf Test', () => {
  let logs = ''
  beforeAll(async () => {
    logs = await run()
  }, 60 * 1000)

  test('IpcOn', () => {
    expect(logs).toContain('Call ipc on')
  })

  test('IpcSend', () => {
    expect(logs).toContain('hello, this is the main process')
  })

  test('IpcHandle', () => {
    expect(logs).toContain('hello, this is the renderer')
    expect(logs).toContain('main process received your message')
  })

  test('Service injection', () => {
    expect(logs).toContain('is created by app service')
  })

  test('Another service inject to app service', () => {
    expect(logs).toContain('is created by another service')
  })

  test('Custom item injection', () => {
    expect(logs).toContain('current is run in development mode')
  })

  test('Window', () => {
    expect(logs).toContain('Get window title: Einf Test')
  })

  test('Error', () => {
    expect(logs).toContain('This is an error from ipc channel')
  })
})
