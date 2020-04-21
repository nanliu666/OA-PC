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
      path: '/personnel/addRoster',
      name: '添加员工',
      meta: {
        i18n: 'index'
      },
      component: () => import(/* webpackChunkName: "views" */ '@/views/personnel/addRoster.vue')
    }
  ]
}
