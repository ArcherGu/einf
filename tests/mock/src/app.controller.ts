import { BrowserWindow, app } from 'electron'
import { Controller, Inject, IpcInvoke, IpcOn, Window } from '../../../dist'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(
    private appService: AppService,
    @Inject('IS_DEV') private isDev: boolean,
    @Window() private win: BrowserWindow,
  ) {
    setTimeout(() => {
      console.log(`Get window title: ${win.getTitle()}`)
      this.replyMsg(this.appService.createMsg('hello, this is the main process'))
    }, 2000)
  }

  @IpcOn('reply-msg')
  public replyMsg(msg: string) {
    return msg
  }

  @IpcInvoke('send-msg')
  public sendMsg(msg: string) {
    this.printLog(msg)
    return `main process received your message, current is run in ${this.isDev ? 'development' : 'production'} mode`
  }

  @IpcInvoke('print-log')
  printLog(log: string) {
    console.log(`Get log: ${log}`)
  }

  @IpcInvoke('exit')
  public exit() {
    app.quit()
  }
}
