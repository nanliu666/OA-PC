import Mock from 'mockjs'
export default ({
  mock
}) => {
  if (!mock) return

  //获取附件分类接口数据
  Mock.mock(new RegExp('/user/v1/user/attachment/category' + '.*'), 'get', () => {
    let list = []
    for (let i = 0; i < 10; i++) {
      list.push(
        Mock.mock({
          id: '@increment',
          name: '@cname',
          iconUrl: 'el-icon-picture-outline',
          maxLimit: '2',
          'type|1': ['员工基本资料', '员工档案资料'],
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
  //获取附件接口数据
  Mock.mock(new RegExp('user/v1/user/attachment/info' + '.*'), 'get', () => {
    let list = []
    for (let i = 0; i < 10; i++) {
      list.push(
        Mock.mock({
          id: '@increment',
          userId: '@increment',
          name: '@cname',
          url: 'el-icon-picture-outline',
          categoryId: '555',
          updateTime: '454548784112',
          createTime: '454548784112'
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
