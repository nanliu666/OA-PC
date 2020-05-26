import Layout from '@/page/index/'
export default {
  path: '/contract',
  component: Layout,
  redirect: '/contract/index',
  children: [
    {
      path: 'index',
      name: '合同管理',
      meta: {
        i18n: 'index'
      },
      component: () => import(/* webpackChunkName: "views" */ '@/views/personnel/contract/contract')
    },
    {
      path: 'renewal',
      name: '续签合同',
      meta: {
        i18n: 'index'
      },
      component: () => import(/* webpackChunkName: "views" */ '@/views/personnel/contract/renewal')
    },
    {
      path: 'signedContract',
      name: '签订合同',
      meta: {
        i18n: 'index'
      },
      component: () =>
        import(/* webpackChunkName: "views" */ '@/views/personnel/contract/signedContract')
    }
  ]
}
