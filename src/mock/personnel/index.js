import Mock from 'mockjs'

const EmerType = ['Super', 'urgent', 'common', 'suit']
const EducationalLevel = [
  'Primary',
  'Juniormiddle',
  'High',
  'JuniorCollege',
  'Undergraduate',
  'Master',
  'Doctor',
  'PostDoctoral',
  'VocationalHigh',
  'SecondarySpecialized',
  'Technical',
  'SecondaryNormal',
  'Other'
]

// 解析查询字符串
const urlDecode = (url) =>
  _.fromPairs(
    _.replace(url, /^[^?]*\?/, '')
      .split('&')
      .map((p) => p.split('=').map((p) => decodeURIComponent(p)))
  )

// emun 工作性质列表
const WORK_PROPERTY_LIST = [
  'FullTime',
  'Trainee',
  'PartTime',
  'Labor',
  'FullTime',
  'LaborOutsourcing'
]

const workAddress = {
  resCode: 200,
  resMsg: '',
  response: {
    totalNum: -6513384773192480,
    totalPage: 5838632650963572,
    data: [
      {
        id: 'Cws!m',
        provinceCode: '140000',
        provinceName: '山西省',
        cityCode: '140500',
        cityName: '晋城市',
        countyCode: '140502',
        countyName: '7h6HE',
        address: 'jE)T!E'
      },
      {
        id: 'Lf%Cnw',
        provinceCode: '440000',
        provinceName: '广东省',
        cityCode: '440100',
        cityName: '广州市',
        countyCode: '440103',
        countyName: '4^VDL',
        address: 's[Dlwc'
      }
    ]
  }
}

