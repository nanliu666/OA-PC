import Layout from '@/page/index/'
export default {
  path: '/personnel',
  component: Layout,
  redirect: '/personnel/selectedPerson/index',
  children: [
    {
      path: '/personnel/selectedPerson/index',
      name: '候选人管理',
      meta: {
        i18n: 'index'
      },
      component: () =>
        import(/* webpackChunkName: "views" */ '@/views/personnel/candidate/selectedPerson/index')
    }
  ]
}
