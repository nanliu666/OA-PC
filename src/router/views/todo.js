import Layout from '@/page/index/'
export default [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/todo/todoList',
        name: '待办中心',
        component: () => import(/* webpackChunkName: "views" */ '@/views/todo/todoList')
      },
      {
        path: '/todo/interviewDetail',
        name: '面试详情',
        component: () => import(/* webpackChunkName: "views" */ '@/views/todo/interviewDetail')
      },
      {
        path: '/todo/interviewEdit',
        name: '面试评价',
        component: () => import(/* webpackChunkName: "views" */ '@/views/todo/interviewEdit')
      }
    ]
  }
]
