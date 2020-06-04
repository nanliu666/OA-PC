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
      {
        orgId: '1252523599903072257',
        orgName: '百利宏12',
        orgType: 'Company',
        isOwn: 1
      },
      {
        orgId: '1252523599903072259',
        orgName: '广州易宝分公司',
        orgType: 'Company',
        isOwn: 1
      },
      {
        orgId: '1259787152448147458',
        orgName: '出差',
        orgType: 'Company',
        isOwn: 1
      }
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
        dataPrivileges: [
          {
            dataId: '1',
            scopeName: '个人可见',
            isOwn: 1
          }
        ],
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
                path: '/gradeTree/position/index',
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
                path: '/gradeTree/position/category',
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
            path: '/gradeTree/grade',
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
            menuName: '招聘管理',
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
                  },
                  {
                    menuId: '12601176827880570',
                    menuName: '发送Offer',
                    menuType: 'menu',
                    isOwn: 1,
                    isShow: 0,
                    code: 'candidate',
                    alias: 'candidate',
                    path: '/personnel/candidate/sendOffer',
                    icon: 'iconfont iconicon_roundadd',
                    dataPrivileges: [],
                    children: []
                  }
                ]
              },
              {
                menuId: '311',
                menuName: '人才库管理',
                menuType: 'Menu',
                isOwn: 1,
                isShow: 1,
                code: 'personnel_talent',
                alias: 'talent',
                path: '/personnel/talent/list',
                icon: 'iconfont iconicon_compile'
              },
              {
                menuId: '312',
                menuName: '添加候选人',
                menuType: 'Menu',
                isOwn: 1,
                isShow: 0,
                code: 'personnel_editPerson',
                alias: 'editPerson',
                path: '/personnel/editPerson',
                icon: 'iconfont iconicon_compile'
              }
            ]
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
              }
            ]
          },
          {
            menuId: '322',
            menuName: '合同管理',
            menuType: 'Menu',
            isOwn: 1,
            isShow: 1,
            code: 'personnel_contract',
            alias: 'contract',
            path: '/personnel/contract/contract',
            icon: 'iconfont iconicon_doc'
          },
          {
            menuId: '232',
            menuName: '续签合同',
            menuType: 'Menu',
            isOwn: 1,
            isShow: 0,
            code: 'personnel_renewal',
            alias: 'renewal',
            path: '/personnel/contract/renewal',
            icon: 'iconfont iconicon_doc'
          },
          {
            menuId: '112',
            menuName: '编辑合同',
            menuType: 'Menu',
            isOwn: 1,
            isShow: 0,
            code: 'personnel_signedContract',
            alias: 'signedContract',
            path: '/personnel/contract/signedContract',
            icon: 'iconfont iconicon_doc'
          },
          {
            menuId: '33',
            menuName: '异动申请',
            menuType: 'Dir',
            isOwn: 1,
            isShow: 1,
            code: 'personnel_editPerson',
            alias: 'editPerson',
            path: '',
            icon: 'iconfont iconicon_compile',
            children: [
              {
                menuId: '320',
                menuName: '人事异动',
                menuType: 'Menu',
                isOwn: 1,
                isShow: 1,
                code: 'personnel_editPerson',
                alias: 'editPerson',
                path: '/personnel/transaction/perChange',
                icon: 'iconfont iconicon_compile'
              },
              {
                menuId: '321',
                menuName: '异动申请',
                menuType: 'Menu',
                isOwn: 1,
                isShow: 1,
                code: 'personnel_editPerson',
                alias: 'editPerson',
                path: '/personnel/transaction/changeApply',
                icon: 'iconfont iconicon_compile'
              }
            ]
          },

          {
            menuId: '35',
            menuName: '转正申请',
            menuType: 'Menu',
            isOwn: 1,
            isShow: 1,
            code: 'personnel_editPerson',
            alias: 'editPerson',
            path: '/personnel/administration/apply',
            icon: 'iconfont iconicon_doc'
          },
          {
            menuId: '36',
            menuName: '转正列表',
            menuType: 'Menu',
            isOwn: 1,
            isShow: 1,
            code: 'personnel_editPerson',
            alias: 'editPerson',
            path: '/personnel/administration/workerlist',
            icon: 'iconfont iconicon_doc'
          },

          {
            menuId: '31212212454542',
            menuName: '面试登记表',
            menuType: 'Menu',
            isOwn: 1,
            isShow: 0,
            code: 'personnel_registrationForm',
            alias: 'registrationForm',
            path: '/personnel/candidate/registrationForm/:personId',
            icon: 'iconfont iconicon_doc'
          },
          {
            menuId: '312122124545422',
            menuName: '面试登记表编辑',
            menuType: 'Menu',
            isOwn: 1,
            isShow: 0,
            code: 'personnel_registrationFormEdit',
            alias: 'registrationFormEdit',
            path: '/personnel/candidate/registrationFormEdit',
            icon: 'iconfont iconicon_doc'
          },
          {
            menuId: '312122124545423',
            menuName: '申请录用',
            menuType: 'Menu',
            isOwn: 1,
            isShow: 0,
            code: 'personnel_apply',
            alias: 'apply',
            path: '/personnel/candidate/apply',
            icon: 'iconfont iconicon_doc'
          },
          {
            menuId: '312122124545424',
            menuName: '申请详情',
            menuType: 'Menu',
            isOwn: 1,
            isShow: 0,
            code: 'personnel_applyDetail',
            alias: 'applyDetail',
            path: '/personnel/candidate/applyDetail',
            icon: 'iconfont iconicon_doc'
          },
          {
            menuId: '80',
            menuName: '离职管理',
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
                menuId: '801',
                menuName: '离职管理',
                menuType: 'Dir',
                isOwn: 1,
                isShow: 1,
                code: 'org_management',
                alias: 'orgManagement',
                path: '/personnel/leave/leaveList',
                icon: 'iconfont iconicon_subordinate',
                dataPrivileges: []
              },
              {
                menuId: '802',
                menuName: '离职申请',
                menuType: 'Menu',
                isOwn: 1,
                isShow: 1,
                code: 'org_management',
                alias: 'orgManagement',
                path: '/personnel/leave/applyLeave',
                icon: 'iconfont iconicon_subordinate',
                dataPrivileges: [],
                children: []
              },
              {
                menuId: '803',
                menuName: '确认离职',
                menuType: 'Menu',
                isOwn: 1,
                isShow: 1,
                code: 'org_management',
                alias: 'orgManagement',
                path: '/personnel/leave/confirmLeave',
                icon: 'iconfont iconicon_subordinate',
                dataPrivileges: [],
                children: []
              },
              {
                menuId: '80',
                menuName: '离职证明',
                menuType: 'Menu',
                isOwn: 1,
                isShow: 1,
                code: 'org_management',
                alias: 'orgManagement',
                path: '/personnel/leave/proveLeave',
                icon: 'iconfont iconicon_subordinate',
                dataPrivileges: [],
                children: []
              },
              {
                menuId: '804',
                menuName: '离职证明预览',
                menuType: 'Menu',
                isOwn: 1,
                isShow: 1,
                code: 'org_management',
                alias: 'orgManagement',
                path: '/personnel/leave/printProve',
                icon: 'iconfont iconicon_subordinate',
                dataPrivileges: [],
                children: []
              }
            ]
          },

          {
            menuId: '31212212451',
            menuName: '离职交接事项',
            menuType: 'Menu',
            isOwn: 1,
            isShow: 1,
            code: '',
            alias: '',
            path: '/personnel/settings/resignation'
          },
          {
            menuId: '1260116127481413637',
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
              }
            ]
          }
        ]
      },
      {
        menuId: '1590112075698',
        menuName: '个人中心',
        menuType: 'Dir', // 菜单类型，Dir：目录，Menu：菜单；Button：按钮
        isOwn: 1, // 是否拥有 0：否，1：是
        isShow: 1, // 是否显示在菜单栏 0：否，1：是
        code: 'system',
        alias: 'system',
        path: '',
        icon: 'iconfont iconicon_setting',
        children: [
          {
            menuId: '1590112075699',
            menuName: '个人信息',
            menuType: 'Menu',
            isOwn: 1,
            isShow: 1,
            code: 'userInfo_editPerson',
            alias: 'editPerson',
            path: '/system/userinfo',
            icon: 'iconfont iconicon_compile'
          },
          {
            menuId: '1590112075700',
            menuName: '安全设置',
            menuType: 'Menu',
            isOwn: 1,
            isShow: 1,
            code: 'userInfo_editPerson',
            alias: 'editPerson',
            path: '/system/securitySetting',
            icon: 'iconfont iconicon_compile'
          }
        ]
      },
      {
        menuId: '1590112075691',
        menuName: '审批管理',
        menuType: 'Dir', // 菜单类型，Dir：目录，Menu：菜单；Button：按钮
        isOwn: 1, // 是否拥有 0：否，1：是
        isShow: 1, // 是否显示在菜单栏 0：否，1：是
        code: 'system',
        alias: 'system',
        path: '',
        icon: 'iconfont iconicon_setting',
        children: [
          {
            menuId: '15901120756913',
            menuName: '审批流程',
            menuType: 'Menu',
            isOwn: 1,
            isShow: 1,
            code: 'approval_approval',
            alias: 'approval',
            path: '/approval/approvalProcess',
            icon: 'iconfont iconicon_compile'
          },
          {
            menuId: '159011207569132',
            menuName: '配置流程',
            menuType: 'Menu',
            isOwn: 1,
            isShow: 0,
            code: 'approval_approval',
            alias: 'approval',
            path: '/approval/approvalDetail',
            icon: 'iconfont iconicon_compile'
          },
          {
            menuId: '000000',
            menuName: '我的审批',
            menuType: 'Dir',
            isOwn: 1,
            isShow: 1,
            code: 'approval_approval',
            alias: 'approval',
            path: '',
            icon: 'iconfont iconicon_compile',
            children: [
              {
                menuId: '0000001',
                menuName: '我发起的',
                menuType: 'Menu',
                isOwn: 1,
                isShow: 1,
                code: 'approval_approval',
                alias: 'approval',
                path: '/approval/appr/apprByMe',
                icon: 'iconfont iconicon_compile'
              },
              {
                menuId: '0000002',
                menuName: '审批详情',
                menuType: 'Menu',
                isOwn: 1,
                isShow: 1,
                code: 'approval_approval',
                alias: 'approval',
                path: '/approval/appr/apprDetail',
                icon: 'iconfont iconicon_compile'
              }
            ]
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
