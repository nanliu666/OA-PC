<template>
  <div
    v-loading="loading"
    class="grade"
  >
    <div class="header">
      <div
        v-show="editStatus"
        class="nav"
      >
        <span style="width: 150px;display: inline-block;">
          组织架构图
          <el-tooltip
            placement="top"
            effect="dark"
          >
            <div slot="content">
              1.架构图是将企业组织、职位和员工以结构层级图呈现。<br>2.对架构图的编辑将同步更新到【组织管理】和【职位管理】。
            </div>
            <i class="el-icon-question" /> </el-tooltip></span>
        <avue-form
          v-model="orgForm"
          :option="option"
          @submit="submit"
        />
      </div>
      <div
        v-show="!editStatus"
        class="back flex flex-flow-column flex-justify-start"
      >
        <div class="flex flex-items flex-flow">
          <el-link
            type="primary"
            style="font-size: 16px"
            @click="back"
          >
            返回
          </el-link><span style="padding:0 10px">|</span>编辑架构图
        </div>

        <div
          v-if="orgForm.$orgId"
          style="margin-top:15px"
        >
          {{ orgForm.$orgId }} <span class="el-icon-caret-bottom" />
        </div>
      </div>
      <div v-if="editStatus">
        <el-button
          type="primary"
          size="medium"
          @click="isEdit_"
        >
          <i class="el-icon-edit-outline el-icon--right" /> 编辑架构图
        </el-button>
        <el-button
          size="medium"
          @click="downloadImage"
        >
          <span
            style="display: inline-block; width: 93px"
          ><i class="el-icon-download el-icon--right" />下载</span>
        </el-button>
      </div>
      <div v-else>
        <el-button
          v-loading="sortLoading"
          size="medium"
          type="primary"
          @click="sort"
        >
          <span style="display: inline-block; width: 93px">保存视图</span>
        </el-button>
      </div>
    </div>
    <div class="canvas">
      <div
        id="myDiagramDiv"
        class="myDiagramDiv"
      />
    </div>

    <ul
      id="contextMenu"
      class="ctxmenu"
    >
      <li
        id="newOrg"
        class="menu-item"
        @click="create($event)"
      >
        新建子组织
      </li>
      <li
        id="newPosition"
        class="menu-item"
        @click="create($event)"
      >
        新建直属职位
      </li>
      <li
        id="edit"
        class="menu-item"
        @click="create($event)"
      >
        编辑
      </li>
      <li
        id="delete"
        class="menu-item"
        @click="cxcommand($event, 'delete')"
      >
        删除
      </li>
    </ul>
    <div class="scale">
      <div class="flex">
        <div
          id="centerRoot"
          class="el-icon-rank"
        />
        <div
          id="zoom-out"
          class="el-icon-zoom-out"
        />
        <div
          id="zoom-in"
          class="el-icon-zoom-in"
        />
      </div>
    </div>
    <p />
    <div />
    <div v-if="dialogVisible">
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        :modal-append-to-body="false"
        width="30%"
      >
        <span>
          <el-form
            ref="form"
            :model="form"
            label-width="80px"
          >
            <el-form-item label="公司名称">
              <el-input
                v-model="form.name"
                placeholder="placeholder"
              />
            </el-form-item>
            <el-form-item label="说明">
              <el-input
                v-model="form.userName"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="placeholder"
              />
            </el-form-item>
          </el-form>
        </span>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="handleModity"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <position-dialog
      v-if="positionDialog"
      :dialog-visible.sync="positionDialog"
      :title="title"
      :is-edit="isEdit"
      :org-data="selData"
      @onsubmit="positionOnsubmit"
    />
    <orgDialog
      v-if="orgDialog"
      :dialog-visible.sync="orgDialog"
      :title="title"
      :is-edit="isEdit"
      :org-data="selData"
      @onsubmit="orgOnsubmit"
    />
  </div>
</template>

