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
    // if (config.tag !== 'div') {
    // props.on.input = (event) => {
    //   this.$set(config, 'defaultValue', event)
    // }
    // }
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
        {element.__config__.type === 'detail' && (
          <div style="text-align: center;background: white;color: #207efa;padding: .4rem 1rem;">
            <i class="el-icon-plus"></i> {element.actionText}
          </div>
        )}
      </el-col>
    )
  },
  rowFormItem(h, element) {
    const { activeItem } = this.$listeners
    const className =
      this.activeId === element.__config__.formId
        ? 'drawing-item container drawing-item__active'
        : 'drawing-item container'
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
          <div class="drawing-item__body">
            <span class="drawing-item-label">{element.__config__.label}</span>
            <draggable
              list={element.__config__.children}
              animation={340}
              group="componentsGroup"
              class="drag-wrapper"
              draggable=".drawing-item"
            >
              {child}
              {element.__config__.children.length === 0 ? (
                <div class="drawing-item-tips">可拖入多个控件（不包含明细控件）</div>
              ) : null}
            </draggable>
            {element.__config__.type === 'detail' && (
              <div style="text-align: center;background: white;color: #4e79ff;padding: .4rem 1rem;">
                <i class="el-icon-plus"></i> {element.__config__.actionText}
              </div>
            )}
          </div>
          {components.itemBtns.apply(this, arguments)}
        </el-row>
      </el-col>
    )
  }
}

const mobileLayouts = {
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
  },
  rowFormItem(h, element) {
    const { activeItem } = this.$listeners
    const className =
      this.activeId === element.__config__.formId
        ? 'drawing-item container drawing-item__active'
        : 'drawing-item container'
    let child = mobileRenderChildren.apply(this, arguments)
    const { put } = this.$attrs
    const group = { name: 'componentsGroup', put: (...arg) => put(...arg, element) }
    // let dragDisabled = element.__config__.type === 'detail'
    return (
      <div
        class={className}
        onClick={(event) => {
          activeItem(element)
          event.stopPropagation()
        }}
      >
        <div class="drawing-item__body">
          <span class="drawing-item-label">{element.__config__.label}</span>
          <draggable
            list={element.__config__.children}
            animation={340}
            group={group}
            class="drag-wrapper"
            draggable=".drawing-item"
          >
            {child}
            {element.__config__.children.length === 0 ? (
              <div class="drawing-item-tips">可拖入多个控件（不包含明细控件）</div>
            ) : null}
          </draggable>
          {element.__config__.type === 'detail' && (
            <div style="text-align: center;background: white;color: #4e79ff;padding: .4rem 1rem;">
              <i class="el-icon-plus"></i> {element.__config__.actionText}
            </div>
          )}
        </div>
        {components.itemBtns.apply(this, arguments)}
      </div>
    )
  }
}

function renderChildren(h, element) {
  if (!Array.isArray(element.__config__.children)) return null
  return element.__config__.children.map((el, i) => {
    const layout = layouts[el.__config__.layout]
    if (layout) {
      return layout.call(this, h, el, i, element.__config__.children, element)
    }
    return layoutIsNotFound.call(this)
  })
}

function mobileRenderChildren(h, element) {
  if (!Array.isArray(element.__config__.children)) return null
  return element.__config__.children.map((el, i) => {
    const layout = mobileLayouts[el.__config__.layout]
    if (layout) {
      return layout.call(this, h, el, i, element.__config__.children, element)
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
    const mobileLayout = mobileLayouts[this.element.__config__.layout]
    if (layout && this.isPC) {
      return layout.call(this, h, this.element, this.index, this.drawingList)
    } else if (!this.isPC) {
      return mobileLayout.call(this, h, this.element, this.index, this.drawingList)
    }
    return layoutIsNotFound.call(this)
  }
}
</script>
