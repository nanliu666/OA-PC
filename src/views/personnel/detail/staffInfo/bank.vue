<template>
  <div
    id="bank"
    class="info-wrapper"
  >
    <div class="info-title-bar">
      <span class="info-title">工资银行卡</span>
      <span
        v-show="readonlyBasicInfo"
        class="edit-button"
        @click="editInfo"
      >
        <i
          class="el-icon-edit"
          style="font-size:18px;margin-right:5px"
        />
        <span>编辑</span>
      </span>
    </div>
    <div
      class="info-content"
      :class="{ 'back-style': !readonlyBasicInfo }"
    >
      <el-form
        ref="bank"
        :model="bankInfo"
        :rules="rules"
        label-width="150px"
        class="info-form"
        size="small"
      >
        <el-row>
          <el-col
            :span="8"
            :push="2"
          >
            <el-form-item
              v-show="readonlyBasicInfo"
              label="银行卡号:"
            >
              <span class="info-item-value">{{ bankInfo.bankNo }}</span>
            </el-form-item>
            <el-form-item
              v-show="!readonlyBasicInfo"
              label="银行卡号:"
              prop="bankNo"
            >
              <el-input v-model="bankInfo.bankNo" />
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item
              v-show="readonlyBasicInfo"
              label="开户行:"
            >
              <span class="info-item-value">{{ bankInfo.bankName }}</span>
            </el-form-item>
            <el-form-item
              v-show="!readonlyBasicInfo"
              label="开户行:"
              prop="bankName"
            >
              <el-input v-model="bankInfo.bankName" />
            </el-form-item>
          </el-col>
        </el-row>
        <div
          v-show="!readonlyBasicInfo"
          class="info-button-group"
          :justify="'center'"
        >
          <el-button
            type="primary"
            @click="saveInfo"
          >
            保存
          </el-button>
          <el-button @click="cancelEdit">
            取消
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { editStaffBasicInfo } from '../../../../api/personalInfo'
import { deepClone } from '@/util/util'
import { validataBankCard } from '@/util/validate'
let bankInfo = {}
export default {
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      bankInfo: {},
      readonlyBasicInfo: true,
      rules: {
        bankNo: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请输入银行卡号'))
              } else if (value && !validataBankCard(value)) {
                callback(new Error('银行卡号格式有误'))
              } else {
                callback()
              }
            }
          }
        ]
      }
    }
  },
  watch: {
    info: {
      handler(val) {
        this.bankInfo = val
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    editInfo() {
      this.readonlyBasicInfo = false
      bankInfo = deepClone(this.bankInfo)
    },
    saveInfo() {
      this.$refs['bank'].validate((isPass) => {
        if (isPass) {
          let params = {
            userId: this.$route.params.userId,
            bankName: this.bankInfo.bankName,
            bankNo: this.bankInfo.bankNo
          }
          editStaffBasicInfo(params).then(() => {
            this.readonlyBasicInfo = true
            bankInfo = deepClone(this.bankInfo)
            this.$message({
              type: 'success',
              message: '保存成功'
            })
          })
        }
      })
    },
    cancelEdit() {
      this.readonlyBasicInfo = true
      this.bankInfo = deepClone(bankInfo)
    }
  }
}
</script>

<style lang="scss" scoped></style>
