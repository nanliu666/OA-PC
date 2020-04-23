import Mock from 'mockjs'
export default ({ mock }) => {
  if (!mock) return

  //获取表格数据
  Mock.mock(new RegExp('/user/v1/user/attachment/category' + '.*'), 'get', () => {
    let list = []
    for (let i = 0; i < 10; i++) {
      list.push(
        Mock.mock({
          id: '@increment',
          name: '@cname',
          iconUrl: 'el-icon-picture-outline',
          maxLimit: '2',
          type: '@cname',
          sort: '0'
        })
      )
    }
    return {
      response: {
        data: list
      }
    }
  })
}
