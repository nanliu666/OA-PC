<template>
  <div class="DistributionFormItem">
    <template v-for="(form, index) of localValue">
      <el-row
        :key="index"
        :gutter="20"
      >
        <el-col :span="6">
          <span
            v-if="_.get(form.$config, 'userId.writable')"
            class="form__input"
          >
            <lazy-select
              v-model="form.userId"
              class="form__input--select"
              :disabled="_.get(form.$config, 'userId.disabled')"
              :load="loadUsers"
              :option-props="{
                key: 'userId',
                formatter: (item) => `${item.name}(${item.workNo})`,
                value: 'userId'
              }"
              placeholder="请选择人员"
              searchable
              @change="(val) => validateUserId(val, form)"
            />
            <el-button
              type="text"
              icon="icon-basics-delete-outlined"
              class="form__input--delete"
              @click="() => handleFormItemDeleteBtnClick(form)"
            />
          </span>
          <span
            v-else
            class="form__text"
            v-text="`${form.name}(${form.workNo})`"
          />
        </el-col>
        <el-col :span="4">
          <span
            v-if="_.get(form.$config, 'taskNum.writable')"
            class="form__input"
          >
            <el-input
              v-if="_.get(form.$config, '_taskNum.writable')"
              v-model="form._taskNum"
              :disabled="_.get(form.$config, '_taskNum.disabled')"
            />
          </span>
          <span
            v-else
            class="form__text"
            v-text="form._taskNum"
          />
        </el-col>
        <el-col :span="4">
          <span
            v-if="_.get(form.$config, 'entryNum.writable')"
            class="form__input"
          >
            <el-input
              v-model="form.entryNum"
              :disabled="_.get(form.$config, 'entryNum.writable')"
            />
          </span>

          <span
            v-else
            class="form__text"
            v-text="form.entryNum"
          />
        </el-col>
        <el-col :span="4">
          <span
            v-if="_.get(form.$config, 'candidateNum.writable')"
            class="form__input"
          >
            <el-input
              v-model="form.candidateNum"
              :disabled="_.get(form.$config, 'candidateNum.writable')"
            />
          </span>

          <span
            v-else
            class="form__text"
            v-text="form.candidateNum"
          />
        </el-col>
        <el-col :span="6">
          <span class="form__input">
            <el-input-number
              :max="getMax(localValue.filter((i) => i !== form))"
              :min="0"
              :precision="0"
              :value="_.get(form, 'taskNum')"
              class="form__input--number"
              controls-position="right"
              @change="(val) => handleTaskNumInput(val, form)"
            />
          </span>
        </el-col>
        <!--  -->
      </el-row>
    </template>

    <div class="operation">
      <el-button
        type="text"
        icon="icon-tips-plus-outlined"
        @click="handleAddBtnClick"
      >
        添加人员
      </el-button>
    </div>
  </div>
</template>

<script>
import formItem from './formItem'

export default {
  name: 'DistributionFormItem',
  extends: formItem
}
</script>

<style lang="sass" scoped>
$color_danger: #FF8B8A

.DistributionFormItem
  .form__input
    &--select,&--number
      width: 150px
    &--delete
      color: $color_danger
      &:hover
        color: #FF6B6B
      &::before
        content: ""
        margin-left: .3rem
  .form__text
    line-height: 2.5rem
    &::after
      content: ""
      margin-right: 1rem
  .operation
    margin-top: 1rem
</style>
