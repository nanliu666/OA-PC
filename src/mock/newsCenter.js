/**
 * @file 数据看板 mock数据
 */

import Mock from 'mockjs'

// 解析查询字符串
const urlDecode = (url) =>
  _.fromPairs(
    _.replace(url, /^[^?]*\?/, '')
      .split('&')
      .map((p) => p.split('=').map((p) => decodeURIComponent(p)))
  )

const RESPONSE_COMMON = {
  resCode: 200,
  resMsg: 'success(mock)'
}

export default ({ mock }) => {
  if (!mock) {
    return
  }

  // -----> 新闻管理页面接口
  // 新闻置顶接口	POST
  Mock.mock(new RegExp('/news/v1/news/top' + '(\\?.*)?$'), 'post', (req) => {
    const response = {}
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 新闻发布接口	POST
  Mock.mock(new RegExp('/news/v1/news/publish' + '(\\?.*)?$'), 'post', (req) => {
    const response = {}
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 新闻详情查询接口	GET
  Mock.mock(new RegExp('/news/v1/news/detail' + '(\\?.*)?$'), 'get', (req) => {
    const { id } = urlDecode(req.url)
    const response = Mock.mock({
      id: id,
      title: '@ctitle()',
      categoryId: '@id()',
      categoryName: '@cname()',
      readNum: _.random(100),
      isTop: _.random(),
      publishTime: '@date("yyyy-MM-dd HH:mm:ss")',
      publishUserId: '@id()',
      publishUserName: '@cname()',
      picUrl: '@image()',
      content: '@cparagraph(10)'
    })
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 新闻分类排序接口	POST
  Mock.mock(new RegExp('/news/v1/news/category/sort' + '(\\?.*)?$'), 'post', (req) => {
    // TODO: 暂时不用实现栏目排序的功能.
    const response = {}
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 新闻分类新增接口	POST
  Mock.mock(new RegExp('/news/v1/news/category' + '(\\?.*)?$'), 'post', (req) => {
    const response = {}
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 新闻分类修改接口	PUT
  Mock.mock(new RegExp('/news/v1/news/category' + '(\\?.*)?$'), 'put', (req) => {
    const response = {}
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 新闻分类查询接口	GET
  Mock.mock(new RegExp('/news/v1/news/category' + '(\\?.*)?$'), 'get', (req) => {
    const response = _.times(10, (i) =>
      Mock.mock({
        id: '@id()',
        name: '@ctitle()',
        sort: i + 1
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 新闻分类删除接口	DEL
  Mock.mock(new RegExp('/news/v1/news/category' + '(\\?.*)?$'), 'delete', (req) => {
    const response = {}
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 新闻创建接口	POST
  Mock.mock(new RegExp('/news/v1/news' + '(\\?.*)?$'), 'post', (req) => {
    const response = Mock.mock({
      id: '@id()'
    })
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 新闻查询接口	GET
  Mock.mock(new RegExp('/news/v1/news' + '(\\?.*)?$'), 'get', (req) => {
    const response = _.times(10, () =>
      Mock.mock({
        id: '@id()',
        title: '@ctitle()',
        categoryId: '@id()',
        categoryName: '@cname()',
        readNum: _.random(100),
        isTop: _.random(),
        publishTime: '@date("yyyy-MM-dd HH:mm:ss")',
        publishUserId: '@id()',
        publishUserName: '@cname()',
        status: _.random() ? 'Published' : 'Draft',
        createTime: '@date("yyyy-MM-dd HH:mm:ss")'
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults(
      {
        response: {
          totalNum: 100,
          totalPage: 10,
          data: response
        }
      },
      RESPONSE_COMMON
    )
  })

  // 新闻修改接口	PUT
  Mock.mock(new RegExp('/news/v1/news' + '(\\?.*)?$'), 'put', (req) => {
    const response = {}
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 新闻删除接口	DEL
  Mock.mock(new RegExp('/news/v1/news' + '(\\?.*)?$'), 'delete', (req) => {
    const response = {}
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // -----> 新闻中心

  // 新闻列表查询
  Mock.mock(new RegExp('/news/v1/news/center' + '(\\?.*)?$'), 'get', (req) => {
    const { pageNo, pageSize } = urlDecode(req.url)
    let flagCount = 0

    const response = _.concat(
      // 头条 数量少于等于五
      // DEBUG: 测试标题长度
      _.eq(+pageNo, 1)
        ? _.times((flagCount += _.random(5)), () =>
            Mock.mock({
              id: '@id()',
              title: '@ctitle()',
              categoryId: '@id()',
              categoryName: '@cname()',
              readNum: _.random(100),
              isTop: 1,
              publishUserName: '@cname()',
              publishTime: '@date("yyyy-MM-dd HH:mm:ss")',
              publishUserId: '@id()',
              picUrl: '@image()',
              brief: '@cparagraph()'
            })
          )
        : [],
      _.times(pageSize - flagCount, () =>
        Mock.mock({
          id: '@id()',
          title: '@ctitle()',
          categoryId: '@id()',
          categoryName: '@cname()',
          readNum: _.random(100),
          isTop: 0,
          publishUserName: '@cname()',
          publishTime: '@date("yyyy-MM-dd HH:mm:ss")',
          publishUserId: '@id()',
          picUrl: '@image()',
          brief: '@cparagraph()'
        })
      )
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults(
      {
        response: {
          totalNum: 100,
          totalPage: 10,
          data: response
        }
      },
      RESPONSE_COMMON
    )
  })

  // 新闻详情查询
  Mock.mock(new RegExp('/news/v1/news/center/detail' + '(\\?.*)?$'), 'get', (req) => {
    const { id } = urlDecode(req.url)
    const response = Mock.mock({
      id: id,
      title: '@ctitle()',
      categoryId: '@id()',
      categoryName: '@cname()',
      readNum: _.random(100),
      isTop: _.random(),
      publishTime: '@date("yyyy-MM-dd HH:mm:ss")',
      publishUserId: '@id()',
      publishUserName: '@cname()',
      picUrl: '@image()',
      content: '@cparagraph(10)'
    })
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })
}
