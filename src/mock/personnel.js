import Mock from 'mockjs'
export default ({ mock }) => {
  if (!mock) return

  //获取附件分类接口数据
  Mock.mock(new RegExp('/user/v1/user/attachment/category' + '.*'), 'get', () => {
    let list = []
    for (let i = 0; i < 10; i++) {
      list.push(
        Mock.mock({
          id: '@increment',
          name: '@cname',
          iconUrl: 'el-icon-picture-outline',
          maxLimit: '2',
          'type|1': ['员工基本资料', '员工档案资料'],
          sort: '0'
        })
      )
    }
    return {
      response: {
        data: list
      }
    }
  })
  //获取附件接口数据
  Mock.mock(new RegExp('user/v1/user/attachment/info' + '.*'), 'get', () => {
    let list = []
    for (let i = 0; i < 5; i++) {
      list.push(
        Mock.mock({
          id: '@increment',
          userId: '@increment',
          name: '@cname',
          'url|1': [
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          ],
          categoryId: '555',
          updateTime: '454548784112',
          createTime: '454548784112'
        })
      )
    }
    return {
      response: {
        data: list
      }
    }
  })
}
