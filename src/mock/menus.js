import Mock from 'mockjs'

const normalData = {
  code: 200,
  success: true,
  msg: '操作成功',
  response: ''
}

const menuList = {
  ...normalData,
  response: [
    {
      menuId: '1259069584261287938',
      parentId: '0',
      code: 'system',
      name: '系统管理',
      alias: 'system',
      path: '',
      icon: 'iconfont iconicon_setting',
      sort: '1',
      menuType: 'Dir',
      remark: '',
      createTime: '2020-05-09 18:35:56',
      updateTime: '2020-05-11 15:14:01',
      isShow: 1,
      status: 'VALID'
    },
    {
      menuId: '1259072905810317313',
      parentId: '0',
      code: 'org',
      name: '组织管理',
      alias: 'org',
      path: '',
      icon: 'iconfont iconicon_group',
      sort: '2',
      menuType: 'Dir',
      remark: '',
      createTime: '2020-05-09 18:49:08',
      updateTime: '2020-05-11 15:36:20',
      isShow: 1,
      status: 'VALID'
    }
  ],
  resMsg: '操作成功'
}

export default ({ mock }) => {
  if (!mock) return
  Mock.mock(new RegExp('/api/sys/v1/menu/info' + '.*'), 'get', () => {
    return menuList
  })
  Mock.mock(new RegExp('/api/sys/v1/menu/info' + '.*'), 'delete', () => {
    return normalData
  })
  Mock.mock(new RegExp('/api/sys/v1/menu/info' + '.*'), 'post', () => {
    return normalData
  })
  Mock.mock(new RegExp('/api/sys/v1/menu/info' + '.*'), 'put', () => {
    return normalData
  })
}
