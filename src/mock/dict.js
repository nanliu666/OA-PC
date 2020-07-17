import Mock from 'mockjs'

// TODO: 只有部分字典
const STATIC_DICTIONARY_MAP = {
  EmerType: [
    {
      id: '1123598814738777398',
      createTime: '',
      parentId: '1123598814738777397',
      code: 'EmerType',
      dictKey: 'Super',
      dictValue: '特级',
      sort: 1,
      remark: '特级',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777399',
      createTime: '',
      parentId: '1123598814738777397',
      code: 'EmerType',
      dictKey: 'urgent',
      dictValue: '急',
      sort: 2,
      remark: '急',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777400',
      createTime: '',
      parentId: '1123598814738777397',
      code: 'EmerType',
      dictKey: 'common',
      dictValue: '一般',
      sort: 3,
      remark: '一般',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777401',
      createTime: '',
      parentId: '1123598814738777397',
      code: 'EmerType',
      dictKey: 'suit',
      dictValue: '有合适的人选再进',
      sort: 4,
      remark: '有合适的人选再进',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    }
  ],
  sex: [
    {
      id: '1123598814738777321',
      createTime: '',
      parentId: '1123598814738777300',
      code: 'sex',
      dictKey: '0',
      dictValue: '男',
      sort: 1,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777301',
      createTime: '',
      parentId: '1123598814738777300',
      code: 'sex',
      dictKey: '1',
      dictValue: '女',
      sort: 2,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    }
  ],
  RecruitmentChannel: [
    {
      id: '1123598814738777329',
      createTime: '',
      parentId: '1123598814738777328',
      code: 'RecruitmentChannel',
      dictKey: '1',
      dictValue: '前程无忧',
      sort: 1,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777330',
      createTime: '',
      parentId: '1123598814738777328',
      code: 'RecruitmentChannel',
      dictKey: '2',
      dictValue: '智联招聘',
      sort: 2,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777331',
      createTime: '',
      parentId: '1123598814738777328',
      code: 'RecruitmentChannel',
      dictKey: '3',
      dictValue: '拉勾网',
      sort: 3,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777332',
      createTime: '',
      parentId: '1123598814738777328',
      code: 'RecruitmentChannel',
      dictKey: '4',
      dictValue: '猎聘网',
      sort: 4,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777333',
      createTime: '',
      parentId: '1123598814738777328',
      code: 'RecruitmentChannel',
      dictKey: '5',
      dictValue: '中国人才热线',
      sort: 5,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777334',
      createTime: '',
      parentId: '1123598814738777328',
      code: 'RecruitmentChannel',
      dictKey: '6',
      dictValue: '58同城',
      sort: 6,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777335',
      createTime: '',
      parentId: '1123598814738777328',
      code: 'RecruitmentChannel',
      dictKey: '7',
      dictValue: 'BOSS直聘',
      sort: 7,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777336',
      createTime: '',
      parentId: '1123598814738777328',
      code: 'RecruitmentChannel',
      dictKey: '8',
      dictValue: '内部举荐',
      sort: 8,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777337',
      createTime: '',
      parentId: '1123598814738777328',
      code: 'RecruitmentChannel',
      dictKey: '9',
      dictValue: '员工推荐',
      sort: 9,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777338',
      createTime: '',
      parentId: '1123598814738777328',
      code: 'RecruitmentChannel',
      dictKey: '10',
      dictValue: '微信招聘',
      sort: 10,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777339',
      createTime: '',
      parentId: '1123598814738777328',
      code: 'RecruitmentChannel',
      dictKey: '11',
      dictValue: '中华英才网',
      sort: 11,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777340',
      createTime: '',
      parentId: '1123598814738777328',
      code: 'RecruitmentChannel',
      dictKey: '12',
      dictValue: '大街网',
      sort: 12,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777341',
      createTime: '',
      parentId: '1123598814738777328',
      code: 'RecruitmentChannel',
      dictKey: '13',
      dictValue: '赶集网',
      sort: 13,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777342',
      createTime: '',
      parentId: '1123598814738777328',
      code: 'RecruitmentChannel',
      dictKey: '14',
      dictValue: '其他',
      sort: 14,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    }
  ],
  EducationalLevel: [
    {
      id: '1123598814738777296',
      createTime: '',
      parentId: '1123598814738777295',
      code: 'EducationalLevel',
      dictKey: 'Primary',
      dictValue: '小学',
      sort: 1,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777297',
      createTime: '',
      parentId: '1123598814738777295',
      code: 'EducationalLevel',
      dictKey: 'Juniormiddle',
      dictValue: '初中',
      sort: 2,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777298',
      createTime: '',
      parentId: '1123598814738777295',
      code: 'EducationalLevel',
      dictKey: 'High',
      dictValue: '高中',
      sort: 3,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777299',
      createTime: '',
      parentId: '1123598814738777295',
      code: 'EducationalLevel',
      dictKey: 'JuniorCollege',
      dictValue: '大专',
      sort: 4,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777300',
      createTime: '',
      parentId: '1123598814738777295',
      code: 'EducationalLevel',
      dictKey: 'Undergraduate',
      dictValue: '本科',
      sort: 5,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777301',
      createTime: '',
      parentId: '1123598814738777295',
      code: 'EducationalLevel',
      dictKey: 'Master',
      dictValue: '硕士',
      sort: 6,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777302',
      createTime: '',
      parentId: '1123598814738777295',
      code: 'EducationalLevel',
      dictKey: 'Doctor',
      dictValue: '博士',
      sort: 7,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777303',
      createTime: '',
      parentId: '1123598814738777295',
      code: 'EducationalLevel',
      dictKey: 'PostDoctoral',
      dictValue: '博士后',
      sort: 8,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777304',
      createTime: '',
      parentId: '1123598814738777295',
      code: 'EducationalLevel',
      dictKey: 'VocationalHigh',
      dictValue: '职高',
      sort: 9,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777305',
      createTime: '',
      parentId: '1123598814738777295',
      code: 'EducationalLevel',
      dictKey: 'SecondarySpecialized',
      dictValue: '中专',
      sort: 10,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777306',
      createTime: '',
      parentId: '1123598814738777295',
      code: 'EducationalLevel',
      dictKey: 'Technical',
      dictValue: '技校',
      sort: 11,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777307',
      createTime: '',
      parentId: '1123598814738777295',
      code: 'EducationalLevel',
      dictKey: 'SecondaryNormal',
      dictValue: '中等师范学校',
      sort: 12,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777308',
      createTime: '',
      parentId: '1123598814738777295',
      code: 'EducationalLevel',
      dictKey: 'Other',
      dictValue: '其他',
      sort: 13,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    }
  ],
  WorkYear: [
    {
      id: '1123598814738777403',
      createTime: '',
      parentId: '1123598814738777402',
      code: 'WorkYear',
      dictKey: 'Unlimit',
      dictValue: '不限',
      sort: 1,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777404',
      createTime: '',
      parentId: '1123598814738777402',
      code: 'WorkYear',
      dictKey: 'Y01',
      dictValue: '1年以下',
      sort: 2,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777405',
      createTime: '',
      parentId: '1123598814738777402',
      code: 'WorkYear',
      dictKey: 'Y02',
      dictValue: '1年-3年',
      sort: 3,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777406',
      createTime: '',
      parentId: '1123598814738777402',
      code: 'WorkYear',
      dictKey: 'Y03',
      dictValue: '3年-5年',
      sort: 4,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777407',
      createTime: '',
      parentId: '1123598814738777402',
      code: 'WorkYear',
      dictKey: 'Y04',
      dictValue: '5年-10年',
      sort: 5,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777408',
      createTime: '',
      parentId: '1123598814738777402',
      code: 'WorkYear',
      dictKey: 'Y05',
      dictValue: '10年以上',
      sort: 6,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    }
  ],
  RecruitmentReason: [
    {
      id: '1123598814738777410',
      createTime: '',
      parentId: '1123598814738777409',
      code: 'RecruitmentReason',
      dictKey: 'Organization1',
      dictValue: '年度内编制',
      sort: 1,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777411',
      createTime: '',
      parentId: '1123598814738777409',
      code: 'RecruitmentReason',
      dictKey: 'Organization2',
      dictValue: '原有编制离职',
      sort: 2,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777412',
      createTime: '',
      parentId: '1123598814738777409',
      code: 'RecruitmentReason',
      dictKey: 'Organization3',
      dictValue: '原有编制缺额',
      sort: 3,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777413',
      createTime: '',
      parentId: '1123598814738777409',
      code: 'RecruitmentReason',
      dictKey: 'Organization4',
      dictValue: '新增编制',
      sort: 4,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777414',
      createTime: '',
      parentId: '1123598814738777409',
      code: 'RecruitmentReason',
      dictKey: 'Other',
      dictValue: '其他',
      sort: 5,
      remark: '',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    }
  ],
  emerType: [
    {
      id: '1123598814738777398',
      createTime: '',
      parentId: '1123598814738777397',
      code: 'EmerType',
      dictKey: 'Super',
      dictValue: '特级',
      sort: 1,
      remark: '特级',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777399',
      createTime: '',
      parentId: '1123598814738777397',
      code: 'EmerType',
      dictKey: 'urgent',
      dictValue: '急',
      sort: 2,
      remark: '急',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777400',
      createTime: '',
      parentId: '1123598814738777397',
      code: 'EmerType',
      dictKey: 'common',
      dictValue: '一般',
      sort: 3,
      remark: '一般',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    },
    {
      id: '1123598814738777401',
      createTime: '',
      parentId: '1123598814738777397',
      code: 'EmerType',
      dictKey: 'suit',
      dictValue: '有合适的人选再进',
      sort: 4,
      remark: '有合适的人选再进',
      isSealed: 0,
      isDeleted: 0,
      updateTime: ''
    }
  ]
}

