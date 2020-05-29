import Layout from '@/page/index/'
import LayoutNoSidebar from '@/page/index/layoutNoSidebar'
export default [
  {
    path: '/wel',
    component: LayoutNoSidebar,
    redirect: '/wel/index',
    children: [
      {
        path: 'index',
        name: '首页',
        meta: {
          i18n: 'dashboard'
        },
        component: () => import(/* webpackChunkName: "views" */ '@/views/wel/index')
      },
      {
        path: 'dashboard',
        name: '控制台',
        meta: {
          i18n: 'dashboard',
          menu: false
        },
        component: () => import(/* webpackChunkName: "views" */ '@/views/wel/dashboard')
      }
    ]
  },
  {
    path: '/info',
    component: Layout,
    redirect: '/info/index',
    children: [
      {
        path: 'index',
        name: '个人信息',
        meta: {
          i18n: 'info'
        },
        component: () => import(/* webpackChunkName: "views" */ '@/views/system/userinfo')
      },
      {
        path: 'securitySetting',
        name: '安全设置',
        component: () => import(/* webpackChunkName: "views" */ '@/views/system/securitySetting')
      }
    ]
  },
  {
    path: '/work/process/leave',
    component: Layout,
    redirect: '/work/process/leave/form',
    children: [
      {
        path: 'form/:processDefinitionId',
        name: '请假流程',
        meta: {
          i18n: 'work'
        },
        component: () => import(/* webpackChunkName: "views" */ '@/views/work/process/leave/form')
      },
      {
        path: 'handle/:taskId/:processInstanceId/:businessId',
        name: '处理请假流程',
        meta: {
          i18n: 'work'
        },
        component: () => import(/* webpackChunkName: "views" */ '@/views/work/process/leave/handle')
      },
      {
        path: 'detail/:processInstanceId/:businessId',
        name: '请假流程详情',
        meta: {
          i18n: 'work'
        },
        component: () => import(/* webpackChunkName: "views" */ '@/views/work/process/leave/detail')
      }
    ]
  },
  process.env.NODE_ENV === 'development'
    ? {
        path: '/demo',
        component: LayoutNoSidebar,
        redirect: '/demo/form',
        children: [
          {
            path: 'form',
            name: '测试表单页',
            component: () => import(/* webpackChunkName: "page" */ '@/views/demo/demoForm')
          }
        ]
      }
    : null
]
