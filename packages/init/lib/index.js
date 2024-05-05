import Command from '@mason.com/command'
import createTemplate from './createTemplate.js'
import downloadTemplate from './downloadTemplate.js'
import installTemplate from './installTemplate.js'

class InitCommand extends Command {
  get command () {
    return 'init [name]'
  }

  get description () {
    return 'init project'
  }

  get options () {
    return [
      ['-f, --force', '强制初始化项目', false],
      ['-t,--type <type>', '初始化项目类型(project/page)'],
      ['-p,--template <value>', '初始化项目模板']
    ]
  }

  async action ([name, opts]) {
    // 选择项目模板，生成项目信息
    const template = await createTemplate(name, opts)
    // 下载模板到缓存目录
    await downloadTemplate(template)
    // 安装模板到项目目录
    installTemplate(template, opts)
  }
}

function createInitCommand (program) {
  return new InitCommand(program)
}

export default createInitCommand
