import user from './user'
import menu from './menu'
import oauth from './oauth'
import param from './param'
import system from './system'
import role from './role'

/**
 * 模拟数据mock
 *
 * mock是否开启模拟数据拦截
 */

const options = { mock: true }

user(options)

menu(options)
system(options)

oauth(options)

param(options)

role(options)
