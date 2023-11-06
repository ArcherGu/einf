import path from 'node:path'
import { beforeAll, describe, expect, it } from 'vitest'
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

describe('einf Test', () => {
  let logs = ''
  beforeAll(async () => {
    logs = await run()
  }, 60 * 1000)

  it('ipcOn', () => {
    expect(logs).toContain('Call ipc on')
  })

  it('ipcSend', () => {
    expect(logs).toContain('hello, this is the main process')
  })

  it('ipcHandle', () => {
    expect(logs).toContain('hello, this is the renderer')
    expect(logs).toContain('main process received your message')
  })

  it('service injection', () => {
    expect(logs).toContain('is created by app service')
  })

  it('another service inject to app service', () => {
    expect(logs).toContain('is created by another service')
  })

  it('custom item injection', () => {
    expect(logs).toContain('current is run in development mode')
  })

  it('window', () => {
    expect(logs).toContain('Get window title: Einf Test')
  })

  it('error', () => {
    expect(logs).toContain('This is an error from ipc channel')
  })
})
