import inquirer from 'inquirer'

function makePrompt ({
  choices,
  defaultValue,
  message = '请选择初始化类型',
  type = 'list',
  require = true,
  mask = '*',
  validate,
  pageSize,
  loop
}) {
  const options = {
    name: 'name',
    default: defaultValue,
    message,
    type,
    require,
    mask,
    validate,
    pageSize,
    loop
  }
  if (type === 'list') {
    options.choices = choices
  }
  return inquirer.prompt(options).then(answer => answer.name)
}

// 判断文本不能为空或者为空格
export function validateEmpty (input) {
  if (!input || !input.trim()) {
    return '文本不能为空或者为空格'
  }
  return true
}

export function makeList (params) {
  return makePrompt({ ...params })
}

export function makeInput (params) {
  return makePrompt({ ...params, type: 'input' })
}
