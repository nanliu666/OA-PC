<template>
  <div class="form-design-container">
    <div class="left-container">
      <!-- <el-tabs
        v-model="activeName"
      >
        <el-tab-pane
          label="控件"
          name="first"
        > -->
      <div class="components-list">
        <div
          v-for="(group, index) in componentGroups"
          :key="index"
          class="components-group"
        >
          <div class="title">
            {{ group.label }}
          </div>
          <draggable
            class="components-draggable"
            :list="group.list"
            :clone="cloneComponent"
            :group="{
              name: 'componentsGroup',
              pull: 'clone',
              put: false
            }"
            draggable=".components-item"
            :sort="false"
            @end="onEnd"
          >
            <div
              v-for="(element, index) in group.list"
              :key="index"
              class="components-item"
              @click="addComponent(element)"
            >
              <div class="components-body">
                {{ element.__config__.name }}
                <i :class="element.__config__.icon" />
              </div>
            </div>
          </draggable>
        </div>
      </div>
      <!-- </el-tab-pane>
      </el-tabs> -->
    </div>
    <div
      class="center-container"
      @click.stop="onClickBackground"
    >
      <div
        class="platform-switch"
        @click.stop=""
      >
        <div
          :class="{ left: true, button: true, active: !isPC }"
          @click="isPC = false"
        >
          手机端
        </div>
        <div
          :class="{ right: true, button: true, active: isPC }"
          @click="isPC = true"
        >
          网页端
        </div>
      </div>
      <div :class="{ 'center-inner': true, 'is-pc': isPC }">
        <div class="box-wraper">
          <div class="wraper-screen">
            <div class="field-list">
              <div class="field-list-header">
                申请
              </div>
              <el-scrollbar class="center-scrollbar">
                <draggable
                  class="drawing-board"
                  :list="drawingList"
                  :animation="200"
                  group="componentsGroup"
                >
                  <draggableItem
                    v-for="(element, index) in drawingList"
                    :key="element.__config__.renderKey"
                    :element="element"
                    :index="index"
                    :drawing-list="drawingList"
                    :active-id="activeId"
                    :is-p-c="isPC"
                    @activeItem="activeFormItem"
                    @deleteItem="drawingItemDelete"
                  />
                </draggable>
              </el-scrollbar>
            </div>
          </div>
        </div>
      </div>
    </div>
    <right-panel
      ref="RightPanel"
      :visible="!!activeId"
      :active-data="activeData"
      :active-id="activeId"
      :is-p-c="isPC"
    />
  </div>
</template>
<script>
/**
 * Copyright: Copyright (c) 2020
 * Author:JakHuang
 * Version 1.0
 * Title: form-generator/ElementUI表单设计及代码生成器
 * GitHub: https://github.com/JakHuang/form-generator
 */
import Draggable from 'vuedraggable'
import DraggableItem from './components/DragableItem'
import RightPanel from './components/RightPanel'
import { componentGroups } from './components/generator/config.js'
import { deepClone, debounce } from './utils/index'
import { saveDrawingList, getDrawingList } from './utils/db'

const emptyActiveData = {
  style: {},
  __config__: {},
  __pc__: { props: {} },
  __mobile__: { props: {} }
}

let tempActiveData
const drawingListInDB = getDrawingList()

