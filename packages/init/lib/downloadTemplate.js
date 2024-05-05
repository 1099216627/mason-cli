import path from 'node:path'
import { pathExistsSync } from 'path-exists'
import fse from 'fs-extra'
import { execa } from 'execa'
import ora from 'ora'
import { log } from '@mason.com/utils'

function getCacheDir (targetPath) {
  // 判断缓存目录是否存在
  if (!pathExistsSync(targetPath)) {
    // 创建缓存目录
    fse.mkdirpSync(targetPath, {})
  }
}

// 创建缓存目录
function makeCacheDir (targetPath) {
  const cache = path.resolve(targetPath, 'node_modules')
  getCacheDir(cache)
}

// 拷贝模板到缓存目录
async function installTemplateToCache (targetPath, template) {
  const { npmName, version } = template
  // 安装模板
  const installCommand = 'npm'
  // 安装参数
  const installArgs = ['install', `${npmName}@${version}`]
  // 安装目录
  // 执行安装命令
  await execa(installCommand, installArgs, {
    cwd: targetPath
  })
}

export default async function downloadTemplate (templateInfo) {
  const { targetPath, template } = templateInfo
  // 创建缓存目录
  makeCacheDir(targetPath)
  const spinner = ora('正在下载模板...').start()
  // 下载模板
  try {
    // 拷贝模板到缓存目录
    await installTemplateToCache(targetPath, template)
    spinner.succeed('模板下载成功')
  } catch (error) {
    spinner.fail('模板下载失败')
    log.error(error)
  }
}
