import LayoutNoSidebar from '@/page/index/layoutNoSidebar'
export default [
  {
    path: '/demo',
    component: LayoutNoSidebar,
    redirect: '/demo/form',
    children: [
      {
        path: 'form',
        name: '测试表单页',
        component: () => import(/* webpackChunkName: "page" */ '@/views/demo/demoForm')
      }
    ]
  }
]
