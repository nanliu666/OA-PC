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
const approvalList = {
  ...normalData,
  response: {
    id: '150165',
    note: '合同流程',
    version: '1.0.0',
    nodes: [
      {
        id: '1',
        name: '部门主管',
        isStart: '0',
        isEnd: '0',
        parentId: '',
        childId: '',
        isEdit: false,
        users: []
      },
      {
        id: '2',
        name: '综合管理部',
        isStart: '0',
        isEnd: '0',
        parentId: '',
        childId: '',
        isEdit: false,
        users: []
      },
      {
        id: '3',
        name: '控股负责人',
        isStart: '0',
        isEnd: '0',
        parentId: '',
        childId: '',
        isEdit: false,
        users: []
      },
      {
        id: '4',
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
}
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
        formKey: 'Recruitment',
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
        formKey: 'Recruitment',
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
        formKey: 'Recruitment',
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
}
