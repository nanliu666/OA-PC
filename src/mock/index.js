/* eslint-disable no-unused-vars */
import user from './user'
import menu from './menu'
import oauth from './oauth'
import system from './system'
import personnel from './personnel'
import role from './role'
import dict from './dict'
import position from './position'
import grade from './grade'
import personalInfo from './personalInfo'
// import personnel from './personnel'
import org from './org'
import transction from './transction'

import person from './person'
import menus from './menus'
import candidate from './candidate'
import selectPerson from './selectPerson'
import leave from './leave'
import personnelSettings from './personnel/settings'
import contact from './contact'
import approval from './approval'
import interview from './interview'
import todo from './todo'
import msg from './msg'
import entry from './entry'
/**
 * 模拟数据mock
 *
 * mock是否开启模拟数据拦截
 */

const options = { mock: false }

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
todo(options)
msg(options)
todo({ mock: false })
entry({ mock: false })