export default ({ mock }) => {
  if (!mock) return

  //获取表格数据
  Mock.mock(new RegExp('/api/sys/v1/dict/list' + '.*'), 'get', () => {
    let list = []
    for (let i = 0; i < 5; i++) {
      list.push(
        Mock.mock({
          id: '@increment',
          parentId: '@increment',
          code: '@string( 2, 10)',
          dictValue: '@cword( 2, 10)',
          dictKey: '@string( 2, 10)',
          sort: '@increment',
          isSealed: '@integer(0, 1)',
          createTime: '@date',
          updateTime: '@date'
        })
      )
    }
    return {
      resCode: 200,
      resMsg: '描述',
      response: {
        totalNum: 5,
        totalPage: 5,
        data: list
      }
    }
  })

  // 字典code查询接口
  Mock.mock(new RegExp('/api/blade-system/v1/dict/code' + '.*'), 'get', (req) => {
    const querys = new URLSearchParams(_.replace(req.url, /^[^?]*\?/, ''))
    const code = querys.get('code')

    const res = Mock.mock({
      resCode: 200,
      resMsg: '成功',
      response: _.get(STATIC_DICTIONARY_MAP, code, [])
    })
    window.console.debug(`${req.type} ${req.url}`, { req, res })
    return res
  })
}
