<template>
  <div>
    <el-dialog
      title="安排面试"
      :visible.sync="dialog"
      width="550px"
      append-to-body
      :before-close="handleClose"
    >
      <div v-loading="loading">
        <div>
          <avue-form
            ref="form"
            v-model="form"
            :option="option"
          >
            <template slot="userName">
              <span class="name">{{ form.userName }}</span>
            </template>
            <template slot="time">
              <el-date-picker
                v-model="form.time"
                type="date"
                placeholder="请选择面试时间"
              />
            </template>
            <template slot="parentId">
              <el-select
                v-model="form.parentId"
                clearable
                filterable
                placeholder="请选择面试信息"
              >
                <el-option
                  v-for="item in optionsList"
                  :key="item.id"
                  :label="item.person"
                  :value="item.id"
                >
                  <div class="selectOption">
                    <div
                      v-for="(it, index) in infoText"
                      :key="index"
                    >
                      <div v-if="item[it.name]">
                        <span>{{ it.text }}</span><span>{{ item[it.name] }}</span>
                        <b
                          v-if="it.name === 'person'"
                          class="edit"
                        >
                          <span
                            class="el-icon-edit"
                            @click.stop="handlerEdit(item)"
                          />
                          <span
                            class="el-icon-delete"
                            @click.stop="handlerDelete(item)"
                          />
                        </b>
                      </div>
                    </div>
                  </div>
                </el-option>
                <el-option
                  value=""
                  label=""
                >
                  <div
                    v-if="optionsList.length === 0"
                    class="noData"
                  >
                    暂无面试信息
                  </div>
                  <div
                    class="addInfo flex flex-justify flex-items"
                    @click="handleAddInterview"
                  >
                    <span class="el-icon-plus ADD" /> 新建面试信息
                  </div>
                </el-option>
              </el-select>
            </template>
          </avue-form>
        </div>
        <span
          slot="footer"
          class="dialog-footer flex flex-flow flex-items flex-justify"
        >
          <el-button
            size="medium"
            @click="handleClose"
          >取 消</el-button>
          <el-button
            type="primary"
            size="medium"
            @click="handleClose"
          >确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <new-interview
      v-if="newDialog"
      :dialog-visible.sync="newDialog"
      :type="type"
    />
  </div>
</template>

<script>
import newInterview from './newInterview'
let optionsList = [
  {
    id: '123456',
    person: '张三',
    phonenum: '15089906928',
    address: '广州市天河区天河客运站'
  },
  {
    id: '1234567',
    person: '李四',
    phonenum: '15089906928',
    address: '广州市天河区天河客运站1'
  }
]
let List = [
  {
    id: '13456',
    person: '张三',
    phonenum: '15089906929'
  },
  {
    id: '134567',
    person: '李四',
    phonenum: '15089906927'
  }
]
export default {
  name: 'ArrangeInterview',
  components: {
    newInterview
  },
  props: {
    row: {
      type: Object,
      default: function() {
        return {}
      }
    },
    visible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      type: '',
      newDialog: false,
      List,
      infoText: [
        { name: 'person', text: '联系人：' },
        { name: 'phonenum', text: '联系人手机号码：' },
        { name: 'address', text: '面试地址：' }
      ],
      optionsList,
      loading: false,
      dialog: true,
      form: {
        userName: '',
        jobName: '',
        time: '',
        remark: '',
        parentId: '',
        orgId: ''
      },
      option: {
        menuBtn: false,
        labelPosition: 'top',
        size: 'medium',
        column: [
          {
            label: '已选择',
            prop: 'userName',
            type: 'select',
            row: true,
            span: 24,
            formslot: true,
            labelslot: true,
            errorslot: true
          },
          {
            label: '面试官',
            prop: 'jobName',
            type: 'select',
            row: true,
            span: 24,
            placeholder: '请请选择面试官',
            rules: [
              {
                required: true,
                message: '请请选择面试官',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '面试时间',
            prop: 'time',
            type: 'date',
            row: true,
            span: 24,
            placeholder: '请选择面试时间',
            formslot: true,
            labelslot: true,
            errorslot: true,
            rules: [
              {
                required: true,
                message: '请选择面试时间',
                trigger: 'blur'
              }
            ],
            dicData: ''
          },
          {
            label: '面试方式',
            prop: 'parentIds',
            span: 24,
            type: 'radio',
            rules: [
              {
                required: true,
                message: '请选择面试方式',
                trigger: 'blur'
              }
            ],
            dicData: [
              {
                label: '现场面试',
                value: '0',
                // list: ['Enterprise', 'Company'],
                disabled: false
              },
              {
                label: '电话面试',
                value: '1',
                // list: ['Enterprise', 'Company', 'Department'],
                disabled: false
              },
              {
                label: '视频面试',
                value: '2',
                // list: ['Enterprise', 'Company', 'Department', 'Group'],
                disabled: false
              }
            ],
            change: ({ value }) => {
              this.type = value
            }
          },
          {
            label: '面试信息',
            prop: 'parentId',
            formslot: true,
            labelslot: true,
            errorslot: true,
            display: true,
            disabled: false,
            filterable: true,
            placeholder: '请选择面试信息',
            span: 24,
            dicData: [],
            rules: [
              {
                required: false,
                message: '请选择面试信息',
                trigger: 'change'
              }
            ]
          },
          {
            label: '备注',
            prop: 'remark',
            type: 'textarea',
            row: true,
            span: 24,
            placeholder: '请输入描述'
          }
        ]
      }
    }
  },

  watch: {
    dialog: {
      handler: function() {
        this.$emit('update:dialogVisible', this.dialog)
      },
      deep: true
    },
    row: {
      handler: function(data) {
        this.form.userName = data.userName
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleAddInterview() {
      this.newDialog = true
    },
    handleClose() {
      this.dialog = false
    },
    handlerEdit(item) {
      item
      this.newDialog = true
    },
    handlerDelete(item) {
      item
      this.$confirm('您确认要删除该面试信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
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
  text-align: center;
}
.selectOption:hover {
  .edit {
    display: block;
  }
}
.selectOption {
  font-size: 12px;
  line-height: 20px;
  padding: 8px 10px;
  > span:first-child {
    color: #718199;
    display: inline-block;
    width: 96px;
  }
  > span:nth-child(2) {
    color: #202940;
  }
  .edit {
    display: none;
    float: right;
    font-size: 14px;
    color: #a0a8ae;
    span {
      margin-right: 10px;
    }
  }
}
.noData {
  background: #fff;
  height: 100px;
  text-align: center;
  line-height: 100px;
}
.addInfo {
  background: #fff;
  border-top: 1px solid #efefef;
  padding-top: 10px;
  color: #207efa;
  font-size: 14px;
  .ADD {
    margin-right: 10px;
  }
}
.name {
  background: rgba(113, 129, 153, 0.1);
  border-radius: 4px;
  border-radius: 4px;
  padding: 10px 12px;
}
</style>
