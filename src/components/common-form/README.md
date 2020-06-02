# vue-common-form

基于 elementUI Form组件 封装的 form，[示例页](http://localhost:1888/#/demo/form)，示例代码：`src\views\demo\demoForm.vue`


### Attributes 配置

| 参数    | 说明                               |  类型  | 默认值 |
| :------ | :--------------------------------- | :----: | :----: |
| model   | 表单数据,必须给每个字段设置初始值  | Object |   -    |
| columns | 字段配置                           | Array  |   -    |
| config  | 表格配置项，详情见下方 Config 属性 | Object |   -    |


### Config Attributes 表单配置

除model以外，支持所有 el-form attributes，默认配置为
```js
  {
    labelPosition: 'top',
    size: 'medium'
  }
```


### Column Attributes 字段配置

除此之外支持所有FormItem组件的属性，另外，此字段传的除以下和FormItem属性以外的其他参数将会全部传递给表单组件

| 参数        | 说明                                                     | 是否必填 |  类型   | 默认值 |
| :---------- | :------------------------------------------------------- | :------: | :-----: | :----: |
| prop        | 表单域 model 字段                                        |    是    | String  |   -    |
| label       | 标签文本                                                 |    是    | String  |   -    |
| itemType    | 字段类型，可选值见下                                     |    是    | String  |   -    |
| span        | 该字段的栅格占据的列数                                   |    否    | Number  |   10   |
| offset      | 该字段的栅格左侧的间隔格数                               |    否    | Number  |   -    |
| options     | 选项数据，当字段类型为select/cascader/radio/checkbox必填 |    否    |  Array  |   -    |
| props       | 配置项，详情见下                                         |    否    | Object  |   -    |
| rules       | 校验规则                                                 |    否    |  Array  |   -    |
| required    | 是否必填，当为true时会自动添加一个必填的校验规则         |    否    | Boolean | false  |
| placeholder | 自定义占位内容                                           |    否    | String  |        |


### itemType 可选值

| 值         | 说明         |
| :--------- | :----------- |
| input      | 输入框       |
| select     | 下拉选择器   |
| radio      | 单选框       |
| checkbox   | 多选框       |
| cascader   | 级联选择器   |
| treeSelect | 下拉树选择器 |
| datePicker | 日期选择器   |
| slot       | 自定义       |


### props Attributes

| 参数       | 说明                                    | 是否必填 |   类型   | 默认值 |
| :--------- | :-------------------------------------- | :------: | :------: | :----: |
| label      | 指定选项标签为选项对象的某个属性值      |    否    |  String  | label  |
| value      | 指定选项的值为选项对象的某个属性值      |    否    |  String  | value  |
| formatter  | 自定义展示标签，参数是选项数据          |    否    | Function |   -    |
| hideColon  | 隐藏表单label后面跟的冒号               |    否    | Boolean  | false  |
| onlyNumber | 指定只能输入数字，itemType为input时有效 |    否    | Boolean  | false  |


### Slot

| name           | 说明                                                    |   参数    |
| :------------- | :------------------------------------------------------ | :-------: |
| 字段的 prop 值 | 自定义表单内容,当字段配置的 slot 属性设置为 true 时有效 | ...column |