import user from './user'
import menu from './menu'
import oauth from './oauth'
import param from './param'
import system from './system'
import role from './role'
import dict from './dict'
import position from './position'
import grade from './grade'
import personalInfo from './personalInfo'
import menus from './menus'
/**
 * 模拟数据mock
 *
 * mock是否开启模拟数据拦截
 */

const options = { mock: false }
position({ mock: false })
grade({ mock: false })
user({ mock: false })
menus({ mock: false })
menu(options)

oauth(options)

system(options)

dict(options)

param(options)

role({ mock: false })

personalInfo(options)
