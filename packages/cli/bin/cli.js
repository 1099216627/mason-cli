#!/usr/bin/env node

const importLocal = require('import-local');
const { log } = require('@mason.com/utils');
const entry = require('../lib/index.js');// 引入入口文件
const process = require('process');

// ! 这里需要更改
if (importLocal(__filename)) {
    log.info('cli', '正在使用本地版本');
} else {
    // 启动入口文件
    entry(process.argv.slice(2)); // 传入参数
}
