示例代码

```html
  <lazy-select  
    v-model="form.userId"
    :load="loadUser"
    placeholder="请选择组织负责人"
    :option-props="{
      label:'name',
      value:'userId',
      key:'userId'
    }"
  />
```
```js
  {
    data(){
      return {
        form:{
          userId:null
        }
      }
    },
    methods:{
      loadUser(params) {
        return getUserWorkList(params)
      },
    }
  }
```