import Mock from 'mockjs'

const normalData = {
  code: 200,
  success: true,
  msg: '操作成功',
  response: ''
}
// const json = {
//   ...normalData,
//   response: {}
// }
// const address = {
//   ...normalData,
//   response: [
//     {
//       id: 'Ta1I#v9',
//       name: '蚂蚁',
//       phonenum: '15000022121',
//       provinceCode: '330000',
//       provinceName: '浙江省',
//       cityCode: '330100',
//       cityName: '杭州市',
//       countyCode: '330110',
//       countyName: '余杭区',
//       address: '文一西路969号'
//     },
//     {
//       id: 'jyh(',
//       name: 'QQ',
//       phonenum: '13122221251'
//       // provinceCode: '440000',
//       // provinceName: '广东省',
//       // cityCode: '440300',
//       // cityName: '深圳市',
//       // countyCode: '440305',
//       // countyName: '南山区',
//       // address: '高新科技园北区'
//     }
//   ]
// }
const info = {
  ...normalData,
  response: {
    personId: '人员ID',
    name: '真实姓名',
    phonenum: '手机号',
    sex: 1,
    email: '个人邮箱',
    idType: 'IDCard',
    idNo: '证件号码',
    birthDate: '2020-07-16',
    educationalLevel: 'High',
    firstWorkDate: '2020-07-15',
    marriage: 1,
    health: '健康状态',
    nation: 'Han',
    politicalStatus: 'Ordinary',
    nativeProvinceCode: '440000',
    nativeProvinceName: '广东省',
    nativeCityCode: '440100',
    nativeCityName: '广州市',
    householdType: 'Urban',
    idAddress: '身份证地址',
    userAddress: '现住址',
    bankName: '开户银行名称',
    bankNo: '开户银行账号',
    isFirstSs: 1,
    ssNo: '个人社保号',
    isFirstEpf: 1,
    epfNo: '个人公积金账号',
    emer: [
      {
        id: '紧急联系人ID',
        name: '紧急联系人姓名',
        phone: '紧急联系人电话',
        relationship: 'Friend'
      }
    ],
    family: [
      {
        id: '家庭信息ID',
        name: '姓名',
        phone: '联系电话',
        relationship: 'Parent',
        age: '年龄',
        companyName: '工作单位',
        jobName: '职位'
      }
    ],
    education: [
      {
        id: '教育经历ID',
        beginDate: '2020-07-15',
        endDate: '2020-08-15',
        educationalLevel: 'High',
        educationalType: 'Self',
        schoolName: '学校名称',
        majorName: '专业名称'
      }
    ],
    work: [
      {
        id: '工作经历ID',
        beginWorkDate: '2018-07-15',
        endWorkDate: '2020-07-15',
        companyName: '在职单位名称',
        jobName: '职位名称',
        salary: '15000',
        witnessName: '证明人名称',
        witnessPhone: '证明人电话',
        isSecret: '1',
        beginSecretDate: '遵守义务开始日期',
        endSecretDate: '遵守义务截止日期',
        content: '具体内容'
      }
    ],
    train: [
      {
        id: '培训经历ID',
        beginDate: '2018-07-15',
        endDate: '2020-07-15',
        name: '培训课程名称',
        companyName: '培训机构名称'
      }
    ],
    certificate: [
      {
        id: '资格证书ID',
        name: '证书名称',
        code: '证书编号',
        companyName: '发证机构名称',
        issueDate: '2018-07-15'
      }
    ],
    attachment: [
      {
        id: '附件ID',
        categoryId: '附件分类ID',
        name: '附件名称',
        url: '附件URL地址'
      }
    ]
  }
}

export default ({ mock }) => {
  if (!mock) return
  // Mock.mock(new RegExp('/user/v1/person/interview/addresss' + '.*'), 'get', () => {
  //   return address
  // })
  // Mock.mock(new RegExp('/user/v1/person/interview/addresss' + '.*'), 'post', () => {
  //   return json
  // })
  // Mock.mock(new RegExp('/user/v1/person/interview/addresss' + '.*'), 'put', () => {
  //   return json
  // })
  // Mock.mock(new RegExp('/user/v1/person/interview/addresss' + '.*'), 'delete', () => {
  //   return json
  // })
  // Mock.mock(new RegExp('/user/v1/person/interview/send' + '.*'), 'post', () => {
  //   return json
  // })
  // Mock.mock(new RegExp('/user/v1/interview/register/send' + '.*'), 'post', () => {
  //   return json
  // })
  Mock.mock(new RegExp('/helper/v1/person/info' + '.*'), 'get', () => {
    return info
  })
  // /helper/v1/person/info
}
