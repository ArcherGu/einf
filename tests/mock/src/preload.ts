import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld(
  'electron',
  {
    sendMsg: (msg: string): Promise<string> => ipcRenderer.invoke('send-msg', msg),
    throwError: (): Promise<void> => ipcRenderer.invoke('error'),
    printLog: (log: string): void => ipcRenderer.send('print-log', log),
    onReplyMsg: (cb: (msg: string) => any) => ipcRenderer.on('reply-msg', (_, msg: string) => cb(msg)),
    exit: (): Promise<void> => ipcRenderer.invoke('exit'),
  },
)
