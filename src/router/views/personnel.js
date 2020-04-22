import Layout from '@/page/index/'
export default {
  path: '/personnel',
  component: Layout,
  children: [
    {
      path: '/personnel/roster',
      name: '员工花名册',
      meta: {
        i18n: 'index'
      },
      component: () => import(/* webpackChunkName: "views" */ '@/views/personnel/roster')
    },
    {
      path: '/personnel/detail',
      name: '员工信息',
      meta: {
        i18n: 'index'
      },
      component: () => import(/* webpackChunkName: "views" */ '@/views/personnel/detail')
    },
    {
      path: '/personnel/addRoster',
      name: '添加员工',
      meta: {
        i18n: 'index'
      },
      component: () => import(/* webpackChunkName: "views" */ '@/views/personnel/addRoster.vue')
    }
  ]
}
