<template>
  <div class="grade">
    <div class="header">
      <div>
        组织架构图
        <el-tooltip
          content="组织架构图"
          placement="right-end"
          effect="dark"
        >
          <i class="el-icon-question" />
        </el-tooltip>
        <span class="org">
          <el-select
            v-model="value"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </span>
      </div>
      <div
        v-if="editStatus"
        class="edit"
      >
        <div
          class="button"
          @click="isEdit"
        >
          <i class="el-icon-edit-outline icon" />编辑架构图
        </div>
        <div class="button2">
          <i class="el-icon-download icon" />下载
        </div>
      </div>
      <div v-else>
        <div
          id="download"
          class="button"
          @click="downloadImage"
        >
          保存图片
        </div>
      </div>
    </div>
    <div id="myDiagramDiv" />

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
      <div
        id="zoom-in"
        class="el-icon-zoom-in"
      />
      <div
        id="zoom-out"
        class="el-icon-zoom-out"
      />
      <div
        id="centerRoot"
        class="el-icon-rank"
      />
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
    <position-dialog :dialogVisible.sync="positionDialog" @onsubmit="positionOnsubmit" ></position-dialog>
  </div>
</template>

<script>
import go from 'gojs'
import html2canvas from 'html2canvas'
const $ = go.GraphObject.make
import positionDialog from './compoents/positionDialog'
export default {
  name: 'Grade',
  components: {
    positionDialog
  },
  data() {
    return {
      positionDialog: false,
      status: '',
      menuList:['newOrg','newPosition','edit','delete'],
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
      itemData: {},
      form: { key: 14, name: '', userName: '' },
      myDiagram: '',
      dialogVisible: false,
      data: '',
      type: ['Enterprise','Company','Department','Group','Job'],
      TreeModel: {
        class: 'go.TreeModel',
        nodeDataArray: [
          // type Enterprise-企业，Company-公司，Department-部门，Group-小组，Job-职位
          { key: 1, name: 'Stella Payne Diaz', userName: 'Enterprise', type: 'Enterprise'},
          { key: 4, name: 'Luke Warm', userName: 'Company', parent: 1,type: 'Company'},
          { key: 2, name: 'Peggy Flaming', userName: 'Department', parent: 1,type: 'Department' },
          { key: 3, name: 'Meg Meehan Hoffa', userName: 'Group', parent: 2,type: 'Group' },
          {key: 5, name: 'Saul Wellingood', userName: 'Manufacturing', parent: 4,type: 'Group'},
          { key: 6, name: 'Al Ligori', userName: 'Marketing', parent: 2 ,type: 'Group'},
          { key: 7, name: 'Dot Stubadd', userName: 'Job', parent: 3 ,type: 'Job'},
          { key: 8, name: 'Les Ismore', userName: 'Project Mgr', parent: 5,type: 'Group' },
          { key: 9, name: 'April Lynn Parris', userName: 'Events Mgr', parent: 6,type: 'Group'  },
          { key: 10, name: 'Xavier Breath', userName: 'Engineering', parent: 4 ,type: 'Group' },
          { key: 11, name: 'Anita Hammer', userName: 'Process', parent: 5 ,type: 'Group' },
          { key: 14, name: '333', userName: 'Hardware', parent: 10 ,type: 'Group' },
          { key: 13, name: '111', userName: 'Testing', parent: 10 ,type: 'Group' },

          { key: 12, name: '222', userName: 'Software', parent: 10 ,type: 'Group' },
          { key: 16, name: '444', userName: 'Software', parent: 10 ,type: 'Group' },
          { key: 15, name: 'Evan Elpus', userName: 'Quality', parent: 5 ,type: 'Group' },

          {key: 16, name: 'Lotta B. Essen', userName: '网水，网嘎，网按个摩，网按个，网按个摩', parent: 3,type: 'Group'}
        ]
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    positionOnsubmit(){

    },
    nodeDoubleClick(e, obj) {
      let clicked = obj.part
      if (clicked !== null) {
        let thisemp = clicked.data
        this.myDiagram.startTransaction('add employee')
        let newemp = {
          name: '(new person)',
          userName: '',
          comments: '',
          parent: thisemp.key
        }
        this.myDiagram.model.addNodeData(newemp)
        this.myDiagram.commitTransaction('add employee')
        this.save()
      }
    },
    init() {
      let that = this
      that.myDiagram = $(
        go.Diagram,
        'myDiagramDiv', // must be the ID or reference to div
        {
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
          })
          // 'undoManager.isEnabled': false // enable undo & redo
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
      let typeBgColor= {
        Enterprise:'#4A9EFF',
        Company:'#4A9EFF',
        Department: '#4A9EFF',
        Group: '#EDF8FF',
        Job: '#EDF8FF'
      }
      let typeBgColor2= {
        Enterprise:'#4A9EFF',
        Company:'#4A9EFF',
        Department: '#fff',
        Group: '#fff',
        Job: '#fff'
      }
      let textColor1= {
        Enterprise:'#FFFFFF',
        Company:'#FFFFFF',
        Department: '#FFF',
        Group: '#1F7DF9',
        Job: '#1F7DF9'
      }
      let textColor2= {
        Enterprise:'#C4E6FF',
        Company:'#C4E6FF',
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
        show: showContextMenu,
        hide: hideContextMenu
      })
      function hideContextMenu() {
        cxElement.classList.remove('show-menu')
        window.removeEventListener('click', hideCX, true)
      }
      function showContextMenu(obj, diagram) {
        console.log(obj)
        console.log(diagram)
        var hasMenuItem = false
        that.itemData = obj.data
        function maybeShowItem(elt, pred, id) {
          switch (id) {
            case 'newOrg':
              newOrg()
              break
            case 'newPosition':
              newPosition()
              break
            case 'edit':
              edit()
              break
            case 'delete':
              deletes(1)
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
          function newPosition(){
            if (pred.type !== that.type[4]) {
              elt.style.display = 'block'
              hasMenuItem = true
            } else {
              elt.style.display = 'none'
            }
          }

          function edit() {
            elt.style.display = 'block'
          }

          function deletes() {
            if (pred.parent) {
              elt.style.display = 'block'
              hasMenuItem = true
            } else {
              elt.style.display = 'none'
            }
          }

        }
        maybeShowItem(document.getElementById('newOrg'), obj.data, 'newOrg')
        maybeShowItem(
          document.getElementById('newPosition'),
          obj.data,
          'newPosition'
        )
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
      go.Shape.defineFigureGenerator("RoundedTopRectangle", function(shape, w, h) {
        // 这个图像获取了一个参数，角的尺寸
        var p1 = 5  // 默认的角尺寸
        if (shape !== null) {
          var param1 = shape.parameter1
          if (!isNaN(param1) && param1 >= 0) p1 = param1  // 不能是非数字或者负数
        }
        p1 = Math.min(p1, w / 2)
        p1 = Math.min(p1, h / 2)  // p1取值为p1与二分之一h中更小的值?
        var geo = new go.Geometry()
        // 一个单一的图形，由一些直线和四分之一圆的弧线组成
        geo.add(new go.PathFigure(0, p1)
          .add(new go.PathSegment(go.PathSegment.Arc, 180, 90, p1, p1, p1, p1))
          .add(new go.PathSegment(go.PathSegment.Line, w - p1, 0))
          .add(new go.PathSegment(go.PathSegment.Arc, 270, 90, w - p1, p1, p1, p1))
          .add(new go.PathSegment(go.PathSegment.Line, w, h))
          .add(new go.PathSegment(go.PathSegment.Line, 0, h).close()))
        // 当使用一个“Auto”Panel时，不要让顶部的两个角交叉了
        geo.spot1 = new go.Spot(0, 0, 0.3 * p1, 0.3 * p1)
        geo.spot2 = new go.Spot(1, 1, -0.3 * p1, 0)
        return geo
      })

      go.Shape.defineFigureGenerator("RoundedBottomRectangle", function(shape, w, h) {
        // 这个图像获取了一个参数，角的尺寸
        var p1 = 5  // 默认的角尺寸
        if (shape !== null) {
          var param1 = shape.parameter1
          if (!isNaN(param1) && param1 >= 0) p1 = param1  // 不能是非数字或者负数
        }
        p1 = Math.min(p1, w / 2)
        p1 = Math.min(p1, h / 2)  // p1取值为p1与二分之一h中更小的值?
        var geo = new go.Geometry()
        // 一个单一的图形，由一些直线和四分之一圆的弧线组成
        geo.add(new go.PathFigure(0, 0)
          .add(new go.PathSegment(go.PathSegment.Line, w, 0))
          .add(new go.PathSegment(go.PathSegment.Line, w, h - p1))
          .add(new go.PathSegment(go.PathSegment.Arc, 0, 90, w - p1, h - p1, p1, p1))
          .add(new go.PathSegment(go.PathSegment.Line, p1, h))
          .add(new go.PathSegment(go.PathSegment.Arc, 90, 90, p1, h - p1, p1, p1).close()))
        // 当使用一个“Auto”Panel时，不要让顶部的两个角交叉了
        geo.spot1 = new go.Spot(0, 0, 0.3 * p1, 0)
        geo.spot2 = new go.Spot(1, 1, -0.3 * p1, -0.3 * p1)
        return geo
      })

      that.myDiagram.nodeTemplate = $(
        go.Node,
        'Auto',
        {
          contextMenu: myContextMenu,
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
              console.log(shape2)
            if (shape) {
              shape._prevFill = shape.fill // remember the original brush
              shape1._prevFill = shape1.fill // remember the original brush
              shape2._prevFill = shape2.fill // remember the original brush
              shape1.fill = '#e4393c'
              shape2.fill = '#e4393c'

            }
            // console.log(  shape)
          },
          mouseDragLeave: function(e, node) {
            let shape = node.findObject('SHAPE')
            let shape1 = node.findObject('SHAPE1')
            let shape2 = node.findObject('SHAPE2')
            console.log(shape1,shape1._prevFill)
            // console.log(  shape)
            if (shape ) {
              shape.fill = shape._prevFill // restore the original brush
              shape1.fill = shape1._prevFill // restore the original brush
              shape2.fill = shape2._prevFill // restore the original brush
            }
          },
          mouseDrop: function(e, node) {
            let diagram = node.diagram
            let selnode = diagram.selection.first() // assume just one Node in selection
            if (mayWorkFor(selnode, node)) {
              // find any existing link into the selected node
              let link = selnode.findTreeParentLink()
              if (link !== null) {
                // reconnect any existing link
                link.fromNode = node
              } else {
                // else create a new link
                diagram.toolManager.linkingTool.insertLink(
                  node,
                  node.port,
                  selnode,
                  selnode.port
                )
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
          fill: '#F7F6F6',
          // fill: 'rgba(241, 250, 255, 1)',
          stroke: 'white',
          strokeWidth: 0,
          // set the port properties:
          portId: '',
          fromLinkable: true,
          toLinkable: true,
          cursor: 'pointer'
        }),
      $(
          go.Panel,
          'RoundedRectangle',
          {
            margin:1,
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
                height: 36,
                width: 200
              },
              $(go.Shape, 'RoundedRectangle', {
                  figure: 'RoundedTopRectangle',
                  parameter1: '10',
                name: 'SHAPE1', stroke: null
                }
              ),
              $(
                go.TextBlock,
                {

                  name: 'Name',
                  font: 'bold 12pt serif',

                },
                new go.Binding('text', 'name').makeTwoWay()
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
              $(go.Shape, 'RoundedRectangle',
                {
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

      // read in the JSON-format data from the "mySavedModel" element
      that.load()
      document.getElementById('zoom-in').addEventListener('click', function() {
        // that.myDiagram.commandHandler.zoomToFit()
        that.myDiagram.scale += 0.05
      })

      document.getElementById('zoom-out').addEventListener('click', function() {
        that.myDiagram.scale -= 0.05
        // that.myDiagram.commandHandler.scrollToPart(
        //   that.myDiagram.findNodeForKey(1)
        // )
      })
      document
        .getElementById('centerRoot')
        .addEventListener('click', function() {
          that.myDiagram.commandHandler.zoomToFit()
          // that.myDiagram.scale+=0.05
        })
    }, // end init

    // Show the diagram's model in JSON format
    save() {
      this.TreeModel = this.myDiagram.model.toJson()
      this.myDiagram.isModified = false
    },
    load() {
      if(typeof this.TreeModel === 'string'){
        this.TreeModel = JSON.parse(this.TreeModel)
      }
      this.TreeModel.nodeDataArray.map((it) => {
        var reg = new RegExp('，', 'g') //"g"表示全局替换
        it.userName=it.userName.replace(reg, '\n')
        it.userNames=it.userName.split('\n')
        if(it.userNames.length>3){
          it.userName =it.userNames[0]+'\n'+it.userNames[1]+'\n'+it.userNames[2]+'\n'+'...'
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

      let val = event.currentTarget.id
      if(val === this.menuList[1]){
       this.positionDialog =true
        return
      }
      this.dialogVisible = true

      this.status = val
      if (this.status === 'edit') {
        if(this.itemData.userNames){
          this.itemData.userName =this.itemData.userNames.join('\n')
        }
        this.form = Object.assign(this.form, this.itemData)
      }
    },
    cxcommand(event, val) {
      console.log(event, val)
      if (val === undefined) val = event.currentTarget.id
      console.log(this.itemData)
      let nodeDataArray = JSON.parse(this.TreeModel).nodeDataArray
      let isChildren = !!nodeDataArray.find((it) => {
        if (it.parent === this.itemData.key) {
          return it
        }
      })
      console.log(isChildren)
      if (isChildren || !this.itemData.parent) {
        this.$message.warning('暂时不能删除')
        return
      }
      switch (val) {
        case 'delete':
          this.myDiagram.commandHandler.deleteSelection()
          break
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
          parent: this.itemData.key
        }
        this.myDiagram.model.addNodeData(newemp)
        this.myDiagram.commitTransaction('add employee')
        this.dialogVisible = false
      } else {
        var nodeData = this.myDiagram.model.findNodeDataForKey(
          this.itemData.key
        )
        let userNames = this.form.userName.split('\n')
        let userName =this.form.userName
        if(userNames.length>3){
          userName = userNames[0]+'\n'+userNames[1]+'\n'+userNames[2]+'\n'+'...'
        }

        nodeData.userName = userName//isKey 是节点data中的一个属性
        nodeData.userNames = userNames//isKey 是节点data中的一个属性
        nodeData.name = this.form.name
        this.myDiagram.model.updateTargetBindings(nodeData)
        this.dialogVisible = false
      }
    },
    isEdit() {
      this.editStatus = false
    },
    downloadImage() {
      console.log(this.levelList)
      let arr = []
      this.levelList.map((it) => {
        arr.push(it.level)
      })
      let levelAggregate = {}
      arr.filter((it) => {
        if (levelAggregate[it]) {
          levelAggregate[it].push(it)
        } else {
          levelAggregate[it] = []
          levelAggregate[it].push(it)
        }
      })
      console.log(levelAggregate)
      let number = []
      for (var item of Object.entries(levelAggregate)) {
        number.push(item[1].length)
      }
      let max = Math.max(...number)
      let width = 500
      console.log(number[1])
      if (number[1] > 3) {
        width += (number[1] - 2) * 200
      }
      width += max * 100 + (max / 5) * 100
      console.log(width)
      let myDiaramDiv = document.getElementById('myDiagramDiv')
      myDiaramDiv.style.width = width + 'px'
      this.load()
      setTimeout(() => {
        new html2canvas(document.getElementById('myDiagramDiv')).then(
          (canvas) => {
            const href = canvas.toDataURL('image/jpeg')
            var a = document.createElement('a')
            a.download = '组织机构图.png'

            a.href = href
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            myDiaramDiv.style.width = '100%'
            // return
            // <img style="width: 2000px" src="" alt="">
            //
            // // return
            this.load()
          }
        )
      }, 1000)
      // this.myDiagram.commandHandler.zoomToFit()
    }
  }
}
</script>

<style lang="scss" scoped>
.grade {
  position: relative;
  height: 100%;
  background: #fff;
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
  .org {
    margin-left: 15px;
  }
  .edit {
    display: flex;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flex;
    flex-flow: row nowrap;
  }
  .button {
    background: rgba(73, 111, 233, 1);
    height: 36px;
    width: 134px;
    text-align: center;
    line-height: 36px;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
    .icon {
      margin-right: 6px;
    }
  }
  .button2 {
    background: #fff;
    height: 36px;
    cursor: pointer;
    width: 134px;
    text-align: center;
    line-height: 36px;
    border-radius: 4px;
    font-size: 14px;
    color: #333;
    border: 1px solid #efefef;
    margin-left: 20px;
    .icon {
      margin-right: 6px;
    }
  }
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
#myDiagramDiv {
  background-color: #fff;
  border: solid 1px #fff;
  height: calc(100% - 150px);
  width: 100%;
  overflow: scroll;
}
.scale {
  z-index: 999999999999999;
  position: absolute;
  top: 60%;
  right: 30px;
  display: flex;
  display: -webkit-flex;
  flex-flow: column nowrap;
  div {
    margin: 8px 0;
    font-size: 30px;
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
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
    0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
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
</style>
