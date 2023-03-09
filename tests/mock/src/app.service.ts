import { Injectable } from '../../../dist'
import { AnotherService } from './another.service'

@Injectable()
export class AppService {
  constructor(private anotherService: AnotherService) {
    // do something
  }

  public createMsg(msg: string): string {
    return `"${msg}" is created by app service`
  }

  public createAnotherMsg(msg: string): string {
    return this.anotherService.createAnotherMsg(msg)
  }
}