<script>
import go from 'gojs'
const $ = go.GraphObject.make
import html2canvas from 'html2canvas'
import positionDialog from './compoents/positionDialog'
import orgDialog from './compoents/orgDialog'
import {
  getOrganizationView,
  deleteOrganization,
  postSort,
  getOrganizationTree
} from '@/api/organize/grade'
import { deleteV1Job } from '@/api/organize/position'

let org = []

export default {
  name: 'Grade',
  components: {
    positionDialog,
    orgDialog
  },
  data() {
    return {
      sortLoading: false,
      firstLoad: false,
      zIndex: 999,
      loading: false,
      positionTitle: ['新建子职位', '编辑职位'],
      isEdit: '',
      title: '',
      positionDialog: false,
      orgDialog: false,
      orgTitle: ['新建子组织', '编辑组织'],
      status: '',
      menuList: ['newOrg', 'newPosition', 'edit', 'delete'],
      editStatus: true,
      levelList: [],
      level: '',
      options: [
        {
          value: '选项1',
          label: '百利宏控股集团'
        }
      ],
      value: '选项1',
      selData: {},
      orgForm: { orgId: '' },
      option: {
        menuBtn: false,
        labelWidth: 0,
        column: [
          {
            label: '',
            size: 'medium',
            prop: 'orgId',
            clearable: false,
            span: 24,
            type: 'tree',
            dicData: org
          }
        ]
      },
      myDiagram: '',
      dialogVisible: false,
      data: '',
      limit: {},
      type: ['Enterprise', 'Company', 'Department', 'Group', 'Job'],
      msgText: {
        Enterprise: '企业',
        Company: '公司',
        Department: '部门',
        Group: '小组',
        Job: '职位'
      },
      TreeModel: {
        class: 'go.TreeModel',
        nodeDataArray: []
      }
    }
  },
  watch: {
    'orgForm.orgId': {
      handler: function(newVal, oldVal) {
        if (newVal && oldVal) {
          (async () => {
            if (this.firstLoad) {
              await this.getOrgData()
              this.load()
            } else {
              this.firstLoad = true
            }
          })()
        }
      },
      deep: true
    }
  },
  async mounted() {
    this.getTree()
    await this.getOrgData()
    this.init()
  },
  activated() {},
  methods: {
    f(res) {
      res.map((it) => {
        it.value = it.orgId
        it.label = it.orgName
        if (it.children) {
          this.f(it.children)
        }
      })
    },
    getTree() {
      let params = {
        parentOrgId: '0'
      }
      getOrganizationTree(params).then((res) => {
        this.f(res)
        setTimeout(() => {
          if (!this.orgForm.orgId) {
            this.orgForm.orgId = res[0].orgId
            this.firstLoad = false
          }
        }, 500)

        this.option.column[0].dicData = res
      })
    },
    submit() {},
    getOrgData() {
      let params = {
        orgId: this.orgForm.orgId || '0'
      }
      return new Promise((resolve, reject) => {
        this.loading = true
        getOrganizationView(params)
          .then((res) => {
            this.loading = false
            if (typeof this.TreeModel === 'string') {
              this.TreeModel = JSON.parse(this.TreeModel)
            }
            res.map((it) => {
              it.key = it.id
              if (it.parentId) it.parent = it.parentId
              it.orgName = it.name + `(${it.workNum})`
            })

            this.TreeModel.nodeDataArray = res
            resolve()
          })
          .catch(() => {
            this.loading = false
            reject()
          })
      })
    },
    orgOnsubmit() {
      (async () => {
        await this.getOrgData()
        this.load()
      })()
    },
    positionOnsubmit() {
      (async () => {
        await this.getOrgData()
        this.load()
      })()
    },
    init() {
      let that = this
      that.myDiagram = $(
        go.Diagram,
        'myDiagramDiv', // must be the ID or reference to div
        {
          isReadOnly: true,
          maxSelectionCount: 1, // users can select only one part at a time
          validCycle: go.Diagram.CycleDestinationTree, // make sure users can only create trees
          layout: $(go.TreeLayout, {
            treeStyle: go.TreeLayout.StyleLastParents,
            arrangement: go.TreeLayout.ArrangementHorizontal,
            // properties for most of the tree:
            angle: 90,
            layerSpacing: 35,
            // properties for the "last parents":
            alternateAngle: 90,
            alternateLayerSpacing: 35,
            alternateAlignment: go.TreeLayout.AlignmentBus,
            alternateNodeSpacing: 20
          }),
          'undoManager.isEnabled': false // enable undo & redo
        }
      )
      // when the document is modified, add a "*" to the title and enable the "Save" button
      that.myDiagram.addDiagramListener('Modified', () => {
        let button = document.getElementById('SaveButton')
        if (button) button.disabled = !that.myDiagram.isModified
        let idx = document.title.indexOf('*')
        if (that.myDiagram.isModified) {
          if (idx < 0) document.title += '*'
        } else {
          if (idx >= 0) document.title = document.title.substr(0, idx)
        }
        this.save()
      })

      // manage boss info manually when a node or link is deleted from the diagram
      that.myDiagram.addDiagramListener('SelectionDeleting', (e) => {
        let part = e.subject.first() // e.subject is the this.myDiagram.selection collection,
        // so we'll get the first since we know we only have one selection
        that.myDiagram.startTransaction('clear boss')
        if (part instanceof go.Node) {
          let it = part.findTreeChildrenNodes() // find all child nodes
          while (it.next()) {
            // now iterate through them and clear out the boss information
            let child = it.value
            let bossText = child.findObject('boss') // since the boss TextBlock is named, we can access it by name
            if (bossText === null) return
            bossText.text = ''
          }
        } else if (part instanceof go.Link) {
          let child = part.toNode
          let bossText = child.findObject('boss') // since the boss TextBlock is named, we can access it by name
          if (bossText === null) return
          bossText.text = ''
        }
        that.myDiagram.commitTransaction('clear boss')
      })
      var cxElement = document.getElementById('contextMenu')
      cxElement.addEventListener(
        'contextmenu',
        function(e) {
          e.preventDefault()
          return false
        },
        false
      )
      // type Enterprise-企业，Company-公司，Department-部门，Group-小组，Job-职位
      let typeBgColor = {
        Enterprise: '#4A9EFF',
        Company: '#4A9EFF',
        Department: '#4A9EFF',
        Group: '#4A9EFF',
        Job: '#EDF8FF'
      }
      let typeBgColor2 = {
        Enterprise: '#4A9EFF',
        Company: '#4A9EFF',
        Department: '#fff',
        Group: '#fff',
        Job: '#fff'
      }
      let textColor1 = {
        Enterprise: '#FFFFFF',
        Company: '#FFFFFF',
        Department: '#FFF',
        Group: '#FFF',
        Job: '#1F7DF9'
      }
      let textColor2 = {
        Enterprise: '#C4E6FF',
        Company: '#C4E6FF',
        Department: '#718199',
        Group: '#718199',
        Job: '#718199'
      }
      // override TreeLayout.commitNodes to also modify the background brush based on the tree depth level
      that.myDiagram.layout.commitNodes = () => {
        this.levelList = []
        go.TreeLayout.prototype.commitNodes.call(that.myDiagram.layout) // do the standard behavior
        that.myDiagram.layout.network.vertexes.each((v) => {
          if (v.node) {
            this.level = v.level
            let data = {
              level: v.level,
              ...v.node.data
            }
            this.levelList.push(data)
            let type = v.node.data.type
            let SHAPE1 = v.node.findObject('SHAPE1')
            SHAPE1.fill = typeBgColor[type]
            let SHAPE2 = v.node.findObject('SHAPE2')
            SHAPE2.fill = typeBgColor2[type]
            let NAME = v.node.findObject('Name')
            NAME.stroke = textColor1[type]
            let USERNAME = v.node.findObject('userName')
            USERNAME.stroke = textColor2[type]
          }
        })
      }
      function mayWorkFor(node1, node2) {
        if (!(node1 instanceof go.Node)) return false // must be a Node
        if (node1 === node2) return false // cannot work for yourself
        if (node2.isInTreeOf(node1)) return false // cannot work for someone who works for you
        return true
      }
      // define the Node template
      var myContextMenu = $(go.HTMLInfo, {
        show: showContextMenu.bind(this),
        hide: hideContextMenu
      })
      function hideContextMenu() {
        cxElement.classList.remove('show-menu')
        window.removeEventListener('click', hideCX, true)
      }
      function showContextMenu(obj, diagram) {
        if (this.editStatus) return
        var hasMenuItem = true
        that.selData = obj.data
        function maybeShowItem(elt, pred, id) {
          switch (id) {
            case 'newOrg':
              newOrg()
              break
            case 'newPosition':
              newPosition()
              break
            case 'edit':
              edit(pred)
              break
            case 'delete':
              deletes(pred)
              break
          }
          function newOrg() {
            if (pred.type !== that.type[4]) {
              elt.style.display = 'block'
              hasMenuItem = true
            } else {
              elt.style.display = 'none'
            }
          }
          function newPosition() {
            elt.style.display = 'block'
          }

          function edit() {
            elt.style.display = 'block'
          }

          function deletes(data) {
            if (data.parentId !== '0') {
              elt.style.display = 'block'
            } else {
              elt.style.display = 'none'
            }
          }
        }
        maybeShowItem(document.getElementById('newOrg'), obj.data, 'newOrg')
        maybeShowItem(document.getElementById('newPosition'), obj.data, 'newPosition')
        maybeShowItem(document.getElementById('edit'), obj.data, 'edit')
        maybeShowItem(document.getElementById('delete'), obj.data, 'delete')
        if (hasMenuItem) {
          cxElement.classList.add('show-menu')
          var mousePt = diagram.lastInput.viewPoint
          cxElement.style.left = mousePt.x + 5 + 'px'
          cxElement.style.top = mousePt.y + 'px'
        }
        window.addEventListener('click', hideCX, true)
      }
      function hideCX() {
        if (that.myDiagram.currentTool instanceof go.ContextMenuTool) {
          that.myDiagram.currentTool.doCancel()
        }
      }
      go.Shape.defineFigureGenerator('RoundedTopRectangle', function(shape, w, h) {
        // 这个图像获取了一个参数，角的尺寸
        var p1 = 5 // 默认的角尺寸
        if (shape !== null) {
          var param1 = shape.parameter1
          if (!isNaN(param1) && param1 >= 0) p1 = param1 // 不能是非数字或者负数
        }
        p1 = Math.min(p1, w / 2)
        p1 = Math.min(p1, h / 2) // p1取值为p1与二分之一h中更小的值?
        var geo = new go.Geometry()
        // 一个单一的图形，由一些直线和四分之一圆的弧线组成
        geo.add(
          new go.PathFigure(0, p1)
            .add(new go.PathSegment(go.PathSegment.Arc, 180, 90, p1, p1, p1, p1))
            .add(new go.PathSegment(go.PathSegment.Line, w - p1, 0))
            .add(new go.PathSegment(go.PathSegment.Arc, 270, 90, w - p1, p1, p1, p1))
            .add(new go.PathSegment(go.PathSegment.Line, w, h))
            .add(new go.PathSegment(go.PathSegment.Line, 0, h).close())
        )
        // 当使用一个“Auto”Panel时，不要让顶部的两个角交叉了
        geo.spot1 = new go.Spot(0, 0, 0.3 * p1, 0.3 * p1)
        geo.spot2 = new go.Spot(1, 1, -0.3 * p1, 0)
        return geo
      })

      go.Shape.defineFigureGenerator('RoundedBottomRectangle', function(shape, w, h) {
        // 这个图像获取了一个参数，角的尺寸
        var p1 = 5 // 默认的角尺寸
        if (shape !== null) {
          var param1 = shape.parameter1
          if (!isNaN(param1) && param1 >= 0) p1 = param1 // 不能是非数字或者负数
        }
        p1 = Math.min(p1, w / 2)
        p1 = Math.min(p1, h / 2) // p1取值为p1与二分之一h中更小的值?
        var geo = new go.Geometry()
        // 一个单一的图形，由一些直线和四分之一圆的弧线组成
        geo.add(
          new go.PathFigure(0, 0)
            .add(new go.PathSegment(go.PathSegment.Line, w, 0))
            .add(new go.PathSegment(go.PathSegment.Line, w, h - p1))
            .add(new go.PathSegment(go.PathSegment.Arc, 0, 90, w - p1, h - p1, p1, p1))
            .add(new go.PathSegment(go.PathSegment.Line, p1, h))
            .add(new go.PathSegment(go.PathSegment.Arc, 90, 90, p1, h - p1, p1, p1).close())
        )

        // 当使用一个“Auto”Panel时，不要让顶部的两个角交叉了
        geo.spot1 = new go.Spot(0, 0, 0.3 * p1, 0)
        geo.spot2 = new go.Spot(1, 1, -0.3 * p1, -0.3 * p1)
        return geo
      })

      that.myDiagram.nodeTemplate = $(
        go.Node,
        'Auto',
        {
          contextMenu: myContextMenu
        },
        // {doubleClick: that.nodeDoubleClick},
        {
          // handle dragging a Node onto a Node to (maybe) change the reporting relationship
          mouseDragEnter: function(e, node) {
            let diagram = node.diagram
            let selnode = diagram.selection.first()
            if (!mayWorkFor(selnode, node)) return
            let shape = node.findObject('SHAPE')
            let shape1 = node.findObject('SHAPE1')
            let shape2 = node.findObject('SHAPE2')
            if (shape) {
              shape._prevFill = shape.fill // remember the original brush
              shape1._prevFill = shape1.fill // remember the original brush
              shape2._prevFill = shape2.fill // remember the original brush
              shape1.fill = '#757c85'
              shape2.fill = '#757c85'
            }
          },
          mouseDragLeave: function(e, node) {
            let diagram = node.diagram
            let selnode = diagram.selection.first()
            if (!mayWorkFor(selnode, node)) return
            let shape = node.findObject('SHAPE')
            let shape1 = node.findObject('SHAPE1')
            let shape2 = node.findObject('SHAPE2')
            if (shape) {
              shape.fill = shape._prevFill // restore the original brush
              shape1.fill = shape1._prevFill // restore the original brush
              shape2.fill = shape2._prevFill // restore the original brush
            }
          },
          mouseDrop: function(e, node) {
            let diagram = node.diagram
            let selnode = diagram.selection.first() // assume just one Node in selection

            // if()

            if (mayWorkFor(selnode, node)) {
              let me = that.type.indexOf(node.data.type)
              let sel = that.type.indexOf(selnode.data.type)
              if (sel < me) {
                let me = that.msgText[node.data.type]
                let sel = that.msgText[selnode.data.type]
                that
                  .$confirm(`${me}下不能创建${sel}`, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  })
                  .then(() => {
                    // that.load()
                  })

                return
              }
              // find any existing link into the selected node
              let link = selnode.findTreeParentLink()

              if (link !== null) {
                // reconnect any existing link
                link.fromNode = node
              } else {
                // else create a new link
                diagram.toolManager.linkingTool.insertLink(node, node.port, selnode, selnode.port)
              }
            }
          }
        },
        // for sorting, have the Node.text be the data.name
        new go.Binding('text', 'name'),
        // bind the Part.layerName to control the Node's layer depending on whether it isSelected
        new go.Binding('layerName', 'isSelected', function(sel) {
          return sel ? 'Foreground' : ''
        }).ofObject(),
        $(go.Shape, 'Rectangle', {
          name: 'SHAPE',
          fill: '#fff',
          stroke: 'white',
          strokeWidth: 0,
          portId: '',
          fromLinkable: true,
          toLinkable: true,
          cursor: 'pointer'
        }),
        $(
          go.Panel,
          'RoundedRectangle',
          {
            margin: 1,
            minSize: new go.Size(130, NaN),
            maxSize: new go.Size(200, NaN)
          },
          $(
            go.Panel,
            'Table',
            {
              minSize: new go.Size(130, NaN),
              maxSize: new go.Size(200, NaN),
              defaultAlignment: go.Spot.Center
            },
            $(
              go.Panel,
              'Auto',
              {
                row: 0,
                column: 0,
                alignment: go.Spot.Center,
                margin: 0,
                width: 200
              },
              $(go.Shape, 'RoundedRectangle', {
                figure: 'RoundedTopRectangle',
                parameter1: '10',
                name: 'SHAPE1',
                stroke: null
              }),
              // $(go.TextBlock, { text: "a Text Block that takes 4 lines",
              //   font: '14pt sans-serif',
              //   overflow: go.TextBlock.OverflowClip, /* 默认值是OverflowClip溢出剪裁 */
              //   // 没有限制最大行数
              //   margin: 2,
              //   width: 90 }),
              $(
                go.TextBlock,
                {
                  name: 'Name',
                  font: 'bold 13pt sans-serif',
                  overflow: go.TextBlock.OverflowClip /* 默认值是OverflowClip溢出剪裁 */,
                  wrap: go.TextBlock.WrapFit,
                  textAlign: 'center',
                  margin: 8
                },
                new go.Binding('text', 'orgName').makeTwoWay()
              )
            ),
            $(
              go.Panel,
              'Auto',
              {
                row: 1,
                column: 0,
                alignment: go.Spot.Center,
                width: 200
              },
              $(go.Shape, 'RoundedRectangle', {
                figure: 'RoundedBottomRectangle',
                parameter1: '10',
                name: 'SHAPE2',
                stroke: null
              }),
              $(
                go.TextBlock,
                {
                  name: 'userName',
                  font: '11pt sans-serif',
                  overflow: go.TextBlock.OverflowEllipsis,
                  wrap: go.TextBlock.WrapFit,
                  maxLines: 4,
                  margin: 6,
                  isMultiline: true
                },
                new go.Binding('text', 'userName').makeTwoWay()
              )
            )
          ) // end Table Pane
        ) // end Horizontal Panel
      ) // end Node
      that.myDiagram.linkTemplate = $(
        go.Link,
        go.Link.Orthogonal,
        { corner: 5, relinkableFrom: true, relinkableTo: true },
        $(go.Shape, { strokeWidth: 2, stroke: '#DDE3E8' })
      ) // the link shape
      that.load()
      document.getElementById('zoom-in').addEventListener('click', function() {
        that.myDiagram.scale += 0.05
      })

      document.getElementById('zoom-out').addEventListener('click', function() {
        that.myDiagram.scale -= 0.05
      })
      document.getElementById('centerRoot').addEventListener('click', function() {
        that.myDiagram.commandHandler.zoomToFit()
      })
    }, // end init

    // Show the diagram's model in JSON format
    save() {
      this.TreeModel = this.myDiagram.model.toJson()
      this.myDiagram.isModified = false
    },
    load() {
      if (typeof this.TreeModel === 'string') {
        this.TreeModel = JSON.parse(this.TreeModel)
      }
      this.TreeModel.nodeDataArray.map((it) => {
        var reg = new RegExp(',', 'g') //"g"表示全局替换
        it.userName = it.userName.replace(reg, '\n')
        it.userNames = it.userName.split('\n')
        if (it.userNames.length > 3) {
          it.userName =
            it.userNames[0] + '\n' + it.userNames[1] + '\n' + it.userNames[2] + '\n' + '...'
        }
      })
      this.myDiagram.model = go.Model.fromJson(this.TreeModel)
      // make sure new data keys are unique positive integers
      let lastkey = 1
      this.myDiagram.model.makeUniqueKeyFunction = function(model, data) {
        let k = data.key || lastkey
        while (model.findNodeDataForKey(k)) k++
        data.key = lastkey = k
        return k
      }
      this.myDiagram.scale = 1
      this.myDiagram.commandHandler.zoomToFit()
    },
    create(event) {
      this.isEdit = false
      let val = event.currentTarget.id
      if (val === this.menuList[1]) {
        this.positionDialog = true
        this.title = this.positionTitle[0]
        return
      }
      if (val === this.menuList[0]) {
        this.title = this.orgTitle[0]
        this.orgDialog = true
        return
      }
      if (this.selData.type !== this.type[4]) {
        this.title = this.orgTitle[1]
        this.orgDialog = true
        this.isEdit = true
      } else {
        this.title = this.positionTitle[1]
        this.isEdit = true
        this.positionDialog = true
      }
      this.status = val
      if (this.status === 'edit') {
        if (this.selData.userNames) {
          this.selData.userName = this.selData.userNames.join('\n')
        }
      }
    },
    cxcommand(event, val) {
      if (val === undefined) val = event.currentTarget.id
      let nodeDataArray = JSON.parse(this.TreeModel).nodeDataArray
      let isChildren = !!nodeDataArray.find((it) => {
        if (it.parent == this.selData.key) {
          return it
        }
      })
      if (isChildren || !this.selData.parent) {
        this.$confirm('很抱歉，您选中的组织或职位下存在组织或职位，请先将调整后再删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'info',
            message: '取消操作!'
          })
        })
        return
      } else {
        if (this.selData.userNum > 0) {
          this.$confirm('很抱歉，您选中的组织或该职位下存在员工，请先将员工调整后再删除', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'info',
              message: '取消操作!'
            })
          })
          return
        }
        this.$confirm('您确定要删除该组织或该职位吗?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.selData.type !== this.type[4]) {
            let params = { ids: this.selData.id }
            deleteOrganization(params).then(() => {
              this.$message.success('删除成功')
              this.myDiagram.commandHandler.deleteSelection()
            })
          } else {
            let params = {
              ids: this.selData.id
            }
            deleteV1Job(params).then(() => {
              this.myDiagram.commandHandler.deleteSelection()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            })
          }
        })
      }
    },
    handleModity() {
      if (this.status === 'newOrg') {
        this.myDiagram.startTransaction('add employee')
        let { name, userName } = { ...this.form }
        let newemp = {
          name,
          userName,
          comments: '',
          parent: this.selData.key
        }
        this.myDiagram.model.addNodeData(newemp)
        this.myDiagram.commitTransaction('add employee')
        this.dialogVisible = false
      } else {
        var nodeData = this.myDiagram.model.findNodeDataForKey(this.selData.key)
        let userNames = this.form.userName.split('\n')
        let userName = this.form.userName
        if (userNames.length > 3) {
          userName = userNames[0] + '\n' + userNames[1] + '\n' + userNames[2] + '\n' + '...'
        }

        nodeData.userName = userName //isKey 是节点data中的一个属性
        nodeData.userNames = userNames //isKey 是节点data中的一个属性
        nodeData.name = this.form.name
        this.myDiagram.model.updateTargetBindings(nodeData)
        this.dialogVisible = false
      }
    },
    back() {
      this.editStatus = true
      this.zIndex = 999
      this.myDiagram.isReadOnly = true
    },
    isEdit_() {
      this.editStatus = false
      this.zIndex = -1
      this.myDiagram.isReadOnly = false
    },
    sort() {
      let nodeDataArray = JSON.parse(this.TreeModel).nodeDataArray
      let params = []
      nodeDataArray.map((it) => {
        let data = {
          parentId: it.parent,
          id: it.id,
          name: it.name,
          type: it.type
          // sort: it.parent || 0
        }
        params.filter((item) => {
          if (item.parentId === it.parentId) {
            data.sort = item.sort + 1
          }
        })
        data.sort = data.sort ? data.sort : 1
        params.push(data)
      })
      this.sortLoading = true
      postSort(params)
        .then(() => {
          this.sortLoading = false
          this.$message.success('排序成功')
          this.getTree()
        })
        .catch(() => {
          this.sortLoading = false
        })
    },
    downloadImage() {
      var d = this.myDiagram.documentBounds
      let myDiaramDiv = document.getElementById('myDiagramDiv')
      myDiaramDiv.style.width = d.width + 'px'
      this.load()
      this.loading = true
      setTimeout(() => {
        new html2canvas(document.getElementById('myDiagramDiv')).then((canvas) => {
          const href = canvas.toDataURL('image/jpeg')
          var a = document.createElement('a')
          a.download = '组织机构图.png'
          a.href = href
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          myDiaramDiv.style.width = '100%'
          this.load()
          this.loading = false
        })
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.avue-view {
  height: auto;
}
.grade {
  background: #ffffff;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 0px !important;
  /*min-height: calc(100% - 64px);*/
  width: calc(100% - 64px);
  margin-left: 30px;
  margin-bottom: 50px;
  position: relative;
  height: 100%;
  /*margin: 20px !important;*/
  /*padding: 0 !important;*/
  /*background: #fff;*/
}
.canvas {
  height: 100%;
  width: 100%;
  position: relative;
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    z-index: 999;
  }
}
.header {
  display: flex;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  /*height: 60px;*/
  /*line-height: 60px;*/
  padding: 20px 30px;
}
.go {
  overflow: scroll;
  height: 600px;
  width: 606px;
  .ces {
    height: 600px;
    width: 1200px;
  }
}
.myDiagramDiv {
  height: calc(100% - 250px);
}
#myDiagramDiv {
  background-color: rgba(220, 239, 254, 0.3);
  /*background:  #DCEFFE;*/
  border: solid 1px #fff;
  height: calc(100% - 150px);
  padding: 0;
  margin: 0;
  width: 100%;
  overflow: scroll;
}
.scale {
  z-index: 999999999999999;
  position: absolute;
  top: 120px;
  right: 30px;
  display: flex;
  display: -webkit-flex;
  flex-flow: column nowrap;
  .flex {
    display: flex;
    display: -webkit-flex;
    flex-flow: row nowrap;
    div {
      margin: 0 10px;
      color: #757c85;
    }
  }
  div {
    margin: 8px 0;
    font-size: 28px;
  }
}

/* CSS for the traditional context menu */
.ctxmenu {
  display: none;
  position: absolute;
  opacity: 0;
  margin: 0;
  padding: 8px 0;
  z-index: 999;
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12);
  list-style: none;
  background-color: #ffffff;
  border-radius: 4px;
}
.menu-item {
  display: block;
  position: relative;
  min-width: 60px;
  margin: 0;
  padding: 6px 16px;
  font: bold 12px sans-serif;
  color: rgba(0, 0, 0, 0.87);
  cursor: pointer;
}
.menu-item::before {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
  content: '';
  width: 100%;
  height: 100%;
  background-color: #000000;
}
.menu-item:hover::before {
  opacity: 0.04;
}
.menu .menu {
  top: -8px;
  left: 100%;
}
.show-menu,
.menu-item:hover .ctxmenu {
  display: block;
  opacity: 1;
}
.nav {
  display: flex;
  display: -webkit-flex;
  flex-flow: row nowrap;
}
</style>
