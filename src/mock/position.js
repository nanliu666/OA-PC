import Mock from 'mockjs'

const normalData = {
  code: 200,
  success: true,
  msg: '操作成功',
  response: ''
}

const data = {
  ...normalData,
  response: {
    totalNum: 20,
    totalPage: 1,
    data: [
      {
        categoryId: '1',
        categoryName: '未分类',
        jobNum: 5
      },
      {
        categoryId: '2',
        categoryName: '设计类',
        jobNum: 4
      },
      {
        categoryId: '3',
        categoryName: '家具类',
        jobNum: 4
      },
      {
        categoryId: '4',
        categoryName: '测试类',
        jobNum: 4
      },
      {
        id: '5',
        categoryName: '前端类',
        jobNum: 4
      }
    ]
  }
}
let jod = {
  ...normalData,
  response: {
    totalNum: 20,
    totalPage: 1,
    data: [
      {
        jobId: '123',
        jobName: '研发',
        userNum: '12',
        workNum: 150,
        remark: '描述',
        updateTime: '2020-02-12',
        createTime: '2020-02-11',
        orgId: '1',
        orgName: '怡宝',
        parentId: '1',
        parentName: '医保',
        categoryId: '1'
      },
      {
        jobId: '123',
        jobName: '研发',
        userNum: '12',
        workNum: 150,
        remark: '描述',
        updateTime: '2020-02-12',
        createTime: '2020-02-11',
        orgId: '1',
        orgName: '怡宝',
        parentId: '1',
        parentName: '医保',
        categoryId: '2'
      },
      {
        jobId: '123',
        jobName: '研发',
        userNum: '12',
        workNum: 0,
        remark: '描述',
        updateTime: '2020-02-12',
        createTime: '2020-02-11',
        orgId: '1',
        orgName: '怡宝',
        parentId: '1',
        parentName: '医保',
        categoryId: '3'
      }
    ]
  }
}
const json = {
  ...normalData,
  response: { code: 200, success: true, msg: '新增成功' }
}
const deletes = {
  ...normalData,
  response: { code: 200, success: true, msg: '删除成功' }
}
const modity = {
  ...normalData,
  response: { code: 200, success: true, msg: '修改成功' }
}
const define = {
  ...normalData,
  response: {
    totalNum: 30,
    totalPage: 1,
    data: [
      {
        id: '1',
        name: '未分类',
        remark: '默认项',
        isDefault: 1,
        jobNum: '1',
        userNum: '1',
        workNum: 1,
        updateTime: '2020-09-10',
        createTime: '2020-01-02'
      },
      {
        id: '2',
        name: '前端',
        remark: 'javasript',
        isDefault: 0,
        jobNum: '10',
        userNum: '10',
        workNum: 5,
        updateTime: '2020-09-10',
        createTime: '2020-01-02'
      },
      {
        id: '3',
        name: '后台',
        remark: 'java',
        isDefault: 0,
        jobNum: '6',
        userNum: '5',
        workNum: 6,
        updateTime: '2020-09-10',
        createTime: '2020-01-02'
      },
      {
        id: '4',
        name: '设计',
        remark: 'ui设计',
        isDefault: 0,
        jobNum: '4',
        userNum: '1',
        workNum: 0,
        updateTime: '2020-09-10',
        createTime: '2020-01-02'
      }
    ]
  }
}
const station = {
  ...normalData,
  response: [
    {
      id: '1',
      name: '文员',
      userNum: 2,
      workNum: 1,
      remark: '是否士大夫',
      updateTime: '文员',
      createTime: '2019-10-20'
    },
    {
      id: '2',
      name: '经理级',
      userNum: 2,
      workNum: 1,
      remark: '是否',
      updateTime: '文员',
      createTime: '2019-10-20'
    },
    {
      id: '3',
      name: '总经理级',
      userNum: 2,
      workNum: 1,
      remark: '发士是',
      updateTime: '文员',
      createTime: '2019-10-20'
    },
    {
      id: '4',
      name: '超级文员',
      userNum: 2,
      workNum: 0,
      remark: '阿斯蒂芬',
      updateTime: '文员',
      createTime: '2019-10-20'
    }
  ]
}

export default ({ mock }) => {
  if (!mock) return
  Mock.mock(new RegExp('/api' + '.*'), 'get', () => {
    return data
  })
  Mock.mock(new RegExp('/api/org/v1/job/category/define' + '.*'), 'get', () => {
    return define
  })
  Mock.mock(new RegExp('/api/org/v1/job/category/define' + '.*'), 'delete', () => {
    return deletes
  })
  Mock.mock(new RegExp('/api/org/v1/job/category/define' + '.*'), 'post', () => {
    return json
  })
  Mock.mock(new RegExp('/api/org/v1/job/category/define' + '.*'), 'put', () => {
    return modity
  })
  Mock.mock(new RegExp('/api/org/v1/job' + '.*'), 'get', (url) => {
    if (url.url.indexOf('define') > 0) {
      jod = define
    }
    return jod
  })
  Mock.mock(new RegExp('/api/org/v1/job' + '.*'), 'post', () => {
    return json
  })
  Mock.mock(new RegExp('/api/org/v1/job' + '.*'), 'put', () => {
    return json
  })
  Mock.mock(new RegExp('/api/org/v1/job' + '.*'), 'delete', () => {
    return deletes
  })
  Mock.mock(new RegExp('/api/org/v1/position' + '.*'), 'get', () => {
    return station
  })
  Mock.mock(new RegExp('/api/org/v1/position' + '.*'), 'delete', () => {
    return deletes
  })
  Mock.mock(new RegExp('/api/org/v1/position' + '.*'), 'post', () => {
    return json
  })
  Mock.mock(new RegExp('/api/org/v1/position' + '.*'), 'put', () => {
    return modity
  })
}
