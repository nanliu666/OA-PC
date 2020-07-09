/**
 * 人事提醒页面mock
 */

import { mock } from 'mockjs'

const COMMON_RESPONSE = {
  resCode: 200,
  resMsg: ''
}

export default (config) => {
  if (!config.mock) return

  mock(new RegExp('/user/v1/personnel/remind/set' + '.*'), 'get', () => {
    const response = []

    for (let i = 0; i < 3; i++) {
      response.push(
        mock({
          'type|1': ['Recruitment', 'Entry', 'Leave'],
          userId: '@guid()',
          name: '@cname()',
          workNo: '@increment()'
        })
      )
    }

    const res = {
      ...COMMON_RESPONSE,
      response
    }
    window.console.debug('get /user/v1/personnel/remind/set', { res })
    return res
  })

  mock(new RegExp('/user/v1/personnel/remind/set' + '.*'), 'post', (req) => {
    const response = []
    const res = {
      ...COMMON_RESPONSE,
      response
    }
    window.console.debug('post /user/v1/personnel/remind/set', { req, res })
    return res
  })
}
