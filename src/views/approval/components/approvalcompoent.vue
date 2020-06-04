<template>
  <div>
    <div class="flow ">
      <div
        v-for="(node, index) in approvalList"
        :key="index"
        class="row"
        @mouseleave="leave"
      >
        <div class="edit">
          <div class="flex-flow flex flex-items edit_no">
            <i class="spot" /> <span class="staff">{{ node.name }}</span>
            <el-link
              type="primary"
              class="edit_staff"
            />
            <span
              v-if="!node.users.length > 0"
              class="tip"
            >请选择审批人</span>
            <span
              v-else
              class="tip"
            >一人审批</span>
          </div>
          <div class="flex-flow flex flex-items edit_row">
            <div>
              <div
                v-if="!node.isEdit"
                class="flex flex-flow-column flex-items edit_icon"
              >
                <div
                  class="el-icon-circle-plus-outline"
                  @click="handleAdd(0, index)"
                />
                <div
                  v-if="approvalList.length > 1"
                  class="el-icon-remove-outline delete-icon"
                  @click="hanleDelete(index)"
                />
                <div
                  v-else
                  class="spot_icon"
                />
                <div
                  class="el-icon-circle-plus-outline"
                  @click="handleAdd(1, index)"
                />
                <div />
              </div>
              <div
                v-else
                class="flex flex-flow-column flex-items edit_icon"
              >
                <div class="spot_icon" />
              </div>
            </div>
            <div class="flex-flow flex flex-items edit_row">
              <div v-if="!node.isEdit">
                <span class="staff">{{ node.name }}</span>
                <el-link
                  type="primary"
                  class="edit_staff"
                  @click="handleEdit(node, index)"
                >
                  <i class="el-icon-edit-outline" />
                </el-link>
                <span
                  v-if="!node.users.length > 0"
                  class="tip"
                >请选择审批人</span>
                <span
                  v-else
                  class="tip"
                >一人审批</span>
              </div>
            </div>
            <div
              v-if="node.isEdit"
              class="isEdit"
            >
              <el-input
                ref="inputVal"
                v-model="name"
                placeholder="请输入"
                style="width:200px"
                @input="(value) => limitInput(value)"
              />
              <span><el-button
                type="success"
                class="button_icon"
                icon="el-icon-check"
                size="mini"
                circle
                @click="handleEditName(node, index)"
              /></span>
              <span><el-button
                type="danger"
                class="button_icon"
                icon="el-icon-close"
                size="mini"
                circle
                @click="handleClose(node, index)"
              />
              </span>
            </div>
          </div>
        </div>
        <div class="line flex flex-items">
          <div
            v-if="!node.users.length > 0"
            class="img_icon"
            @click="handleAdduser(node, index)"
          >
            +
          </div>
          <div
            v-else
            class="img_icons"
          >
            <i
              class="icon-close el-icon-close"
              @click="deleteNode(node, index)"
            />
            <div class="flex flex-justify flex-flow-column flex-items">
              <el-image
                class="img"
                fit="cover"
                src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
              >
                <div
                  slot="error"
                  class="image-slot"
                >
                  <i class="el-icon-picture-outline" />
                </div>
              </el-image>
              <div class="userName">
                {{ node.users && node.users[0].name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <approvalDialog
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      @addUser="adduser"
    />
  </div>
</template>

<script>
import approvalDialog from '@/views/approval/components/approvalDialog'

export default {
  name: 'Approvalcompoent',
  components: {
    approvalDialog
  },
  props: {
    approvalList: {
      type: Array,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      name: '',
      dialogVisible: false,
      index: ''
    }
  },
  watch: {
    approvalList: {
      handler() {
        this.$emit('update:approvalList', this.approvalList)
      },
      deep: true
    }
  },
  methods: {
    limitInput(data) {
      if (data.length > 20) {
        this.name = data.substr(0, 20)
      }
    },
    /**
     * @author guanfenda
     * @desc 给节点添加用户
     *
     * */
    adduser(list) {
      let params = {
        id: list.id,
        name: list.name,
        workNo: list.workNo
      }
      this.approvalList[this.index].users.push(params)
    },

    /**
     * @author guanfenda
     * @desc 离开row inpu隐藏
     * */
    leave() {
      this.approvalList.map((it) => {
        it.isEdit = false
      })
    },
    /***
     * @author guanfenda
     * @desc 添加用户
     *
     * */
    handleAdduser(node, index) {
      this.dialogVisible = true
      this.index = index
      this.node = node
    },
    /**
     * @author guanfenda
     * @desc 修改节点名字
     * */
    handleEditName(node) {
      node.name = this.name || node.name
      node.isEdit = false
      this.name = ''
    },
    /**
     * @author guanfenda
     * @desc 取消修改
     * */
    handleClose(node) {
      node.isEdit = false
    },
    /**
     * @author guanfenda
     * @desc 添加节点
     * */
    handleAdd(i, index) {
      let params = {
        id: '',
        name: '审批人',
        isStart: '0',
        isEnd: '0',
        parentId: '',
        childId: '',
        isEdit: false,
        users: []
      }
      if (i == 1) {
        index += 1
      }
      this.approvalList.splice(index, 0, params)
    },
    /***
     * @author guanfenda
     *  @desc @删除节点
     * */
    hanleDelete(index) {
      this.approvalList.splice(index, 1)
    },
    /**
     * @author guanfenda
     * @desc 删除节点用户
     * */
    deleteNode(node, index) {
      this.approvalList[index].users = []
    },
    /**
     *  @author guanfenda
     *  @desc input 失去焦点事件
     * */
    blur(data, index) {
      if (!data) {
        data = '审批人'
        this.approvalList[index].name = '审批人'
      }
    },
    /***
     * @author guanfenda
     * @desc 编辑显示
     *
     * */
    handleEdit(node) {
      node.isEdit = true
      this.name = node.name
      this.$nextTick(() => {
        this.$refs.inputVal[0].focus()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.flow {
  margin-bottom: 100px;
  margin-top: 30px;
  .line {
    border-left: 1px solid #1e9fff;
    height: 100px;
    position: relative;
    .img_icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 1px dashed #909399;
      color: #909399;
      background: #f2f6fc;
      margin-left: 40px;
      line-height: 60px;
      text-align: center;
    }
    .img_icons {
      width: 60px;
      height: 60px;

      /*border: 1px dashed #909399;*/
      /*color: #909399;*/
      /*overflow: hidden;*/
      background: #f2f6fc;
      margin-left: 40px;
      line-height: 60px;
      text-align: center;
      position: relative;
      .icon-close {
        position: absolute;
        /*color: #909399;*/
        z-index: 999;
        left: 45px;
        background: #000;
        border-radius: 50%;
        color: #fff;
        padding: 3px;
        font-size: 8px !important;
      }
      .img {
        border-radius: 50%;
        width: 60px;
        height: 60px;
      }
    }
  }
  .row:last-child .line {
    border-left: 1px solid transparent;
  }
  .row:first-child {
    .edit {
      .delete-icon {
        /*display: none !important;*/
      }

      /*.img_icon{*/
      /*  border: 1px dashed #1e9fff;*/
      /*  color: #1e9fff;*/
      /*}*/
    }
  }
  .row:not(:first-child) {
    /*.edit{*/
    .spot_icon {
      display: none !important;
    }
    /*}*/
  }
  .row:hover {
    .edit_no {
      display: none;
    }
    .edit_row {
      display: inline-block;
      display: flex;
      display: -webkit-flex;
      flex-flow: row nowrap;
    }
    .line {
      .img_icon {
        border: 1px dashed #1e9fff !important;
        color: #1e9fff !important;
      }
    }
  }
  .tip {
    margin-left: 10px;
  }
  .button_icon {
    margin-left: 10px;
  }
  .isEdit {
    margin-left: 15px;
  }
  .userName {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /*text-align: left;*/
  }
  /*.edit_no{*/
  /*  display: none;*/
  /*}*/
  .edit_row {
    display: none;
  }
  .edit {
    padding: 5px 0;
    .spot {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #1e9fff;
      margin-left: -5px;
    }
    .staff {
      display: inline-block;
      margin-left: 15px;
      margin-right: 5px;
    }
    .edit_icon {
      margin-left: -7px;
      color: #1e9fff;
      .spot_icon {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #1e9fff;
        margin-left: -0px;
        margin: 5px 0;
      }
    }
    .delete-icon {
      color: #e4393c;
      padding: 5px 0;
    }
    .edit_staff {
      font-size: 16px;
    }
  }
}
</style>
