<template>
  <div>
    <el-form
      ref="attrsForm"
      :model="form"
      label-width="130px"
      label-position="top"
      size="medium"
    >
      <el-row :gutter="100">
        <el-col :span="24">
          <el-row :gutter="100">
            <el-col
              v-for="(basic, index) in infoForm.basicAttrs"
              :key="basic.attrId"
              :span="12"
            >
              <el-form-item
                :label="basic.attrName"
                :rules="basicAttrsRules(basic)"
                :prop="basic.props"
              >
                <template v-if="basic.inType == 0">
                  <el-input
                    v-model="form[basic.props]"
                    :minlength="basic.minLen"
                    :maxlength="basic.maxLen"
                    class="widthSet"
                    :class="[basic.attrId === '1' ? 'active' : '']"
                    disabled
                    @blur="blur(basic)"
                  />
                </template>
                <template v-if="basic.inType == 1">
                  <el-input
                    v-model="form[basic.props]"
                    :minlength="basic.minLen"
                    :maxlength="basic.maxLen"
                    class="widthSet"
                    :class="[basic.attrId === '1' ? '' : '']"
                    :disabled="disabled"
                    @input="(value) => inputPhonenum(value, index)"
                    @blur="blur(basic, basic.attrId === '1' ? true : false)"
                  />
                </template>
                <template v-if="basic.inType == 2">
                  <el-select
                    v-model="form[basic.props]"
                    placeholder="请选择"
                    class="widthSet select"
                    :disabled="disabled"
                    @change="blur(basic)"
                  >
                    <el-option
                      v-for="item in basic.value || ''"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </template>
                <template v-if="basic.inType == 3">
                  <el-select
                    v-model="form[basic.props]"
                    multiple
                    placeholder="请选择"
                    clearable
                    class="widthSet select"
                    :disabled="disabled"
                  >
                    <el-option
                      v-for="item in basic.value || ''"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </template>
                <template v-if="basic.inType == 4">
                  <el-date-picker
                    v-model="form[basic.props]"
                    type="date"
                    class="widthSet select"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    :disabled="disabled"
                    @change="blur(basic)"
                  />
                </template>
                <template v-if="basic.inType == 5">
                  <el-link type="primary">
                    {{ basic.attrValue }}
                  </el-link>
                </template>
                <template v-if="basic.inType == 6">
                  <span class="zhezhao">
                    <b />
                    <el-input
                      v-model="form[basic.props]"
                      :minlength="basic.minLen"
                      :maxlength="basic.maxLen"
                      class="widthSet"
                      :disabled="disabled"
                    >
                      <i
                        slot="suffix"
                        class="el-icon-edit el-input__icon"
                      />
                    </el-input>
                  </span>
                </template>
                <template v-if="basic.inType == 7">
                  <el-radio-group
                    v-model="form[basic.props]"
                    :disabled="disabled"
                    @change="blur(basic)"
                  >
                    <el-radio label="1">
                      是
                    </el-radio>
                    <el-radio label="0">
                      否
                    </el-radio>
                  </el-radio-group>
                </template>
                <template v-if="basic.inType == 8">
                  <el-cascader
                    v-model="form[basic.props]"
                    :disabled="disabled"
                    clearable
                    size="medium"
                    :options="options"
                    class="widthSet select"
                    @change="blur(basic)"
                  />
                </template>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { provinceAndCityData } from 'element-china-area-data'
