/* eslint-disable no-unused-vars */
import Mock from 'mockjs'
import apprProcess from './apprProcess'
import candidate from './candidate'
import contact from './contact'
import dict from './dict'
import entry from './entry'
import grade from './grade'
import interview from './interview'
import leave from './leave'
import mailList from './mailList'
import menu from './menu'
import menus from './menus'
import msg from './msg'
import newsCenter from './newsCenter'
import noticeCenter from './noticeCenter'
import oauth from './oauth'
import org from './org'
import person from './person'
import personalInfo from './personalInfo'
import personnel from './personnel/'
import personnelDataboard from './personnel/databoard'
import personnelSettings from './personnel/settings'
import position from './position'
import process from './process'
import remind from './remind'
import role from './role'
import schedule from './schedule'
import selectPerson from './selectPerson'
import system from './system'
import taskcenter from './taskcenter'
import todo from './todo'
import transction from './transction'
import user from './user'

/**
 * @param {boolean} enable 全局启用mock
 * @returns {void}
 */
export default (enable) => {
  if (!enable) return
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
  newsCenter(options)
  noticeCenter(options)
  user(options)

  apprProcess(options)
  menu(options)
  apprProcess(options)

  interview(options)

  candidate(options)
  selectPerson(options)
  position(options)
  grade(options)
  menus(options)

  system(options)

  oauth({ mock: false })

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

  process(options)

  mailList(options)
}
