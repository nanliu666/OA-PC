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
import contact from './contact'
/**
 * 模拟数据mock
 *
 * mock是否开启模拟数据拦截
 */

const options = { mock: false }

user(options)
menu(options)

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
personnel(options)

org(options)
transction(options)

person(options.mock)
contact({ mock: false })
