import Mock from 'mockjs'
export default ({ mock }) => {
  if (!mock) return
  const normalData = {
    code: 200,
    success: true,
    msg: '操作成功',
    response: ''
  }
  // 公告查询接口
  Mock.mock(new RegExp('/api/notice/v1/notice/center' + '(\\?.*)?$'), 'get', () => {
    const response = _.times(10, () =>
      Mock.mock({
        id: '@integer(100000, 10000000000)',
        title: '@cparagraph(1, 2)',
        readNum: '@integer(1, 100)',
        publishTime: '@date()',
        publishUserId: '@integer(1, 100)',
        publishUserName: '@cname'
      })
    )
    const res = {
      ...normalData,
      response: {
        totalNum: 100,
        totalPage: 10,
        data: response
      }
    }
    return res
  })
  // 公告详情查询接口
  Mock.mock(new RegExp('/api/notice/v1/notice/center/detail' + '(\\?.*)?$'), 'get', () => {
    const response = Mock.mock({
      id: '@integer(100000, 10000000000)',
      title: '@cparagraph(1, 2)',
      readNum: '@integer(1, 100)',
      publishTime: '@date()',
      publishUserId: '@integer(1, 100)',
      publishUserName: '@cname',
      content: '@cparagraph(2, 4)',
      attachment: [
        {
          name: 'pdf',
          url: 'http://www.ccit.js.cn/2020zlbg.pdf'
        },
        {
          name: 'word',
          url: 'http://js.jrjimg.cn/ad/2020canxuanbiao.docx'
        }
      ]
    })
    const res = {
      ...normalData,
      response: response
    }
    return res
  })
}
