<template>
  <div>
    <div
      id="myDiagramDiv"
      style="background-color: #fff; border: solid 1px black; height: 470px;width:800px;"
    />
    <p>
      <button id="zoomToFit">
        Zoom to Fit
      </button>
      <button id="centerRoot">
        Center on root
      </button>
    </p>
    <div>
      <div>
        <button
          id="SaveButton"
          @click="save"
        >
          Save
        </button>
        <button @click="load">
          Load
        </button>
        Diagram Model saved in JSON format:
      </div>
      <div>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
        >
          <span>这是一段信息</span>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="dialogVisible = false"
            >确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <textarea
        id="mySavedModel"
        style="width:100%; height:270px;"
      >
{ "class": "go.TreeModel",
  "nodeDataArray": [
{"key":1, "name":"Stella Payne Diaz", "title":"CEO"},
{"key":2, "name":"Luke Warm", "title":"VP Marketing/Sales", "parent":1},
{"key":3, "name":"Meg Meehan Hoffa", "title":"Sales", "parent":2},
{"key":4, "name":"Peggy Flaming", "title":"VP Engineering", "parent":1},
{"key":5, "name":"Saul Wellingood", "title":"Manufacturing", "parent":4},
{"key":6, "name":"Al Ligori", "title":"Marketing", "parent":2},
{"key":7, "name":"Dot Stubadd", "title":"Sales Rep", "parent":3},
{"key":8, "name":"Les Ismore", "title":"Project Mgr", "parent":5},
{"key":9, "name":"April Lynn Parris", "title":"Events Mgr", "parent":6},
{"key":10, "name":"Xavier Breath", "title":"Engineering", "parent":4},
{"key":11, "name":"Anita Hammer", "title":"Process", "parent":5},
{"key":12, "name":"Billy Aiken", "title":"Software", "parent":10},
{"key":13, "name":"Stan Wellback", "title":"Testing", "parent":10},
{"key":14, "name":"Marge Innovera", "title":"Hardware", "parent":10},
{"key":15, "name":"Evan Elpus", "title":"Quality", "parent":5},
{"key":16, "name":"Lotta B. Essen", "title":"Sales Rep", "parent":3}
 ]
}
    </textarea>
    </div>
  </div>
</template>

