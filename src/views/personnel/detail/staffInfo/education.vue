<template>
  <div
    id="education"
    class="info-wrapper"
  >
    <div class="info-title-bar">
      <span class="info-title">教育经历</span>
    </div>
    <div class="info-content-wrapper">
      <div v-if="educationInfo.length == 0">
        <avue-empty />
      </div>
      <div
        v-for="(item, index) in educationInfo"
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
          ref="education"
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
                label="受教育时间:"
              >
                <span class="info-item-value">{{ item.beginDate + '至' + item.endDate }}</span>
              </el-form-item>
              <el-form-item
                v-show="curItemIndex == index"
                label="受教育时间:"
                prop="monthRange"
              >
                <el-date-picker
                  v-model="item.monthRange"
                  type="daterange"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始月份"
                  end-placeholder="结束月份"
                  :unlink-panels="true"
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
                label="学历:"
              >
                <span class="info-item-value">{{ item.educationalLevel }}</span>
              </el-form-item>

              <el-form-item
                v-show="curItemIndex == index"
                label="学历:"
                prop="educationalLevel"
              >
                <el-select v-model="item.educationalLevel">
                  <el-option
                    v-for="ite in edubackOptions"
                    :key="ite.value"
                    :label="ite.label"
                    :value="ite.value"
                  />
                </el-select>
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
                label="教育类型:"
              >
                <span class="info-item-value">{{ item.educationalType }}</span>
              </el-form-item>
              <el-form-item
                v-show="curItemIndex == index"
                label="教育类型:"
                prop="educationalType"
              >
                <el-select v-model="item.educationalType">
                  <el-option
                    v-for="itemm in educationType"
                    :key="itemm.value"
                    :label="itemm.label"
                    :value="itemm.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
              :push="4"
            >
              <el-form-item
                v-show="curItemIndex != index"
                label="学校名称:"
              >
                <span class="info-item-value">{{ item.schoolName }}</span>
              </el-form-item>
              <el-form-item
                v-show="curItemIndex == index"
                label="学校名称:"
                prop="schoolName"
              >
                <el-input v-model="item.schoolName" />
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
                label="专业:"
              >
                <span class="info-item-value">{{ item.majorName }}</span>
              </el-form-item>
              <el-form-item
                v-show="curItemIndex == index"
                label="专业:"
                prop="majorName"
              >
                <el-input v-model="item.majorName" />
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
        <span>添加教育经历</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getStaffEducationInfo,
  delStaffEducationInfo,
  editStaffEducationInfo,
  addStaffEducationInfo
} from '../../../../api/personalInfo'
import { deepClone, judgeRepeatedTime } from '@/util/util'
let curItem = {}
export default {
  data() {
    let _this = this
    let judgeTime = (value) => {
      let isHasCross = false
      for (let i = 0; i < _this.educationInfo.length; i++) {
        let item = _this.educationInfo[i]
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
      educationInfo: [],
      curItemIndex: null,
      editClick: false,
      type: '',
      monthRange: [],
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
                callback(new Error('您输入的信息与其他教育经历重复'))
              } else {
                callback()
              }
            }
          }
        ],
        educationalLevel: [
          {
            required: true,
            trigger: 'blur',
            message: '学历不能为空'
          }
        ]
      },
      educationType: [
        {
          value: '统考',
          label: '统考'
        },
        {
          value: '自考',
          label: '自考'
        },
        {
          value: '函授',
          label: '函授'
        }
      ],
      edubackOptions: [
        {
          value: '小学',
          label: '小学'
        },
        {
          value: '初中',
          label: '初中'
        },
        {
          value: '高中',
          label: '高中'
        },
        {
          value: '大专',
          label: '大专'
        },
        {
          value: '本科',
          label: '本科'
        },
        {
          value: '硕士',
          label: '硕士'
        },
        {
          value: '博士',
          label: '博士'
        },
        {
          value: '博士后',
          label: '博士后'
        },
        {
          value: '职高',
          label: '职高'
        },
        {
          value: '中专',
          label: '中专'
        },
        {
          value: '技校',
          label: '技校'
        },
        {
          value: '中等师范学校',
          label: '中等师范学校'
        },
        {
          value: '其他',
          label: '其他'
        }
      ]
    }
  },
  created() {
    this.getBasicInfo()
  },
  methods: {
    addInfo() {
      this.type = 'add'
      let item = {
        beginDate: '2010-09',
        endDate: '2014-06',
        educationalLevel: '',
        educationalType: '',
        schoolName: '',
        majorName: ''
      }
      this.educationInfo.push(item)
      this.editClick = true
      this.curItemIndex = this.educationInfo.length - 1
      this.curItemId = item.id
    },
    delInfo(item) {
      this.$confirm('您确定要删除该教育经历吗?', '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let params = {
            ids: item.id
          }
          delStaffEducationInfo(params).then(() => {
            this.getBasicInfo()
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
      this.$refs['education'][index].validate((isPass) => {
        if (isPass) {
          //删除初始化附加的属性monthRange
          delete item.monthRange
          if (this.type == 'add') {
            item.userId = this.$route.params.userId
            addStaffEducationInfo(item).then(() => {
              this.getBasicInfo()
              this.editClick = false
              this.curItemIndex = null
              this.$message({
                type: 'success',
                message: '添加成功'
              })
            })
          } else {
            if (item.hasOwnProperty('userId')) {
              delete item.userId
            }
            editStaffEducationInfo(item).then(() => {
              this.getBasicInfo()
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
      getStaffEducationInfo(params).then((res) => {
        this.educationInfo = res
        this.educationInfo.forEach((item) => {
          this.$set(item, 'monthRange', [item.beginDate, item.endDate])
        })
      })
    },
    editInfo(item, index) {
      this.$set(item, 'monthRange', [item.beginDate, item.endDate])
      this.type = 'edit'
      this.editClick = true
      this.curItemIndex = index
      this.curItemId = item.id
      curItem = deepClone(item)
    },
    cancelEdit(index) {
      this.editClick = false
      this.curItemIndex = null
      if (this.type == 'add') {
        this.educationInfo.pop()
      } else {
        this.$set(this.educationInfo, index, deepClone(curItem))
      }
    },
    monthChange(item) {
      item.beginDate = item.monthRange[0]
      item.endDate = item.monthRange[1]
    }
  }
}
</script>

<style lang="scss" scoped></style>
