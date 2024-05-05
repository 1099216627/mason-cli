import { homedir } from 'node:os'
import path from 'node:path'
import { getLatestVersion, log, makeInput, makeList, validateEmpty } from '@mason.com/utils'

const ADD_TYPE_PROJECT = 'project'
const ADD_TYPE_PAGE = 'page'
const CACHE_PATH = '.mason-cli'

// 模板的相关信息
const ADD_TEMPLATE = [
  {
    name: 'vue3项目模板',
    npmName: '@mason.com/template-vue',
    value: 'template-vue3',
    version: '1.0.0'
  },
  {
    name: 'react项目模板',
    value: 'template-react',
    npmName: '@mason.com/template-react',
    version: '1.0.0'
  }
]

const ADD_TYPE = [
  {
    name: '项目',
    value: ADD_TYPE_PROJECT
  },
  {
    name: '页面',
    value: ADD_TYPE_PAGE
  }
]

// 获取创建模板类型
function getAddType () {
  return makeList({
    choices: ADD_TYPE,
    message: '请选择初始化类型',
    defaultValue: ADD_TYPE_PROJECT
  })
}

// 获取创建模板名称
function getAddName (name) {
  return makeInput({
    message: '请输入初始化名称',
    defaultValue: '',
    validate: validateEmpty
  }
  )
}

// 获取项目模板
function getAddTemplate () {
  return makeList({
    choices: ADD_TEMPLATE,
    message: '请选择模板',
    defaultValue: ADD_TEMPLATE[0].value
  })
}

// 获取模板缓存目录
function getTargetPath () {
  // 获取用户主目录
  const homePath = homedir()
  // 拼接模板缓存目录
  return path.resolve(`${homePath}/${CACHE_PATH}`, 'addTemplate')
}

// 是否存在该模板
function hasTemplate (template) {
  return ADD_TEMPLATE.find(item => item.value === template)
}

export default async function createTemplate (name, opts) {
  const { template, type } = opts
  // 通过非交互式命令创建模板
  let addName, addTemplate, addType
  if (!type || (type !== 'project' && type !== 'page')) {
    log.warning(`项目类型${type}不存在，请选择正确的初始化类型`)
    addType = await getAddType()
  } else {
    addType = type
  }

  if (addType === ADD_TYPE_PROJECT) {
    addName = name || await getAddName(name)
    const findTemplate = hasTemplate(template)
    if (template && findTemplate) {
      addTemplate = template
    } else {
      addTemplate = await getAddTemplate()
    }
    // 获取选择的模板信息
    const selectedTemplate = ADD_TEMPLATE.find(item => item.value === addTemplate)
    if (!selectedTemplate) {
      throw new Error(`项目类型${addTemplate}不存在`)
    }
    // 获取最新版本号
    selectedTemplate.version = await getLatestVersion(selectedTemplate.npmName)
    // 获取模板缓存目录
    const targetPath = getTargetPath()
    return {
      type: addType,
      name: addName,
      template: selectedTemplate,
      targetPath
    }
  }
}