export default {
  name: 'FormDesign',
  components: {
    Draggable,
    DraggableItem,
    RightPanel
  },
  data() {
    return {
      activeName: 'first',
      componentGroups,
      drawingList: [],
      activeData: emptyActiveData,
      activeId: null,
      isPC: false,
      saveDrawingListDebounce: debounce(saveDrawingList, 340),
      formConf: {
        showBtn: false
      }
    }
  },
  watch: {
    drawingList: {
      handler(val) {
        this.saveDrawingListDebounce(val)
      },
      deep: true
    }
  },
  mounted() {
    if (Array.isArray(drawingListInDB) && drawingListInDB.length > 0) {
      this.drawingList = drawingListInDB
    } else {
      this.drawingList = []
    }
    this.activeFormItem(this.drawingList[0])
  },
  methods: {
    getData() {
      return {
        ...this.formConf,
        fields: this.drawingList
      }
    },
    isFilledPCon(formIds) {
      const processCmp = this.$parent.$children.find((t) => t.isProcessCmp)
      return processCmp && processCmp.isFilledPCon(formIds)
    },
    checkColItem(cmp) {
      if (!cmp) return false
      const isPcon = this.$store.state.processConditions.find((t) => t.formId == cmp.formId)
        ? true
        : false
      return isPcon && this.isFilledPCon([cmp.formId])
    },
    // 判断是否已被流程图作为条件必填项了
    isProCondition(cmp) {
      if (Array.isArray(cmp.children) && cmp.children.length) {
        // 容器组件需要检查子元素
        if (cmp.rowType === 'table') return false // 表格的子元素不可能为流程条件
        let flag = false
        const loop = (el) => {
          if (flag) return // flag === true 代表找到了一个了 不需要再找下一个
          if (Array.isArray(el)) {
            el.some((e) => {
              if (e.children) loop(e.children)
              return this.checkColItem(e)
            }) && (flag = true)
          }
        }
        loop(cmp.children)
        return flag
      } else {
        return this.checkColItem(cmp)
      }
    },
    onClickBackground() {
      this.activeId = null
    },
    activeFormItem(element) {
      if (!element) {
        return
      }
      if (element.__config__.formId !== this.activeId) {
        this.$refs['RightPanel'].validate()
      }
      this.activeData = element
      this.activeId = element.__config__.formId
    },
    onEnd(obj) {
      if (obj.from !== obj.to) {
        this.activeId = tempActiveData.__config__.formId
        this.activeData = tempActiveData
      }
    },
    addComponent(item) {
      const clone = this.cloneComponent(item)
      this.drawingList.push(clone)
      this.activeFormItem(clone)
    },
    cloneComponent(origin) {
      const clone = deepClone(origin)
      const config = clone.__config__
      config.formId = this.getNextId()
      if (config.layout === 'colFormItem') {
        clone.__config__.label !== undefined &&
          (clone.__config__.label = this.createCmpLabel(clone))
        if (!['desc'].includes(config.type)) {
          clone.__vModel__ = `field${config.formId}`
        }
      } else if (config.layout === 'rowFormItem') {
        config.componentName = `row${config.formId}`
        !Array.isArray(config.children) && (config.children = [])
      }
      // clone.span = formConf.span;
      config.renderKey = config.formId + new Date().getTime() // 改变renderKey后可以实现强制更新组件
      // clone.placeholder !== undefined && (clone.placeholder += config.label)
      tempActiveData = clone
      return tempActiveData
    },
    drawingItemDelete(index, parent) {
      parent.splice(index, 1)
      this.$nextTick(() => {
        const len = this.drawingList.length
        if (len) {
          this.activeFormItem(this.drawingList[len - 1])
        } else {
          this.activeId = null
        }
      })
    },
    getMaxId() {
      if (this.drawingList.length) {
        return this.drawingList.reduce((maxId, cmp) => {
          cmp.__config__.formId > maxId && (maxId = cmp.__config__.formId)
          if (Array.isArray(cmp.children)) {
            maxId = cmp.children.reduce(
              (max, child) => Math.max(max, child.__config__.formId),
              maxId
            )
          }
          return maxId
        }, 0)
      }
      return 0
    },
    getNextId() {
      return this.getMaxId() + 1
    },
    getSameTagCmpNum(type) {
      return this.drawingList.reduce((count, item) => {
        return item.__config__.type === type ? count + 1 : count
      }, 0)
    },
    createCmpLabel(cmp) {
      const len = this.getSameTagCmpNum(cmp.__config__.type)
      return len ? cmp.__config__.label + len : cmp.__config__.label
    }
  }
}
</script>

<style lang="stylus">
@import './FormDesign.styl';
</style>
