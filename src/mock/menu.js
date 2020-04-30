import Mock from 'mockjs'

const res = {
  resCode: 200,
  resMsg: '成功',
  response: {
    orgPrivileges: [
      {
        orgId: '1',
        orgName: '百利宏化工',
        orgType: 'Enterprise',
        isOwn: 1
      }
    ],
    menuPrivileges: [
      {
        menuId: '1123598815738675203',
        parentId: '0',
        code: 'system',
        menuName: '系统管理',
        alias: 'menu',
        icon: 'iconfont iconicon_setting',
        menuType: 'Menu',
        isOwn: 1,
        children: [
          {
            menuId: '1123598815738675204',
            parentId: '1123598815738675203',
            code: 'user',
            menuName: '用户管理',
            alias: 'menu',
            path: '/system/user',
            icon: 'iconfont iconicon_principal',
            menuType: 'Menu',
            isOwn: 1,
            children: [
              {
                menuName: '修改',
                path: '/system/user/edit',
                isOwn: 1,
                menuType: 'Button'
              }
            ]
          },
          {
            menuId: '112359881573867528544',
            parentId: '1123598815738675203',
            code: 'action',
            menuName: '操作日志',
            alias: 'menu',
            path: '/system/actionLog',
            icon: 'iconfont iconicon_principal',
            menuType: 'Menu',
            isOwn: 1,
            children: [
              {
                menuName: '修改',
                isOwn: 1,
                path: '/system/actionLog/edit',
                menuType: 'Button'
              }
            ]
          },
          {
            menuId: '1123598815738675205',
            parentId: '1123598815738675203',
            code: 'dept',
            menuName: '机构管理',
            alias: 'menu',
            path: '/system/dept',
            icon: 'iconfont iconicon_group',
            menuType: 'Menu',
            isOwn: 1,
            children: [
              {
                menuName: '修改',
                isOwn: 1,
                path: '/system/dept/edit',
                menuType: 'Button'
              }
            ]
          },
          {
            menuId: '1123598815738675206',
            parentId: '1123598815738675203',
            code: 'dict',
            menuName: '系统字典',
            alias: 'menu',
            path: '/system/dict',
            icon: 'iconfont iconicon_addresslist',
            menuType: 'Menu',
            isOwn: 1,
            children: [
              {
                menuName: '修改',
                path: '/system/dict/edit',
                isOwn: 1,
                menuType: 'Button'
              }
            ]
          },
          {
            menuId: '1123598815738675207',
            parentId: '1123598815738675203',
            code: 'menu',
            menuName: '菜单管理',
            alias: 'menu',
            path: '/system/menu',
            icon: 'iconfont iconicon_subordinate',
            menuType: 'Menu',
            isOwn: 1,
            children: [
              {
                menuName: '修改',
                isOwn: 1,
                path: '/system/menu/edit',
                menuType: 'Button'
              }
            ]
          }
        ],
        hasChildren: false,
        parentName: '',
        categoryName: '',
        actionName: '',
        isOpenName: ''
      }
    ]
  }
}
export default ({ mock }) => {
  if (!mock) return
  Mock.mock(new RegExp('/api/sys/v1/user/privilege' + '.*'), 'get', () => {
    return res
  })
}
