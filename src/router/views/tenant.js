import Layout from '@/page/index'
export default [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/system/tenant',
        name: '商户管理',
        meta: {
          fullscreen: true
        },
        component: () => import(/* webpackChunkName: "page" */ '@/views/system/tenant')
      }
    ]
  }
]
