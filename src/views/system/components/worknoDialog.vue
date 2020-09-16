<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialog"
      width="1000px"
      append-to-body
      :before-close="handleClose"
    >
      <div
        v-loading="loading"
        class="content"
      >
        <commonForm
          ref="form"
          :model="form"
          :columns="columns"
        />
        <div class="text">
          <div>示例1：工号生成规则 = BLH4，则生成工号为BLH0001、BLH0002、BLH0003、BLH0004</div>
          <div>示例2：工号生成规则 = 4，则生成工号为0001、0002、0003、0004</div>
          <div>
            示例3：工号生成规则 = 10，则生成工号为0000000001、0000000002、0000000003、0000000004
          </div>
        </div>
        <el-button
          class="create"
          size="medium"
          type="primary"
          @click="onsubmit"
        >
          <span v-if="!editData.id">新增</span> <span v-else>保存</span>
        </el-button>
        <div style="margin-bottom: 50px">
          <el-table
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column
              type="index"
              label="序号"
              width="80"
            />
            <el-table-column
              prop="rule"
              label="规则"
              width="180"
            />
            <el-table-column
              prop="remark"
              label="描述"
            />
            <el-table-column
              prop="address"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="handleEdit(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  type="text"
                  @click="handleDelete(scope.row)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { putRule, postRule, getRule, delRule } from '@/api/system/tenant'

export default {
  name: 'WorknoDialog',
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
      loading: false,
      editData: {},
      tableData: [],
      title: '查看商户',
      dialog: true,
      rules: '',
      columns: [
        {
          span: 10,
          prop: 'rule',
          itemType: 'input',
          label: '工号生成规则',
          maxlength: 5,
          required: true
        },
        {
          span: 10,
          offset: 1,
          prop: 'remark',
          type: 'textarea',
          rows: 1,
          itemType: 'input',
          label: '描述',
          required: false
        }
      ],
      form: {
        rule: '',
        remark: ''
      }
    }
  },

  watch: {
    dialog: {
      handler: function() {
        this.$emit('update:dialogVisible', this.dialog)
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      let params = {
        tenantId: this.row.tenantId
      }
      this.loading = true
      getRule(params)
        .then((res) => {
          this.tableData = res
        })
        .finally(() => {
          // setTimeout(()=>{
          this.loading = false
          // },1000)
        })
    },
    onsubmit() {
      this.$refs.form.validate().then(() => {
        let { tenantId, tenantName: name } = this.row
        let { rule, remark } = this.form
        let params = {
          tenantId: tenantId,
          name: name,
          rule: rule,
          remark: remark
        }

        let Rule = this.editData.id ? putRule : postRule
        this.loading = true
        Rule(params)
          .then(() => {
            this.editData.id && ((this.editData = {}), (this.form = {}))
          })
          .finally(() => {
            // setTimeout(()=>{
            this.loading = false
            // },1000)
          })
      })
    },
    handleEdit(row) {
      this.editData = JSON.parse(JSON.stringify(row))
      let { rule, remark } = this.editData
      this.form = {
        ...this.from,
        rule,
        remark
      }
    },
    handleDelete(row) {
      this.$confirm('你确定要删除改条规则吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          id: row.id
        }
        this.loading = true
        delRule(params)
          .then(() => {})
          .finally(() => {
            // setTimeout(()=>{
            this.loading = false
            // },1000)
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
.content {
  position: relative;
  .create {
    position: absolute;
    top: 28px;
    right: 2px;
  }
}
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
.text {
  font-size: 12px;
  color: #999;
  position: relative;
  top: -15px;
}
.button {
  color: #207efa;
}
</style>
