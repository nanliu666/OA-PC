<template>
  <div>
    
      <basic-container>
           <search-pop-over :require-options="requireOptions" :popover-options="popoverOptions" />
            <searchComponent />
        <avue-crud
          ref="crud"
          v-model="form"
          :option="option"
          :table-loading="loading"
          :data="data"
          :permission="permissionList"
          :before-open="beforeOpen"
          :page="page"
          @row-update="rowUpdate"
          @row-save="rowSave"
          @search-change="searchChange"
          @search-reset="searchReset"
          @selection-change="selectionChange"
          @current-change="currentChange"
          @size-change="sizeChange"
          @refresh-change="refreshChange"
          @on-load="onLoad"
        >

        </avue-crud>
      </basic-container>
  </div>
</template>

<script>
import {getActionLog} from '@/api/system/user'
import searchPopOver from "@/components/searchPopOver"
import searchComponent from "@/components/searchComponent/searchComponent.vue"
import { tableOptions } from '../../util/constant'
export default {
    data(){
        return{
            data: [],
            ajaxData:{
                pageNo:1,//请求页码
                pageSize:10,//每页数据
                model:'',//模糊搜索
                userName:'',//用户名
                beginTime:'',//查询开始时间
                endTime:'',//查询结束时间
                status:''//状态
            },
              page: {
                pageSize: 10,
                currentPage: 1,
                total: 0
            },
            requireOptions:[{type:'dataPicker',field: 'start,end',label: '操作时间'}],
            popoverOptions:[{type:'input',field: 'input',label: '操作人'},{type:'input',field: 'input',label: '模块'},{type:'select',field: 'select',label: '状态'},{type:'timePicker',field: 'timePicker',label: '操作时间'}],
            option:{
                ...tableOptions,
                refreshBtn:true,
                height: 'auto',
                calcHeight: 80,
                tip: false,
                searchShow: true,
                searchMenuSpan: 6,
                border: true,
                index: true,
                selection: true,
                menu:false,
                column: [
                    {
                        label: '操作时间',
                        prop: 'createTime',
                        display: false,
                        type: "date",
                        format: "yyyy-MM-dd hh:mm:ss",
                        valueFormat: "yyyy-MM-dd hh:mm:ss",
                    },
                    {
                        label: '操作人',
                        prop: 'name',
                        display: false
                    },
                    {
                        label: '模块',
                        prop: 'model',
                        display: false
                    },
                    {
                        label: '状态',
                        prop: 'status',
                        display: false
                    },
                    {
                        label: '操作内容',
                        prop: 'content',
                        display: false
                    },
                    {
                        label: 'IP',
                        prop: 'ip',
                        display: false
                    }
        ],
            }
        }
    },
components:{
    searchPopOver,
},
mounted() {
    this.initData()
},
methods: {
    initData(){
        getActionLog(this.ajaxData).then((res)=>{
            this.data=res.data;
            this.page.total = res.totalNum
        })
    },
    currentChange(currentPage) {
        this.ajaxData.pageNo=currentPage
        this.initData()
        this.page.currentPage = currentPage
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize
      this.ajaxData.pageSize = pageSize
      this.initData()
    },
    refreshChange(){
         this.initData()
    },
       onLoad(page) {
    }

},
}
</script>

<style>

</style>