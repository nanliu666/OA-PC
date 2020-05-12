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
      menuId: '1123598815738675280',
      parentId: '1123598815738675280',
      code: 'work',
      name: '我的事务',
      alias: 'menu',
      path: '/work',
      icon: 'iconfont iconicon_notice',
      sort: 2,
      menuType: 1,
      remark: '',
      createTime: '',
      updteTime: ''
    },
    {
      menuId: '1123598815738675210',
      parentId: '1123598815738675210',
      code: 'monitor',
      name: '系统监控',
      alias: 'menu',
      path: '/monitor',
      icon: 'iconfont icon-yanzhengma',
      sort: 3,
      menuType: 1,
      remark: '',
      createTime: '',
      updteTime: ''
    },
    {
      menuId: '1123598815738675217',
      parentId: '1123598815738675217',
      code: 'tool',
      name: '研发工具',
      alias: 'menu',
      path: '/tool',
      icon: 'iconfont icon-wxbgongju',
      sort: 4,
      menuType: 1,
      remark: ''
    },
    {
      menuId: '1123598815738675266',
      parentId: '1123598815738675266',
      code: 'flow',
      name: '流程管理',
      alias: 'menu',
      path: '/flow',
      icon: 'iconfont iconicon_send',
      sort: 5,
      menuType: 1,
      remark: ''
    },
    {
      menuId: '1123598815738675298',
      parentId: '1123598815738675298',
      code: 'resource',
      name: '资源管理',
      alias: 'menu',
      path: '/resource',
      icon: 'iconfont iconicon_coinpurse_line',
      sort: 6,
      menuType: 1,
      remark: ''
    },
    {
      menuId: '1123598815738675307',
      parentId: '1123598815738675307',
      code: 'authority',
      name: '权限管理',
      alias: 'menu',
      path: '/authority',
      icon: 'iconfont icon-bofangqi-suoping',
      sort: 98,
      menuType: 1,
      remark: ''
    },
    {
      menuId: '1123598815738675203',
      parentId: '1123598815738675203',
      code: 'system',
      name: '系统管理',
      alias: 'menu',
      path: '/system',
      icon: 'iconfont iconicon_setting',
      sort: 99,
      menuType: 1,
      remark: ''
    }
  ]
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
