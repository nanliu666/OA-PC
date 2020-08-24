<template>
  <div>
    <div class="tinymce-editor">
      <editor
        :value="value"
        :init="init"
        :disabled="disabled"
        @input="$emit('input', $event)"
        @onClick="onClick"
      />
    </div>
  </div>
</template>

<script>
import plugins from './plugins'
import toolbar from './toolbar'
import tinymce from 'tinymce/tinymce'
import 'tinymce/icons/default'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'

// 编辑器插件plugins
import 'tinymce/plugins/image' // 插入上传图片插件
import 'tinymce/plugins/media' // 插入视频插件
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/code'
import 'tinymce/plugins/link'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/imagetools'
import { uploadQiniu } from '@/util/uploadQiniu'

export default {
  name: 'Tinymce',
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    // 基本路径，默认为空根目录，如果你的项目发布后的地址为目录形式，
    // 即abc.com/tinymce，baseUrl需要配置成tinymce，不然发布后资源会找不到
    baseUrl: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default() {
        return plugins
      }
    },
    toolbar: {
      type: [String, Array],
      default() {
        return toolbar
      }
    },
    height: {
      type: Number,
      default: 800
    }
  },
  data() {
    return {
      init: {
        language_url: `${this.baseUrl}/tinymce/zh_CN.js`,
        language: 'zh_CN',
        skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide`,
        content_css: `${this.baseUrl}/tinymce/skins/content/default/content.css`,
        height: this.height,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: false,
        font_formats: `
              微软雅黑=微软雅黑;
              宋体=宋体;
              黑体=黑体;
              仿宋=仿宋;
              楷体=楷体;
              隶书=隶书;
              幼圆=幼圆;
              Andale Mono=andale mono,times;
              Arial=arial, helvetica,
              sans-serif;
              Arial Black=arial black, avant garde;
              Book Antiqua=book antiqua,palatino;
              Comic Sans MS=comic sans ms,sans-serif;
              Courier New=courier new,courier;
              Georgia=georgia,palatino;
              Helvetica=helvetica;
              Impact=impact,chicago;
              Symbol=symbol;
              Tahoma=tahoma,arial,helvetica,sans-serif;
              Terminal=terminal,monaco;
              Times New Roman=times new roman,times;
              Trebuchet MS=trebuchet ms,geneva;
              Verdana=verdana,geneva;
              Webdings=webdings;
              Wingdings=wingdings,zapf dingbats`,
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success) => {
          // const img = 'data:image/jpeg;base64,' + blobInfo.base64();
          // success(img);  // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
          const file = blobInfo.blob()
          uploadQiniu(file, {
            error(err) {
              throw err
            },
            complete(res) {
              success(res.url)
            }
          })
        }
      }
    }
  },
  methods: {
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    // 需要什么事件可以自己增加
    onClick(e) {
      this.$emit('onClick', e, tinymce)
    }
  }
}
</script>

<style scoped></style>
