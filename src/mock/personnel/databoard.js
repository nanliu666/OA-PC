/**
 * @file 数据看板 mock数据
 */
import Mock from 'mockjs'
import moment from 'moment'

const RESPONSE_COMMON = {
  resCode: 200,
  resMsg: 'success(mock)'
}

const RECRUITMENT_CHANNEL_DICTS = [
  '1', //	"前程无忧"
  '2', //	"智联招聘"
  '3', //	"拉勾网"
  '4', //	"猎聘网"
  '5', //	"中国人才热线"
  '6', //	"58同城"
  '7', //	"BOSS直聘"
  '8', //	"内部举荐"
  '9', //	"员工推荐"
  '10', //	"微信招聘"
  '11', //	"中华英才网"
  '12', //	"大街网"
  '13', //	"赶集网"
  '14' //	"其他"
]

const EDUCATIONAL_LEVEL_DICTS = [
  'Primary', //	"小学"
  'Juniormiddle', //	"初中"
  'High', //	"高中"
  'JuniorCollege', //	"大专"
  'Undergraduate', //	"本科"
  'Master', //	"硕士"
  'Doctor', //	"博士"
  'PostDoctoral', //	"博士后"
  'VocationalHigh', //	"职高"
  'SecondarySpecialized', //	"中专"
  'Technical', //	"技校"
  'SecondaryNormal', //	"中等师范学校"
  'Other' //	"其他"
]

// 离职原因字典组
const LEAVE_REASON_DICTS = [
  'A01', //	"家庭原因"
  'A02', //	"身体原因"
  'A03', //	"薪资原因"
  'A04', //	"交通不便"
  'A05', //	"工作压力"
  'A06', //	"管理问题"
  'A07', //	"无晋升机会"
  'A08', //	"职业规划"
  'A09', //	"合同到期放弃续签"
  'A10', //	"其他个人原因"
  'B01', //	"试用期内辞退"
  'B02', //	"违反公司条例"
  'B03', //	"组织调整/裁员"
  'B04', //	"绩效不达标辞退"
  'B05', //	"合同到期不续签"
  'B06' //	"其他原因被动离职"
]

const WORK_PROPERTY_DICTS = [
  'FullTime', //	"全职"
  'Trainee', //	"实习生"
  'PartTime', //	"兼职"
  'Labor', //	"劳务派遣"
  'Retirement', //	"退休返聘"
  'LaborOutsourcing' //	"劳务外包"
]

const NATION_DICTS = [
  'Dongxiang', //	"东乡族"
  'Uzbek', //	"乌兹别克族"
  'Jing', //	"京族"
  'Gelao', //	"仡佬族"
  'Mulao', //	"仫佬族"
  'Wa', //	"佤族"
  'Dong', //	"侗族"
  'Russian', //	"俄罗斯族"
  'SecurityGuard', //	"保安族"
  'Lisu', //	"傈僳族"
  'Dai', //	"傣族"
  'Hani', //	"哈尼族"
  'Kazak', //	"哈萨克族"
  'Hui', //	"回族"
  'Tujia', //	"土家族"
  'Tu', //	"土族"
  'Kino', //	"基诺族"
  'Tajik', //	"塔吉克族"
  'zang', //	"藏族"
  'Tatar', //	"塔塔尔族"
  'Zhuang', //	"壮族"
  'Buyi', //	"布依族"
  'Brawn', //	"布朗族"
  'Yi', //	"彝族"
  'Deang', //	"德昂族"
  'Nu', //	"怒族"
  'Lahu', //	"拉祜族"
  'Salar', //	"撒拉族"
  'Pumi', //	"普米族"
  'Jingpo', //	"景颇族"
  'Korean', //	"朝鲜族"
  'Kirgiz', //	"柯尔克孜族"
  'Maonan', //	"毛南族"
  'Shui', //	"水族"
  'Han', //	"汉族"
  'Manchu', //	"满族"
  'Dulong', //	"独龙族"
  'Lhoba', //	"珞巴族"
  'Yao', //	"瑶族"
  'SheEthnic', //	"畲族"
  'Bai', //	"白族"
  'Naxi', //	"纳西族"
  'UygurEthnic', //	"维吾尔族"
  'Qiang', //	"羌族"
  'Miao', //	"苗族"
  'Mongolian', //	"蒙古族"
  'Yugur', //	"裕固族"
  'Hezhe', //	"赫哲族"
  'Daur', //	"达斡尔族"
  'Oroqen', //	"鄂伦春族"
  'Ewenki', //	"鄂温克族"
  'Xibo', //	"锡伯族"
  'Menba', //	"门巴族"
  'Achang', //	"阿昌族"
  'Gaoshan', //	"高山族"
  'Li' //	"黎族"
]

