<template>
  <div>
    <TableSearch 
      :config="form_config" 
      :formInfo="formInfo" 
    />

    <TableData 
      :config="table_config"
      :dataList="dataList"
      :loading="loading"
      @selection-change="selectionChange"
      @sort-change="sortChange"
    />

    <Pagination
      :total="total"
      :pageNum.sync="pages.pageNum"
      :limit.sync="pages.pageSize"
      @pagination="fetchData()" 
    />
  </div> 
</template>

<script>
import { getList } from '@/api/table'
import TableData from '@/components/tableData';
import Pagination from '@/components/pagination';
import TableSearch from '@/components/tableSearch';
import { sexType,roleType } from '@/utils/config';

export default {
  components: {
    TableData,
    Pagination,
    TableSearch
  },
  data() {
    return {
      // 查询配置项
      form_config: {
        labelWidth: '120px',
        formItemList: {
          1: [
            {
              label: '姓名',
              name: 'name',
              type: 'text',
              placeholder: '请输入姓名'
            },
            {
              label: '时间',
              name: 'time',
              type: 'daterange',
              callback: (data) => {
                console.log(data);
              }
            },
            {
              label: '角色',
              name: 'role',
              type: 'select',
              clearable: true,
              multiple: true,
              collapseTags: true,
              placeholder: '请选择角色',
              optList: [
                {label:'一号选手',value:1},
                {label:'二号选手',value:2},
                {label:'三号选手',value:3}
              ]
            },
            {
              label: '状态',
              name: 'status',
              type: 'select',
              clearable: true,
              placeholder: '请选择状态',
              optList: [
                {label:'停用',value:0},
                {label:'启用',value:1}
              ]
            },
          ]
        },
        operate: [
          {
            label: '查询',
            type: 'primary',
            handleClick: this.handleSearch
          },
          {
            label: '重置',
            type: 'primary',
            handleClick: this.handleReset
          }
        ]
      },
      // 查询条件
      formInfo: {
        name: '',
        time: null,
        role: '',
        status: ''
      },
      // 列表配置项
      table_config: {
        thead: [
          { 
            label: '姓名',
            prop: 'name',
            minWidth: '150px',
            router: true,
            routerPath: 'xxx'
          },
          {
            label: '性别',
            prop: 'sex',
            minWidth: '100px',
            filter: true,
            callback: (rowData) => {
              let data = sexType[rowData.sex]
              if(data) {
                return data.label
              }
            }
          },
          {label: '头像',prop: 'img',  minWidth: '100px',image: true},
          {label: '电话',prop: 'phone',minWidth: '150px',},
          {label: '时间',prop: 'time', minWidth: '200px',sortable: true},
          {
            label: '角色',
            prop: 'role',
            minWidth: '150px',
            filter: true,
            colorName: '',
            callback: (rowData) => {
              let data = roleType[rowData.role]
              if(data) {
                return data.label
              }
            },
            specialClass: (rowData) => {
              let data = roleType[rowData.role]
              if(data) {
                return data.className
              }
            }
          },
          {
            label: '状态',
            prop: 'status',
            minWidth: '150px',
            switch: true,
            callback: this.changeStatus
          },
        ],
        isCheckBox: true,
        isIndex: true,
        isOperation: true,
        // 表格操作列
        operation: {
          label: '操作',
          width: '200',
          cols: [
            {
              label: '编辑',
              type: 'primary',
              handleRow: this.handleRow
            },
            {
              label: '删除',
              type: 'danger',
              handleRow: this.handleRow
            }
          ]
        },
      },
      dataList: [],
      loading: false,
      pages: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getList(this.pages).then(res => {
        if(res.data.code === 20000) {
          this.dataList = res.data.data.items
          this.total = res.data.data.total
          this.loading = false
        }
      })
      setTimeout(() => {
        this.loading = false
      },3000)
    },
     // 操作方法
    handleRow(rowData,label) {
      console.log(rowData,label);
    },
    // 多选方法
    selectionChange(val) {
      console.log(val);
    },
    // 排序方法
    sortChange(val) {
      console.log(val);
    },
    changeStatus(val) {
      console.log(val);
    },
    handleSearch() {
      console.log('查询',this.formInfo);
    },
    handleReset() {
      console.log('重置');
    }
  }
}
</script>

