import { contextBridge, ipcRenderer } from 'electron'
import type { IpcResponse } from '../../../dist'

contextBridge.exposeInMainWorld(
  'electron',
  {
    sendMsg: (msg: string): Promise<IpcResponse<string>> => ipcRenderer.invoke('send-msg', msg),
    printLog: (log: string): Promise<IpcResponse<string>> => ipcRenderer.invoke('print-log', log),
    onReplyMsg: (cb: (msg: string) => any) => ipcRenderer.on('reply-msg', (_, msg: string) => cb(msg)),
    exit: (): Promise<IpcResponse<any>> => ipcRenderer.invoke('exit'),
  },
)
