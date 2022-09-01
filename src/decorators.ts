import { DEFAULT_WIN_NAME, INJECTABLE, INJECT_NAME, INJECT_TYPE, IPC_HANDLE, IPC_ON, IPC_SEND, IPC_WIN_NAME, PARAMTYPES_METADATA } from './constants'

/**
 * Ipc handle decorator. It will be called by ipcRenderer.invoke
 *
 * ipcMain.handle --> @IpcHandle
 */
export function IpcHandle(channel: string): MethodDecorator {
  if (!channel)
    throw new Error('ipc handle channel is required')

  return (target, propertyName) => {
    Reflect.defineMetadata(IPC_HANDLE, channel, target, propertyName)
  }
}

/**
 * Ipc on decorator. It will be called by ipcRenderer.send/sendSync
 *
 * ipcMain.on --> @IpcOn
 */
export function IpcOn(channel: string): MethodDecorator {
  if (!channel)
    throw new Error('ipc on channel is required')

  return (target, propertyName) => {
    Reflect.defineMetadata(IPC_ON, channel, target, propertyName)
  }
}

/**
 * Ipc send decorator. The return value will be sent by the webContents of the specified window
 *
 * webContents.send --> @IpcSend
 */
export function IpcSend(channel: string, windowName: string = DEFAULT_WIN_NAME): MethodDecorator {
  if (!channel)
    throw new Error('ipc send channel is required')

  return (target, propertyName) => {
    Reflect.defineMetadata(IPC_SEND, channel, target, propertyName)
    Reflect.defineMetadata(IPC_WIN_NAME, windowName, target, propertyName)
  }
}

/**
 * Controller decorator, help to initialize controller
 */
export function Controller(): ClassDecorator {
  return (_) => {
    // do nothing
  }
}

/**
 * Injectable decorator, help to inject service
 */
export function Injectable(): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(INJECTABLE, INJECT_TYPE.CLASS, target)
  }
}

/**
 * Inject decorator, help to inject custom injectable item
 */
export function Inject(name: string): ParameterDecorator {
  if (!name)
    throw new Error('inject name is required')

  return (target, _, index) => {
    const param = Reflect.getMetadata(PARAMTYPES_METADATA, target)[index]
    Reflect.defineMetadata(INJECTABLE, INJECT_TYPE.CUSTOM, param)
    Reflect.defineMetadata(INJECT_NAME, name, param)
  }
}

/**
 * Window decorator, help to inject window
 */
export function Window(name = DEFAULT_WIN_NAME): ParameterDecorator {
  return (target, _, index) => {
    const param = Reflect.getMetadata(PARAMTYPES_METADATA, target)[index]
    Reflect.defineMetadata(INJECTABLE, INJECT_TYPE.WINDOW, param)
    Reflect.defineMetadata(INJECT_NAME, name, param)
  }
}
