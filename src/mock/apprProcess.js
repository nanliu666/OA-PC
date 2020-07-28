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
      id: 30,
      name: '人事审批',
      sort: 1,
      processes: [
        {
          processId: '1',
          processName: '入职申请',
          sort: 1,
          icon: 'approval-invitation-bicolor',
          remark: '这里是入职申请的简介',
          visibleRange: 'all'
        },
        {
          processId: '1',
          processName: '转正申请',
          sort: 1,
          icon: 'approval-checkin-bicolor',
          remark: '这里是转正申请的简介',
          visibleRange: 'all'
        },
        {
          processId: '1',
          processName: '离职申请',
          sort: 1,
          icon: 'approval-leaveoffice-bicolor',
          remark: '这里是离职申请的简介',
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

export default ({ mock }) => {
  if (!mock) return
  // v2版本接口
  // 审批列表查询，调用接口：审批流程列表查询接口【GET /appr/v2/appr/process/list】
  Mock.mock(new RegExp('/appr/v2/appr/process/list' + '.*'), 'get', () => {
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
}
