/* eslint-disable no-console */

import Mock from 'mockjs'

const normalData = {
  code: 200,
  success: true,
  msg: '操作成功',
  response: ''
}
const json = {
  ...normalData,
  response: [
    {
      id: '1',
      name: '招聘需求',
      formKey: 'Recruitment',
      iconUrl: '',
      remark: '在中台产品的研发过程中，会出现不同的设计规范和实现方式...',
      sort: ''
    },
    {
      id: '2',
      name: '录用申请',
      formKey: 'PersonOfferApply',
      iconUrl: '',
      remark: '在中台产品的研发过程中，会出现不同的设计规范和实现方式...',
      sort: ''
    },
    {
      id: '3',
      name: '转正申请',
      formKey: 'UserFormalInfo',
      iconUrl: '',
      remark: '在中台产品的研发过程中，会出现不同的设计规范和实现方式...',
      sort: ''
    },
    {
      id: '4',
      name: '合同续签申请',
      formKey: 'UserContractInfo',
      iconUrl: '',
      remark: '在中台产品的研发过程中，会出现不同的设计规范和实现方式...',
      sort: ''
    },
    {
      id: '5',
      name: '离职申请',
      formKey: 'UserLeaveInfo',
      iconUrl: '',
      remark: '在中台产品的研发过程中，会出现不同的设计规范和实现方式...',
      sort: ''
    },
    {
      id: '6',
      name: '人事异动申请',
      formKey: 'UserChangeInfo',
      iconUrl: '',
      remark: '在中台产品的研发过程中，会出现不同的设计规范和实现方式...',
      sort: ''
    }
  ]
}
const approvalList = Mock.mock({
  ...normalData,
  response: {
    id: '150165',
    note: '合同流程',
    version: '1.0.0',
    nodes: [
      {
        id: '@increment',
        name: '部门主管',
        isStart: '0',
        isEnd: '0',
        parentId: '',
        childId: '',
        isEdit: false,
        users: []
      },
      {
        id: '@increment',
        name: '综合管理部',
        isStart: '0',
        isEnd: '0',
        parentId: '',
        childId: '',
        isEdit: false,
        users: [
          {
            id: '@increment',
            name: '@cname',
            workNo: '@increment'
          },
          {
            id: '@increment',
            name: '@cname',
            workNo: '@increment'
          },
          {
            id: '@increment',
            name: '@cname',
            workNo: '@increment'
          },
          {
            id: '@increment',
            name: '@cname',
            workNo: '@increment'
          }
        ]
      },
      {
        id: '@increment',
        name: '控股负责人',
        isStart: '0',
        isEnd: '0',
        parentId: '',
        childId: '',
        isEdit: false,
        users: [
          {
            id: '1',
            name: '@cname',
            workNo: '001'
          }
        ]
      },
      {
        id: '@increment',
        name: '总裁',
        isStart: '0',
        isEnd: '0',
        parentId: '',
        childId: '',
        isEdit: false,
        users: []
      }
    ]
  }
})

