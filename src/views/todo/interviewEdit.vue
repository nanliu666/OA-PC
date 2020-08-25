<template>
  <div class="fill">
    <page-header
      title="面试评价"
      show-back
      :back="goBack"
    />
    <basic-container block>
      <div class="name-box">
        <div>{{ $route.query.name }}的面试评价</div>
      </div>
      <!-- 评价详情 -->
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
            :model="formData"
            :columns="columns"
          />
          <div class="page-bottom">
            <el-button
              size="medium"
              @click="goBack"
            >
              取消
            </el-button>
            <el-button
              type="primary"
              size="medium"
              @click="handleSubmit"
            >
              提交
            </el-button>
          </div>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>
<script>
const options = [
  {
    value: 'A',
    label: 'A'
  },
  {
    value: 'B',
    label: 'B'
  },
  {
    value: 'C',
    label: 'C'
  },
  {
    value: 'D',
    label: 'D'
  }
]
import { postInterviewInfo } from '@/api/todo/todo'
export default {
  data() {
    var checkScore = (rule, value, callback) => {
      setTimeout(() => {
        if (value < 0) {
          callback(new Error('评分必须大于0'))
        } else {
          if (value > 100) {
            callback(new Error('评分必须小于等于100'))
          } else {
            callback()
          }
        }
      }, 500)
    }
    return {
      formData: {
        id: this.$route.query.id,
        workBackground: '',
        workExperience: '',
        knowledge: '',
        train: '',
        specialty: '',
        evaluation: '',
        score: '',
        status: ''
      },
      columns: [
        {
          prop: 'workBackground',
          itemType: 'select',
          label: '工作背景',
          options: options,
          desc: '是否具备丰富的行业经验，了解行业的发展状况，职业背景好',
          required: true
        },
        {
          prop: 'workExperience',
          itemType: 'select',
          label: '工作经验',
          offset: 4,
          desc: '以往的工作经验是否与本岗位要求一致',
          options: options,
          required: true
        },
        {
          prop: 'knowledge',
          itemType: 'select',
          label: '岗位知识',
          desc: '是否精通本岗位所需专业知识，业务技能熟练，对岗位理解深刻而独到',
          options: options,
          required: true
        },
        {
          prop: 'train',
          itemType: 'select',
          label: '教育培训',
          offset: 4,
          desc: '是否接受过本岗位需要的系统培训，教育背景好',
          options: options,
          required: true
        },
        {
          prop: 'specialty',
          itemType: 'select',
          label: '专业特长',
          desc: '是否具备一定的专业特长，有益于本岗位工作',
          options: options,
          required: true
        },
        {
          prop: 'evaluation',
          itemType: 'input',
          label: '面试评价',
          span: 24,
          rows: 3,
          type: 'textarea',
          required: true,
          rules: [{ max: 200, message: '最多输入200个字符', trigger: 'blur' }]
        },
        {
          prop: 'score',
          itemType: 'input',
          label: '综合打分',
          type: 'input',
          required: true,
          props: {
            onlyNumber: true
          },
          placeholder: '0～100分',
          rules: [{ validator: checkScore, trigger: 'blur' }]
        },
        {
          prop: 'status',
          itemType: 'radio',
          label: '录用建议',
          span: 24,
          options: [
            {
              value: 'Pass',
              label: '通过'
            },
            {
              value: 'Reject',
              label: '淘汰'
            }
          ],
          required: true
        }
      ]
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form
        .validate()
        .then(() => {
          return postInterviewInfo(this.formData)
        })
        .then(() => {
          this.$message.success('提交成功', 2000, this.$router.go(-1))
        })
        .catch()
    },
    // goback
    goBack() {
      this.$store.commit('DEL_TAG', this.$store.state.tags.tag)
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.name-box {
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #202940;
  line-height: 23px;
  font-weight: bold;
  div {
    padding-bottom: 30px;
    border-bottom: 1px solid #e3e7e9;
  }
}

.basic-container--block {
  height: calc(100% - 92px);
  min-height: calc(100% - 92px);
}
</style>
