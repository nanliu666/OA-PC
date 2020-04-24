import Mock from 'mockjs'
export default ({ mock }) => {
  if (!mock) return
  // // 用户登录
  // Mock.mock('/user/login', 'post', {
  //   data: new Date().getTime() + ''
  // })
  // //用户退出
  // Mock.mock('/user/logout', 'get', {
  //   data: true
  // })
  // //刷新token
  // Mock.mock('/user/refesh', 'post', {
  //   data: new Date().getTime() + ''
  // })

  //获取表格数据
  Mock.mock(new RegExp('/api/org/v1/user/tag/define' + '.*'), 'get', () => {
    let list = []
    for (let i = 0; i < 5; i++) {
      list.push(
        Mock.mock({
          id: '@increment',
          name: '@cname',
          'userNum|0-100': 0,
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
