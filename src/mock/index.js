import user from './user'
import menu from './menu'
import oauth from './oauth'
import param from './param'
import role from './role'

/**
 * 模拟数据mock
 *
 * mock是否开启模拟数据拦截
 */

const options = { mock: false }

user(options)

menu(options)

oauth(options)

param(options)

role(options)
