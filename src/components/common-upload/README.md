代码示例：

template

```html
  <common-upload
    v-model="form.resume"
    :multiple="false"
  >
    <el-button
      v-if="form.resume.length===0"
      size="medium"
    >
      上传简历
    </el-button>
    <el-button
      v-else
      size="medium"
      type="text"
    >
      {{ form.resume[0].localName }}
    </el-button>
  </common-upload>
```

js

```js
{
  data(){
    return {
      form:{
        resume:[
          {
            fileUrl:"",//文件url
            fileName:"",// 文件名
            localName:"" // 原始文件名
          }
        ]
      }
    }
  }
}
```