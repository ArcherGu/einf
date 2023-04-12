import { join } from 'node:path'
import { BrowserWindow, app } from 'electron'
import { createEinf } from '../../../dist'
import { AppController } from './app.controller'

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'
const isDev = !app.isPackaged

async function createWindow() {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, './preload.js'),
    },
  })

  const URL = isDev
    ? process.env.DS_RENDERER_URL
    : `file://${join(app.getAppPath(), 'dist/render/index.html')}`

  win.loadURL(URL)

  win.on('closed', () => {
    win.destroy()
  })

  return win
}

async function bootstrap() {
  try {
    await createEinf({
      window: createWindow,
      controllers: [AppController],
      injects: [{
        name: 'IS_DEV',
        inject: !app.isPackaged,
      }],
    })
  }
  catch (error) {
    console.error(error)
    app.quit()
  }
}

bootstrap()
