// Modified from https://github.com/egoist/tsup/blob/main/src/log.ts
import * as colors from 'colorette'

type LOG_TYPE = 'info' | 'success' | 'error' | 'warn'

export function colorize(type: LOG_TYPE, data: any) {
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

export function makeLabel(name: string, type?: LOG_TYPE) {
  return `${colors.dim('[')}${type ? colorize(type, name) : name}${colors.dim(']')}`
}

export type Logger = ReturnType<typeof createLogger>

export function createLogger(name = 'Einf') {
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
      console.log(name && makeLabel(name), ...args)
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
          return console.error(
            name && makeLabel(name, type),
            ...data.map(item => colorize(type, item)),
          )
        }
        default:
          console.log(
            name && makeLabel(name, type),
            ...data.map(item => colorize(type, item)),
          )
      }
    },
  }
}
