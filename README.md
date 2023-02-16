<p align="center">
    <img width="250" src="./Einf.png" alt="Einf logo">
</p>

<p align="center">
A simple electron main process framework.
<p>

<p align="center">
  <a href="https://npm.im/mono-release" target="_blank">
    <img src="https://img.shields.io/npm/v/einf?style=flat-square" alt="NPM Version">
  </a>
  <a href="https://npm.im/mono-release" target="_blank">
    <img src="https://img.shields.io/npm/dw/einf?style=flat-square" alt="NPM Downloads">
  </a>
  <a href="https://github.com/ArcherGu/einf/actions/workflows/ci.yml" target="_blank">
    <img src="https://img.shields.io/github/actions/workflow/status/ArcherGu/einf/ci.yml?style=flat-square" alt="Workflow Status">
  </a>
<p>

## Description

Einf is a simple electron main process framework, which provides some decorators and automatic dependency injection to help you simplify the main process code.

## Features

- 💉‍ Support dependency injection powered by Typescript decorators.

- 🪟 Support custom items injection and window object injection.

- 🔗 Automatic ipc channel binding to reduce duplication of code.

- 📦 Tiny size, the whole framework is less than 10kb.

- 💡 Simple to use, you can use it as a base framework to build your own framework.

## Installation

```shell
npm i einf
# Or Yarn
yarn add einf
# Or PNPM
pnpm add einf
```

## Usage

Entry point of your electron application like `index.ts`: 

```ts
import { BrowserWindow, app } from 'electron'
import { createEinf } from 'einf'
import { AppController } from './app.controller'

async function bootstrap() {
  const window = new BrowserWindow()
  window.loadURL('https://github.com')

  await createEinf({
    // window to create
    window,
    // controllers will be automatically initialized
    controllers: [AppController],
    // custom items to inject
    injects: [{
      name: 'IS_DEV',
      inject: !app.isPackaged,
    }],
  })
}

bootstrap()
```

Provide at least one controller to start the application, `app.controller.ts`:

```ts
import type { BrowserWindow } from 'electron'
import { app } from 'electron'
import { Controller, Inject, IpcHandle, IpcSend, Window } from 'einf'
import type { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(
    private appService: AppService,
    @Inject('IS_DEV') private isDev: boolean,
    @Window() private win: BrowserWindow,
  ) {}

  @IpcSend('reply-msg')
  public replyMsg(msg: string) {
    return msg
  }

  @IpcHandle('send-msg')
  public sendMsg(msg: string) {
    console.log(msg)
    return 'Get msg'
  }

  @IpcHandle('exit')
  public exit() {
    app.quit()
  }
}
```

You can also inject service via `@Injectable` decorator, `app.service.ts`:

```ts
import { Injectable } from 'einf'

@Injectable()
export class AppService {
  public createMsg(msg: string): string {
    return `"${msg}" is created by app service`
  }
}
```

## License

MIT License © 2022 [Archer Gu](https://github.com/archergu)