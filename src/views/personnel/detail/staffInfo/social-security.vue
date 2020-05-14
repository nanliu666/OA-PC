<template>
  <div
    id="social-security"
    class="info-wrapper"
  >
    <div class="info-title-bar">
      <span class="info-title">社保公积金</span>
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
        ref="socialCount"
        :model="allInfo"
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
              label="是否本地首次缴纳社保:"
            >
              <span class="info-item-value">{{ allInfo.isFirstSs == '1' ? '是' : '否' }}</span>
            </el-form-item>
            <el-form-item
              v-show="!readonlyBasicInfo"
              label="是否本地首次缴纳社保:"
              prop="isFirstSs"
            >
              <el-select v-model="allInfo.isFirstSs">
                <el-option
                  v-for="item in ssOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item
              v-show="readonlyBasicInfo"
              label="个人社保账号:"
            >
              <span class="info-item-value">{{ allInfo.ssNo }}</span>
            </el-form-item>
            <el-form-item
              v-show="!readonlyBasicInfo"
              label="个人社保账号:"
              prop="ssNo"
            >
              <el-input
                v-model="allInfo.ssNo"
                placeholder="请输入18位数字的个人社保账号"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :span="8"
            :push="2"
          >
            <el-form-item
              v-show="readonlyBasicInfo"
              label="是否本地首次缴纳公积金:"
            >
              <span class="info-item-value">{{ allInfo.isFirstEpf == '1' ? '是' : '否' }}</span>
            </el-form-item>
            <el-form-item
              v-show="!readonlyBasicInfo"
              label="是否本地首次缴纳公积金:"
              prop="isFirstEpf"
            >
              <el-select v-model="allInfo.isFirstEpf">
                <el-option
                  v-for="item in epfOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :push="4"
          >
            <el-form-item
              v-show="readonlyBasicInfo"
              label="个人公积金账号:"
            >
              <span class="info-item-value">{{ allInfo.epfNo }}</span>
            </el-form-item>
            <el-form-item
              v-show="!readonlyBasicInfo"
              label="个人公积金账号:"
              prop="epfNo"
            >
              <el-input
                v-model="allInfo.epfNo"
                placeholder="请输入9位或者12位数字的公积金账号"
              />
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
import { validataSSCount, validataEpt } from '@/util/validate'
let allInfo = {}
export default {
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      allInfo: {},
      readonlyBasicInfo: true,
      rules: {
        ssNo: [
          {
            required: false,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value && !validataSSCount(value)) {
                callback(new Error('个人社保账号格式有误'))
              } else {
                callback()
              }
            }
          }
        ],
        epfNo: [
          {
            required: false,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value && !validataEpt(value)) {
                callback(new Error('个人公积金账号格式有误'))
              } else {
                callback()
              }
            }
          }
        ]
      },
      ssOptions: [
        {
          value: '1',
          label: '是'
        },
        {
          value: '0',
          label: '否'
        }
      ],
      epfOptions: [
        {
          value: '1',
          label: '是'
        },
        {
          value: '0',
          label: '否'
        }
      ]
    }
  },
  watch: {
    info: {
      handler(val) {
        this.allInfo = val
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    editInfo() {
      this.readonlyBasicInfo = false
      allInfo = deepClone(this.allInfo)
    },
    saveInfo() {
      this.$refs['socialCount'].validate((isPass) => {
        if (isPass) {
          let params = {
            userId: this.$route.params.userId,
            isFirstSs: this.allInfo.isFirstSs,
            ssNo: this.allInfo.ssNo,
            isFirstEpf: this.allInfo.isFirstEpf,
            epfNo: this.allInfo.epfNo
          }
          editStaffBasicInfo(params).then(() => {
            this.readonlyBasicInfo = true
            allInfo = deepClone(this.allInfo)
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          })
        }
      })
    },
    cancelEdit() {
      this.readonlyBasicInfo = true
      this.allInfo = deepClone(allInfo)
    }
  }
}
</script>

<style lang="scss" scoped></style>
