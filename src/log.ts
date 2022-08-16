// Modified from https://github.com/egoist/tsup/blob/main/src/log.ts
import * as colors from 'colorette'

type LOG_TYPE = 'info' | 'success' | 'error' | 'warn'

export const colorize = (type: LOG_TYPE, data: any) => {
  const color
    = type === 'info'
      ? 'blue'
      : type === 'error'
        ? 'red'
        : type === 'warn'
          ? 'yellow'
          : 'green'
  return colors[color](data)
}

export type Logger = ReturnType<typeof createLogger>

export const createLogger = () => {
  return {
    success(...args: any[]) {
      return this.print('success', ...args)
    },

    info(...args: any[]) {
      return this.print('info', ...args)
    },

    error(...args: any[]) {
      return this.print('error', ...args)
    },

    warn(...args: any[]) {
      return this.print('warn', ...args)
    },

    log(...args: any[]) {
      console.log(...args)
    },

    break() {
      console.log('\n')
    },

    print(
      type: 'info' | 'success' | 'error' | 'warn',
      ...data: unknown[]
    ) {
      switch (type) {
        case 'error': {
          return console.log(
            ...data.map(item => colorize(type, item)),
          )
        }
        default:
          console.log(
            ...data.map(item => colorize(type, item)),
          )
      }
    },
  }
}
