import Mock from 'mockjs'
import mockData from '../views/processDesign/mockData'
import { Base64 } from 'js-base64'

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
const MockDate = {
  ...normalData,
  response: {
    processId: 'TjGL[8',
    icon: '4cm',
    processName: ')sij9X',
    categoryId: 'K7XF5',
    categoryName: 'OBG2',
    processVisible: [
      {
        type: 'ukL!)L',
        bizId: 'wO8!r3',
        bizName: 'bPbMCT'
      }
    ],
    processAdmin: [
      {
        userId: 'ycN8',
        userName: '@nx4JLm'
      }
    ],
    formKey: 'P(O9#',
    remark: 'C87]r',
    baseJson: Base64.encode(JSON.stringify(mockData)),
    approverDistinct: 675464232012760,
    approverNull: 8232155955641768,
    isOpinion: 560916241239676,
    tip: '^ec%'
  }
}

export default ({ mock }) => {
  if (!mock) return
  Mock.mock(new RegExp('/api/appr/v2/appr/config/admin' + '.*'), 'get', () => {
    return admin
  })
  Mock.mock(new RegExp('/api/appr/v2/appr/category' + '.*'), 'get', () => {
    return cateList
  })
  Mock.mock(new RegExp('/api/appr/v2/appr/process' + '.*'), 'post', () => {
    return normalData
  })
  Mock.mock(new RegExp('/api/appr/v2/appr/process' + '.*'), 'get', () => {
    return MockDate
  })
  // /api/appr/v2/appr/process
}
