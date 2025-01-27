import { app, BrowserWindow } from 'electron'
import { Controller, Inject, IpcHandle, IpcOn, IpcSend, Window } from '../../../dist'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(
    private appService: AppService,
    @Inject('IS_DEV') private isDev: boolean,
    @Window() private win: BrowserWindow,
  ) {
    win.setTitle('Einf Test')
    console.log(`Get window title: ${win.getTitle()}`)
    setTimeout(() => {
      this.replyMsg(this.appService.createMsg('hello, this is the main process'))
    }, 2000)
  }

  @IpcSend('reply-msg')
  public replyMsg(msg: string) {
    return msg
  }

  @IpcHandle('send-msg')
  public sendMsg(msg: string) {
    this.printLog(msg)
    return `main process received your message, current is run in ${this.isDev ? 'development' : 'production'} mode`
  }

  @IpcHandle('send-another-msg')
  public sendAnotherMsg(msg: string) {
    this.printLog(msg)
    return `main process received your message, and this is another message: ${this.appService.createAnotherMsg(msg)}`
  }

  @IpcHandle('error')
  public throwError() {
    throw new Error('This is an error from ipc channel')
  }

  @IpcOn('print-log')
  printLog(log: string) {
    console.log(`Get log: ${log}`)
  }

  @IpcHandle('exit')
  public exit() {
    app.quit()
  }
}
