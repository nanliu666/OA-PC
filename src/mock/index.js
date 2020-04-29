import user from './user'
import menu from './menu'
import oauth from './oauth'
import param from './param'
import system from './system'
import role from './role'
import dict from './dict'
import personalInfo from './personalInfo'
import personnel from './personnel'
import org from './org'

/**
 * 模拟数据mock
 *
 * mock是否开启模拟数据拦截
 */

const options = { mock: true }

// user(options)

menu(options)

system(options)

// oauth(options)

system(options)

dict(options)

param(options)

role(options)

personalInfo(options)
personnel(options)

org(options)
