## 简介

* 框架源码来自：[Saber](http://gitlab.epro.com.cn/epro/bestgrand/saber) (基于 Vue、Element-UI)

## 依赖

* 主要依赖：vue vuex vue-router element-ui 

* 基于element-ui封装的UI框架 [avuejs](https://avuejs.com/)

* css动画库 [animate css](https://daneden.github.io/animate.css/)

* MockJS [参考](https://juejin.im/post/5cf726b5e51d454fbf5409bc),[官方示例](http://mockjs.com/examples.html)

* vue-common-table 通用表格组件,封装了el-table、el-pagination，[文档](https://github.com/kingqi/vue-common-table/blob/master/README.md)

## 开发注意事项

* axios已封装，`/src/router/axios.js`中提供了get/put/post/del方法，接口调用成功后只返回接口数据的response字段，其他字段仅做全局使用

* 字典组调用已在vuex写好，使用时请调用dispatch CommonDict,传对应的字典组名,将返回一个Promise对象，代码示例如下
  ```js
    this.$store.dispatch('CommonDict', 'WorkProperty').then((res) => {
        this.workPropertyList = res
    })
  ```

* 列表页面请使用common-table组件，已在全局注册，将大幅提高列表页开发速度

* 路由和菜单根据接口数据生成，请不要私自把业务页面路由添加到router文件夹内，开发时可以开启菜单mock，并将路由配置到`/src/mock/menu.js`


## 启动

* npm目前安装依赖会报错无法运行，请使用yarn作为包管理器，yarn命令使用更简洁，依赖加载速度更快

* 执行`yarn pre`安装依赖,本地启动使用`yarn serve`,打包使用`yarn build`

## lint相关

* 项目添加eslint+commitLint，eslint用于提高代码质量，commitLint用于限制commit消息格式

* git commit消息格式按照 `.commitlintrc.js`文件中的关键词＋＇:＇＋提交信息，否则将无法提交代码，请仔细看一下`.commitlintrc.js`中的注释，使用正确的关键词

* 项目加了commit触发的格式化工作流，每次提交前会检查并格式化所有提交的代码，遇到报错请解决掉对应的问题再提交代码

## 主要代码结构

```
├── vue.config.js // Vue配置文件
├── public 静态文件
└── src
    ├──api // 接口定义
    ├──components // 公共组件
    │    ├──treeSelect // 下拉树选择
    │    ├──base-container // 通用容器组件
    │    └──searchPopover // 弹窗筛选组件
    │    └──pageHeader // 通用页面头部
    │    └──common-upload // 通用上传组件
    ├──directive // 自定义指令
    │    ├──loadmore.js //v-loadmore elementUI select选项滚动加载更多
    │    └──pcheck.js //v-p 权限校验，不通过则隐藏
    ├──mock // mock代码
    │    ├──index.js // mock总开关
    │    ├──menu.js // 菜单mock
    │    └──。。。 // 其他接口mock，分模块放置接口mock
    ├──page // 基础布局组件
    ├──router // 路由
    │    ├──page // 基础路由，不鉴权路由
    │    └──axios.js // axios封装，请求拦截
    ├──store // vuex
    │    ├──modules 
    │    │   ├──dict.js // 字典组
    │    │   └──user.js // 用户信息
    │    └──getters.js
    ├──style // 全局样式
    │    ├──oa-custom // 自定义element-ui样式
    │    └──common.css // 全局样式
    ├──util // 工具
    │    ├──uploadQiniu.js // 上传到七牛云
    │    └──。。。 // 常用工具类
    ├──views // 业务页面
    │    ├──system // 系统管理
    │    ├──orgs // 组织机构
    │    └──personnel // 花名册
    └──main.js // 项目入口
```

## 注意事项

* 尽量使用ES6语法，[参考](https://es6.ruanyifeng.com/#docs/style)

* 开发vue相关要按照vue[官方代码规范](https://cn.vuejs.org/v2/style-guide/index.html)开发，js命名规范按照[AlloyTeam规范文档](http://alloyteam.github.io/CodeGuide/#js-variable-naming)

* 开发前看一下util文件夹下的函数，常用的校验正则，cookie,store等工具函数都有，不要自己造轮子

* 多看看[avuejs](https://avuejs.com/) 的文档，这个组件库有不少好用的组件，还有一些全局函数，看一下[全局api](https://avuejs.com/doc/api) 

* Mock使用MockJS，注意看一下[文档](https://juejin.im/post/5cf726b5e51d454fbf5409bc) ，mock代码放在src/mock下