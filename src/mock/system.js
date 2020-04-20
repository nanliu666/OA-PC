import Mock from 'mockjs'
export default ({ mock }) => {
  if (!mock) return

  //获取表格数据
  Mock.mock(new RegExp('/api/sys/log/v1/action/log'+'.*'), 'get', () => {
      let list=[]
      for (let i = 0; i < 10; i++) {
        list.push(
          Mock.mock({
            id: '@increment',
            tenantId: '@increment',
            userId: '@increment',
            name: '@cname',
            model: '@cname',
            action: '@cname',
            content: '@cname',
            username: '@last',
            'status|1': ['Success', 'Fail'],
            ip:'@increment',
            source:'@cname',
            createTime:'1532932422071',
          })
        )
      }
    return {
        response: {
          totalNum: 50,
          totalPage: 5,
          data:list
      }
    }
  })
}
