import Mock from 'mockjs'

const normalData = {
  code: 200,
  success: true,
  msg: '操作成功',
  response: ''
}
const json = {
  ...normalData,
  response: {}
}

export default ({ mock }) => {
  if (!mock) return
  Mock.mock(new RegExp('/user/v1/candidate/offer/apply' + '.*'), 'post', () => {
    return json
  })
}
