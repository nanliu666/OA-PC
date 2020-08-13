import Mock from 'mockjs'
export default ({ mock }) => {
  if (!mock) return
  const normalData = {
    code: 200,
    success: true,
    msg: '操作成功',
    response: ''
  }
  // 新闻列表查询接口
  Mock.mock(new RegExp('/news/v1/news/center' + '.*'), 'get', () => {
    const response = _.times(6, () =>
      Mock.mock({
        id: '@integer(100000, 10000000000)',
        categoryId: '@integer(100000, 10000000000)',
        title: '@ctitle(20,40)',
        categoryName: '@cparagraph(1, 2)',
        readNum: '@integer(1, 100)',
        'isTop|1': [1, 0],
        publishTime: '@date()',
        publishUserId: '@integer(1, 100)',
        publishUserName: '@cname',
        picUrl: Mock.Random.image(),
        brief: '@ctitle(1,3)'
      })
    )
    const res = {
      ...normalData,
      response: response
    }
    return res
  })
}