const success = {
  ...normalData,
  response: {}
}
export default ({ mock }) => {
  if (!mock) return
  Mock.mock(new RegExp('/appr/v1/appr/form' + '.*'), 'get', () => {
    return json
  })
  Mock.mock(new RegExp('/appr/v1/appr/process' + '.*'), 'get', () => {
    return approvalList
  })
  Mock.mock(new RegExp('/appr/v1/appr/process' + '.*'), 'post', () => {
    return success
  })
  Mock.mock(new RegExp('/appr/v1/appr/process' + '.*'), 'put', () => {
    return success
  })
  // *********************************************************************
  // 查询及筛选，调用接口：我发起的审批查询接口【GET /appr/v1/appr/my/approve/list】
  Mock.mock(new RegExp('/appr/v1/appr/my/approve/list' + '.*'), 'get', () => {
    let list = Mock.mock([
      {
        apprNo: '@integer(100000, 10000000000)',
        title: '@cparagraph(1, 2)',
        formKey: 'Recruitment',
        formId: '@integer(1, 100)',
        orgId: '@integer(1, 100)',
        orgName: '@ctitle(1,3)',
        userId: '@integer(1, 100)',
        userName: '@cname',
        jobId: '@integer(1, 100)',
        jobName: '@ctitle(1,3)',
        processId: '@integer(1, 100)',
        status: 'Approve',
        applyTime: '@date()',
        completeTime: '@date()',
        approveUser: '@integer(1, 100)',
        approveName: '@cname'
      },
      {
        apprNo: '@integer(100000, 10000000000)',
        title: '@cparagraph(1, 2)',
        formKey: 'PersonOfferApply',
        formId: '@integer(1, 100)',
        orgId: '@integer(1, 100)',
        orgName: '@ctitle(1,3)',
        userId: '@integer(1, 100)',
        userName: '@cname',
        jobId: '@integer(1, 100)',
        jobName: '@ctitle(1,3)',
        processId: '@integer(1, 100)',
        status: 'Approve',
        applyTime: '@date()',
        completeTime: '@date()',
        approveUser: '@integer(1, 100)',
        approveName: '@cname'
      },
      {
        apprNo: '@integer(100000, 10000000000)',
        title: '@cparagraph(1, 2)',
        formKey: 'UserFormalInfo',
        formId: '@integer(1, 100)',
        orgId: '@integer(1, 100)',
        orgName: '@ctitle(1,3)',
        userId: '@integer(1, 100)',
        userName: '@cname',
        jobId: '@integer(1, 100)',
        jobName: '@ctitle(1,3)',
        processId: '@integer(1, 100)',
        status: 'Approve',
        applyTime: '@date()',
        completeTime: '@date()',
        approveUser: '@integer(1, 100)',
        approveName: '@cname'
      },
      {
        apprNo: '@integer(100000, 10000000000)',
        title: '@cparagraph(1, 2)',
        formKey: 'UserContractInfo',
        formId: '@integer(100000, 10000000000)',
        orgId: '@integer(100000, 10000000000)',
        orgName: '@ctitle(1,3)',
        userId: '@integer(100000, 10000000000)',
        userName: '@cname',
        jobId: '@integer(100000, 10000000000)',
        jobName: '@ctitle(1,3)',
        processId: '@integer(100000, 10000000000)',
        status: 'Pass',
        applyTime: '@date()',
        completeTime: '@date()',
        approveUser: '@integer(100000, 10000000000)',
        approveName: '@cname'
      },
      {
        apprNo: '@integer(100000, 10000000000)',
        title: '@cparagraph(1, 2)',
        formKey: 'UserLeaveInfo',
        formId: '@integer(100000, 10000000000)',
        orgId: '@integer(100000, 10000000000)',
        orgName: '@ctitle(1,3)',
        userId: '@integer(100000, 10000000000)',
        userName: '@cname',
        jobId: '@integer(100000, 10000000000)',
        jobName: '@ctitle(1,3)',
        processId: '@integer(100000, 10000000000)',
        status: 'Reject',
        applyTime: '@date()',
        completeTime: '@date()',
        approveUser: '@integer(100000, 10000000000)',
        approveName: '@cname'
      },
      {
        apprNo: '@integer(100000, 10000000000)',
        title: '@cparagraph(1, 2)',
        formKey: 'UserChangeInfo',
        formId: '@integer(100000, 10000000000)',
        orgId: '@integer(100000, 10000000000)',
        orgName: '@ctitle(1,3)',
        userId: '@integer(100000, 10000000000)',
        userName: '@cname',
        jobId: '@integer(100000, 10000000000)',
        jobName: '@ctitle(1,3)',
        processId: '@integer(100000, 10000000000)',
        status: 'Cancel',
        applyTime: '@date()',
        completeTime: '@date()',
        approveUser: '@integer(100000, 10000000000)',
        approveName: '@cname'
      }
    ])

    return {
      response: {
        totalNum: 50,
        totalPage: 10,
        data: list
      }
    }
  })

  // 申请信息查询，调用接口：用户申请查询接口【GET /appr/v1/appr/apply/user】
  Mock.mock(new RegExp('/appr/v1/appr/apply/user' + '.*'), 'get', () => {
    let response = Mock.mock({
      id: '@integer(100000, 10000000000)',
      apprNo: '@integer(100000, 10000000000)',
      title: '@cparagraph(1, 2)',
      formKey: 'Recruitment',
      formId: '@integer(1, 100)',
      orgId: '@integer(1, 100)',
      processId: '@integer(1, 100)',
      // orgName: '@ctitle(1,3)',
      // processId: '@integer(1, 100)',
      status: 'Approve',
      userId: '@integer(1, 100)',
      userName: '@cname',
      jobId: '@integer(1, 100)',
      jobName: '@ctitle(1,3)',

      applyTime: '@date()',
      completeTime: '@date()',
      approveUser: '@integer(1, 100)',
      approveName: '@cname'
    })

    return {
      response
    }
  })

  // 招聘需求申请详情查询
  Mock.mock(new RegExp('/user/v1/recruitment/detail' + '.*'), 'get', () => {
    let response = Mock.mock({
      id: '@integer(100000, 10000000000)',
      orgId: '@integer(100000, 10000000000)',
      orgName: '部门名称',
      jobId: '@integer(100000, 10000000000)',
      jobName: '职位名称',
      positionId: '@integer(100000, 10000000000)',
      positionName: '岗位名称',
      //  workProperty: '工作性质，字典组：WorkProperty',
      workProperty: 'FullTime',
      // emerType: '紧急程度，字典组：EmerType',
      emerType: 'common',
      needNum: '需求人数123112',
      entryNum: '已入职人数21321',
      candidateNum: '候选人数213212',
      joinDate: '到岗日期1978-11-14',
      // workYear: '工作年限，字典组：WorkYear',
      workYear: 'Y02',
      // educationalLevel: '学历要求，字典组：EducationalLevel',
      educationalLevel: 'JuniorCollege',
      minSalary: '最低薪酬，单位：21321元',
      maxSalary: '最高薪酬，单位：2132132元',
      requirement: '职位要求',
      duty: '工作职责',
      // reason: '招聘原因，字典组：RecruitmentReason',
      reason: 'Organization4',
      reasonNote: '原因补充说明',
      remark: '申请理由',
      userId: '@integer(100000, 10000000000)',
      userName: '提交人姓名',
      companyId: '@integer(100000, 10000000000)',
      companyName: '公司名称'
    })

    return {
      response
    }
  })

  // 录用申请详情查询
  Mock.mock(new RegExp('/user/v1/candidate/offer/apply' + '.*'), 'get', () => {
    let response = Mock.mock({
      id: '申请ID',
      personId: '人员ID',
      entryDate: '预计入职日期',
      probation: '试用期，单位：月',
      companyId: '入职公司ID',
      companyName: '入职公司名称',
      orgId: '主部门ID',
      orgName: '部门名称',
      jobId: '主职位ID',
      jobName: '职位名称',
      positionId: '岗位ID',
      positionName: '岗位名称',
      // workProperty: '工作性质，字典组：WorkProperty',
      workProperty: 'FullTime',
      workAddressId: '工作地址ID',
      provinceCode: '省份编码',
      provinceName: '	省份名称',
      cityCode: '	地市编码',
      cityName: '	地市名称',
      countyCode: '区县编码',
      countyName: '区县名称',
      address: '详细地址',
      workProvinceCode: '工作省份编码',
      workProviceName: '工作省份名称',
      workCityCode: '工作地市编码',
      workCityName: '工作地市名称',
      probationSalary: '试用期月薪，单位：元',
      formalSalary: '转正月薪，单位：元',
      // contractType: '合同类型，字典组：ContractType',
      contractType: 'FixedTerm',
      contractBeginDate: '合同开始日期',
      contractEndDate: '合同结束日期',
      contractPeriod: '合同期限，单位：年',
      isShbx: '是否缴纳社会保险，1-是，0-否',
      baseMoney: '社会保险基数，单位：元',
      // isYangl: '是否缴纳养老保险，1-是，0-否',
      // isYil: '是否缴纳医疗保险，1-是，0-否',
      // isGs: '是否缴纳工伤保险，1-是，0-否	',
      // isShiy: '是否缴纳失业保险，1-是，0-否',
      // isShengy: '是否缴纳生育保险，1-是，0-否',
      // isGjj: '是否缴纳住房公积金，1-是，0-否',
      isYangl: '1',
      isYil: '1',
      isGs: '1	',
      isShiy: '1',
      isShengy: '1',
      // isGjj: '是否缴纳住房公积金，1-是，0-否',
      isGjj: '1',

      officeSpace: '办公位安排',
      telphone: '电话配备',
      // isComputer: '是否电脑配备，1-是，0-否',
      isComputer: '0',
      other: '其他',
      isHouse: '0',
      // isHouse: '是否安排住房，1-是，0-否',
      houseStandard: '住房标准',
      remark: '备注',
      userId: '提交人ID',
      userName: '提交人姓名'
    })

    return {
      response
    }
  })
  // 转正申请详情查询
  Mock.mock(new RegExp('/user/v1/user/formal/info' + '.*'), 'get', () => {
    let response = Mock.mock({
      id: '转正申请ID',
      userId: '用户ID',
      userName: '用户',
      summary: '试用期工作总结	',
      advise: '对公司的意见和建议	',
      entryDate: '入职日期，YYYY-MM-DD',
      formalDate: '转正日期，YYYY-MM-DD'
    })

    return {
      response
    }
  })
  // 员工合同续签申请查询
  Mock.mock(new RegExp('/user/v1/user/contract/apply' + '.*'), 'get', () => {
    let response = Mock.mock({
      id: '申请ID',
      userId: '用户ID',
      userName: '用户名称',
      code: '合同编号',
      name: '合同公司',
      // type: '合同类型，字典组：ContractType',
      type: 'Dispatch',
      beginDate: '合同开始日期',
      endDate: '合同结束日期',
      signDate: '签订合同日期',
      period: '合同期限，单位：年',
      remark: '备注'
    })

    return {
      response
    }
  })
  // 员工离职信息查询接口
  Mock.mock(new RegExp('/user/v1/user/leave/info' + '.*'), 'get', () => {
    let response = Mock.mock({
      id: '离职信息ID	',
      lastDate: '最后工作日期（预计离职日期）',
      applyDate: '申请离职日期（系统日期，同创建时间一样）',
      leaveDate: '实际离职日期',
      //   reason: '离职原因，字典组：LeaveReason',
      reason: 'A01',
      remark: '离职原因说明',
      userId: '用户ID	',
      userName: '用户名	'
    })

    return {
      response
    }
  })
  // 人事异动申请查询
  Mock.mock(new RegExp('/user/v1/user/change/info' + '.*'), 'get', () => {
    let response = Mock.mock({
      id: '申请ID',
      userId: '用户ID',
      userName: '用户名',
      type: 'Position',
      // type: '异动类型，Position-调岗，Up-晋升，Down-降级	',
      //   reason: '异动原因，字典组：ChangeReason	',
      reason: 'Downgrade02   ',
      companyId: '原公司ID',
      companyName: '原公司名称	',
      orgId: '原部门ID',
      orgName: '原部门名称',
      jobId: '原职位ID',
      jobName: '原职位名称',
      positionId: '原岗位ID	',
      positionName: '原岗位名称	',
      newCompanyId: '新公司ID',
      newCompanyName: '新公司名称	',
      newOrgId: '新部门ID	',
      newOrgName: '新部门名称	',
      newJobId: '新职位ID	',
      newJobName: '新职位名称	',
      newPositionId: '新岗位ID	',
      newPositionName: '新岗位名称	',
      effectDate: '生效日期	',
      remark: '备注	'
    })

    return {
      response
    }
  })

  // 流程进度和审批记录
  Mock.mock(new RegExp('/appr/v1/appr/apply/record' + '.*'), 'get', () => {
    // let list = Mock.mock([
    //   {
    //     id: '节点ID',
    //     name: '节点名称',
    //     isStart: '是否开始节点，1-是，0-否',
    //     isEnd: '是否结束节点，1-是，0-否',
    //     parentId: '父节点ID',
    //     childId: '子节点ID',
    //     isApprove: '是否审批节点，1-是，0-否（提交节点）',
    //     isUrge: '是否已催一下，1-是，0-否',
    //     urgeTime: '催促时间',
    //     userId: '审批人ID（或申请提交人）',
    //     userName: '审批人名称（或申请提交人）',
    //     jobId: '审批人职位ID（或申请提交人）',
    //     jobName: '审批人职位名称（或申请提交人）',
    //     approveTime: '审批时间（或申请提交时间）',
    //     result: '审批结果，Pass-通过，Reject-拒绝',
    //     remark: '备注，审批说明'
    //   },
    //   {
    //     id: '节点ID',
    //     name: '节点名称',
    //     isStart: '是否开始节点，1-是，0-否',
    //     isEnd: '是否结束节点，1-是，0-否',
    //     parentId: '父节点ID',
    //     childId: '子节点ID',
    //     isApprove: '是否审批节点，1-是，0-否（提交节点）',
    //     isUrge: '是否已催一下，1-是，0-否',
    //     urgeTime: '催促时间',
    //     userId: '审批人ID（或申请提交人）',
    //     userName: '审批人名称（或申请提交人）',
    //     jobId: '审批人职位ID（或申请提交人）',
    //     jobName: '审批人职位名称（或申请提交人）',
    //     approveTime: '审批时间（或申请提交时间）',
    //     result: '审批结果，Pass-通过，Reject-拒绝',
    //     remark: '备注，审批说明'
    //   },
    //   {
    //     id: '节点ID',
    //     name: '节点名称',
    //     isStart: '是否开始节点，1-是，0-否',
    //     isEnd: '是否结束节点，1-是，0-否',
    //     parentId: '父节点ID',
    //     childId: '子节点ID',
    //     isApprove: '是否审批节点，1-是，0-否（提交节点）',
    //     isUrge: '是否已催一下，1-是，0-否',
    //     urgeTime: '催促时间',
    //     userId: '审批人ID（或申请提交人）',
    //     userName: '审批人名称（或申请提交人）',
    //     jobId: '审批人职位ID（或申请提交人）',
    //     jobName: '审批人职位名称（或申请提交人）',
    //     approveTime: '审批时间（或申请提交时间）',
    //     result: '审批结果，Pass-通过，Reject-拒绝',
    //     remark: '备注，审批说明'
    //   }
    // ])
    let list = [
      {
        id: '102',
        name: '部门经理审核',
        isStart: 0,
        isEnd: 0,
        parentId: '101',
        childId: '103',
        isApprove: '1',
        isUrge: 0,
        urgeTime: '1997-11-28 21:43:11',
        userId: '99999999999999',
        userName: '权育经理',
        jobId: '99999999999999',
        jobName: '经理',
        approveTime: '2008-10-01 21:04:28',
        result: 'Pass',
        remark: '第三个'
      },
      {
        id: '103',
        name: '部门总裁审核',
        isStart: 0,
        isEnd: 1,
        parentId: '102',
        childId: '104',
        isApprove: '1',
        isUrge: 0,
        urgeTime: '1997-11-28 21:43:11',
        userId: '99999999999999',
        userName: '权育总裁',
        jobId: '99999999999999',
        jobName: '总裁',
        approveTime: '2008-10-01 21:04:28',
        result: 'Pass',
        remark: '第四个'
      },
      {
        id: '101',
        name: '部门主管审核',
        isStart: 0,
        isEnd: 0,
        parentId: '100',
        childId: '102',
        isApprove: '1',
        isUrge: 0,
        urgeTime: '1997-11-28 21:43:11',
        userId: '99999999999999',
        userName: '权育主管',
        jobId: '99999999999999',
        jobName: '主管',
        approveTime: '2008-10-01 21:04:28',
        result: 'Reject',
        remark: '第二个'
      },
      {
        id: '100',
        name: '提交用户申请',
        isStart: 1,
        isEnd: 0,
        parentId: '10',
        childId: '101',
        isApprove: '0',
        isUrge: 0,
        urgeTime: '1997-11-28 21:43:11',
        userId: '99999999999999',
        userName: '黄浩',
        jobId: '99999999999999',
        jobName: '测试员',
        approveTime: '2008-10-01 21:04:28',
        result: 'Pass',
        remark: '第一个'
      }
    ]
    return {
      response: list
    }
  })

  //
  // 审批申请撤销
  Mock.mock(new RegExp('/appr/v1/appr/apply/cancel' + '.*'), 'post', () => {
    return {
      response: 'ok'
    }
  })
  Mock.mock(new RegExp('/appr/v1/appr/apply/submit' + '.*'), 'post', (options) => {
    console.log('提交审批：', options.url, JSON.parse(options.body))
    return success
  })
}
