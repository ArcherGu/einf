import { Injectable } from '../../../dist'

@Injectable()
export class AnotherService {
  public createAnotherMsg(msg: string): string {
    return `"${msg}" is created by another service`
  }
}
