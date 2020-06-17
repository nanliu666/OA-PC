/* eslint-disable no-console */

import Mock from 'mockjs'
export default ({ mock }) => {
  if (!mock) return

  //获取表格数据
  Mock.mock(new RegExp('/api/user/v1/todo/list' + '.*'), 'get', (options) => {
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

  // 候选人面试详情数据
  Mock.mock(new RegExp('/user/v1/person/interview/info' + '.*'), 'get', () => {
    let data = Mock.mock({
      id: '54654',
      pushUser: '4654645',
      pushName: '@cname',
      pushTime: '@date',
      status: 'Pass',
      interviewUser: '54654',
      interviewName: '@cname',
      interviewTime: '@date',
      interviewType: 'Onsite',
      name: '@cname',
      phonenum: '546546546',
      address: '广州',
      remark: '这是备注',
      interview: 0,
      recruitmentId: '564645',
      personId: '456456',
      evaluateTime: '@date',
      workBackground: 'A',
      workExperience: 'A',
      knowledge: 'A',
      train: 'A',
      specialty: 'A',
      evaluation: '面试评价,还行',
      score: '1000'
    })
    return {
      response: data
    }
  })

  Mock.mock(new RegExp('/user/v1/person/interview/info' + '.*'), 'post', () => {
    return {
      response: '提交OK'
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
