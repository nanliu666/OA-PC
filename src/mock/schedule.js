import Mock from 'mockjs'
export default ({ mock }) => {
  if (!mock) return

  //    日程中心查询接口
  Mock.mock(new RegExp('/schedule/v1/schedule/info' + '.*'), 'get', () => {
    let list = []
    for (let i = 0; i < 10; i++) {
      list.push(
        Mock.mock({
          id: '@integer(1, 100)',
          'remindDate|1': [
            '2020-07-01',
            '2020-07-02',
            '2020-07-30',
            '2020-07-02',
            '2020-07-10',
            '2020-07-05'
          ],
          title: '@ctitle(5,25)',
          'type|1': ['Remind'],
          createTime: '@date()'
        })
      )
    }
    return {
      response: list
    }
  })
  //   日程中心添加提醒事项接口
  Mock.mock(new RegExp('/schedule/v1/schedule/info' + '.*'), 'post', () => {
    let id = Mock.mock({
      id: '@integer(1, 100)'
    })

    return {
      response: {
        id
      }
    }
  })
  //   日程中心删除提醒事项接口
  Mock.mock(new RegExp('/schedule/v1/schedule/info' + '.*'), 'delete', () => {
    return {
      response: '删除成功'
    }
  })
  //
}
