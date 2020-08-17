import Layout from '@/page/index/'

export default [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/todo/todoList',
        name: '待办中心',
        meta: {
          fullscreen: true
        },
        component: () => import('@/views/todo/todoList')
      },
      {
        path: '/todo/interviewDetail',
        name: '面试详情',
        meta: {
          fullscreen: true
        },
        component: () => import('@/views/todo/interviewDetail')
      },
      {
        path: '/todo/interviewEdit',
        name: '面试评价',
        meta: {
          fullscreen: true
        },
        component: () => import('@/views/todo/interviewEdit')
      },
      {
        path: '/todo/resumeReview',
        name: '简历审核',
        meta: {
          fullscreen: true
        },
        component: () => import('@/views/todo/resumeReview')
      },
      {
        path: '/msg/msg',
        name: '消息中心',
        meta: {
          fullscreen: true
        },
        component: () => import('@/views/msg/msg')
      },
      {
        path: '/todo/leaveListOrg',
        name: '离职事项（部门）',
        meta: {
          fullscreen: true
        },
        component: () => import('@/views/todo/leaveList/leaveListOrg')
      },
      {
        path: '/todo/leaveListUser',
        name: '离职事项（员工）',
        meta: {
          fullscreen: true
        },
        component: () => import('@/views/todo/leaveList/leaveListUser')
      }
    ]
  }
]
