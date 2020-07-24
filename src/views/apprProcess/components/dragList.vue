<template>
  <div class="drag-list">
    <section class="approval-section">
      <draggable
        v-model="dragList"
        @end="end"
      >
        <ul
          v-for="(item, index) in dragList"
          :key="index"
          class="approval-ul"
        >
          <li class="approval-li">
            <div class="title-box">
              <i class="icon-drag drag-i" />
              <div class="li-title">
                {{ item.name }}
              </div>
            </div>
          </li>
        </ul>
      </draggable>
    </section>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'DragList',
  components: {
    draggable
  },
  props: {
    dragOptions: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      dragList: this.dragOptions.sortData
    }
  },
  methods: {
    end() {
      this.dragOptions.sortData = this.dragList
      //   window.console.log('dragList==', this.dragList)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.drag-list {
  .approval-section {
    padding-top: 16px;
    .approval-ul {
      .approval-li {
        cursor: pointer;
        padding-bottom: 15px;
        .title-box {
          @include flexAlign;
          justify-content: flex-start;
          height: 42px;
          padding: 0 24px;
          background-color: #f7f8fa;
          border-bottom: 1px solid #e4e7e9;
          .li-title {
            margin-left: 16px;
            font-size: 16px;
            color: #202940;
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>
