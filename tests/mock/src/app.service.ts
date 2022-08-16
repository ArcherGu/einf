import { Injectable } from '../../../dist'

@Injectable()
export class AppService {
  public createMsg(msg: string): string {
    return `"${msg}" is created by app service`
  }
}
