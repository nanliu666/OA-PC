import Mock from 'mockjs'
/**
 * menuPrivileges是所有菜单权限
 * orgPrivileges是所有组织，暂时用不到
 *
 * 注意：menuType为Menu的菜单，它的下级menuType只能为Button
 *
 * menuType为Menu的菜单,它的path在页面渲染时会生成对应的路由，所以path的值要和实际文件路径相同
 * 例如：页面文件的路径是：src\views\system\role.vue,它对应的path就是/system/role
 *
 */
const res = {
  resCode: 200,
  success: true,
  response: {
    orgPrivileges: [
      { orgId: '1252523599903072257', orgName: '百利宏12', orgType: 'Company', isOwn: 1 },
      { orgId: '1252523599903072259', orgName: '广州易宝分公司', orgType: 'Company', isOwn: 1 },
      { orgId: '1259787152448147458', orgName: '出差', orgType: 'Company', isOwn: 1 }
    ],
    menuPrivileges: [
      {
        menuId: '1259069584261287938',
        menuName: '系统管理',
        menuType: 'Dir', // 菜单类型，Dir：目录，Menu：菜单；Button：按钮
        isOwn: 1, // 是否拥有 0：否，1：是
        isShow: 1, // 是否显示在菜单栏 0：否，1：是
        code: 'system',
        alias: 'system',
        path: '',
        icon: 'iconfont iconicon_setting',
        dataPrivileges: [{ dataId: '1', scopeName: '个人可见', isOwn: 1 }],
        children: [
          {
            menuId: '1259070994843471874',
            menuName: '菜单管理',
            menuType: 'Menu',
            isOwn: 1,
            isShow: 1,
            code: 'system_menu',
            alias: 'menu',
            path: '/system/menu',
            icon: 'iconfont iconicon_compile',
            dataPrivileges: [],
            children: [
              {
                menuId: '1259747890491043842',
                menuName: '菜单添加',
                menuType: 'Button',
                isOwn: 1,
                isShow: 1,
                code: 'system_menu_add',
                alias: 'menuAdd',
                path: '/system/menu/add',
                icon: 'iconfont iconicon_roundadd',
                dataPrivileges: [],
                children: []
              },
              {
                menuId: '1259749548147093505',
                menuName: '菜单删除',
                menuType: 'Button',
                isOwn: 1,
                isShow: 1,
                code: 'system_menu_delete',
                alias: 'menuDelete',
                path: '/system/menu/delete',
                icon: 'iconfont iconicon_roundclose',
                dataPrivileges: [],
                children: []
              }
            ]
          },
          {
            menuId: '1259071409534308354',
            menuName: '操作日志',
            menuType: 'Menu',
            isOwn: 1,
            isShow: 1,
            code: 'system_actionLog',
            alias: 'actionLog',
            path: '/system/actionLog',
            icon: 'iconfont iconicon_addresslist',
            dataPrivileges: [],
            children: []
          },
          {
            menuId: '1259072343010217985',
            menuName: '系统字典',
            menuType: 'Menu',
            isOwn: 1,
            isShow: 1,
            code: 'system_dict',
            alias: 'dict',
            path: '/system/dict',
            icon: 'iconfont iconicon_study',
            dataPrivileges: [],
            children: [
              {
                menuId: '1260047763813732353',
                menuName: '新建',
                menuType: 'Button',
                isOwn: 0,
                isShow: 1,
                code: 'system_dict_add',
                alias: 'systemDictAdd',
                path: '/system/dict',
                icon: '',
                dataPrivileges: [],
                children: []
              }
            ]
          },
          {
            menuId: '1260397131756474370',
            menuName: '权限管理',
            menuType: 'Dir',
            isOwn: 1,
            isShow: 1,
            code: 'priviliage',
            alias: 'priviliage',
            path: '',
            icon: 'iconfont iconicon_safety',
            dataPrivileges: [],
            children: [
              {
                menuId: '1260401852546387969',
                menuName: '角色管理',
                menuType: 'Menu',
                isOwn: 1,
                isShow: 1,
                code: 'role',
                alias: '角色',
                path: '/system/role',
                icon: 'iconfont iconicon_group',
                dataPrivileges: [],
                children: []
              }
            ]
          }
        ]
      },
      {
        menuId: '1259072905810317313',
        menuName: '组织管理',
        menuType: 'Dir',
        isOwn: 1,
        isShow: 1,
        code: 'org',
        alias: 'org',
        path: '',
        icon: 'iconfont iconicon_group',
        dataPrivileges: [],
        children: [
          {
            menuId: '1259073456778285058',
            menuName: '用户管理',
            menuType: 'Menu',
            isOwn: 1,
            isShow: 1,
            code: 'org_user',
            alias: 'user',
            path: '/system/user',
            icon: 'iconfont iconicon_boss',
            dataPrivileges: [],
            children: []
          },

          {
            menuId: '1260116127481413634',
            menuName: '员工管理',
            menuType: 'Dir',
            isOwn: 1,
            isShow: 1,
            code: 'roster',
            alias: 'roster',
            path: '',
            icon: 'iconfont iconicon_group',
            dataPrivileges: [],
            children: [
              {
                menuId: '1260116127481413634',
                menuName: '员工花名册',
                menuType: 'Menu',
                isOwn: 1,
                isShow: 1,
                code: 'personnel_roster',
                alias: 'personnelRoster',
                path: '/personnel/roster',
                icon: 'iconfont iconicon_group',
                dataPrivileges: []
              },
              {
                menuId: '1260116557917667329',
                menuName: '员工信息',
                menuType: 'Menu',
                isOwn: 1,
                isShow: 0,
                code: 'personnel_detail',
                alias: 'personnel_detail',
                path: '/personnel/detail/:userId',
                icon: 'iconfont iconicon_namecard',
                dataPrivileges: [],
                children: []
              },
              {
                menuId: '1260117682788057089',
                menuName: '添加员工',
                menuType: 'Menu',
                isOwn: 1,
                isShow: 0,
                code: 'add_roster',
                alias: 'add_roster',
                path: '/personnel/addRoster',
                icon: 'iconfont iconicon_roundadd',
                dataPrivileges: [],
                children: []
              },
              {
                menuId: '1260117682788057090',
                menuName: '候选人管理',
                menuType: 'Dir',
                isOwn: 1,
                isShow: 1,
                code: 'candidate',
                alias: 'candidate',
                path: '',
                icon: 'iconfont iconicon_roundadd',
                dataPrivileges: [],
                children: [
                  {
                    menuId: '1260117682788057091',
                    menuName: '候选人管理',
                    menuType: 'menu',
                    isOwn: 1,
                    isShow: 1,
                    code: 'candidate',
                    alias: 'candidate',
                    path: '/personnel/candidate/candidateManagement',
                    icon: 'iconfont iconicon_roundadd',
                    dataPrivileges: [],
                    children: []
                  }
                ]
              }
            ]
          },
          {
            menuId: '125907515306392371',
            menuName: '组织机构管理',
            menuType: 'Dir',
            isOwn: 1,
            isShow: 1,
            code: 'org_management',
            alias: 'orgManagement',
            path: '',
            icon: 'iconfont iconicon_subordinate',
            dataPrivileges: [],
            children: [
              {
                menuId: '1259075153063923714',
                menuName: '组织机构管理',
                menuType: 'Menu',
                isOwn: 1,
                isShow: 1,
                code: 'org_management',
                alias: 'orgManagement',
                path: '/orgs/orgManagement',
                icon: 'iconfont iconicon_subordinate',
                dataPrivileges: [],
                children: []
              },
              {
                menuId: '1260118258720522241',
                menuName: '组织机构排序',
                menuType: 'Menu',
                isOwn: 1,
                isShow: 0,
                code: 'org_sort',
                alias: 'org_sort',
                path: '/orgs/orgSort',
                icon: 'iconfont icon-caidanguanli',
                dataPrivileges: [],
                children: []
              },
              {
                menuId: '1260118573335265281',
                menuName: '组织机构详情',
                menuType: 'Menu',
                isOwn: 1,
                isShow: 0,
                code: 'org_detail',
                alias: 'org_detail',
                path: '/orgs/orgDetail',
                icon: 'iconfont icon-daohanglanmoshi02',
                dataPrivileges: [],
                children: []
              }
            ]
          },
          {
            menuId: '1260402655155818498',
            menuName: '职务体系管理',
            menuType: 'Dir',
            isOwn: 1,
            isShow: 1,
            code: 'position',
            alias: '职位',
            path: '',
            icon: 'iconfont iconicon_subordinate',
            dataPrivileges: [],
            children: [
              {
                menuId: '1260403176394559489',
                menuName: '职位管理',
                menuType: 'Menu',
                isOwn: 1,
                isShow: 1,
                code: 'positionManagent',
                alias: '/gradeTree/position/index',
                path: '/grade/position',
                icon: 'iconfont iconicon_compile',
                dataPrivileges: [],
                children: []
              },
              {
                menuId: '1260403615517216770',
                menuName: '职位类别',
                menuType: 'Menu',
                isOwn: 1,
                isShow: 1,
                code: 'category',
                alias: '/gradeTree/position/category',
                path: '/grade/category',
                icon: 'iconfont iconicon_airplay',
                dataPrivileges: [],
                children: []
              },
              {
                menuId: '1260404199808929794',
                menuName: '岗位管理',
                menuType: 'Menu',
                isOwn: 1,
                isShow: 1,
                code: 'station',
                alias: '岗位管理',
                path: '/gradeTree/position/station',
                icon: 'iconfont iconicon_doc',
                dataPrivileges: [],
                children: []
              }
            ]
          },
          {
            menuId: '1260447871271276545',
            menuName: '组织架构图',
            menuType: 'Menu',
            isOwn: 1,
            isShow: 1,
            code: 'org',
            alias: '/gradeTree/grade',
            path: '/grade/index',
            icon: 'iconfont iconicon_compile',
            dataPrivileges: [],
            children: []
          }
        ]
      },
      {
        menuId: '3',
        menuName: '人事管理',
        menuType: 'Dir', // 菜单类型，Dir：目录，Menu：菜单；Button：按钮
        isOwn: 1, // 是否拥有 0：否，1：是
        isShow: 1, // 是否显示在菜单栏 0：否，1：是
        code: 'personnel',
        alias: 'personnel',
        path: '',
        icon: 'iconfont iconicon_setting',
        children: [
          {
            menuId: '31',
            menuName: '添加候选人',
            menuType: 'Menu',
            isOwn: 1,
            isShow: 1,
            code: 'personnel_editPerson',
            alias: 'editPerson',
            path: '/personnel/editPerson',
            icon: 'iconfont iconicon_compile'
          },
          {
            menuId: '32',
            menuName: '转正申请',
            menuType: 'Menu',
            isOwn: 1,
            isShow: 0,
            code: 'personnel_editPerson',
            alias: 'editPerson',
            path: '/personnel/administration/apply',
            icon: 'iconfont iconicon_doc'
          },
          {
            menuId: '32',
            menuName: '转正列表',
            menuType: 'Menu',
            isOwn: 1,
            isShow: 0,
            code: 'personnel_editPerson',
            alias: 'editPerson',
            path: '/personnel/administration/apply',
            icon: 'iconfont iconicon_doc'
          }
        ]
      }
    ]
  },
  resMsg: '操作成功'
}

export default ({ mock }) => {
  if (!mock) return
  Mock.mock(new RegExp('/api/sys/v1/user/privilege' + '.*'), 'get', () => {
    return res
  })
}
