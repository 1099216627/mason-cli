#!/usr/bin/env node

import importLocal from 'import-local'
import { log } from '@mason.com/utils'
import entry from '../lib/index.js' // 引入入口文件
import { filename } from 'dirname-filename-esm'

const __filename = filename(import.meta)

if (importLocal(__filename)) {
  log.info('cli', '正在使用本地版本')
} else {
  // 启动入口文件
  entry()
}
