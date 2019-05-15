import user from './user';
import menu from './menu';
import oauth from './oauth';

/**
 * 模拟数据mock
 *
 * mock是否开启模拟数据拦截
 */

const options = {mock: true};

user(options);

menu(options);

oauth(options);
