import Layout from '@/page/index/'
export default  {
  path: '/grade',
  component: Layout,
  redirect: '/grade/index',
  children: [
    {
      path: 'index',
      name: '等级',
      meta: {
        i18n: 'index'
      },
      component: () =>
        import(/* webpackChunkName: "views" */ '@/views/gradeTree/grade')
    }
  ]
}
