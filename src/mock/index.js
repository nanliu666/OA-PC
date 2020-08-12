/* eslint-disable no-unused-vars */
import Mock from 'mockjs'
import approval from './approval'
import candidate from './candidate'
import contact from './contact'
import dict from './dict'
import entry from './entry'
import grade from './grade'
import interview from './interview'
import leave from './leave'
import menu from './menu'
import menus from './menus'
import msg from './msg'
import oauth from './oauth'
// import personnel from './personnel'
import org from './org'
import person from './person'
import personalInfo from './personalInfo'
import personnel from './personnel/'
import personnelDataboard from './personnel/databoard'
import personnelSettings from './personnel/settings'
import position from './position'
import remind from './remind'
import role from './role'
import schedule from './schedule'
import selectPerson from './selectPerson'
import system from './system'
import taskcenter from './taskcenter'
import todo from './todo'
import transction from './transction'
import user from './user'
import mailList from './mailList'
import newCenter from './newsCenter'
import noticeCenter from './noticeCenter'
/**
 * 模拟数据mock
 *
 * mock是否开启模拟数据拦截
 */

const options = { mock: false }
// 设置500毫秒的时延长
Mock.setup({
  timeout: 500
})
newCenter({ mock: true })
noticeCenter({ mock: true })
user(options)
approval(options)
menu(options)
interview({ mock: false })

candidate(options)
selectPerson(options)
position(options)
grade(options)
menus(options)

system(options)

oauth(options)

personnel(options)

dict(options)

role(options)

personalInfo(options)

org(options)
transction(options)

person(options.mock)
contact(options)
leave(options)

personnelSettings(options.mock)
personnelDataboard(options)
todo(options)
msg(options)
todo(options)
entry(options)
taskcenter(options)
schedule(options)
remind(options)
mailList(options)
