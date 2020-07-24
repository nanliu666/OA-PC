import Mock from 'mockjs'

const normalData = {
  code: 200,
  success: true,
  msg: '操作成功',
  response: ''
}

const cateList = {
  ...normalData,
  response: [
    { name: '伍迪', id: '1283677855282483201', sort: 1 },
    { name: '康熙', id: '1283964376698880001', sort: 2 },
    { name: '刘邦', id: '1285052219373830146', sort: 3 },
    { name: '王华丽', id: '1285403261257699330', sort: 4 },
    { name: '王华冲', id: '1285511325751226370', sort: 5 }
  ]
}
const admin = {
  ...normalData,
  response: [
    { userName: '西贝', userId: '1285514923583266817' },
    { userName: '李小龙', userId: '1285518000080068610' }
  ]
}
export default ({ mock }) => {
  if (!mock) return
  Mock.mock(new RegExp('/api/appr/v2/appr/config/admin' + '.*'), 'get', () => {
    return admin
  })
  Mock.mock(new RegExp('/api/appr/v2/appr/category' + '.*'), 'get', () => {
    return cateList
  })
}
