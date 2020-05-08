<template>
  <div
    id="trainning"
    class="info-wrapper"
  >
    <div class="info-title-bar">
      <span class="info-title">培训经历</span>
    </div>
    <div class="info-content-wrapper">
      <div
        v-for="(item, index) in trainInfo"
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
          ref="train"
          :model="item"
          :rules="rules"
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
                label="培训时间:"
              >
                <span class="info-item-value">{{ item.beginDate + '至' + item.endDate }}</span>
              </el-form-item>
              <el-form-item
                v-show="curItemIndex == index"
                label="培训时间:"
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
                label="培训课程:"
              >
                <span class="info-item-value">{{ item.name }}</span>
              </el-form-item>

              <el-form-item
                v-show="curItemIndex == index"
                label="培训课程"
                prop="name"
              >
                <el-input v-model="item.name" />
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
                label="培训机构:"
              >
                <span class="info-item-value">{{ item.companyName }}</span>
              </el-form-item>
              <el-form-item
                v-show="curItemIndex == index"
                label="培训机构:"
                prop="companyName"
              >
                <el-input v-model="item.companyName" />
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
        <span>添加培训经历</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getStaffTrainInfo,
  delStaffTrainInfo,
  editStaffTrainInfo,
  addStaffTrainInfo
} from '../../../../api/personalInfo'
import { deepClone, randomLenNum, judgeRepeatedTime } from '@/util/util'
let curItem = {}
export default {
  data() {
    let _this = this
    let judgeTime = (value) => {
      let isHasCross = false
      for (let i = 0; i < _this.trainInfo.length; i++) {
        let item = _this.trainInfo[i]
        let timeSpace = [item.beginDate, item.endDate]
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
      trainInfo: [],
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
                callback(new Error('您输入的信息与其他培训经历重复'))
              } else {
                callback()
              }
            }
          }
        ],
        name: [
          {
            required: true,
            trigger: 'blur',
            message: '培训课程不能为空'
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
      this.trainInfo.push(item)
      this.editClick = true
      this.curItemIndex = this.trainInfo.length - 1
      this.curItemId = item.id
    },
    delInfo(item, index) {
      this.$confirm('您确定要删除该紧急联系人吗?', '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delStaffTrainInfo(item.id).then(() => {
            this.trainInfo.splice(index, 1)
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
      this.$refs['train'][index].validate((isPass) => {
        if (isPass) {
          if (this.type == 'add') {
            addStaffTrainInfo(item).then(() => {
              this.editClick = false
              this.curItemIndex = null
              this.$message({
                type: 'success',
                message: '添加成功'
              })
            })
          } else {
            editStaffTrainInfo(item).then(() => {
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
        userId: this.$route.query.userId
      }
      getStaffTrainInfo(params).then((res) => {
        this.trainInfo = res
        this.trainInfo.forEach((item) => {
          this.$set(item, 'monthRange', [item.beginDate, item.endDate])
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
        this.trainInfo.pop()
      } else {
        this.trainInfo[index] = deepClone(curItem)
      }
    },
    monthChange(item) {
      item.beginDate = item.monthRange[0]
      item.endDate = item.monthRange[1]
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('../staffInfo.scss');
</style>
