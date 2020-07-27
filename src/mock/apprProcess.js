/* eslint-disable no-console */

const totalNum = _.random(11, 99)
const totalPage = Math.ceil(totalNum / 10)

// 解析查询字符串
const urlDecode = (url) =>
  _.fromPairs(
    _.replace(url, /^[^?]*\?/, '')
      .split('&')
      .map((p) => p.split('=').map((p) => decodeURIComponent(p)))
  )

import Mock from 'mockjs'
const normalData = {
  code: 200,
  success: true,
  msg: '操作成功',
  response: ''
}
const processListData = {
  ...normalData,
  response: [
    {
      id: 0,
      name: '人事审批',
      sort: 1,
      processes: [
        {
          processId: '1',
          processName: '入职申请',
          sort: 1,
          icon: 'approval-invitation-bicolor',
          remark: '这里是入职申请的简介这里是入职申请的简介这里是入职申请的简介',
          visibleRange: 'all'
        },
        {
          processId: '2',
          processName: '转正申请',
          sort: 1,
          icon: 'approval-checkin-bicolor',
          remark: '',
          visibleRange: 'all'
        },
        {
          processId: '3',
          processName: '离职申请',
          sort: 1,
          icon: 'approval-leaveoffice-bicolor',
          remark: '这里是离职申请的简介',
          visibleRange: 'all'
        }
      ]
    },
    {
      id: 1,
      name: '业务审批',
      sort: 1,
      processes: [
        {
          processId: '1',
          processName: '入职申请',
          sort: 1,
          icon: 'approval-invitation-bicolor',
          remark: '这里是入职申请的简介这里是入职申请的简介这里是入职申请的简介',
          visibleRange: 'all'
        }
      ]
    },
    {
      id: 2,
      name: '行政审批',
      sort: 1,
      processes: [
        {
          processId: '1',
          processName: '入职申请',
          sort: 1,
          icon: 'approval-invitation-bicolor',
          remark: '这里是入职申请的简介这里是入职申请的简介这里是入职申请的简介',
          visibleRange: 'all'
        }
      ]
    },
    {
      id: 3,
      name: '财务审批',
      sort: 1,
      processes: [
        {
          processId: '1',
          processName: '入职申请',
          sort: 1,
          icon: 'approval-invitation-bicolor',
          remark: '这里是入职申请的简介这里是入职申请的简介这里是入职申请的简介',
          visibleRange: 'all'
        }
      ]
    },
    {
      id: 30,
      name: '考勤审批',
      sort: 1,
      processes: [
        // {
        //   processId: '1',
        //   processName: '入职申请',
        //   sort: 1,
        //   icon: 1,
        //   remark: '这里是入职申请的简介',
        //   visibleRange: 'all'
        // }
      ]
    }
  ]
}
const categoryData = {
  ...normalData
}
const draftData = {
  ...normalData,
  response: [
    {
      id: 30,
      name: '未启用',
      sort: 1,
      processes: [
        {
          processId: '1',
          processName: '用印申请',
          status: 0,
          icon: 'approval-Seal-bicolor',
          remark: '这里是入职申请的简介',
          visibleRange: 'all'
        },
        {
          processId: '1',
          processName: '调岗申请',
          status: 1,
          icon: 'approval-Seal-bicolor',
          remark: '这里是入职申请的简介',
          visibleRange: 'all'
        }
      ]
    }
  ]
}
const groupData = {
  ...normalData,
  response: [
    {
      id: 1,
      name: '人事审批',
      sort: 1
    },
    {
      id: 30,
      name: '考勤审批',
      sort: 1
    }
  ]
}
export default ({ mock }) => {
  if (!mock) return
  // v2版本接口
  // 审批列表查询，调用接口：审批流程列表查询接口【GET /appr/v2/appr/process/list】
  Mock.mock(new RegExp('/api/appr/v2/appr/process/list' + '.*'), 'get', () => {
    return processListData
  })
  // 审批分组新建接口
  Mock.mock(new RegExp('/api/appr/v2/appr/category' + '.*'), 'post', () => {
    return categoryData
  })
  // 审批分组修改接口
  Mock.mock(new RegExp('/api/appr/v2/appr/category' + '.*'), 'put', () => {
    return categoryData
  })
  // 审批分组删除接口
  Mock.mock(new RegExp('/api/appr/v2/appr/category' + '.*'), 'delete', () => {
    return categoryData
  })
  // 审批流程删除接口
  Mock.mock(new RegExp('/api/appr/v2/appr/process/del' + '.*'), 'delete', () => {
    return categoryData
  })
  // 审批流程停用接口
  Mock.mock(new RegExp('/api/appr/v2/appr/process/stop' + '.*'), 'post', () => {
    return categoryData
  })
  // 未启用审批流程列表查询接口
  Mock.mock(new RegExp('/api/appr/v2/appr/process/draft/list' + '.*'), 'get', () => {
    return draftData
  })
  // 审批分组查询接口
  Mock.mock(new RegExp('/api/appr/v2/appr/category' + '.*'), 'get', () => {
    return groupData
  })
  // 审批流程移动接口
  Mock.mock(new RegExp('/api/appr/v2/appr/process/move' + '.*'), 'post', () => {
    return categoryData
  })
  // 审批流程启用接口
  Mock.mock(new RegExp('/api/appr/v2/appr/process/start' + '.*'), 'post', () => {
    return categoryData
  })
  // 审批流程启用接口
  Mock.mock(new RegExp('/api/appr/v2/appr/process/release' + '.*'), 'post', () => {
    return categoryData
  })
  // 审批分组排序接口
  Mock.mock(new RegExp('/api/appr/v2/appr/category/sort' + '.*'), 'post', () => {
    return categoryData
  })
  // 审批流程排序接口
  Mock.mock(new RegExp('/api/appr/v2/appr/process/sort' + '.*'), 'post', () => {
    return categoryData
  })

  // 审批记录列表
  Mock.mock(new RegExp('/appr/v2/appr/approve/record/list' + '.*'), 'get', (req) => {
    const { pageNo } = urlDecode(req.url)

    const response = {
      totalNum,
      totalPage,
      data: _.times(pageNo < totalPage ? 10 : totalNum % 10, () =>
        Mock.mock({
          apprNo: '@id()',
          title: '@ctitle()',
          formKey: '@id()',
          formId: '@id()',
          orgId: '@id()',
          orgName: '@cword(4)',
          userId: '@id()',
          userName: '@cname()',
          jobId: '@id()',
          jobName: '@cword()岗',
          processId: '@id()',
          processName: '@cword(2)流程',
          'status|1': ['Approve', 'Pass', 'Reject', 'Cancel'],
          applyTime: '@datetime()',
          completeTime: '@datetime()',
          approveUser: _.times(_.random(3), () => ({
            userId: '@id()',
            userName: '@cname()'
          }))
        })
      )
    }
    const res = {
      resCode: 200,
      resMsg: '成功',
      response
    }
    window.console.debug(`${req.type} ${req.url}`, { req, res })
    return res
  })
}
