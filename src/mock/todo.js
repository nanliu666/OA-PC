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
          createTime: '@date'
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
}
