import Layout from '@/page/index/'
export default {
  path: '/selectedPerson',
  component: Layout,
  redirect: '/selectedPerson/index',
  children: [
    {
      path: 'index',
      name: '候选人管理',
      meta: {
        i18n: 'index'
      },
      component: () => import(/* webpackChunkName: "views" */ '@/views/selectedPerson/index')
    }
  ]
}
