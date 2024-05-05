import urlJoin from 'url-join'
import axios from 'axios'
import log from './log.js'

function getNpmRegistry () {
  return 'https://registry.npmjs.org'
}

export async function getNpmInfo (npmName) {
  const registry = getNpmRegistry()
  const npmInfoUrl = urlJoin(registry, npmName)
  try {
    const res = await axios.get(npmInfoUrl)
    if (res.status === 200) {
      return res.data
    }
    return null
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function getLatestVersion (npmName) {
  const data = await getNpmInfo(npmName)
  if (!data || !data['dist-tags'] || !data['dist-tags'].latest) {
    log.error('获取最新版本号失败')
    return Promise.reject('获取最新版本号失败')
  }
  return data['dist-tags'].latest
}
