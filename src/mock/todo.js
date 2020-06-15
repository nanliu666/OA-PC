/* eslint-disable no-console */

import Mock from 'mockjs'
export default ({ mock }) => {
  if (!mock) return

  //获取表格数据
  Mock.mock(new RegExp('/api/task/v1/todo/list' + '.*'), 'get', (options) => {
    console.log(options.url, JSON.parse(options.body))
    let list = []
    for (let i = 0; i < 10; i++) {
      list.push(
        Mock.mock({
          id: '@increment',
          title: '@csentence',
          'type|1': [
            'Approve',
            'Recruitment',
            'ResumeReview',
            'Interview',
            'InterviewRegister',
            'Entry',
            'EntryRegister',
            'LeaveList',
            'Leave'
          ],
          bizId: '@increment',
          createTime: '@date',
          startDate: '@date',
          endDate: '@date'
        })
      )
    }
    return {
      response: {
        totalNum: 50,
        totalPage: 5,
        data: list
      }
    }
  })
  Mock.mock(new RegExp('/api/user/v1/person/resume/check' + '.*'), 'get', (options) => {
    console.log(options.url, JSON.parse(options.body))
    return {
      response: Mock.mock({
        id: '@increment',
        title: '@csentence',
        'status|1': ['UnCheck', 'Pass', 'Reject', 'Cancel'],
        checkName: '@cname',
        checkRemark: '@csentence',
        checkTime: '@date',
        personId: '1271038384256966657',
        reason: '@csentence',
        pushName: '@cname',
        pushRemark: '@csentence',
        pushTime: '@date'
      })
    }
  })
  Mock.mock(new RegExp('/api/user/v1/person/resume/reject' + '.*'), 'post', (options) => {
    console.log(options.url, JSON.parse(options.body))
    return {
      response: {}
    }
  })
  Mock.mock(new RegExp('/api/user/v1/person/resume/pass' + '.*'), 'post', (options) => {
    console.log(options.url, JSON.parse(options.body))
    return {
      response: {}
    }
  })
}
