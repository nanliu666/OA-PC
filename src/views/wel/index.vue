<template>
  <basic-container>
    <p style="text-align: center">
      <img src="https://img.shields.io/badge/Release-V2.2.2-green.svg" alt="Downloads"/>
      <img src="https://img.shields.io/badge/JDK-1.8+-green.svg" alt="Build Status"/>
      <img src="https://img.shields.io/badge/Spring%20Cloud-Greenwich.SR4-blue.svg" alt="Coverage Status"/>
      <img src="https://img.shields.io/badge/Spring%20Boot-2.1.11.RELEASE-blue.svg" alt="Downloads"/>
      <a target="_blank" href="https://bladex.vip">
        <img src="https://img.shields.io/badge/Saber%20Author-Small%20Chill-ff69b4.svg" alt="Downloads"/>
      </a>
      <a target="_blank" href="https://bladex.vip">
        <img src="https://img.shields.io/badge/Copyright%20-@BladeX-%23ff3f59.svg" alt="Downloads"/>
      </a>
    </p>
    <el-row>
      <el-col :span="16">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="欢迎使用Saber" name="1">
            <div>1.Saber是BladeX前端UI系统</div>
            <div>2.对现有的avue2.0、element-ui库进行二次封装</div>
            <div>3.100%兼容原生element-ui库</div>
            <div>4.基于json驱动的模块配置，打造最好用的vuejs中后台脚手架</div>
            <div>5.使用Saber可以大幅度提升开发效率，不再为重复工作发愁</div>
          </el-collapse-item>
          <el-collapse-item title="什么是BladeX" name="2">
            <div>1.BladeX是一款精心设计的微服务架构，提供 SpringCloud 全套解决方案</div>
            <div>2.开源中国首批完美集成 SpringCloud Alibaba 系列组件的微服务架构</div>
            <div>3.基于稳定生产的商业项目升级优化而来，更加贴近企业级的需求</div>
            <div>4.追求企业开发更加高效，部署更加方便，生产更加稳定</div>
            <div>5.GVP-码云最有价值开源项目</div>
            <div>6.BladeX授权地址:<a target="_blank" href="https://bladex.vip/#/vip">点击授权</a></div>
          </el-collapse-item>
          <el-collapse-item title="为何需要BladeX" name="3">
            <div>1.经历过较长的线上生产，积累了很多企业痛点的解决方案</div>
            <div>2.一套代码兼容MySql、Oracle、PostgreSQL，适应企业各种不同场景的需求</div>
            <div>3.集成了很多企业急切所需的例如多租户、Oauth2授权认证、工作流、分布式事务等等功能</div>
            <div>4.深度定制了Flowable工作流，完美支持SpringCloud分布式服务的场景，以远程调用的方式进行操作</div>
            <div>5.升级了核心驱动，新功能完全可以开箱即用，而开源版需要自己再花时间进行集成，需要花掉更多的时间成本</div>
            <div>6.拥抱微服务时代，很多企业由于项目转型或升级，传统的技术已然不能满足，反而会花更多成本，而BladeX就是为此而生</div>
            <div>7.同时提供SpringCloud版本和SpringBoot版本，两个版本的api可以与Sword和Saber无缝对接，为小型项目至大型项目保驾护航</div>
            <div>8.授权购买即永久，源码没有混淆，完全开放，后续升级完全免费。企业只需花很少的钱即可获得一整套成熟的解决方案，你还在等什么？</div>
          </el-collapse-item>
          <el-collapse-item title="拥有的核心功能" name="4">
            <div>1.前后端分离-采用前后端分离模式，前端提供两套架构，Sword基于React，Saber基于Vue</div>
            <div>2. 分布式单体式后端架构-提供两套后端架构，基于SpringCloud的分布式架构以及基于SpringBoot的单体式架构</div>
            <div>3.API完全兼容-两套后端架构与两套前端架构，共四套架构可以任意组合，所有API完全兼容</div>
            <div>4.前后端代码生成-定制针对两套前端与后端的代码生成模板，轻松生成整个模块的前后端代码，减少重复工作量</div>
            <div>5.组件化、插件化架构-针对功能深度定制各个starter，引入开箱即用，为整个架构解耦，提升效率</div>
            <div>6.Nacos-集成阿里巴巴的Nacos完成统一的服务注册与配置</div>
            <div>7.Sentinel-集成Sentinel从流量控制、熔断降级、系统负载等多个维度保护服务的稳定性</div>
            <div>8.Dubbo-完美集成Dubbo最新版，支持远程RPC调用</div>
            <div>9.多租户系统-完整的SaaS多租户架构</div>
            <div>10.Oauth2-集成Oauth2协议，完美支持多终端的接入与认证授权</div>
            <div>11.工作流-深度定制SpringCloud分布式场景的Flowable工作流，为复杂流程保驾护航。同时提供SpringBoot集成版本</div>
            <div>12.独立流程设计器-提供独立的完全汉化的流程设计器，轻松定制流程模型</div>
            <div>13.动态网关-集成基于Nacos的轻量级、高拓展性动态网关</div>
            <div>14.动态聚合文档-实现基于Nacos的Swagger SpringCloud聚合文档</div>
            <div>15.分布式文件服务-集成minio、qiniu、alioss等优秀的第三方，提供便捷的文件上传与管理</div>
            <div>16.多租户对象存储系统-在SaaS系统中，各租户可自行配置文件上传至自己的私有OSS</div>
            <div>17.权限管理-精心设计的权限管理方案，角色权限精确到按钮</div>
            <div>18.动态数据权限-高度灵活的动态数据权限，提供注解+Web可视化两种配置方式，Web配置无需重启直接生效</div>
            <div>19.动态接口权限-高度灵活的动态接口权限，提供注解+Web可视化两种配置方式，Web配置无需重启直接生效</div>
            <div>20.多租户顶部菜单配置-提供给每个租户独立的顶部菜单配置模块，可以自定义顶部菜单切换</div>
            <div>21.主流数据库兼容-一套代码完全兼容Mysql、Postgresql、Oracle三大主流数据库</div>
            <div>22.动态网关鉴权-基于Nacos的动态网关鉴权，可在线配置，实时生效</div>
            <div>23.全能代码生成器-支持自定义模型、模版 、业务建模，支持多种模板引擎，在线配置。大幅度提升开发效率，不再为重复工作发愁</div>
            <div>24.Seata分布式事务-定制集成Seata，支持分布式事务，无代码侵入，不失灵活与简洁</div>
            <div>25.未完待续...</div>
          </el-collapse-item>
          <el-collapse-item title="软件定制开发合作" name="5">
            <div>1.接BladeX系列架构的定制服务</div>
            <div>2.接3个月以内工期的react、vue、springboot、springcloud、app、小程序等软件定制服务</div>
            <div>3.有意向请联系唯一指定QQ:85088620</div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
      <el-col :span="8">
        <el-collapse v-model="logActiveNames" @change="handleChange">
          <el-collapse-item title="2.2.2.RELEASE发布，增强字典管理，用户管理增加左树右表" name="11">
            <div>1.拆分出系统字典表与业务字典表，字典键值改为string类型</div>
            <div>2.用户管理增加左树右表功能</div>
            <div>3.租户新增增加租户默认类型</div>
            <div>4.优化菜单新增逻辑</div>
            <div>5.优化mybatis-plus默认配置的处理</div>
            <div>6.优化租户过滤判断逻辑，删除多余的类</div>
            <div>7.优化alioss生成地址的逻辑</div>
            <div>8.优化redisTemplate加载逻辑</div>
            <div>9.优化租户处理，简化配置，自动失败需要过滤的租户表</div>
            <div>10.优化数据权限表单用户体验</div>
            <div>11.多租户表对应实体继承TenantEntity</div>
            <div>12.用于本地上传的BladeFile类更名为LocalFile防止冲突</div>
            <div>13.修复数据权限插件不兼容的问题</div>
            <div>14.修复数据权限树勾选显示问题</div>
            <div>15.修复windows平台elk开关失效的问题</div>
            <div>16.修复租户bean加载逻辑</div>
            <div>17.修复saber代码生成驼峰路径导致的问题</div>
            <div>18.修复docker脚本nginx端口匹配问题</div>
            <div>19.修复机构模块提交未删除缓存的问题</div>
            <div>20.修复oss缓存获取未加租户判断的问题</div>
            <div>21.修复blade-auth在java11下无法运行的问题</div>
          </el-collapse-item>
          <el-collapse-item title="2.2.1.RELEASE发布，集成ELK，增加分布式日志追踪" name="10">
            <div>1.集成最新版ELK，增加分布式日志追踪功能</div>
            <div>2.增加ELK一键部署docker脚本</div>
            <div>3.抽象封装日志管理逻辑</div>
            <div>4.BladeX-Biz增加easypoi的demo工程</div>
            <div>5.BladeX-Biz增加websocket的demo工程</div>
            <div>6.优化minio文件策略</div>
            <div>7.Sql条件构建类去除分页字段</div>
            <div>8.优化sql打印功能</div>
            <div>9.优化wrapper逻辑</div>
            <div>10.CommonConstant拆分出LauncherConstant</div>
          </el-collapse-item>
          <el-collapse-item title="2.2.0.RELEASE发布，增加集群监控，链路追踪" name="9">
            <div>1.增加turbine集群监控服务</div>
            <div>2.增加zipkin分布式链路追踪</div>
            <div>3.升级seata版本至0.9.0，解决分布式事务遇到的bug</div>
            <div>4.Launcher的nacos配置改为sharedIds，提升子工程配置优先级</div>
            <div>5.增加changeStatus方法，方便修改业务状态字段</div>
            <div>6.saber代码模板增加刷新事件</div>
            <div>7.saber底层架构升级</div>
            <div>8.saber支持tab切换保存页面状态</div>
            <div>9.添加bom统一版本配置</div>
            <div>10.添加trace starter</div>
            <div>11.blade-admin排除seata服务</div>
            <div>12.oss敏感操作增加权限校验</div>
            <div>13.修复dict、role不选择父节点报错</div>
            <div>14.动态网关设置启动加载</div>
            <div>15.字典增加封存功能</div>
          </el-collapse-item>
          <el-collapse-item title="2.1.0.RELEASE发布，全面增强底层驱动" name="8">
            <div>1.升级springboot 2.1.8、springcloud greenwich sr3</div>
            <div>2.集成seata，提供最简集成方案</div>
            <div>3.blade-admin增加nacos动态监听</div>
            <div>4.增加alioss集成，强化oss返回信息</div>
            <div>5.获取令牌操作增加空判断</div>
            <div>6.拆分数据库依赖、增强mybatis、增加yml自定义配置读取</div>
            <div>7.各模块增加默认的yml配置，不占用application.yml</div>
            <div>8.增加ribbon组件，可自定义lb优先选择的ip段，解决团队网关调试需求</div>
            <div>9.优化feign的bean加载逻辑</div>
            <div>10.增强condition条件</div>
            <div>11.优化日志打印效果</div>
            <div>12.重构redis模块，增加redis限流功能</div>
            <div>13.优化beanutil性能</div>
            <div>14.去掉调试用的RouteEndpoint，增强安全性</div>
            <div>15.优化部门新增逻辑</div>
          </el-collapse-item>
          <el-collapse-item title="2.0.7.RELEASE发布，增加网关鉴权，强化代码生成" name="7">
            <div>1.增加基于Nacos的动态网关鉴权</div>
            <div>2.代码生成增加多数据源选择，强化单表代码生成</div>
            <div>3.增加个人信息修改、头像上传、密码更新功能</div>
            <div>4.优化新建角色逻辑</div>
            <div>5.修复若干issue</div>
          </el-collapse-item>
          <el-collapse-item title="2.0.6.RELEASE发布，兼容三大主流数据库" name="6">
            <div>1.一套代码兼容Mysql、Oracle、PostgreSQL三大主流数据库</div>
            <div>2.升级flowable 6.4.2</div>
            <div>3.超管默认拥有所有菜单权限</div>
            <div>4.修复权限配置数据长度过大的bug</div>
            <div>5.增加租户信息获取</div>
            <div>6.优化命令行启动顺序</div>
            <div>7.升级alibaba cloud毕业版本</div>
            <div>8.日志监听增加自定义配置</div>
            <div>9.升级swagger-bootstrap-ui版本</div>
            <div>10.saber表格自适应、增加loading</div>
            <div>11.saber通知公告模块增加富文本编辑器</div>
          </el-collapse-item>
          <el-collapse-item title="2.0.5.RELEASE发布，升级分布式接口权限系统" name="5">
            <div>1.升级为分布式接口权限系统</div>
            <div>2.增加多租户自定义顶部菜单功能</div>
            <div>3.升级greenwich SR2，mybatis-plus 3.1.2</div>
            <div>4.swagger排序规则采用最新注解</div>
            <div>5.数据权限增加可见字段配置</div>
            <div>6.数据权限增加分布式服务支持</div>
            <div>7.增加远程调用分页的例子，解决mybatis-plus传递IPage反序化出现的bug</div>
            <div>8.优化租户接口权限规则</div>
            <div>9.SqlKeyword增加条件判断</div>
            <div>10.修复部分模块包名分层的问题</div>
          </el-collapse-item>
          <el-collapse-item title="2.0.4.RELEASE发布，增加动态数据权限系统" name="4">
            <div>1.增加注解+web可视化配置的动态数据权限系统</div>
            <div>2.升级部门管理为机构管理，增加机构类型</div>
            <div>3.解决mybatis-plus排序字段的sql注入问题</div>
            <div>4.增加create_dept统一业务字段</div>
            <div>5.添加swagger ui页面设置Authorize 默认全局参数</div>
            <div>6.jsonutil增加封装方法,去掉devtools依赖</div>
            <div>7.数据库连接适配mysql8</div>
            <div>8.docker-compose脚本增加时区</div>
            <div>9.oauth申请token可支持自定义表</div>
            <div>10.修复代码生成sql缺失主键的问</div>
            <div>11.boot版本重构登录逻辑，增强可拓展性</div>
          </el-collapse-item>
          <el-collapse-item title="2.0.3.RELEASE发布，优化多租户oss系统，优化业务架构" name="3">
            <div>1.gateway增加动态文档配置，可通过配置nacos动态刷新</div>
            <div>2.修正blade_menu代码生成模块删除api的地址</div>
            <div>3.优化mysql依赖</div>
            <div>4.LauncherService增加排序功能</div>
            <div>5.优化hystrixfeign加载</div>
            <div>6.优化多租户oss系统逻辑，使之更加易用</div>
            <div>7.tenant_code字段统一为tenant_id</div>
          </el-collapse-item>
          <el-collapse-item title="2.0.2.RELEASE发布，增加多租户oss管理系统" name="2">
            <div>1.增加minio封装</div>
            <div>2.增加qiniu封装</div>
            <div>3.增加oss统一接口</div>
            <div>4.集成minio、qiniu，进行统一管理的多租户oss系统</div>
            <div>5.优化blade-core-cloud逻辑</div>
            <div>6.badex-biz增加不同包名的swagger、mybatis配置demo</div>
            <div>7.badex-biz增加nacos自定义注册文件demo</div>
            <div>8.bladex-biz增加nacos参数动态刷新demo</div>
          </el-collapse-item>
          <el-collapse-item title="2.0.1.RELEASE发布，系统优化版本" name="1">
            <div>1.兼容jdk11</div>
            <div>2.支持refresh_token功能</div>
            <div>3.增加minio封装，支持多租户模式的oss对象存储</div>
            <div>4.集成dubbo最新版本，支持rpc远程调用</div>
            <div>5.定制基于nacos的gateway动态网关</div>
            <div>6.优化聚合网关配置，使之更加轻巧</div>
            <div>7.CacheUtil增加缓存清除方法</div>
            <div>8.优化日志文件格式</div>
            <div>9.Secure拦截器支持自定义加载</div>
          </el-collapse-item>
          <el-collapse-item title="2.0.0.RELEASE发布，完美定制的微服务开发平台" name="0">
            <div>1.Swagger提供list形式配置扫描包</div>
            <div>2.增加DictCache、UserCache、SysCache缓存工具类</div>
            <div>3.重新设计EntityWrapper结构，使之更加简单易用</div>
            <div>4.强化部分敏感数据的删除校验</div>
            <div>5.增加Condition类的sql条件构造器</div>
            <div>6.修复工作流分页bug</div>
            <div>7.优化docker配置</div>
            <div>8.优化多租户逻辑</div>
            <div>9.优化request打印日志逻辑</div>
            <div>10.修复getIp的bug</div>
            <div>11.优化saber代码生成模板</div>
            <div>12.saber更新至element-ui 2.8.2版本</div>
            <div>13.修复saber分页bug</div>
            <div>14.crud组件提交报错后恢复按钮状态</div>
            <div>15.字典管理表单调整</div>
            <div>16.升级 springboot 2.1.5</div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
  </basic-container>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "wel",
    data() {
      return {
        activeNames: ['1', '2', '3', '5'],
        logActiveNames: ['11']
      };
    },
    computed: {
      ...mapGetters(["userInfo"]),
    },
    created() {
    },
    methods: {
      handleChange(val) {
        console.log(val);
      }
    }
  };
</script>

