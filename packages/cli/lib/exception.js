import { isDebug, log } from '@mason.com/utils'

// 打印错误日志
function printErrorLog (e, type) {
  if (isDebug()) {
    log.error(type, e)
  } else {
    log.error(type, e.message)
  }
}

process.on('uncaughtException', (e) => printErrorLog(e, 'error'))

process.on('unhandledRejection', (e) => printErrorLog(e, 'promise'))
