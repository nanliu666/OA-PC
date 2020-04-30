import * as qiniu from 'qiniu-js'
import { getQiniuToken } from '../api/common'
import uuidv4 from 'uuid/v4'
import store from 'src/store'
/**
 * 上传文件到七牛
 * 参考：https://developer.qiniu.com/kodo/sdk/1283/javascript
 * @param file
 * @param hooks {Object} 钩子函数
 * @param hooks.next {Function}
 * @param hooks.error {Function}
 * @param hooks.complete {Function}
 */
export async function uploadQiniu(file, hooks) {
  const suffix = file.name.substr(file.name.lastIndexOf('.'))
  const fileName = uuidv4().replace(/-/g, '') + suffix
  const params = {
    userId: store.getters.userId || undefined,
    companyId: store.getters.companyId || undefined,
    fileName
  }
  const config = {
    useCdnDomain: true
  }

  // 获取token
  const { uploadToken, domain } = await getQiniuToken(params)
  debugger
  const observable = qiniu.upload(file, fileName, uploadToken, config, {
    fname: fileName
  })
  // 注册上传监听
  observable.subscribe(hooks.next, hooks.error, (res) => {
    // 上传完成时触发
    hooks.complete({
      ...res,
      url: domain + '/' + res.key,
      fileName
    })
  })
}
