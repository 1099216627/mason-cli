import path from 'node:path'
import { program } from 'commander'
import { log } from '@mason.com/utils'
import semver from 'semver'
import chalk from 'chalk'
import { dirname } from 'dirname-filename-esm'
import fs from 'fs-extra'

let packageJson

// 符合esm规范的__dirname,获取当前文件所在目录
const __dirname = dirname(import.meta)
const packageJsonPath = path.resolve(__dirname, '../package.json')
packageJson = fs.readJsonSync(packageJsonPath)

// 对当前node版本进行检查
function checkNodeVersion () {
  const currentNodeVersion = process.version
  const lowestNodeVersion = packageJson.engines.node
  if (!semver.satisfies(currentNodeVersion, lowestNodeVersion)) {
    throw new Error(chalk.red(`mason-cli 需要安装 Node.js 版本 >= ${lowestNodeVersion} 请升级 Node.js 版本`))
  }
}

function preAction () {
  checkNodeVersion()
}

export default function createCLI () {
  const pkgName = Object.keys(packageJson.bin)[0]
  log.info('version', packageJson.version)

  program
    .name(pkgName)
    .usage('<command> [options]')
    .version(packageJson.version)
    .option('-d, --debug', 'output extra debugging', false)
    .option('-e, --env <env>', 'set env')
    .hook('preAction', preAction)

  program.on('command:*', function (operands) {
    const availableCommands = program.commands.map(cmd => cmd.name())
    log.error('error', `未知命令：${operands[0]}`)
    log.info('info', '可用命令：' + availableCommands.join(','))
  })
  program.on('option:debug', function () {
    console.log(program.opts())
    if (program.opts().debug) {
      log.verbose('debug', 'launch debug mode')
    }
  })

  return program
}
