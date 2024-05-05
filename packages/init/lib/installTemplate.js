import fse from 'fs-extra'
import path from 'path'
import ora from 'ora'
import { pathExistsSync } from 'path-exists'

// 获取原始文件目录
function getOriginFile (targetPath, template) {
  return path.resolve(targetPath, 'node_modules', template.npmName, 'template')
}

function copyTemplate (targetPath, template, installDir) {
  const originFile = getOriginFile(targetPath, template) // 获取原始文件目录
  // 读取文件列表
  const files = fse.readdirSync(originFile)
  // ora
  const spinner = ora('正在拷贝模板文件').start()
  // 遍历文件列表
  files.map(file =>
  // 拷贝文件
    fse.copySync(path.resolve(originFile, file), path.resolve(installDir, file))
  )
  // 复制完成
  spinner.succeed('模板文件拷贝完成')
  spinner.stop()
}

export default function installTemplate (selectedTemplate, opts) {
  const { force = false } = opts
  const { targetPath, name, template } = selectedTemplate
  // 获取当前工作目录
  const rootDir = process.cwd()
  // 判断目标目录是否存在
  fse.ensureDirSync(targetPath)
  const installDir = path.resolve(`${rootDir}/${name}`) // 安装目录
  // 安装目录存在时的操作
  if (pathExistsSync(installDir)) {
    // 是否强制安装
    if (!force) {
      throw new Error('当前目录已存在同名项目，请使用-f强制初始化项目')
    } else {
      fse.removeSync(installDir) // 删除已存在的项目
      fse.ensureDirSync(installDir) // 创建项目目录
    }
  } else {
    fse.ensureDirSync(installDir) // 创建项目目录
  }
  // 复制模板到安装目录
  copyTemplate(targetPath, template, installDir)
}
