import { Injectable } from '../../../dist/index.cjs'

@Injectable()
export class AnotherService {
  public createAnotherMsg(msg: string): string {
    return `"${msg}" is created by another service`
  }
}
