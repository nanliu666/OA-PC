<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialog"
      width="550px"
      append-to-body
      :before-close="handleClose"
    >
      <div v-loading="loading">
        <div>
          <commonForm
            ref="form"
            :model="form"
            :columns="columns"
          >
            <template slot="logo">
              <upload-iamge :url.sync="form.logo" />
              建议像素：16x16（px）
            </template>
            <template slot="favicon">
              <upload-iamge :url.sync="form.favicon" />
              建议像素：157x26（px）
            </template>
          </commonForm>
        </div>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            size="medium"
            @click="handleClose"
          >
            取 消
          </el-button>
          <el-button
            type="primary"
            size="medium"
            @click="onsubmit"
          >
            确 定
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { postTenant, putTenant } from '@/api/system/tenant'
import uploadIamge from './uploadIamge'
export default {
  name: 'CreateTenant',
  components: {
    uploadIamge
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    row: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      limit: 1,
      type: '',
      newDialog: false,
      infoText: [],
      loading: false,
      form: {
        tenantId: '',
        tenantName: '',
        domain: '',
        copyright: '',
        logo: '',
        favicon: ''
      },
      dialog: true,
      columns: [
        {
          span: 24,
          prop: 'tenantId',
          itemType: 'input',
          label: '租户ID',
          required: true
        },
        {
          span: 24,
          prop: 'tenantName',
          itemType: 'input',
          label: '租户名称',
          required: true
        },
        {
          span: 24,
          prop: 'domain',
          itemType: 'input',
          label: '绑定域名',
          required: true
        },
        {
          span: 24,
          prop: 'copyright',
          itemType: 'input',
          label: '版权',
          required: true
        },
        {
          span: 24,
          prop: 'logo',
          itemType: 'slot',
          label: 'logo链接',
          required: true
        },
        {
          span: 24,
          prop: 'favicon',
          itemType: 'slot',
          label: '网站图标',
          required: true
        }
      ]
    }
  },
  watch: {
    'form.logo': {
      handler() {},
      deep: true,
      immediate: true
    },
    dialog: {
      handler: function() {
        this.$emit('update:dialogVisible', this.dialog)
      }
    },
    row: {
      handler: function(data) {
        let { tenantId, tenantName, domain, copyright, logo, favicon } = data
        if (tenantId) {
          this.columns.find((it) => it.prop === 'tenantId').disabled = true
        }
        this.form = {
          tenantId,
          tenantName,
          domain,
          copyright,
          logo,
          favicon
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onsubmit() {
      this.$refs.form.validate().then(() => {
        let params = {
          ...this.form
        }
        this.loading = true
        let tenant = this.row.tenantId ? putTenant : postTenant
        let tip = this.row.tenantId ? '修改成功' : '添加成功'
        tenant(params)
          .then(() => {
            this.dialog = false
            this.$message.success(tip)
            this.$listeners.updataData()
          })
          .finally(() => {
            // setTimeout(() => {
            this.loading = false
            // }, 1000)
          })
      })
    },
    handleClose() {
      this.dialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__header {
  padding: 16px 0;
  margin: 0 24px;
  border-bottom: 1px solid rgba(208, 211, 214, 0.44);
  font-size: 18px;
  color: #202940;
  line-height: 24px;
}

/deep/ .el-dialog__body {
  padding: 24px;
}

/deep/ .el-dialog__footer {
  padding: 0px 24px 24px;
}

/deep/ .el-form-item__label {
  line-height: 20px;
  font-size: 14px;
  color: #0f0000;
}

/deep/ .el-form-item {
  margin-bottom: 24px;
}

.dialog-footer {
  text-align: right;
}
</style>