export default ({ mock }) => {
  if (!mock) return
  //获取附件分类接口数据
  Mock.mock(new RegExp('/user/v1/user/attachment/category' + '.*'), 'get', () => {
    let list = []
    for (let i = 0; i < 10; i++) {
      list.push(
        Mock.mock({
          id: '@increment',
          name: '@cname',
          iconUrl: 'el-icon-picture-outline',
          maxLimit: '2',
          'type|1': ['员工基本资料', '员工档案资料'],
          sort: '0'
        })
      )
    }
    return {
      response: {
        data: list
      }
    }
  })
  //获取附件接口数据
  Mock.mock(new RegExp('user/v1/user/attachment/info' + '.*'), 'get', () => {
    let list = []
    for (let i = 0; i < 5; i++) {
      list.push(
        Mock.mock({
          id: '@increment',
          userId: '@increment',
          name: '@cname',
          'url|1': [
            `https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2
            /thumbnail/360x360/format/webp/quality/100`,
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          ],
          categoryId: '555',
          updateTime: '454548784112',
          createTime: '454548784112'
        })
      )
    }
    return {
      response: {
        data: list
      }
    }
  })

  Mock.mock(new RegExp('/api/user/v1/user/work/address' + '.*'), 'get', () => {
    return workAddress
  })

  Mock.mock(new RegExp('/api/user/v1/user/list' + '.*'), 'post', () => {
    const userList = {
      resCode: 200,
      resMsg: '',
      response: {
        totalNum: 2788916,
        totalPage: 4039344649382640,
        data: [
          {
            userId: 'AZq@Sz',
            workNo: 'f9ecu1!',
            name: '(UV',
            orgId: 'PX!#',
            orgName: 'HWjG@k',
            jobId: 'aZib9g',
            jobName: 'CF(',
            positionId: 'cwtrYk',
            positionName: 'NF2cwK',
            status: 'Try',
            entryDate: '1981-10-27',
            phonenum: 'Q0@)mR',
            leaveDate: '1970-05-17',
            leaveReason: '!cZFO6p',
            tags: [
              {
                tagId: 'ZSe)9',
                tagName: 'GURY'
              }
            ]
          },
          {
            userId: 'QYkNm',
            workNo: '[ZtTgR',
            name: '2k@G!8',
            orgId: 'Bkf',
            orgName: 'mfIP1',
            jobId: '6W4acm',
            jobName: '9QdEgg',
            positionId: 'bRW#e3',
            positionName: '[d*1',
            status: 'Formal',
            entryDate: '1975-11-26',
            phonenum: 'FRYq&@h',
            leaveDate: '2006-05-31',
            leaveReason: '2#(SC*',
            tags: [
              {
                tagId: '0Cbm',
                tagName: 'Wuz['
              }
            ]
          },
          {
            userId: 'kEd#',
            workNo: '3#!',
            name: '3JKu[',
            orgId: 'IZrsd',
            orgName: '3V[3x(L',
            jobId: 'YcB&!o',
            jobName: 'zioM',
            positionId: 'fyMSBP',
            positionName: 'D*1',
            status: 'Leaved',
            entryDate: '2010-11-17',
            phonenum: 'QTEDP!',
            leaveDate: '1991-10-11',
            leaveReason: 'eOn',
            tags: [
              {
                tagId: 'e*SW',
                tagName: '8%*w'
              }
            ]
          },
          {
            userId: 'Soz[',
            workNo: 'H7[',
            name: 'qH#)p',
            orgId: 'V^W',
            orgName: 'VQC',
            jobId: 'VDkRz',
            jobName: 'b!sdWS',
            positionId: 'Dr@gxc^',
            positionName: 'Wvi(#',
            status: 'WaitLeave',
            entryDate: '2005-12-28',
            phonenum: 'd#@TE',
            leaveDate: '1981-04-30',
            leaveReason: ']pd36%',
            tags: [
              {
                tagId: 'K4S)D',
                tagName: '21gGu'
              }
            ]
          }
        ]
      }
    }
    return userList
  })

  Mock.mock(new RegExp('/api/user/v1/user/status/stat' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: [
        {
          status: 'Try',
          statusNum: 1231
        },
        {
          status: 'Formal',
          statusNum: 1564
        },
        {
          status: 'Leaved',
          statusNum: 135122
        },
        {
          status: 'WaitLeave',
          statusNum: 15
        }
      ]
    }
  })
  Mock.mock(new RegExp('/api/org/v1/position/define' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: [
        {
          id: 'J4D4O',
          name: 'oj%25'
        }
      ]
    }
  })
  Mock.mock(new RegExp('/api/org/v1/job/list' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: [
        {
          jobId: 'rutwR',
          jobName: 'JlgJv$'
        }
      ]
    }
  })
  Mock.mock(new RegExp('/api/org/v1/organization/company' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: [
        {
          orgId: '!xoLp',
          orgName: '$1BG9',
          orgType: 'fq&'
        }
      ]
    }
  })
  Mock.mock(new RegExp('/api/org/v1/organization/tree' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: [
        {
          orgId: '0',
          orgName: '#EH6o',
          orgType: '%*Mz',
          sort: -8008198835721628,
          children: [
            {
              orgId: 'ZFRQ',
              orgName: 'y4CE',
              orgType: 'RcV(z',
              sort: -1569808853743480,
              children: []
            }
          ]
        }
      ]
    }
  })
  Mock.mock(new RegExp('/api/user/v1/user/workno' + '.*'), 'get', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {
        workNo: '1234'
      }
    }
  })
  Mock.mock(new RegExp('/api/user/v1/user/info/check' + '.*'), 'post', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {}
    }
  })
  Mock.mock(new RegExp('/api/user/v1/user/info' + '.*'), 'post', () => {
    return {
      resCode: 200,
      resMsg: '',
      response: {}
    }
  })

  // 制造转正管理接口
  Mock.mock(new RegExp('/user/v1/user/formal/list' + '.*'), 'post', () => {
    let list = []
    for (let i = 0; i < 12; i++) {
      list.push(
        Mock.mock({
          userId: 'GZ@increment',
          personId: 'GZ@increment',
          name: '@cname',
          approvalNo: 'GZ@increment',
          status: `${i / 2 == 0 ? '已驳回' : '申请中'}`,
          workNo: 'GZ@increment',
          jobName: '测试员工@increment',
          orgName: '百利宏',
          formalDate: Mock.Random.date(),
          entryDate: Mock.Random.date(),
          probation: '3个月',
          adjustment: '调整时间'
        })
      )
    }
    return {
      resCode: 200,
      resMsg: '',
      response: {
        totalNum: 12,
        totalPage: 12,
        data: list
      }
    }
  })

  //转正申请接口
  Mock.mock(new RegExp('/user/v1/user/formal/info' + '.*'), 'post', () => {
    const operationList = {
      resCode: 200,
      resMsg: '申请成功',
      response: {}
    }
    return operationList
  })

  Mock.mock(new RegExp('/user/v1/user/formal/probation' + '.*'), 'put', () => {
    const probationList = {
      resCode: 200,
      resMsg: '申请成功',
      response: {}
    }
    return probationList
  })

  // 全部招聘需求筛选接口
  Mock.mock(new RegExp('/user/v1/recruitment/all/list' + '.*'), 'post', () => {
    let list = []
    for (let i = 0; i < 18; i++) {
      list.push(
        Mock.mock({
          id: 'ZP-@increment',
          orgId: 'GZ@increment',
          orgName: '百利宏',
          jobId: 'SZ@increment',
          jobName: '测试员工-@increment',
          positionId: '岗位测试-@increment',
          positionName: '经理-@increment',
          // 调用字典组
          '': 'full-time',
          // 调用字典组
          'emerType|1': EmerType,
          needNum: function() {
            return this.entryNum + _.random(50)
          },
          entryNum: '@integer(1, 100)',
          candidateNum: '@integer(1, 100)',
          joinDate: '@date()',
          // 调用字典组
          workYear: '年-@increment',
          // 调用字典组
          educationalLevel: '本科',
          minSalary: '@integer(5000, 10000)',
          maxSalary: '@integer(8000, 13000)',
          requirement: '测试全职-@increment',
          duty: '测试开发项目-@increment',
          userId: 'kenko',
          userName: '@cname()',
          'status|1': ['Handled', 'UnHandle']
        })
      )
    }
    const recruitList = {
      resCode: 200,
      resMsg: '申请成功',
      response: {
        totalNum: 12,
        totalPage: 12,
        data: list
      }
    }
    return recruitList
  })

  Mock.mock(new RegExp('/user/v1/recruitment/submit/list' + '.*'), 'post', (req) => {
    let list = []
    for (let i = 0; i < 12; i++) {
      list.push(
        Mock.mock({
          id: 'ZP-@increment',
          orgId: 'GZ@increment',
          orgName: '百利宏',
          jobId: 'SZ@increment',
          jobName: '测试员工-@increment',
          positionId: '岗位测试-@increment',
          positionName: '经理-@increment',
          // 调用字典组
          'workProperty|1': WORK_PROPERTY_LIST,
          // 调用字典组
          'emerType|1': EmerType,
          needNum: '@integer(1, 100)',
          entryNum: '@integer(1, 100)',
          candidateNum: '@integer(1, 100)',
          joinDate: '@date()',
          // 调用字典组
          workYear: '年-@increment',
          // 调用字典组
          educationalLevel: '本科',
          minSalary: '@integer(5000, 10000)',
          maxSalary: '@integer(8000, 13000)',
          // 调用字典组 招聘原因
          reason: 'RecruitmentReason',
          reasonNote: '测试-详细招聘原因-@increment',
          remark: '测试-申请理由@increment',
          requirement: '测试全职-@increment',
          duty: '测试开发项目-@increment',
          userId: 'kenko',
          // userName: '@cname',
          'progress|1': ['Approved', 'Finished'],
          'status|1': ['UnHandle', 'Handled']
        })
      )
    }
    const res = {
      resCode: 200,
      resMsg: '申请成功',
      response: {
        totalNum: 12,
        totalPage: 12,
        data: list
      }
    }
    window.console.debug(`${req.type} ${req.url}`, { req, res })
    return res
  })

  // 我提交的招聘需求筛选接口
  Mock.mock(new RegExp('/user/v1/recruitment/my/list' + '.*'), 'post', (req) => {
    let list = []
    for (let i = 0; i < 12; i++) {
      list.push(
        Mock.mock({
          id: 'ZP-@increment',
          orgId: 'GZ@increment',
          orgName: '百利宏',
          jobId: 'SZ@increment',
          jobName: '测试员工-@increment',
          positionId: '岗位测试-@increment',
          positionName: '经理-@increment',
          // 调用字典组
          'workProperty|1': WORK_PROPERTY_LIST,
          // 调用字典组
          'emerType|1': EmerType,
          needNum: '@integer(1, 100)',
          entryNum: '@integer(1, 100)',
          candidateNum: '@integer(1, 100)',
          joinDate: '@date()',
          // 调用字典组
          workYear: '年-@increment',
          // 调用字典组
          educationalLevel: 'EducationalLevel',
          minSalary: 'integer(5000, 10000)',
          maxSalary: 'integer(8000, 13000)',
          // 调用字典组 招聘原因
          reason: 'RecruitmentReason',
          reasonNote: '测试-详细招聘原因-@increment',
          remark: '测试-申请理由@increment',
          requirement: '测试全职-@increment',
          duty: '测试开发项目-@increment',
          userId: 'kenko',
          userName: '@cname',
          createTime: '@date()'
        })
      )
    }
    const res = {
      resCode: 200,
      resMsg: '申请成功',
      response: {
        totalNum: 12,
        totalPage: 12,
        data: list
      }
    }
    window.console.debug(`${req.type} ${req.url}`, { req, res })
    return res
  })

  // 我提交的招聘需求筛选接口
  Mock.mock(new RegExp('/user/v1/recruitment/task' + '.*'), 'put', () => {
    const taskList = {
      resCode: 200,
      resMsg: '申请成功',
      response: {}
    }
    return taskList
  })

  // 招聘需求详情页面
  Mock.mock(new RegExp('/user/v1/recruitment/task' + '.*'), 'get', (req) => {
    const { recruitmentId } = urlDecode(req.url)
    const res = Mock.mock({
      resCode: 200,
      resMsg: '申请成功',
      response: _.times(3, () => ({
        id: recruitmentId,
        userId: /\d{5}/,
        workNo: /\d{3}/,
        name: '@cname()',
        taskNum: '@integer(0,99)',
        entryNum: '@integer(0,10)',
        candidateNum: '@integer(0,99)'
      }))
    })
    window.console.debug(`${req.type} ${req.url}`, { req, res })
    return res
  })

  // 我提交的招聘需求筛选接口
  Mock.mock(new RegExp('/user/v1/recruitment/detail' + '.*'), 'get', (req) => {
    const response = Mock.mock({
      id: '@integer(10000000000, 20000000000)',
      orgId: '@integer(10000000000, 20000000000)',
      orgName: '@integer(0, 1)',
      jobId: '@integer(1, 100)',
      jobName: '@email',
      positionId: '@integer(0, 1)',
      positionName: 'Vm[Z',
      'workProperty|1': WORK_PROPERTY_LIST,
      'emerType|1': EmerType,
      needNum: '@integer(1, 100)',
      entryNum: '@integer(1, 100)',
      candidateNum: '@integer(1, 100)',
      joinDate: '@date()',
      workYear: '年-@increment',
      educationalLevel: '本科',
      minSalary: '@integer(5000, 10000)',
      maxSalary: '@integer(8000, 13000)',
      requirement: '测试全职-@increment',
      duty: '测试开发项目-@increment',
      reason: 'RecruitmentReason',
      reasonNote: '测试-详细招聘原因-@increment',
      remark: '测试-申请理由@increment',
      userId: 'FmF',
      userName: '1R2)@W',
      companyId: '',
      companyName: '',
      'progress|1': ['Approved', 'Finished'],
      'status|1': ['UnHandle', 'Handled'],
      createTime: '454548784112',
      stopUserId: 'FmF',
      stopUserName: '@cname()',
      stopReason: '@cword(5)',
      stopTime: '454548784112'
    })
    const res = {
      resCode: 200,
      resMsg: '申请成功',
      response
    }
    window.console.debug(`${req.type} ${req.url}`, { req, res })
    return res
  })

  //全部招聘需求审批筛选接口
  Mock.mock(new RegExp('/appr/v1/recruitment/approve/list' + '.*'), 'get', (req) => {
    let list = []
    for (let i = 0; i < 12; i++) {
      list.push(
        Mock.mock({
          id: '@integer(10000000000, 20000000000)',
          apprNo: '@cname',
          orgId: '@integer(10000000000, 20000000000)',
          orgName: '@integer(0, 1)',
          jobId: '@integer(1, 100)',
          jobName: '@email',
          positionId: '@integer(0, 1)',
          positionName: 'Vm[Z',
          userId: 'FmF',
          userName: '1R2)@W',
          status: 'F6z7tql',
          applyTime: 'Primary',
          completeTime: 'RH92',
          formKey: 'X[RRQ',
          formId: '@integer(0, 45)'
        })
      )
    }
    const res = {
      resCode: 200,
      resMsg: '申请成功',
      response: {
        totalNum: 12,
        totalPage: 12,
        data: list
      }
    }
    window.console.debug(`${req.type} ${req.url}`, { req, res })
    return res
  })

  // 提交修改申请接口 （对应修改人数）
  Mock.mock(new RegExp('/user/v1/recruitment/change/num' + '.*'), 'post', (req) => {
    const res = {
      resCode: 200,
      resMsg: '申请成功',
      response: {
        id: '1270332900294000642'
      }
    }
    window.console.debug(`${req.type} ${req.url}`, { req, res })
    return res
  })

  Mock.mock(new RegExp('/user/v1/recruitment/stop' + '.*'), 'post', (req) => {
    const res = {
      resCode: 200,
      resMsg: '操作成功',
      response: {}
    }
    window.console.debug(`${req.type} ${req.url}`, { req, res })
    return res
  })

  Mock.mock(new RegExp('/user/v1/recruitment/user/lis' + '.*'), 'get', (req) => {
    const response = _.times(_.random(10), () =>
      Mock.mock({
        userId: '@id()',
        name: '@cname()',
        phonenum: /1\d{10}/,
        email: '@email()',
        workAge: _.random(1, 99),
        university: '@cword(2,6)大学',
        'educationalLevel|1': EducationalLevel,
        tags: [
          {
            tagId: '',
            name: '',
            color: ''
          }
        ]
      })
    )
    const res = {
      resCode: 200,
      resMsg: '成功',
      response
    }

    window.console.debug(`${req.type} ${req.url}`, { req, res })
    return res
  })
}
