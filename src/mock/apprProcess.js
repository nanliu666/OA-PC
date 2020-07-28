/* eslint-disable no-console */
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
          processName: '入职申请1',
          sort: 1,
          icon: 'approval-invitation-bicolor',
          remark: '这里是入职申请的简介这里是入职申请的简介这里是入职申请的简介',
          visibleRange: 'all'
        },
        {
          processId: '4',
          processName: '入职申请2',
          sort: 1,
          icon: 'approval-invitation-bicolor',
          remark:
            '这里是入职申请的简介这里是入职申请的简介这里是入职申请的简介这里是入职申请的简介这里是入职申请的简介这里是入职申请的简介',
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
          processName: '入职申请3',
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
          processName: '入职申请4',
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
  //   用户申请详情查询接口
  Mock.mock(new RegExp('/appr/v2/appr/process/apply/detail' + '.*'), 'get', () => {
    let formData = []
    for (let i = 0; i < 10; i++) {
      formData.push(
        Mock.mock({
          'value|1-3': ['@cword(1, 2)'],
          prop: '@string( 2, 10)',
          label: '@cword(3, 5)'
        })
      )
    }
    let formDataJson = JSON.stringify(formData)
    let data = Mock.mock({
      apprNo: '@integer(1, 100)',
      'title|1': ['离职', '转正'],
      formKey: 'WcI5G',
      formId: '*VFUR',
      processInstanceId: '09w&A',
      orgId: '0gNs',
      processId: '%$bWzd5',
      'status|1': ['Approve', 'Pass', 'Reject', 'Cancel'],
      userId: 'BKLb#',
      userName: '@cname',
      jobId: 'SO%sO',
      jobName: 'Nw7zx9$',
      applyTime: '2013-03-10 08:42:38',
      completeTime: '2003-01-20 05:05:29',
      formData: formDataJson
    })
    return {
      response: data
    }
  })
  Mock.mock(new RegExp('/appr/v2/appr/apply/record' + '.*'), 'get', () => {
    let obj = Mock.mock({
      apprNo: '@integer(1, 100)',
      processId: '@integer(1, 100)',
      processInstanceId: '@integer(1, 100)'
    })
    let list = [
      {
        taskId: '23121214645',
        userId: '23121214645',
        userName: '黄浩',
        jobId: '23121214645',
        jobName: '经理',
        approveTime: '2004-10-23 18:26:45',
        result: '',
        remark: '2132'
      },
      {
        taskId: '23121214645',
        userId: '23121214645',
        userName: '权育',
        jobId: '23121214645',
        jobName: 'CEO',
        approveTime: '2004-10-23 18:26:45',
        result: 'Pass',
        remark: '2132'
      },
      {
        taskId: '23121214645',
        userId: '23121214645',
        userName: '姚鹏',
        jobId: '23121214645',
        jobName: '经理',
        approveTime: '2004-10-23 18:26:45',
        result: '',
        remark: '2132'
      },
      {
        taskId: '23121214645',
        userId: '23121214645',
        userName: '丁晨',
        jobId: '23121214645',
        jobName: '经理',
        approveTime: '2004-10-23 18:26:45',
        result: '',
        remark: '2132'
      },
      {
        taskId: '23121214645',
        userId: '23121214645',
        userName: '庾轮',
        jobId: '23121214645',
        jobName: '经理',
        approveTime: '2004-10-23 18:26:45',
        result: '',
        remark: '2132'
      }
    ]
    // for (let i = 0; i < 5; i++) {
    //   list.push(
    //     Mock.mock({
    //       taskId: '@integer(1, 100)',
    //       userId: '@integer(1, 100)',
    //       userName: '@cname',
    //       jobId: '@integer(1, 100)',
    //       'jobName|1': ['经理', 'ceo'],
    //       approveTime: '2004-10-23 18:26:45',
    //       'result|1': ['Pass', 'Reject', '', 'Cancel'],
    //       remark: '@ctitle(3,5)'
    //     })
    //   )
    // }

    return {
      response: {
        ...obj,
        data: list
      }
    }
  })
  //   撤销
  Mock.mock(new RegExp('/appr/v2/appr/apply/cancel' + '.*'), 'post', () => {
    return {
      response: 'ok'
    }
  })
  //   同意
  Mock.mock(new RegExp('/appr/v2/appr/apply/pass' + '.*'), 'post', () => {
    return {
      response: 'ok'
    }
  })
  //   拒绝
  Mock.mock(new RegExp('/appr/v2/appr/apply/reject' + '.*'), 'post', () => {
    return {
      response: 'ok'
    }
  })
  //   催一下
  Mock.mock(new RegExp('/appr/v2/appr/apply/urge' + '.*'), 'post', () => {
    return {
      response: 'ok'
    }
  })
  // 可发起的审批流程查询接口
  Mock.mock(new RegExp('/api/appr/v2/appr/user/process/list' + '.*'), 'get', () => {
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
}
