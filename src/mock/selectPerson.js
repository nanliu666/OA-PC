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
const address = {
  ...normalData,
  response: [
    {
      id: 'Ta1I#v9',
      name: '蚂蚁',
      phonenum: '15000022121',
      provinceCode: '330000',
      provinceName: '浙江省',
      cityCode: '330100',
      cityName: '杭州市',
      countyCode: '330110',
      countyName: '余杭区',
      address: '文一西路969号'
    },
    {
      id: 'jyh(',
      name: 'QQ',
      phonenum: '13122221251'
      // provinceCode: '440000',
      // provinceName: '广东省',
      // cityCode: '440300',
      // cityName: '深圳市',
      // countyCode: '440305',
      // countyName: '南山区',
      // address: '高新科技园北区'
    }
  ]
}

export default ({ mock }) => {
  if (!mock) return
  Mock.mock(new RegExp('/user/v1/candidate/offer/apply' + '.*'), 'post', () => {
    return json
  })
  Mock.mock(new RegExp('/user/v1/candidate/offer/apply' + '.*'), 'post', () => {
    return json
  })
  Mock.mock(new RegExp('/user/v1/person/interview/addresss' + '.*'), 'get', () => {
    return address
  })
}