export default ({ mock }) => {
  if (!mock) {
    return
  }

  // ----->  1. 统计概况

  // 在职人数统计查询接口
  Mock.mock(new RegExp('/data/v1/data/stat/workNum' + '(\\?.*)?$'), 'get', (req) => {
    const response = Mock.mock({ workNum: '@integer(0,100)' })
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 各部门在职人数查询接口
  Mock.mock(new RegExp('/data/v1/data/stat/org/workNum' + '(\\?.*)?$'), 'get', (req) => {
    const response = _.times(10, () =>
      Mock.mock({
        workNum: _.random(100),
        orgId: '@id()',
        orgName: '@cword(2)集团'
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 各部门月员工离职率查询接口
  Mock.mock(new RegExp('/data/v1/data/stat/org/leaveRate' + '(\\?.*)?$'), 'get', (req) => {
    const response = _.times(10, () =>
      Mock.mock({
        workNum: _.random(100),
        leaveNum: _.random(100),
        leaveRate: _.random(true),
        orgId: '@id()',
        orgName: '@cword(2)集团'
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 各部门离职人数查询接口
  Mock.mock(new RegExp('/data/v1/data/stat/org/leaveNum' + '(\\?.*)?$'), 'get', (req) => {
    const response = _.times(10, () =>
      Mock.mock({
        leaveNum: _.random(100),
        orgId: '@id()',
        orgName: '@cword(2)集团'
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 各部门转正人数查询接口
  Mock.mock(new RegExp('/data/v1/data/stat/org/formalNum' + '(\\?.*)?$'), 'get', (req) => {
    const response = _.times(10, () =>
      Mock.mock({
        formalNum: _.random(100),
        orgId: '@id()',
        orgName: '@cword(2)集团'
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 各部门月员工新进率查询接口
  Mock.mock(new RegExp('/data/v1/data/stat/org/entryRate' + '(\\?.*)?$'), 'get', (req) => {
    const response = _.times(10, () =>
      Mock.mock({
        workNum: _.random(100),
        entryNum: _.random(100),
        entryRate: _.random(true),
        orgId: '@id()',
        orgName: '@cword(2)集团'
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 各部门入职人数查询接口
  Mock.mock(new RegExp('/data/v1/data/stat/org/entryNum' + '(\\?.*)?$'), 'get', (req) => {
    const response = _.times(10, () =>
      Mock.mock({
        entryNum: _.random(100),
        orgId: '@id()',
        orgName: '@cword(2)集团'
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 各部门月员工进出比率查询接口
  Mock.mock(new RegExp('/data/v1/data/stat/org/entryAndLeave' + '(\\?.*)?$'), 'get', (req) => {
    const response = _.times(10, () =>
      Mock.mock({
        entryNum: _.random(100),
        leaveNum: _.random(100),
        orgId: '@id()',
        orgName: '@cword(2)集团'
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 各部门异动人数查询接口
  Mock.mock(new RegExp('/data/v1/data/stat/org/changeNum' + '(\\?.*)?$'), 'get', (req) => {
    const response = _.times(10, () =>
      Mock.mock({
        changeNum: _.random(100),
        orgId: '@id()',
        orgName: '@cword(2)集团'
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 离职原因分析统计查询接口
  Mock.mock(new RegExp('/data/v1/data/stat/leaveReason' + '(\\?.*)?$'), 'get', (req) => {
    const response = _.times(_.size(LEAVE_REASON_DICTS), (i) =>
      Mock.mock({
        leaveNum: _.random(100), // 离职人数
        reason: LEAVE_REASON_DICTS[i] // 离职原因
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 离职人数统计查询接口
  Mock.mock(new RegExp('/data/v1/data/stat/leaveNum' + '(\\?.*)?$'), 'get', (req) => {
    const response = Mock.mock({
      leaveNum: _.random(100)
    })
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 转正人数统计查询接口
  Mock.mock(new RegExp('/data/v1/data/stat/formalNum' + '(\\?.*)?$'), 'get', (req) => {
    const response = Mock.mock({
      formalNum: _.random(100)
    })
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 入职人数统计查询接口
  Mock.mock(new RegExp('/data/v1/data/stat/entryNum' + '(\\?.*)?$'), 'get', (req) => {
    const response = Mock.mock({
      entryNum: _.random(100)
    })
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 人事异动人数统计查询接口
  Mock.mock(new RegExp('/data/v1/data/stat/changeNum' + '(\\?.*)?$'), 'get', (req) => {
    const response = Mock.mock({
      changeNum: _.random(100)
    })
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // ----->  2. 员工概况

  // 员工年代分布查询接口
  Mock.mock(new RegExp('/data/v1/data/user/year' + '(\\?.*)?$'), 'get', (req) => {
    const YAER_NAME = ['60后', '70后', '80后', '90后', '00后', '10后']
    const response = _.times(_.size(YAER_NAME), (i) =>
      Mock.mock({
        workNum: _.random(100),
        sex: _.random(),
        yearName: YAER_NAME[i]
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 员工工作性质查询接口
  Mock.mock(new RegExp('/data/v1/data/user/workProperty' + '(\\?.*)?$'), 'get', (req) => {
    const response = _.times(_.size(WORK_PROPERTY_DICTS), (i) =>
      Mock.mock({
        workNum: _.random(100),
        workProperty: WORK_PROPERTY_DICTS[i]
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 员工工龄查询接口
  Mock.mock(new RegExp('/data/v1/data/user/workAge' + '(\\?.*)?$'), 'get', (req) => {
    const AGE_NAME = ['3年内', '3-10年', '10-20年', '20年以上', 'Other']
    const response = _.times(_.size(AGE_NAME), (i) =>
      Mock.mock({
        workNum: _.random(100),
        ageName: AGE_NAME[i]
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 员工工作地省份分布查询接口
  Mock.mock(new RegExp('/data/v1/data/user/work/province' + '(\\?.*)?$'), 'get', (req) => {
    const response = Mock.mock({
      workNum: _.random(100),
      provinceCode: '@word(2)',
      provinceName: '@cword(2)'
    })
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 员工工作地地市分布查询接口
  Mock.mock(new RegExp('/data/v1/data/user/work/city' + '(\\?.*)?$'), 'get', (req) => {
    const response = _.times(10, () =>
      Mock.mock({
        workNum: _.random(100),
        cityCode: '@word(2)',
        cityName: '@cword(2)'
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 员工性别查询接口
  Mock.mock(new RegExp('/data/v1/data/user/sex' + '(\\?.*)?$'), 'get', (req) => {
    const response = _.times(2, (i) =>
      Mock.mock({
        workNum: _.random(100),
        sex: i
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 员工岗位类别查询接口
  Mock.mock(new RegExp('/data/v1/data/user/position' + '(\\?.*)?$'), 'get', (req) => {
    const response = _.times(10, () =>
      Mock.mock({
        workNum: _.random(100),
        positionId: '@id()',
        positionName: '@cword(2)岗位'
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 员工籍贯省份分布查询接口
  Mock.mock(new RegExp('/data/v1/data/user/native/province' + '(\\?.*)?$'), 'get', (req) => {
    const response = _.times(10, () =>
      Mock.mock({
        workNum: _.random(100),
        provinceCode: '@word(2)',
        provinceName: '@cword(2)'
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 员工籍贯地市分布查询接口
  Mock.mock(new RegExp('/data/v1/data/user/native/city' + '(\\?.*)?$'), 'get', (req) => {
    const response = _.times(10, () =>
      Mock.mock({
        workNum: _.random(100),
        cityCode: '@word(2)',
        cityName: '@cword(2)'
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 员工民族查询接口
  Mock.mock(new RegExp('/data/v1/data/user/nation' + '(\\?.*)?$'), 'get', (req) => {
    const response = _.times(_.size(NATION_DICTS), (i) =>
      Mock.mock({
        workNum: _.random(100),
        nation: NATION_DICTS[i]
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 员工婚育状况查询接口
  Mock.mock(new RegExp('/data/v1/data/user/marriage' + '(\\?.*)?$'), 'get', (req) => {
    const response = _.concat(
      _.times(3, (i) =>
        Mock.mock({
          workNum: _.random(100),
          sex: 0,
          marriage: i
        })
      ),
      _.times(3, (i) =>
        Mock.mock({
          workNum: _.random(100),
          sex: 1,
          marriage: i
        })
      )
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 员工学历查询接口
  Mock.mock(new RegExp('/data/v1/data/user/educationalLevel' + '(\\?.*)?$'), 'get', (req) => {
    const response = _.times(_.size(EDUCATIONAL_LEVEL_DICTS), (i) =>
      Mock.mock({
        workNum: i < 4 ? 0 : _.random(100),
        educationalLevel: EDUCATIONAL_LEVEL_DICTS[i]
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 员工司龄查询接口
  Mock.mock(new RegExp('/data/v1/data/user/companyAge' + '(\\?.*)?$'), 'get', (req) => {
    const AGE_NAME = ['3年内', '3-10年', '10-20年', '20年以上', 'Other']
    const response = _.times(_.size(AGE_NAME), (i) =>
      Mock.mock({
        workNum: _.random(100),
        ageName: AGE_NAME[i]
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 员工年龄查询接口
  Mock.mock(new RegExp('/data/v1/data/user/age' + '(\\?.*)?$'), 'get', (req) => {
    const AGE_NAME = ['小于20岁', '20-30岁', '31-40岁', '41-50岁', '51-60岁', '大于60岁']
    const response = _.concat(
      _.times(_.size(AGE_NAME), (i) =>
        Mock.mock({
          workNum: _.random(100),
          sex: 0,
          ageName: AGE_NAME[i]
        })
      ),
      _.times(_.size(AGE_NAME), (i) =>
        Mock.mock({
          workNum: _.random(100),
          sex: 1,
          ageName: AGE_NAME[i]
        })
      )
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // ----->  3. 招聘概况

  // 年度入职人数查询接口
  Mock.mock(new RegExp('/data/v1/data/user/entryNum' + '(\\?.*)?$'), 'get', (req) => {
    const response = _.times(12, (i) =>
      Mock.mock({
        entryNum: _.random(100),
        statMonth: moment()
          .month(i)
          .format('YYYY-MM')
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 人才库性别查询接口
  Mock.mock(new RegExp('/data/v1/data/talent/sex' + '(\\?.*)?$'), 'get', (req) => {
    const response = _.times(2, (i) =>
      Mock.mock({
        num: _.random(100),
        sex: i
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 人才库职位查询接口
  Mock.mock(new RegExp('/data/v1/data/talent/job' + '(\\?.*)?$'), 'get', (req) => {
    const response = _.times(10, () =>
      Mock.mock({
        num: _.random(100),
        jobId: '@id()',
        jobName: '@cword(2)职位'
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 人才库学历查询接口
  Mock.mock(new RegExp('/data/v1/data/talent/educationalLevel' + '(\\?.*)?$'), 'get', (req) => {
    const response = _.times(_.size(EDUCATIONAL_LEVEL_DICTS), (i) =>
      Mock.mock({
        num: _.random(100),
        educationalLevel: EDUCATIONAL_LEVEL_DICTS[i]
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 人才库年龄查询接口
  Mock.mock(new RegExp('/data/v1/data/talent/age' + '(\\?.*)?$'), 'get', (req) => {
    const AGE_NAME = ['20岁', '20-30岁', '31-40岁', '41-50岁', '51-60岁', '大于60岁']
    const response = _.times(_.size(AGE_NAME), (i) =>
      Mock.mock({
        num: _.random(100),
        sex: _.random(),
        ageName: AGE_NAME[i]
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 招聘过程数据漏斗查询接口
  Mock.mock(new RegExp('/data/v1/data/recruitment/stat' + '(\\?.*)?$'), 'get', (req) => {
    const response = _.times(8, (i) =>
      Mock.mock({
        num: _.random(100),
        status: i + 1
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 整体招聘进度查询接口
  Mock.mock(new RegExp('/data/v1/data/recruitment/progress' + '(\\?.*)?$'), 'get', (req) => {
    const response = Mock.mock({
      approvedNum: _.random(100),
      finishedNum: function() {
        return _.parseInt(this.approvedNum * _.random(true))
      }
    })
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 各部门招聘进度查询接口
  Mock.mock(new RegExp('/data/v1/data/recruitment/orgProgress' + '(\\?.*)?$'), 'get', (req) => {
    const response = _.times(10, () =>
      Mock.mock({
        approvedNum: _.random(100),
        finishedNum: _.random(100),
        orgId: '@id()',
        orgName: '@cword(2)集团'
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })

  // 招聘渠道查询接口
  Mock.mock(new RegExp('/data/v1/data/recruitment/channel' + '(\\?.*)?$'), 'get', (req) => {
    const response = _.times(_.size(RECRUITMENT_CHANNEL_DICTS), (i) =>
      Mock.mock({
        num: _.random(100),
        channel: RECRUITMENT_CHANNEL_DICTS[i]
      })
    )
    window.console.debug(`${req.type} ${req.url}`, { req, response })
    return _.defaults({ response }, RESPONSE_COMMON)
  })
}