<script>
import go from 'gojs'
const $ = go.GraphObject.make
export default {
  name: 'Grade',
  data() {
    return {
      myDiagram: '',
      dialogVisible: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    nodeDoubleClick(e, obj) {
      let clicked = obj.part
      if (clicked !== null) {
        let thisemp = clicked.data
        this.myDiagram.startTransaction('add employee')
        let newemp = {
          name: '(new person)',
          title: '',
          comments: '',
          parent: thisemp.key
        }
        this.myDiagram.model.addNodeData(newemp)
        this.myDiagram.commitTransaction('add employee')
        this.save()
      }
    },
    init() {
      // if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
      // for conciseness in defining templates
      let that = this
      that.myDiagram = $(
        go.Diagram,
        'myDiagramDiv', // must be the ID or reference to div
        {
          maxSelectionCount: 1, // users can select only one part at a time
          validCycle: go.Diagram.CycleDestinationTree, // make sure users can only create trees
          'clickCreatingTool.archetypeNodeData': {
            // allow double-click in background to create a new node
            name: '(new person)',
            title: '',
            comments: ''
          },
          'clickCreatingTool.insertPart': function(loc) {
            // scroll to the new node
            let node = go.ClickCreatingTool.prototype.insertPart.call(this, loc)
            if (node !== null) {
              this.diagram.select(node)
              this.diagram.commandHandler.scrollToPart(node)
              this.diagram.commandHandler.editTextBlock(node.findObject('NAMETB'))
            }
            return node
          },
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
          'undoManager.isEnabled': true // enable undo & redo
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

      let levelColors = ['#e4393c', '#2672EC', '#8C0095', '#5133AB', '#008299', '#D24726', '#008A00', '#094AB2']

      // override TreeLayout.commitNodes to also modify the background brush based on the tree depth level
      that.myDiagram.layout.commitNodes = () => {
        go.TreeLayout.prototype.commitNodes.call(that.myDiagram.layout) // do the standard behavior
        // then go through all of the vertexes and set their corresponding node's Shape.fill
        // to a brush dependent on the TreeVertex.level value
        that.myDiagram.layout.network.vertexes.each((v) => {
          if (v.node) {
            // console.log(v.node)
            let level = v.level % levelColors.length
            let color = levelColors[level]
            let shape = v.node.findObject('SHAPE')
            // console.log(shape)
            if (shape)
              shape.stroke = $(go.Brush, 'Linear', {
                0: color,
                1: go.Brush.lightenBy(color, 0.05),
                start: go.Spot.Left,
                end: go.Spot.Right
              })
            let SHAPE1 = v.node.findObject('SHAPE1')
            SHAPE1.background = $(go.Brush, 'Linear', {
              0: color,
              1: go.Brush.lightenBy(color, 0),
              start: go.Spot.Left,
              end: go.Spot.Right
            })
            // if (shape)
            //   shape.fill =
            //   $(go.Brush,
            //    "Linear",
            //    {0: color,
            //     1: go.Brush.lightenBy(color, 0.05),
            //     start: go.Spot.Left,
            //     end: go.Spot.Right
            //     });
          }
        })
      }

      // when a node is double-clicked, add a child to it

      // that is used to determine feedback during drags
      function mayWorkFor(node1, node2) {
        if (!(node1 instanceof go.Node)) return false // must be a Node
        if (node1 === node2) return false // cannot work for yourself
        if (node2.isInTreeOf(node1)) return false // cannot work for someone who works for you
        return true
      }

      // that function provides a common style for most of the TextBlocks.
      // Some of these values may be overridden in a particular TextBlock.
      function textStyle() {
        return { font: '9pt  Segoe UI,sans-serif', alignment: go.Spot.Center, stroke: '#333' }
      }

      // that converter is used by the Picture.
      // function findHeadShot(key) {
      //   if (key < 0 || key > 16) return 'images/HSnopic.jpg' // There are only 16 images on the server
      //   return 'images/HS' + key + '.jpg'
      // }

      // define the Node template
      that.myDiagram.nodeTemplate = $(
        go.Node,
        'Auto',
        { doubleClick: that.nodeDoubleClick },
        {
          // handle dragging a Node onto a Node to (maybe) change the reporting relationship
          mouseDragEnter: function(e, node) {
            let diagram = node.diagram
            let selnode = diagram.selection.first()
            if (!mayWorkFor(selnode, node)) return
            let shape = node.findObject('SHAPE')
            if (shape) {
              shape._prevFill = shape.fill // remember the original brush
              shape.fill = 'darkred'
            }
          },
          mouseDragLeave: function(e, node) {
            let shape = node.findObject('SHAPE')
            if (shape && shape._prevFill) {
              shape.fill = shape._prevFill // restore the original brush
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
          strokeWidth: 1,
          // set the port properties:
          portId: '',
          fromLinkable: true,
          toLinkable: true,
          cursor: 'pointer'
        }),
        $(
          go.Panel,
          'Horizontal',
          // $(
          //   go.Picture,
          //   {
          //     name: 'Picture',
          //     desiredSize: new go.Size(70, 70),
          //     margin: 1.5
          //   },
          //   new go.Binding('source', 'key', findHeadShot)
          // ),
          // define the panel where the text will appear
          $(
            go.Panel,
            'Table',
            {
              minSize: new go.Size(130, NaN),
              maxSize: new go.Size(190, NaN),
              defaultAlignment: go.Spot.Left
            },
            $(go.RowColumnDefinition, { column: 2, width: 4 }),
            $(go.TextBlock, '', {
              name: 'SHAPE1',
              row: 0,
              column: 0,
              background: '#e4393c',
              font: '12pt Segoe UI,sans-serif',
              height: 30,
              width: 50,
              stroke: '#000',
              minSize: new go.Size(10, 16)
            }),
            $(
              go.TextBlock,
              {
                row: 0,
                column: 1,
                background: '#e4393c',
                columnSpan: 5,
                margin: -1,
                font: '12pt Segoe UI,sans-serif',
                editable: true,
                isMultiline: false,
                height: 30,
                width: 170,
                stroke: '#000',
                alignment: go.Spot.Center,
                verticalAlignment: go.Spot.Center,
                minSize: new go.Size(10, 16)
              },
              new go.Binding('text', 'name').makeTwoWay()
            ),
            $(go.TextBlock, 'Title: ', textStyle(), {
              row: 1,
              column: 0,
              background: 'yellow',
              font: '12pt Segoe UI,sans-serif',
              height: 30,
              width: 50,
              stroke: '#000',
              verticalAlignment: go.Spot.Center,
              minSize: new go.Size(10, 16)
            }),
            $(
              go.TextBlock,
              {
                row: 1,
                column: 1,
                background: 'yellow',
                columnSpan: 5,
                font: '12pt Segoe UI,sans-serif',
                editable: true,
                isMultiline: false,
                height: 30,
                width: 170,
                stroke: '#000',
                alignment: go.Spot.Center,
                verticalAlignment: go.Spot.Center,
                minSize: new go.Size(10, 16)
              },
              new go.Binding('text', 'title').makeTwoWay()
            )
            // $(
            //   go.TextBlock,
            //   textStyle(),
            //   {row: 2, column: 0},
            //   new go.Binding('text', 'key', function (v) {
            //     return 'ID: ' + v
            //   })
            // ),
            // $(
            //   go.TextBlock,
            //   textStyle(),
            //   {name: 'boss', row: 2, column: 3},
            //   new go.Binding('text', 'parent', function (v) {
            //     return 'Boss: ' + v
            //   })
            // ),
            // $(
            //   go.TextBlock,
            //   textStyle(), // the comments
            //   {
            //     row: 3,
            //     column: 0,
            //     columnSpan: 5,
            //     font: 'italic 9pt sans-serif',
            //     wrap: go.TextBlock.WrapFit,
            //     editable: true, // by default newlines are allowed
            //     minSize: new go.Size(10, 14)
            //   },
            //   new go.Binding('text', 'comments').makeTwoWay()
            // )
          ) // end Table Panel
        ) // end Horizontal Panel
      ) // end Node

      // the context menu allows users to make a position vacant,
      // remove a role and reassign the subtree, or remove a department
      that.myDiagram.nodeTemplate.contextMenu = $(
        'ContextMenu',
        $('ContextMenuButton', $(go.TextBlock, '离职'), {
          click: function(e, obj) {
            let node = obj.part.adornedPart
            if (node !== null) {
              let thisemp = node.data
              that.myDiagram.startTransaction('vacate')
              // update the key, name, and comments
              that.myDiagram.model.setDataProperty(thisemp, 'name', '(离职)')
              that.myDiagram.model.setDataProperty(thisemp, 'comments', '')
              that.myDiagram.commitTransaction('vacate')
            }
          }
        }),
        $('ContextMenuButton', $(go.TextBlock, '删除角色'), {
          click: function(e, obj) {
            // reparent the subtree to this node's boss, then remove the node
            let node = obj.part.adornedPart
            if (node !== null) {
              that.myDiagram.startTransaction('reparent remove')
              let chl = node.findTreeChildrenNodes()
              // iterate through the children and set their parent key to our selected node's parent key
              while (chl.next()) {
                let emp = chl.value
                that.myDiagram.model.setParentKeyForNodeData(emp.data, node.findTreeParentNode().data.key)
              }
              // and now remove the selected node itself
              that.myDiagram.model.removeNodeData(node.data)
              that.myDiagram.commitTransaction('reparent remove')
              that.save()
            }
          }
        }),
        $('ContextMenuButton', $(go.TextBlock, '删除部门'), {
          click: function(e, obj) {
            // remove the whole subtree, including the node itself
            let node = obj.part.adornedPart
            if (node !== null) {
              that.myDiagram.startTransaction('remove dept')
              that.myDiagram.removeParts(node.findTreeParts())
              that.myDiagram.commitTransaction('remove dept')
            }
            that.save()
          }
        })
      )

      // define the Link template
      that.myDiagram.linkTemplate = $(
        go.Link,
        go.Link.Orthogonal,
        { corner: 5, relinkableFrom: true, relinkableTo: true },
        $(go.Shape, { strokeWidth: 1.5, stroke: '#333' })
      ) // the link shape

      // read in the JSON-format data from the "mySavedModel" element
      that.load()

      // support editing the properties of the selected person in HTML
      // if (window.Inspector) myInspector = new Inspector("myInspector", this.myDiagram,
      //   {
      //     properties: {
      //       "key": { readOnly: true },
      //       "comments": {}
      //     }
      //   });

      // Setup zoom to fit button
      document.getElementById('zoomToFit').addEventListener('click', function() {
        that.myDiagram.commandHandler.zoomToFit()
      })

      document.getElementById('centerRoot').addEventListener('click', function() {
        that.myDiagram.scale = 1
        that.myDiagram.commandHandler.scrollToPart(that.myDiagram.findNodeForKey(1))
      })
    }, // end init

    // Show the diagram's model in JSON format
    save() {
      document.getElementById('mySavedModel').value = this.myDiagram.model.toJson()
      this.myDiagram.isModified = false
    },
    load() {
      this.myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value)
      // make sure new data keys are unique positive integers
      let lastkey = 1
      this.myDiagram.model.makeUniqueKeyFunction = function(model, data) {
        let k = data.key || lastkey
        while (model.findNodeDataForKey(k)) k++
        data.key = lastkey = k
        return k
      }
    }
  }
}
</script>

<style scoped></style>
