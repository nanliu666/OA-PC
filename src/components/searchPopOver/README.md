此为 table 顶部搜索组件，样式案例参考组织机构管理，候选人管理

```html
<search-popover
  ref="searchPopover"
  :require-options="searchConfig.requireOptions"
  :popover-options="searchConfig.popoverOptions"
  @submit="handleSubmit"
/>
```

此组件接收两个对象数组 弹出框外配置 requireOptions 和 弹出框内配置 popoverOptions

```js
[
  // 输入框
  { type: 'input',
  // 初始数据
  data: '',
  // form-label
  label: '',
  // 字段
  field: '',
  // 配置
  config: {
    // input type
    type: 'email',
    // 输入框占位文本， 此配置优先，  默认为 请输入 + label,
    placeholder:'' ,
    // 输入框尾部图标
    'suffix-icon': ''
    }
    },
    // 选择框
    {
    type: 'select',
    data: '',
    label: '证件类型',
    field: '',
    config: {
        // 是否为多选
        multiple: true,
        //  el-option的label 默认label
        optionLabel: '',
        //  el-option的value 默认value
        optionValue: 'dictKey',
        // 分组
        group: true
        },
        //el-option数组
    options: [],
    // 下拉框出现/隐藏时触发 flag为出现/隐藏, item为当前配置对象
    firstLoad(flag, item) {}
    loadMoreFun(item){}
    },
    // 时间选择器
    {
        type:'timeSelect',
        data: ''
        label:''
    },
    {
        type:'timePicker',
        data: ''，
        label：''
    },
    // 级联选择
    {
        type:'cascader',
        data: [],
        label:'',
        // 数据源
        options:[]
    },
    // 日期选择器
    {
        type: 'dataPicker',
        // config.type为时间范围时为[]
        data: '',
        label: '',
        // 为范围时两个字段以，分隔
        field: 'beginEntryDate,endEntryDate',
        config: {
            // 显示类型
            type: 'daterange',
         }
    },
    // 数值范围
    {
        type: 'numInterval',
        data: { min: '', max: '' },
        label: '',
        // 两个字段以，分隔
        field: 'minEntryAge,maxEntryAge'
    },
    // 树形下拉选择器
    {
            type: 'treeSelect',
            field: '',
            label: '',
            // 多选是为[],会依据此数据格式切换多选
            data: '',
            // 配置 具体参考 https://github.com/ayiaq1/el-tree-select
            config: {
                // 选择框配置
              selectParams: {
                placeholder: '请选择用人部门',
                // 是否多选
                multiple: false
              },
              // 下拉树形配置
              treeParams: {
                  // 数据源 变化后必须调用treeDataUpdateFun改变数据
                data: [],
                'check-strictly': true,
                'default-expand-all': false,
                'expand-on-click-node': false,
                clickParent: true,
                filterable: false,
                props: {
                  children: '',
                  label: '',
                  disabled: '',
                  value: ''
                }
              }
            }
          },
]
```

### Events

| 事件名称 | 说明                                   | 回调参数     |
| -------- | -------------------------------------- | ------------ |
| submit   | 弹出框外组件 change 触发或弹出框内搜索 | 搜索参数对象 |

```js
{
    item.field: value
}
```

### Methods

| 方法名            | 说明                        | 参数                       |
| ----------------- | --------------------------- | -------------------------- |
| treeDataUpdateFun | treeSelect 数据源变化时调用 | 数据, 此 item 的字段 field |
