import Mock from 'mockjs'
export default ({ mock }) => {
  if (!mock) return
  //获取表格数据
  Mock.mock(new RegExp('/api/msg/v1/msg/notify/list' + '.*'), 'get', () => {
    let list = []
    for (let i = 0; i < 10; i++) {
      list.push(
        Mock.mock({
          id: '@increment',
          'type|1': ['Work', 'System'],
          title: '@cword(2, 4)',
          content: '@csentence',
          'isRead|1': [1, 0],
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
  // 该消息标记为已读
  Mock.mock(new RegExp('/api/msg/v1/msg/notify/read' + '.*'), 'post', () => {
    return {
      response: 'OK'
    }
  })
  // 删除所有已读信息
  Mock.mock(new RegExp('/api/msg/v1/msg/notify/read/del' + '.*'), 'post', () => {
    return {
      response: 'OK'
    }
  })
}
