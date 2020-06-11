<template>
  <div>
    <page-header
      title="表单模板页"
      show-back
    />
    <basic-container>
      <el-row
        type="flex"
        justify="center"
        style="padding-top:40px;"
      >
        <el-col
          :xl="16"
          :lg="16"
          :md="18"
          :sm="20"
          :xs="22"
        >
          <common-form
            ref="form"
            :model="form"
            :columns="columns"
          >
            <template slot="resume">
              <common-upload
                v-model="form.resume"
                :multiple="false"
                :before-upload="beforeResumeUpload"
              >
                <el-button
                  v-if="form.resume.length === 0"
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
            </template>
          </common-form>
          <div class="page-bottom">
            <el-button
              type="primary"
              size="medium"
              @click="handleSubmit"
            >
              保存
            </el-button>
          </div>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>
<script>
import { provinceAndCityData } from 'element-china-area-data'
import { getRecruitmentList } from '@/api/personnel/person'
import { getOrgTreeSimple } from '@/api/org/org'

export default {
  name: 'DemoForm',
  components: {
    commonUpload: () => import('@/components/common-upload/commonUpload')
  },
  data() {
    return {
      personId: null,
      form: {
        recruitmentId: null,
        name: null,
        sex: null,
        age: null,
        email: null,
        addressArr: [],
        recruitment: null,
        resume: [],
        remark: '',
        orgId: '',
        date: null
      },
      columns: [
        {
          prop: 'recruitmentId',
          itemType: 'select',
          label: '招聘需求',
          options: [],
          props: {
            label: 'jobName',
            value: 'id'
          },
          required: true
        },
        {
          prop: 'orgName',
          label: '部门名称',
          disabled: true,
          itemType: 'input',
          offset: 4
        },
        {
          prop: 'name',
          label: '姓名',
          itemType: 'input',
          required: true
          // placeholder:'test'
        },
        {
          prop: 'age',
          itemType: 'input',
          label: '年龄',
          props: {
            onlyNumber: true
          },
          offset: 4,
          required: true
        },
        {
          prop: 'phonenum',
          itemType: 'input',
          label: '手机号码',
          maxLength: 11,
          props: {
            onlyNumber: true
          },
          required: true,
          rules: [{ pattern: /^[0-9]{11}$/, message: '长度必须为11位', trigger: 'blur' }]
        },
        {
          prop: 'email',
          itemType: 'input',
          label: '邮箱',
          offset: 4,
          required: true,
          rules: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]
        },
        {
          prop: 'addressArr',
          itemType: 'cascader',
          label: '目前所在地',
          options: provinceAndCityData
        },
        {
          prop: 'resume',
          itemType: 'slot',
          label: '简历',
          offset: 4,
          required: true
        },
        {
          prop: 'date',
          itemType: 'datePicker',
          label: '入职日期',
          required: true
        },
        {
          prop: 'recruitment',
          itemType: 'select',
          label: '招聘渠道',
          required: true,
          offset: 4,
          props: {
            label: 'dictValue',
            value: 'dictKey'
          }
        },
        {
          prop: 'remark',
          itemType: 'input',
          label: '备注',
          rows: 2,
          type: 'textarea'
        },
        {
          prop: 'orgId',
          itemType: 'treeSelect',
          label: '部门',
          offset: 4,
          props: {
            selectParams: {
              placeholder: '请选择组织',
              multiple: false
            },
            treeParams: {
              data: [],
              'check-strictly': true,
              'default-expand-all': false,
              'expand-on-click-node': false,
              clickParent: true,
              filterable: false,
              props: {
                children: 'children',
                label: 'orgName',
                disabled: 'disabled',
                value: 'orgId'
              }
            }
          }
        }
      ],
      recruitmentList: []
    }
  },
  watch: {
    'form.recruitmentId': function(val) {
      if (val) {
        this.form.orgName = (this.recruitmentList.find((item) => item.id === val) || {}).orgName
      }
    }
  },
  async created() {
    this.$store.dispatch('CommonDict', 'RecruitmentChannel').then((res) => {
      this.columns.find((item) => item.prop === 'recruitment').options = res
    })
    await this.getRecruitment()
    this.loadOrgData()
  },
  methods: {
    beforeResumeUpload(file) {
      const regx = /^.*\.(doc|docx|pdf)$/
      // const isLt2M = file.size / 1024 / 1024 < 3

      // if (!isLt2M) {
      //   this.$message.error('上传图片大小不能超过 3MB!')
      //   return false
      // }
      if (!regx.test(file.name)) {
        this.$message.error('上传简历只支持word或pdf文件')
        return false
      }
      return true
    },
    getRecruitment() {
      getRecruitmentList().then((res) => {
        this.recruitmentList = res
        this.columns.find((item) => item.prop === 'recruitmentId').options = res
      })
    },
    handleSubmit() {
      // eslint-disable-next-line
      console.log('form', JSON.parse(JSON.stringify(this.form)))
      this.$refs.form
        .validate()
        .then((res) => {
          // eslint-disable-next-line
          console.log('validate', res)
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log('validate error:', error)
        })
    },
    loadOrgData() {
      getOrgTreeSimple({ parentOrgId: '0' }).then((res) => {
        this.columns.find((item) => item.prop === 'orgId').props.treeParams.data = res
      })
    },
    clear() {
      this.form = this.$options.data().form
      setTimeout(() => {
        this.$refs.form.clearValidate()
      })
    },
    goBack() {
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-cascader,
.el-select {
  width: 100%;
}
.el-col {
  margin-bottom: 0;
}
.page-bottom {
  display: inline-block;
  padding-bottom: 20px;
}
</style>
