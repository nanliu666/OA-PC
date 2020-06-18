<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialog"
      width="550px"
      append-to-body
      :before-close="handleClose"
    >
      <div>
        <div>
          <commonForm
            ref="form"
            :model="form"
            :columns="columns"
          >
            <template slot="personId">
              <span class="name">{{ form.userName }}</span>
            </template>
            <template slot="addressId">
              <el-select
                v-model="form.addressId"
                clearable
                filterable
                placeholder="请选择面试信息"
              >
                <el-option
                  v-for="item in address"
                  :key="item.id"
                  :label="item.name"
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
                          v-if="it.name === 'name'"
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
            <template slot="remark">
              <el-input
                v-model="form.remark"
                type="textarea"
              />
            </template>
          </commonForm>
          <el-checkbox v-model="form.interview">
            同步发送面试登记表
          </el-checkbox>
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
            :loading="loading"
            @click="onsubmit"
          >
            确 定
          </el-button>
        </div>
      </div>
    </el-dialog>
    <new-interview
      v-if="newDialog"
      :dialog-visible.sync="newDialog"
      :type="form.interviewType"
      :row.sync="addressItem"
      @updataAddree="getAddresss"
    />
  </div>
</template>

<script>
import newInterview from './newInterview'
import {
  getWorklist,
  getAddresss,
  delAddresss,
  postInterViewSend,
  postInterViewResend
} from '@/api/personnel/selectedPerson'

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
    },
    title: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      addressItem: {},
      address: [],
      type: '',
      newDialog: false,
      List,
      infoText: [
        { name: 'name', text: '联系人：' },
        { name: 'phonenum', text: '联系人手机号码：' },
        { name: 'Address', text: '面试地址：' }
      ],
      optionsList,
      loading: false,
      dialog: true,

      form: {
        userName: '',
        interviewType: 'Onsite',
        interviewTime: '',
        remark: '',
        addressId: '',
        orgId: '',
        interview: true
      },
      columns: [
        {
          span: 24,
          prop: 'personId',
          itemType: 'slot',
          label: '已选择',
          options: [],
          props: {
            label: 'jobName',
            value: 'id'
          },
          required: false
        },
        {
          span: 24,
          prop: 'userId',
          itemType: 'select',
          filterable: true,
          label: '面试官',
          options: [],
          props: {
            label: 'name',
            value: 'userId'
          },
          required: true
        },
        {
          span: 24,
          prop: 'interviewTime',
          itemType: 'datePicker',
          label: '面试时间',
          type: 'datetime',
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
          required: true
        },
        {
          span: 24,
          prop: 'interviewType',
          itemType: 'radio',
          label: '面试方式',

          options: [
            {
              label: '现场面试',
              value: 'Onsite'
            },
            {
              label: '电话面试',
              value: 'Phone'
            },
            {
              label: '视频面试',
              value: 'Video'
            }
          ],
          required: true
        },
        {
          span: 24,
          prop: 'addressId',
          itemType: 'slot',
          label: '面试信息',
          options: [],
          props: {
            label: 'jobName',
            value: 'id'
          },
          required: true
        },
        {
          span: 24,
          prop: 'remark',
          itemType: 'input',
          label: '备注',
          required: false,
          type: 'textarea'
        }
      ]
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
        this.form.personId = data.personId
        this.form.recruitmentId = data.recruitmentId
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.getInterviewer()
    this.getAddresss()
  },
  methods: {
    /***
     * author guanfenda
     * 获取地址
     *
     * */
    getAddresss() {
      let params = {
        name: ''
      }
      getAddresss(params).then((res) => {
        this.address = []
        res.map((it) => {
          let params = {
            ...it,
            Address: it.provinceName + it.cityName + it.countyName + it.address
          }
          this.address.push(params)
        })
      })
    },
    /**
     * @author guanfenda
     * @desc 提交
     *
     * */

    onsubmit() {
      this.$refs.form.validate().then(() => {
        let params = {}
        this.address.map((it) => {
          if (this.form.addressId === it.id) {
            let { Address, phonenum, name } = { ...it }
            params = {
              address: Address || '',
              phonenum,
              name
            }
          }
        })
        let data = {
          ...this.form,
          ...params
        }

        data.interview = this.form.interview ? 1 : 0

        if (this.row.status === '2') {
          this.loading = true

          postInterViewSend(data)
            .then(() => {
              this.loading = false
              this.dialog = false
              this.$message.success('提交成功')
              this.$emit('load')
            })
            .catch(() => {
              this.loading = false
            })
        } else if (this.row.status === '3' || this.row.status === '4') {
          this.loading = true
          postInterViewResend(data)
            .then(() => {
              this.loading = false
              this.dialog = false
              this.$emit('load')
              this.$message.success('提交成功')
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
    },
    /***
     * @author guanfenda
     * @desc 在职员工查询（面试官）
     * */
    getInterviewer() {
      let params = {
        pageNo: 1,
        pageSize: 10000
      }
      getWorklist(params).then((res) => {
        let i = this.filterData(this.columns, 'userId')
        this.columns[i].options = res.data
      })
    },
    filterData(dtda, prop) {
      let i = ''
      dtda.map((it, index) => {
        if (it.prop === prop) {
          i = index
        }
      })
      return i
    },
    handleAddInterview() {
      this.newDialog = true
    },
    handleClose() {
      this.dialog = false
    },
    handlerEdit(item) {
      this.addressItem = JSON.parse(JSON.stringify(item))
      this.newDialog = true
    },
    handlerDelete(item) {
      this.$confirm('您确认要删除该面试信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let params = {
            id: item.id
          }
          delAddresss(params).then(() => {
            this.getAddresss()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
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
  text-align: right;
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
