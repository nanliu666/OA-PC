import Mock from 'mockjs'
export default ({ mock }) => {
  if (!mock) return

  //    任务中心查询接口
  Mock.mock(new RegExp('/task/v1/task/center/list' + '.*'), 'get', () => {
    let list = []
    for (let i = 0; i < 7; i++) {
      list.push(
        Mock.mock({
          id: '@integer(1, 100)',
          title: '@ctitle(5,8)',
          brief: '@ctitle(5,8)',
          'type|1': ['Recruitment'],
          bizId: '@integer(1, 100)',
          'emerType|1': ['Super', 'urgent', 'common', 'suit'],
          'status|1': ['UnFinished', 'Finished'],
          beginDate: '@date()',
          endDate: '@date()',
          totalNum: '@integer(100,100)',
          completeNum: '@integer(1, 100)',
          completeTime: '@date()',
          createTime: '@date()'
        })
      )
    }
    return {
      response: {
        totalNum: 50,
        totalPage: 10,
        data: list
      }
    }
  })

  //
}
