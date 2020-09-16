<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialog"
      width="550px"
      append-to-body
      :before-close="handleClose"
    >
      <div
        v-for="(item, i) in data"
        :key="i"
      >
        <span class="label">{{ item.label }}</span>: <span class="prop">{{ row[item.prop] }}</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'WatchTenantDialog',
  props: {
    row: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      title: '查看商户',
      dialog: true,
      data: [
        {
          prop: 'tenantId',
          label: '租户ID'
        },
        {
          prop: 'tenantName',
          label: '租户名称'
        },
        {
          prop: 'domain',
          label: '绑定域名'
        },
        {
          prop: 'copyright',
          label: '版权'
        },
        {
          prop: 'logo',
          label: 'logo链接'
        },
        {
          prop: 'favicon',
          label: '网站图标'
        }
      ]
    }
  },

  watch: {
    dialog: {
      handler: function() {
        this.$emit('update:dialogVisible', this.dialog)
      }
    }
  },
  methods: {
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
.label {
  display: inline-block;
  width: 100px;
  text-align: right;
  line-height: 40px;
  font-size: 14px;
  font-weight: 800;
  color: #333;
}
.prop {
  display: inline-block;
  line-height: 40px;
  font-size: 14px;
  color: #666;
  margin-left: 10px;
}
</style>
