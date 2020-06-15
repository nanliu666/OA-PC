// import Layout from '@/page/index/'
import LayoutNoSidebar from '@/page/index/layoutNoSidebar'

export default [
  {
    path: '',
    component: LayoutNoSidebar,
    children: [
      {
        path: '/todo/todoList',
        name: '待办中心',
        component: () => import(/* webpackChunkName: "views" */ '@/views/todo/todoList')
      },
      {
        path: '/todo/resumeReview',
        name: '简历审核',
        component: () => import(/* webpackChunkName: "views" */ '@/views/todo/resumeReview')
      }
    ]
  }
]
