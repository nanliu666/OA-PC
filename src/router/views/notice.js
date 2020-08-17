import Layout from '@/page/index/'
export default [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/noticeCenter/noticeManage',
        name: '公告管理',
        component: () => import('@/views/noticeCenter/noticeManage')
      },
      {
        path: '/noticeCenter/noticePubulishList',
        name: '已发布的',
        component: () => import('@/views/noticeCenter/noticePubulishList')
      },
      {
        path: '/noticeCenter/noticeDrafts',
        name: '草稿箱',
        component: () => import('@/views/noticeCenter/noticeDrafts')
      },
      {
        path: '/noticeCenter/noticeEdit',
        name: '发布公告',
        component: () => import('@/views/noticeCenter/noticeEdit')
      }
    ]
  }
]
