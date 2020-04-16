## 简介

* 框架源码来自：[Saber](http://gitlab.epro.com.cn/epro/bestgrand/saber) (基于 Vue、Element-UI)

## 依赖

* 主要依赖：vue vuex vue-router element-ui 

* 基于element-ui封装的UI框架 [avuejs](https://avuejs.com/)

* css动画库 [animate css](https://daneden.github.io/animate.css/)

* MockJS [参考](https://juejin.im/post/5cf726b5e51d454fbf5409bc)

## 启动

* 推荐使用yarn作为包管理器，yarn命令使用更简洁，依赖加载速度更快

* 执行`yarn pre`安装依赖,本地启动使用`yarn serve`,打包使用`yarn build`

## lint相关

* 项目添加eslint+commitLint，eslint用于提高代码质量，commitLint用于限制commit消息格式

* git commit消息格式按照 `.commitlintrc.js`文件中的关键词＋＇:＇＋提交信息，否则将无法提交代码，请仔细看一下`.commitlintrc.js`中的注释，使用正确的关键词

* 项目加了commit触发的格式化工作流，每次提交前会检查并格式化所有提交的代码，遇到报错请解决掉对应的问题再提交代码

## 注意事项

* 尽量使用ES6语法，[参考](https://es6.ruanyifeng.com/#docs/style)

* 开发vue相关要按照vue[官方代码规范](https://cn.vuejs.org/v2/style-guide/index.html)开发，js命名规范按照[AlloyTeam规范文档](http://alloyteam.github.io/CodeGuide/#js-variable-naming)

* 开发前看一下util文件夹下的函数，常用的校验正则，cookie,store等工具函数都有，不要自己造轮子

* 多看看[avuejs](https://avuejs.com/) 的文档，这个组件库有不少好用的组件，还有一些全局函数，看一下[全局api](https://avuejs.com/doc/api) 

* Mock使用MockJS，注意看一下[文档](https://juejin.im/post/5cf726b5e51d454fbf5409bc) ，mock代码放在src/mock下