import Mock from 'mockjs'

const normalData = {
  code: 200,
  success: true,
  msg: '操作成功',
  response: ''
}
const list = {
  ...normalData,
  response: {
    totalNum: 20,
    totalPage: 1,
    data: [
      {
        tenantId: '123134',
        tenantName: '租户名称',
        domain: '绑定的域名',
        copyright: '版权',
        logo: 'logo链接',
        favicon: '网站图标URL',
        status: 'Forbid',
        createTime: '2020-09-12 16:16:32'
      },
      {
        tenantId: '6456',
        tenantName: '租户名称',
        domain: '绑定的域名',
        copyright: '版权',
        logo: 'logo链接',
        favicon: '网站图标URL',
        status: 'Normal',
        createTime: '2020-08-12 16:11:32'
      }
    ]
  }
}
const data = {
  ...normalData,
  response: {
    success: true,
    msg: '成功'
  }
}
const rule = {
  ...normalData,
  response: [
    {
      id: '规则ID',
      name: '规则名称',
      rule: '工号生成规则',
      remark: '描述',
      createTime: '创建时间'
    },
    {
      id: '规则ID2',
      name: '规则名称',
      rule: '工号生成规则',
      remark: '描述',
      createTime: '创建时间'
    }
  ]
}
export default ({ mock }) => {
  if (!mock) return
  Mock.mock(new RegExp('/api/sys/v1/tenant/workno/rule' + '*'), 'get', () => {
    return rule
  })
  Mock.mock(new RegExp('/api/sys/v1/tenant' + '.*'), 'get', () => {
    return list
  })
  Mock.mock(new RegExp('/api/sys/v1/tenant' + '*'), 'post', () => {
    return data
  })
  Mock.mock(new RegExp('/api/sys/v1/tenant' + '*'), 'put', () => {
    return data
  })

  Mock.mock(new RegExp('/api/sys/v1/tenant/workno/rule' + '*'), 'post', () => {
    return data
  })
  Mock.mock(new RegExp('/api/sys/v1/tenant/workno/rule' + '*'), 'delete', () => {
    return data
  })
  Mock.mock(new RegExp('/api/sys/v1/tenant/workno/rule' + '*'), 'put', () => {
    return data
  })
}
