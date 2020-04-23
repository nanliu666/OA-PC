import Layout from '@/page/index/'
export default {
  path: '/grade',
  component: Layout,
  redirect: '/grade/index',
  children: [
    {
      path: 'index',
      name: '结构树',
      meta: {
        i18n: 'index'
      },
      component: () => import(/* webpackChunkName: "views" */ '@/views/gradeTree/grade')
    },
    {
      path: 'position',
      name: '职位管理',
      meta: {
        i18n: 'index'
      },
      component: () => import(/* webpackChunkName: "views" */ '@/views/gradeTree/position/index')
    },
    {
      path: 'category',
      name: '职位类别',
      meta: {
        i18n: 'index'
      },
      component: () => import(/* webpackChunkName: "views" */ '@/views/gradeTree/position/category')
    },
    {
      path: 'station',
      name: '岗位管理',
      meta: {
        i18n: 'index'
      },
      component: () => import(/* webpackChunkName: "views" */ '@/views/gradeTree/position/station')
    }
  ]
}
