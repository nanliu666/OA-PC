import Layout from '@/page/index/'
export default {
  path: '/approval',
  component: Layout,
  redirect: '/approval/index',
  children: [
    {
      path: 'index',
      name: '审批流程',
      meta: {
        i18n: 'index'
      },
      component: () => import('@/views/Approval/ApprovalProcess')
    },
    {
      path: 'approvalDetail',
      name: '配置流程',
      meta: {
        i18n: 'index'
      },
      component: () => import('@/views/Approval/approvalDetail')
    }
  ]
}
