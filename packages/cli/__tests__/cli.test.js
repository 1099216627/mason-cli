import {execa} from 'execa'
import path from 'node:path'

const CLI = path.join(__dirname, '../bin/cli.js')
const bin = () => (...args) => execa(CLI, args)

test('run error command', async function () {
  // 获取错误运行的结果
  const {stderr} = await bin()('error')
  expect(stderr).toContain('未知命令：error')
})

// 测试help命令不会报错
test('run help command', async function () {
  let error = null
  try {
    await bin()('--help')
  } catch (e) {
    error = e
  }
  expect(error).toBe(null)
})

// 测试version命令不会报错
test('run version command', async function () {
  const {stdout} = await bin()('--version')
  expect(stdout).toContain(require('../package.json').version)
})

// 测试debug命令不会报错
test('run debug command', async function () {
  let error = null
  try {
    await bin()('--debug')
  } catch (e) {
    error = e
  }
  expect(error.message).toContain('launch debug mode')
})
