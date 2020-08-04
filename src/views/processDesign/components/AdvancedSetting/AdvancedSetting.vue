<template>
  <div class="setting-container">
    <commonForm
      ref="setting"
      :model="formData"
      :columns="info"
    >
      <div slot="approverDistinct">
        <el-select
          v-model="formData.approverDistinct"
          placeholder="请选择去重类型"
          :style="{ width: '100%' }"
        >
          <el-option
            v-for="(item, index) in autoRepeatOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
      </div>
      <div slot="approverNull">
        <el-radio-group v-model="formData.approverNull">
          <el-radio :label="0">
            自动通过
            <el-tooltip
              content="当指定人员或主管为空的时候，审批单将自动通过"
              placement="top"
            >
              <i class="el-icon-info" />
            </el-tooltip>
          </el-radio>
          <el-radio :label="1">
            自动转交给管理员
            <el-tooltip
              content="当指定人员或主管为空的时候，审批单将自动转交给管理员"
              placement="top"
            >
              <i class="el-icon-info" />
            </el-tooltip>
          </el-radio>
        </el-radio-group>
      </div>
      <div slot="isOpinion">
        <el-checkbox v-model="formData.isOpinion">
          必填
          <el-tooltip
            content="如果勾选，审批人必须填写意见才可以提交审批结果"
            placement="top"
          >
            <i class="el-icon-info" />
          </el-tooltip>
        </el-checkbox>
      </div>
    </commonForm>
  </div>
</template>
<script>
import { info } from './settingConfig'

export default {
  components: {},
  props: ['conf'],
  data() {
    return {
      checkList: [],
      info,
      formData: {
        approverDistinct: 0, //审批意见填写提示
        approverNull: 0,
        isOpinion: '',
        tip: ''
      },
      rules: {
        autoRepeat: [
          {
            required: true,
            message: '请选择选择分组',
            trigger: 'change'
          }
        ]
      },
      autoRepeatOptions: [
        {
          label: '仅对连续出现的审批人去重',
          value: 1
        },
        {
          label: '仅保留流程中的第一个',
          value: 2
        },
        {
          label: '不做任何处理',
          value: 0
        }
      ]
    }
  },
  watch: {
    conf: {
      handler() {
        if (typeof this.conf === 'object' && this.conf !== null) {
          Object.assign(this.formData, this.conf)
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {},
  methods: {
    handleCheckedCitiesChange() {},
    getData() {
      return new Promise((resolve, reject) => {
        this.$refs['setting']
          .validate()
          .then((valid) => {
            if (!valid) {
              reject(false)
              return
            }
            // this.formData.icon = this.activeIcon
            resolve(this.formData)
            // return this.formData// TODO 提交表单
          })
          .catch(() => {
            this.$emit('jump', 'advancedSetting')
          })
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.setting-container {
  width: 600px;
  height: 100%;
  margin: auto;
  background: white;
  padding: 16px;

  >>> .el-form--label-top .el-form-item__label {
    padding-bottom: 0;
  }
}</style
>>
