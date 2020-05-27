import Mock from 'mockjs'

const normalData = {
  code: 200,
  success: true,
  msg: '操作成功',
  response: {}
}

export default (mock) => {
  if (!mock) return
  Mock.mock(new RegExp('/api/user/v1/leave/note/group' + '.*'), 'get', () => {
    let list = []
    for (let i = 0; i < 10; i++) {
      list.push(
        Mock.mock({
          id: '@increment',
          name: '@cname',
          'type|1': ['Org', 'User', 'Job'],
          orgId: '@increment',
          orgName: '@string( 2, 10)',
          jobId: '@increment',
          jobName: '@string( 2, 10)',
          positionId: '@increment',
          positionName: '@string( 2, 10)',
          userName: '@cname',
          workNo: /\d{3}/,
          companyId: '@increment'
        })
      )
    }
    return {
      ...normalData,
      response: list
    }
  })
  Mock.mock(new RegExp('/api/user/v1/leave/note/group' + '.*'), 'post', () => {
    return normalData
  })
  Mock.mock(new RegExp('/api/user/v1/leave/note/group' + '.*'), 'delete', () => {
    return normalData
  })
  Mock.mock(new RegExp('/api/user/v1/leave/note/group' + '.*'), 'put', () => {
    return normalData
  })
  Mock.mock(new RegExp('/api/user/v1/leave/note/category' + '.*'), 'get', () => {
    let list = []
    for (let i = 0; i < 10; i++) {
      list.push(
        Mock.mock({
          categoryId: '@increment',
          categoryName: '@cname',
          details: [
            {
              detailId: '@increment',
              detailName: '@cname'
            }
          ]
        })
      )
    }
    return {
      ...normalData,
      response: list
    }
  })
  Mock.mock(new RegExp('/api/user/v1/leave/note/category' + '.*'), 'post', () => {
    return normalData
  })
  Mock.mock(new RegExp('/api/user/v1/leave/note/category' + '.*'), 'delete', () => {
    return normalData
  })
  Mock.mock(new RegExp('/api/user/v1/leave/note/category' + '.*'), 'put', () => {
    return normalData
  })
}