export default {
  name: 'InputArray',
  components: {},
  props: {
    form: {
      type: Object
    },
    infoForm: {
      type: Object
    },
    disabled: {
      type: Boolean
    },
    ispass: {
      type: Boolean
    }
  },
  data() {
    return {
      options: provinceAndCityData,
      pass: this.ispass,
      userId: {
        val: true,
        messges: ''
      },
      phonenum: null
    }
  },
  watch: {
    // infoForm: {
    //     handler(data) {
    //         console.log(data.basicAttrs[1]);
    //         this.phonenum = data.basicAttrs[1];
    //     },
    //     immediate: true
    // }
  },
  mounted() {
    // this.getLevel();
    // // this.profession();
    // this.getPosition();
  },
  methods: {
    refsform() {},
    async check(data) {
      const obj = await this.getInfoCheck(data)
      return obj
    },
    getInfoCheck() {
      // const params = {
      //     [data.keyName]: data.attrValue
      // };
      // return new Promise(resolve => {
      //     getInfoCheck(params)
      //         .then(() => {
      //             const msg = {
      //                 val: true
      //             };
      //             resolve(msg);
      //         }).catch(err => {
      //             const msg = {
      //                 val: false,
      //                 messges: err.errMsg
      //             };
      //             resolve(msg);
      //         });
      // });
    },
    blur(data) {
      if (data.attrValue === data.attrvalue) {
        return
      }

      this.$emit('changeInfo', data)
    },

    submitForm() {
      return Promise.all(
        ['attrsForm'].map((it) => {
          return new Promise((resolve, reject) => {
            this.$refs[it].validate((valid) => {
              if (valid) {
                resolve(it)
              } else {
                reject(it)
              }
            })
          })
        })
      )
        .then(() => {
          return true
          // this.submitFunc(status);
        })
        .catch((err) => {
          this.$nextTick(() => {
            this.$refs[err] &&
              this.$refs[err].$el &&
              this.$refs[err].$el.scrollIntoView &&
              this.$refs[err].$el.scrollIntoView({
                behavior: 'auto',
                block: 'end'
              })
          })
        })
    },
    validate() {
      return new Promise((resolve) => {
        this.$refs['attrsForm'].validate((pass) => {
          this.$emit('update:infoForm', this.infoForm)
          if (pass) {
            resolve(pass)
            return
          }
        })
      })
    },
    /**
     *  author guanfenda
     *  给每个input 框 赋已验证规则事件
     * */
    basicAttrsRules(basic) {
      if (basic.rules) {
        let rules = [...basic.rules]
        return rules
      }

      // if (basic.inType === 1 || basic.inType === 7) {
      //     // inType =1 有必填规则
      //     rules.push({
      //         required: basic.status,
      //         trigger: 'change',
      //         message: basic.message
      //     })
      //     // if (basic.status) {
      //     //     rules.push({
      //     //         trigger: 'change',
      //     //         validator: (rule, value, callback) => {
      //     //             if (basic.dataType === 1) {
      //     //                 if (
      //     //                     (basic.minLen > 0 &&
      //     //                         (!value ||
      //     //                             value.length < basic.minLen)) ||
      //     //                     (basic.maxLen > 0 &&
      //     //                         (!value || value.length > basic.maxLen))
      //     //                 ) {
      //     //                     callback(
      //     //                         new Error(
      //     //                             `长度限制在${basic.minLen}~${
      //     //                                 basic.maxLen
      //     //                             }之间`
      //     //                         )
      //     //                     )
      //     //                 } else {
      //     //                     callback()
      //     //                 }
      //     //             } else if (basic.dataType === 2) {
      //     //                 if (/^[0-9]+$/.test(value)) {
      //     //                     callback()
      //     //                 } else {
      //     //                     callback(new Error('请输入整数'))
      //     //                 }
      //     //             } else if (basic.dataType === 3) {
      //     //                 if (/^[0-9]+[.]{0,1}[0-9]+$/.test(value)) {
      //     //                     callback()
      //     //                 } else {
      //     //                     callback(new Error('请输入小数'))
      //     //                 }
      //     //             } else {
      //     //                 callback()
      //     //             }
      //     //         }
      //     //     })
      //     //     if (basic.keyName === 'phonenum') {
      //     //         rules.push({
      //     //             trigger: 'change',
      //     //             validator: (rule, value, callback) => {
      //     //                 if (/^[0-9]+$/.test(value)) {
      //     //                     callback()
      //     //                 } else {
      //     //                     callback(new Error('请输入整数'))
      //     //                 }
      //     //             }
      //     //         })
      //     //         rules.push({
      //     //             trigger: 'blur',
      //     //             validator: (rule, value, callback) => {
      //     //                 if (/^1[3456789]\d{9}$/.test(value)) {
      //     //                     callback()
      //     //                 } else {
      //     //                     callback(new Error('请输入正确手机号码'))
      //     //                 }
      //     //             }
      //     //         })
      //     //     }
      //     // }
      // }
      // // if (basic.attrId === '1' || basic.attrId === '2') {
      // //     rules.push({
      // //         trigger: 'blur',
      // //         validator: async(rule, value, callback) => {
      // //             if (basic.attrValue === basic.attrvalue) {
      // //                 return
      // //             }
      // //             const msg = await this.check(basic)
      // //             if (msg.val) {
      // //                 callback()
      // //             } else {
      // //                 callback(new Error('该手机号已占用'))
      // //             }
      // //         }
      // //     })
      // // }
      // if (basic.inType === 2) {
      //     rules.push({
      //         required: basic.status,
      //         trigger: 'change',
      //         message: basic.message
      //     })
      // }
      // if (basic.inType === 3) {
      //     rules.push({
      //         required: basic.status,
      //         trigger: 'blur',
      //         message: basic.message
      //     })
      // }
      // console.log('rules——',rules)
    },
    loadings() {},
    inputPhonenum(value, index) {
      if (this.infoForm.basicAttrs[index].keyName === 'phonenum') {
        value = value.replace(/[^\d]/g, '')
        this.infoForm.basicAttrs[index].attrValue = value
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.select {
  width: 100%;
}
/deep/ .el-form-item {
  margin-bottom: 5px;
}
/deep/ .el-form--label-top .el-form-item__label {
  padding: 5px 0;
}
/*@media screen and (max-width: 1500px) {*/
/*    .widthSet {*/
/*        !*width: 500px;*!*/
/*    }*/
/*    .active {*/
/*        width: 130px;*/
/*    }*/
/*}*/
/*@media screen and (min-width: 1500px) {*/
/*    .widthSet {*/
/*      !*width: 500px;*!*/
/*        .active {*/
/*            width: 175px;*/
/*        }*/
/*    }*/
/*}*/
</style>
