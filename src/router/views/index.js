import Layout from '@/page/index/'
import ProcessDesign from '@/views/processDesign/ProcessDesign'
import demoRoutes from './demo'
import todo from './todo'
import tenant from './tenant'
export default [
  {
    path: '/',
    redirect: '/wel'
  },
  {
    path: '/process/design',
    name: '流程设计器',
    component: ProcessDesign,
    meta: {
      keepAlive: true,
      isTab: false
    }
  },
  {
    path: '/wel',
    component: Layout,
    redirect: '/wel/index',
    children: [
      {
        path: 'index',
        name: '工作台',
        meta: {
          i18n: 'dashboard',
          fullscreen: true
        },
        component: () => import('@/views/wel/index')
      },
      {
        path: 'dashboard',
        name: '控制台',
        meta: {
          i18n: 'dashboard',
          menu: false
        },
        component: () => import('@/views/wel/dashboard')
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
        component: () => import('@/views/system/userinfo')
      },
      {
        path: 'securitySetting',
        name: '安全设置',
        component: () => import('@/views/system/securitySetting')
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/personnel/administration/apply',
        name: '转正申请',
        component: () => import('@/views/personnel/administration/apply')
      },
      {
        path: '/personnel/leave/applyLeave',
        name: '离职申请',
        component: () => import('@/views/personnel/leave/applyLeave')
      }
    ]
  },
  {
    path: '/taskCenter/taskCenter',
    name: '任务中心',
    meta: {
      fullscreen: true
    },
    component: () => import('@/views/taskCenter/taskCenter')
  },
  {
    path: '/quickAccess/mailList',
    name: '通讯录',
    meta: {
      fullscreen: true
    },
    component: () => import('@/views/quickAccess/mailList')
  },
  {
    path: '/taskCenter/scheduleCenter',
    name: '日程中心',
    meta: {
      fullscreen: true
    },
    component: () => import('@/views/taskCenter/scheduleCenter')
  },
  {
    component: Layout,
    path: '/noticeCenter',
    name: '通知公告',
    children: [
      {
        path: '/noticeCenter/noticeList',
        name: '通知公告',
        component: () => import('@/views/noticeCenter/noticeList')
      },
      {
        path: '/noticeCenter/noticeDetail',
        name: '通知详情',
        component: () => import('@/views/noticeCenter/noticeDetail')
      }
    ]
  },
  ...todo,
  ...tenant,
  ...(process.env.NODE_ENV === 'development' ? demoRoutes : [])
]
