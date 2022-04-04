<template>
  <div>
    <tableData 
      :config="table_config"
      :dataList="dataList"
      :loading="loading"
      @selection-change="selectionChange"
      @sort-change="sortChange"
    />

    <pagination
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
import { sexType,roleType } from '../utils/config';

export default {
  components: {
    TableData,
    Pagination
  },
  data() {
    return {
      // 配置项
      table_config: {
        thead: [
          {
            label: '姓名',
            prop: 'name',
            minWidth: '150px',
            router: {path: 'xxx'}
          },
          {
            label: '性别',
            prop: 'sex',
            minWidth: '100px',
            type: 'function',
            callback: (rowData) => {
              let data = sexType[rowData.sex]
              if(data) {
                return data.label
              }
            }
          },
          {label: '头像',prop: 'img',minWidth: '100px',type: 'image'},
          {label: '电话',prop: 'phone',minWidth: '150px',},
          {label: '时间',prop: 'time',minWidth: '200px',sortable: true},
          {
            label: '角色',
            prop: 'role',
            minWidth: '150px',
            type: 'function',
            colorName: '',
            callback: (rowData) => {
              let data = roleType[rowData.role]
              if(data) {
                return data.label
              }
            },
            isSpecialClass: (rowData) => {
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
            type: 'switch',
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
    }
  }
}
</script>

