import Layout from '@/page/index/'
export default {
  path: '/orgs',
  component: Layout,
  children: [
    {
      path: '/orgs/orgManagement',
      name: '组织机构管理',
      meta: {
        i18n: 'index'
      },
      component: () => import(/* webpackChunkName: "views" */ '@/views/orgs/orgManagement')
    },
    {
      path: '/orgs/orgSort',
      name: '组织机构排序',
      meta: {
        i18n: 'index'
      },
      component: () => import(/* webpackChunkName: "views" */ '@/views/orgs/orgSort')
    },
    {
      path: '/orgs/orgDetail',
      name: '组织机构详情',
      meta: {
        i18n: 'index'
      },
      component: () => import(/* webpackChunkName: "views" */ '@/views/orgs/orgDetail')
    }
  ]
}
