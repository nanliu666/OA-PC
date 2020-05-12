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
        menuId: '1',
        parentId: '0',
        code: 'system',
        menuName: '系统管理',
        alias: 'menu',
        icon: 'iconfont iconicon_setting',
        menuType: 'Menu',
        isOwn: 1,
        children: [
          {
            menuId: '13',
            parentId: '1',
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
          },
          {
            menuId: '11',
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
            menuId: '12',
            parentId: '1',
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
          }
        ],
        hasChildren: false,
        parentName: '',
        categoryName: '',
        actionName: '',
        isOpenName: ''
      },
      {
        menuId: '11235988157386752',
        parentId: '0',
        code: 'system',
        menuName: '组织管理',
        alias: 'menu',
        path: '/orgs',
        source: 'iconfont iconicon_setting',
        icon: 'iconfont iconicon_subordinate',
        menuType: 'Menu',
        isOwn: 1,
        children: [
          {
            menuId: '21',
            parentId: '2',
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
            menuId: '313',
            parentId: '31',
            code: 'client',
            menuName: '员工花名册',
            alias: 'menu',
            path: '/personnel/roster',
            source: 'iconfont iconicon_mobilephone',
            sort: 8,
            icon: 'iconfont iconicon_subordinate',
            menuType: 'Menu',
            isOwn: 1,
            children: [
              {
                menuId: '311',
                parentId: '31',
                code: 'client',
                menuName: '添加员工',
                alias: 'menu',
                isShow: 0,
                path: '/personnel/addRoster',
                source: 'iconfont iconicon_mobilephone',
                sort: 8,
                icon: 'iconfont iconicon_subordinate',
                menuType: 'Menu',
                isOwn: 1
              },
              {
                menuId: '312',
                parentId: '31',
                code: 'client',
                menuName: '员工信息',
                alias: 'menu',
                isShow: 0,
                path: '/personnel/detail/:userId',
                source: 'iconfont iconicon_mobilephone',
                sort: 8,
                icon: 'iconfont iconicon_subordinate',
                menuType: 'Menu',
                isOwn: 1
              }
            ]
          },
          {
            menuId: '31',
            parentId: '3',
            code: 'client',
            menuName: '组织机构管理',
            alias: 'menu',
            path: '/orgs/orgManagement',
            source: 'iconfont iconicon_mobilephone',
            icon: 'iconfont iconicon_subordinate',
            menuType: 'Menu',
            isOwn: 1,
            children: [
              {
                menuId: '221',
                parentId: '22',
                code: 'client',
                menuName: '组织机构排序',
                alias: 'menu',
                path: '/orgs/orgSort',
                isShow: 0,
                source: 'iconfont iconicon_mobilephone',
                icon: 'iconfont iconicon_subordinate',
                menuType: 'Menu',
                isOwn: 1
              },
              {
                menuId: '222',
                parentId: '22',
                code: 'client',
                menuName: '组织机构详情',
                alias: 'menu',
                path: '/orgs/orgDetail',
                isShow: 0,
                source: 'iconfont iconicon_mobilephone',
                icon: 'iconfont iconicon_subordinate',
                menuType: 'Menu',
                isOwn: 1
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
