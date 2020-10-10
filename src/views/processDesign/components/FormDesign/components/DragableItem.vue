<script>
/**
 * Copyright: Copyright (c) 2020
 * Author:JakHuang
 * Version 1.0
 * Title: form-generator/ElementUI表单设计及代码生成器
 * GitHub: https://github.com/JakHuang/form-generator
 */
import draggable from 'vuedraggable'
import render from '../components/render/render'
import renderMobile from '../components/renderMobile/render'

const components = {
  itemBtns(h, element, index, parent) {
    const { deleteItem } = this.$listeners
    return [
      <span
        class="drawing-item__delete"
        title="删除"
        onClick={(event) => {
          deleteItem(index, parent)
          event.stopPropagation()
        }}
      >
        <i class="icon-tips-close-outlined icon-delete" />
      </span>
    ]
  }
}
const layouts = {
  colFormItem(h, element) {
    const { activeItem } = this.$listeners
    const config = element.__config__
    let className =
      this.activeId === config.formId ? 'drawing-item drawing-item__active' : 'drawing-item'
    if (config.error) {
      className += ' drawing-item__error'
    }
    const props = {
      props: {
        key: config.renderKey,
        conf: element
      },
      on: {}
    }
    if (config.tag !== 'div') {
      props.on.input = (event) => {
        this.$set(config, 'defaultValue', event)
      }
    }
    return (
      <el-col
        span={element.__pc__.span}
        class={`${className} ${config.type}`}
        nativeOnClick={(event) => {
          activeItem(element)
          event.stopPropagation()
        }}
      >
        <div class="drawing-item__body">
          {config.label !== undefined ? (
            <div class={`drawing-item-label ${config.required ? 'required' : ''}`}>
              {config.label}
            </div>
          ) : null}
          <render {...props} />
        </div>
        {components.itemBtns.apply(this, arguments)}
      </el-col>
    )
  },
  rowFormItem(h, element) {
    const { activeItem } = this.$listeners
    const className =
      this.activeId === element.__config__.formId
        ? 'drawing-row-item drawing-drawing-item__active'
        : 'drawing-row-item'
    let child = renderChildren.apply(this, arguments)
    if (element.type === 'flex') {
      child = (
        <el-row type={element.type} justify={element.justify} align={element.align}>
          {child}
        </el-row>
      )
    }
    return (
      <el-col span={element.__config__.span}>
        <el-row
          gutter={element.__config__.gutter}
          class={className}
          nativeOnClick={(event) => {
            activeItem(element)
            event.stopPropagation()
          }}
        >
          <span class="component-name">{element.__config__.componentName}</span>
          <draggable
            list={element.__config__.children}
            animation={340}
            group="componentsGroup"
            class="drag-wrapper"
          >
            {child}
          </draggable>
          {components.itemBtns.apply(this, arguments)}
        </el-row>
      </el-col>
    )
  }
}

function mobileLayout(h, element) {
  const { activeItem } = this.$listeners
  const config = element.__config__
  let className =
    this.activeId === config.formId ? 'drawing-item drawing-item__active' : 'drawing-item'
  if (config.error) {
    className += ' drawing-item__error'
  }
  const props = {
    props: {
      key: config.renderKey,
      conf: element
    },
    on: {}
  }
  return (
    <div
      class={`${className} ${config.type}`}
      onClick={(event) => {
        activeItem(element)
        event.stopPropagation()
      }}
    >
      <div class="drawing-item__body">
        <renderMobile {...props} />
      </div>
      {components.itemBtns.apply(this, arguments)}
    </div>
  )
}

function renderChildren(h, element) {
  const config = element.__config__
  if (!Array.isArray(config.children)) return null
  return config.children.map((el, i) => {
    const layout = layouts[el.__config__.layout]
    if (layout) {
      return layout.call(this, h, el, i, config.children)
    }
    return layoutIsNotFound.call(this)
  })
}

function layoutIsNotFound() {
  throw new Error(`没有与${this.element.__config__.layout}匹配的layout`)
}

export default {
  name: 'DragableItem',
  components: {
    render,
    draggable
  },
  props: ['element', 'index', 'drawingList', 'activeId', 'formConf', 'isPC'],
  render(h) {
    const layout = layouts[this.element.__config__.layout]

    if (layout && this.isPC) {
      return layout.call(this, h, this.element, this.index, this.drawingList)
    } else if (!this.isPC) {
      return mobileLayout.call(this, h, this.element, this.index, this.drawingList)
    }
    return layoutIsNotFound.call(this)
  }
}
</script>
