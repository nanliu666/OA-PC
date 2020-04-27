import Mock from 'mockjs'
export default ({ mock }) => {
  if (!mock) return

  //获取表格数据
  Mock.mock(new RegExp('/api/sys/v1/dict/list' + '.*'), 'get', () => {
    let list = []
    for (let i = 0; i < 5; i++) {
      list.push(
        Mock.mock({
          id: '@increment',
          parentId: '@increment',
          code: '@string( 2, 10)',
          dictValue: '@cword( 2, 10)',
          dictKey: '@string( 2, 10)',
          sort: '@increment',
          isSealed: '@integer(0, 1)',
          createTime: '@date',
          updateTime: '@date'
        })
      )
    }
    return {
      resCode: 200,
      resMsg: '描述',
      response: {
        totalNum: 5,
        totalPage: 5,
        data: list
      }
    }
  })
}
