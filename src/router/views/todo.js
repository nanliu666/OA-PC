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
      }
    ]
  }
]
