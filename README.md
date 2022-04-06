# my-table-component

## 
项目中，使用vue + element 的后台管理系统中 用的table表格很多，而且大部分很相似，一遍遍的写，代码会变得很冗余，
于是利用Vue + Element  Table 重新封装出了一套表格组件。

![](/assets/table.jpg)

### 1. 在 component中 创建文件夹 talbeData 添加文件 index.vue
``` js
<template>
  <div class="app-container">
    <el-table
      :data="dataList"
      v-loading="loading"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange">
      <!-- 是否有多选 -->
      <el-table-column type="selection" width="55" v-if="table_config.isCheckBox"></el-table-column>
      <!-- 是否需要序号 -->
      <el-table-column type="index" label="序号" width="55" align="center" v-if="table_config.isIndex"/>

      <el-table-column
        v-for="item in table_config.thead"
        :key="item.prop" 
        :prop="item.prop" 
        :label="item.label"
        :min-width="item.minWidth"
        :sortable="item.sortable ? true : false"
        align="center">
        <template slot-scope="scope">
          <!-- 有状态过滤 -->
          <span v-if="item.filter" :class="item.isSpecialClass && item.isSpecialClass(scope.row)">
            {{item.callback && item.callback(scope.row)}}
          </span>
          <!-- 图片展示 -->
          <img v-else-if="item.image" :src="scope.row[item.prop]" style="width:40px; height: 40px">
          <!-- switch开关 -->
          <el-switch
            v-else-if="item.switch"
            v-model="scope.row[item.prop]"
            active-text="启用"
            active-value = 1
            inactive-value = 0
            inactive-text="停用"
            @change="item.callback && item.callback(scope.row)"
          >
          </el-switch>
          <!-- 有跳转 -->
          <router-link 
            v-else-if="item.router" 
            :to="{path: item.routerPath, query: {name: scope.row[item.prop]}}"
          >
            {{ scope.row[item.prop]}}
          </router-link>
          <!-- 默认展示 -->
          <span v-else>{{ scope.row[item.prop]}}</span>
        </template>
      </el-table-column>

      <!-- 操作列 -->
      <el-table-column
        fixed="right"
        :label="table_config.operation.label"
        :width="table_config.operation.width"
        align="center"
        v-if="isShow">
        <template slot-scope="scope">
          <template v-if="table_config.operation.cols">
            <div class="btn" 
              v-for="item in table_config.operation.cols.slice(0,2)" 
              :key="item.label">
              <el-button @click="item.handleRow(scope.row,item.label)" :type="item.type" size="small">
                {{item.label}}
              </el-button>
            </div>
          </template>
          <!-- 操作列超过3个，用更多下拉显示 -->
          <el-dropdown v-if="isShowOperationCols">
            <span class="el-dropdown-link">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item 
                v-for="item in table_config.operation.cols.slice(2)" 
                :key="item.label" 
                @click.native="item.handleRow(scope.row,item.label)">
                {{item.label}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default: () => {}
    },
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      table_config: {
        thead: [],            // 表格头
        isCheckBox: false,    // 是否多选
        isIndex: false,      // 是否有序号
        isOperation: true,   // 是否有操作列表
        operation: {        // 操作
          cols: []
        },      
      }
    }
  },
  computed: {
    isShow() {
      return this.table_config.isOperation && this.table_config.operation.cols.length
    },
    isShowOperationCols() {
      let list = this.table_config.operation.cols
      return list.length && list.length > 2
    }
  },
  watch: {
    // 监听传过来的config，进行初始化
    config: {
      handler(newVal) {
        if(newVal) {
          this.initConfig()
        }
      },
      immediate: true
    }
  },
  mounted() {
    
  },
  methods: {
    // 初始化配置
    initConfig() {
      for(let key in this.config) {
        if(Object.keys(this.table_config).includes(key)) {
          this.table_config[key] = this.config[key]
        }
      }
      
    },
    // 多选事件
    handleSelectionChange(val) {
      this.$emit('selection-change', val)
    },
    // 排序事件
    handleSortChange(val) {
      this.$emit('sort-change', val)
    }
  }
}
</script>

<style scoped>
.btn{
  display: flex;
  justify-content: center;
  display: inline-block;
  margin: 5px 0 0 10px;
}
.btn:first-child{
  margin-left: 0;
}
.color1{
  color: red;
}
.color2{
  color: green;
}
.color3{
  color: blue;
}
.el-dropdown{
  margin-left: 10px;
  cursor: pointer;
}
</style>

```

### 2. 在组件中引用
``` html
<tableData 
  :config="table_config"
  :dataList="dataList"
  :loading="loading"
  @selection-change="selectionChange"
  @sort-change="sortChange"
/>
```

## 3.配置参数
### table_config
|  参数  | 说明  |  类型  | 默认值 |
|  ----  | ----  |  ----  | ----  |
| thead  | 表格的列 | Array | [] |
| isCheckBox | 是否多选 | Boolean | false |
| isIndex | 是否有序号 | Boolean | false |
| isOperation | 是否有操作列 | Boolean | true |
| operation | 操作列 | Object | - |


### 配置列 thead
|  参数  | 说明  |  类型  | 默认值 |
|  ----  | ----  |  ----  | ----  |
| label  | 标题 | string | - |
| prop | 字段名 | string | - |
| minWidth | 最小宽度 | string | - |
| image | 是否图片 | Boolean | false |
| sortable | 是否排序 | Boolean | false |
| router | 是否有跳转 | Boolean | false |
| filter | 是否有信息过滤 | Boolean | false |
| switch | 是否有开关 | Boolean | false |
| routerPath | 跳转地址 | string | - |

### Table Events
|  参数  | 说明  |  类型  | 默认值 |
|  ----  | ----  |  ----  | ----  |
| selection-change  | 多选事件 | Function | - |
| sort-change  | 排序事件 | Function | - |
