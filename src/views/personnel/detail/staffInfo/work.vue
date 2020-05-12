<template>
  <div
    id="work"
    class="info-wrapper"
  >
    <div class="info-title-bar">
      <span class="info-title">工作经历</span>
    </div>
    <div class="info-content-wrapper">
      <div
        v-for="(item, index) in workInfo"
        :key="index"
        class="info-content"
        :class="{ 'back-style': curItemIndex == index }"
      >
        <div style="position: relative;z-index: 10;">
          <span
            v-show="curItemIndex != index"
            class="delete-button"
            @click="delInfo(item, index)"
          >
            <i
              class="el-icon-delete"
              style="font-size:18px;margin-right:5px"
            />
            <span>删除</span>
          </span>
          <span
            v-show="curItemIndex != index"
            class="edit-button"
            style="margin-right:8px;"
            @click="editInfo(item, index)"
          >
            <i
              class="el-icon-edit"
              style="font-size:18px;margin-right:5px"
            />
            <span>编辑</span>
          </span>
        </div>
        <el-form
          ref="work"
          :rules="rules"
          :model="item"
          label-width="150px"
          class="info-form"
          size="small"
        >
          <el-row :justify="'center'">
            <el-col
              :span="8"
              :push="2"
            >
              <el-form-item
                v-show="curItemIndex != index"
                label="在职时间:"
              >
                <span class="info-item-value">{{
                  item.beginWorkDate + '至' + item.endWorkDate
                }}</span>
              </el-form-item>
              <el-form-item
                v-show="curItemIndex == index"
                label="在职时间:"
                prop="monthRange"
              >
                <el-date-picker
                  v-model="item.monthRange"
                  type="monthrange"
                  format="yyyy-MM"
                  value-format="yyyy-MM"
                  range-separator="至"
                  start-placeholder="开始月份"
                  end-placeholder="结束月份"
                  @blur="monthChange(item)"
                />
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
              :push="4"
            >
              <el-form-item
                v-show="curItemIndex != index"
                label="单位名称:"
              >
                <span class="info-item-value">{{ item.companyName }}</span>
              </el-form-item>

              <el-form-item
                v-show="curItemIndex == index"
                label="单位名称"
                prop="companyName"
              >
                <el-input v-model="item.companyName" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col
              :span="8"
              :push="2"
            >
              <el-form-item
                v-show="curItemIndex != index"
                label="职位名称:"
              >
                <span class="info-item-value">{{ item.jobName }}</span>
              </el-form-item>
              <el-form-item
                v-show="curItemIndex == index"
                label="职位名称:"
                prop="jobName"
              >
                <el-input v-model="item.jobName" />
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
              :push="4"
            >
              <el-form-item
                v-show="curItemIndex != index"
                label="离职薪资:"
              >
                <span class="info-item-value">{{ item.salary }}</span>
              </el-form-item>
              <el-form-item
                v-show="curItemIndex == index"
                label="离职薪资:"
                prop="salary"
              >
                <el-input
                  v-model="item.salary"
                  type="number"
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
                v-show="curItemIndex != index"
                label="证明人:"
              >
                <span class="info-item-value">{{ item.witnessName }}</span>
              </el-form-item>
              <el-form-item
                v-show="curItemIndex == index"
                label="证明人:"
                prop="witnessName"
              >
                <el-input v-model="item.witnessName" />
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
              :push="4"
            >
              <el-form-item
                v-show="curItemIndex != index"
                label="证明人联系电话:"
              >
                <span class="info-item-value">{{ item.witnessPhone }}</span>
              </el-form-item>
              <el-form-item
                v-show="curItemIndex == index"
                label="证明人联系电话:"
                prop="witnessPhone"
              >
                <el-input v-model="item.witnessPhone" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col
              :span="8"
              :push="2"
            >
              <el-form-item
                v-show="curItemIndex != index"
                label="有无守密义务或竞业禁止务:"
              >
                <span class="info-item-value">{{ item.isSecret == 1 ? '有' : '无' }}</span>
              </el-form-item>
              <el-form-item
                v-show="curItemIndex == index"
                label="有无守密义务或竞业禁止务:"
                prop="isSecret"
              >
                <el-radio
                  v-model="item.isSecret"
                  label="1"
                >
                  有
                </el-radio>
                <el-radio
                  v-model="item.isSecret"
                  label="0"
                >
                  无
                </el-radio>
              </el-form-item>
            </el-col>
            <el-col
              v-show="item.isSecret == '1'"
              :span="8"
              :push="4"
            >
              <el-form-item
                v-show="curItemIndex != index"
                label="遵守义务时间:"
              >
                <span class="info-item-value">{{
                  item.beginSecretDate + '至' + item.endSecretDate
                }}</span>
              </el-form-item>
              <el-form-item
                v-show="curItemIndex == index"
                label="遵守义务时间:"
                prop="secretMonthRange"
              >
                <el-date-picker
                  v-model="item.secretMonthRange"
                  type="monthrange"
                  format="yyyy-MM"
                  value-format="yyyy-MM"
                  range-separator="至"
                  start-placeholder="开始月份"
                  end-placeholder="结束月份"
                  @blur="secretMonthChange(item)"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col
              v-show="item.isSecret == '1'"
              :span="8"
              :push="2"
            >
              <el-form-item
                v-show="curItemIndex != index"
                label="具体内容:"
              >
                <span class="info-item-value">{{ item.content }}</span>
              </el-form-item>
              <el-form-item
                v-show="curItemIndex == index"
                label="具体内容:"
                prop="content"
              >
                <el-input v-model="item.content" />
              </el-form-item>
            </el-col>
          </el-row>
          <div
            v-show="curItemIndex == index"
            class="info-button-group"
            :justify="'center'"
          >
            <el-button
              type="primary"
              @click="saveInfo(item, index)"
            >
              保存
            </el-button>
            <el-button @click="cancelEdit(index)">
              取消
            </el-button>
          </div>
        </el-form>
      </div>
    </div>

    <div class="add-info-item">
      <div
        class="add-info-button"
        @click="addInfo"
      >
        <i
          class="el-icon-plus"
          style="margin-right:6px;"
        />
        <span>添加工作经历</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getStaffWorkInfo,
  delStaffWorkInfo,
  editStaffWorkInfo,
  addStaffworkInfo
} from '../../../../api/personalInfo'
import { deepClone, randomLenNum, judgeRepeatedTime } from '@/util/util'
import { isMobile } from '@/util/validate'
let curItem = {}
export default {
  data() {
    let _this = this
    let judgeTime = (value) => {
      let isHasCross = false
      for (let i = 0; i < _this.workInfo.length; i++) {
        let item = _this.workInfo[i]
        let timeSpace = [item.beginWorkDate, item.endWorkDate]
        if (_this.curItemId != item.id && judgeRepeatedTime(timeSpace, value)) {
          isHasCross = true
          return isHasCross
        } else {
          isHasCross = false
        }
      }
      return isHasCross
    }
    return {
      curItemId: null,
      workInfo: [],
      curItemIndex: null,
      editClick: false,
      type: '',
      rules: {
        monthRange: [
          {
            required: true,
            trigger: 'blur',
            message: '时间不能为空'
          },
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (judgeTime(value)) {
                callback(new Error('您输入的信息与其他工作经历重复'))
              } else {
                callback()
              }
            }
          }
        ],
        secretMonthRange: [
          {
            required: true,
            trigger: 'blur',
            message: '时间不能为空'
          }
        ],
        companyName: [
          {
            required: true,
            trigger: 'blur',
            message: '单位名称不能为空'
          }
        ],
        witnessPhone: [
          {
            required: false,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value && !isMobile(value)) {
                callback(new Error('电话格式有误'))
              } else {
                callback()
              }
            }
          }
        ]
      }
    }
  },
  created() {
    this.getBasicInfo()
  },
  methods: {
    addInfo() {
      this.type = 'add'
      let item = {
        id: randomLenNum(),
        beginWorkDate: '',
        endWorkDate: '',
        companyName: '',
        jobName: '',
        salary: '',
        witnessName: '',
        witnessPhone: '',
        isSecret: '',
        beginSecretDate: '',
        endSecretDate: '',
        content: ''
      }
      this.workInfo.push(item)
      this.editClick = true
      this.curItemIndex = this.workInfo.length - 1
      this.curItemId = item.id
    },
    delInfo(item, index) {
      this.$confirm('您确定要删除该紧急联系人吗?', '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delStaffWorkInfo(item.id).then(() => {
            this.workInfo.splice(index, 1)
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
    },
    saveInfo(item, index) {
      this.$refs['work'][index].validate((isPass) => {
        if (isPass) {
          delete item.monthRange
          if (this.type == 'add') {
            addStaffworkInfo(item).then(() => {
              this.editClick = false
              this.curItemIndex = null
              this.$message({
                type: 'success',
                message: '添加成功'
              })
            })
          } else {
            editStaffWorkInfo(item).then(() => {
              this.editClick = false
              this.curItemIndex = null
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            })
          }
        }
      })
    },
    getBasicInfo() {
      let params = {
        userId: this.$route.params.userId
      }
      getStaffWorkInfo(params).then((res) => {
        this.workInfo = res
        this.workInfo.forEach((item) => {
          this.$set(item, 'monthRange', [item.beginWorkDate, item.endWorkDate])
          this.$set(item, 'secretMonthRange', [item.beginSecretDate, item.endSecretDate])
        })
      })
    },
    editInfo(item, index) {
      this.type = 'edit'
      this.editClick = true
      this.curItemIndex = index
      curItem = deepClone(item)
      this.curItemId = item.id
    },
    cancelEdit(index) {
      this.editClick = false
      this.curItemIndex = null
      if (this.type == 'add') {
        this.workInfo.pop()
      } else {
        this.workInfo[index] = deepClone(curItem)
      }
    },
    monthChange(item) {
      item.beginWorkDate = item.monthRange[0]
      item.endWorkDate = item.monthRange[1]
    },
    secretMonthChange(item) {
      item.beginSecretDate = item.secretMonthRange[0]
      item.endSecretDate = item.secretMonthRange[1]
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('../staffInfo.scss');
</style>
