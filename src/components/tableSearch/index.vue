<template>
  <div class="app-container">
    <el-collapse v-model="activeNames" @change="filterChange" class='collapse'>
      <el-collapse-item name="1">
        <template slot="title">
          <span>{{showFilter?'收起筛选':'展开筛选'}}</span>
          <div class="filter-item-search">
            <el-button 
              v-for="(item,index) in form_config.operate" 
              :key="index" 
              :type="item.type" 
              size="small" 
              @click.stop="item.handleClick">
              {{item.label}}
            </el-button>
          </div>
        </template>
        <el-form ref="form" :model="formInfo" :label-width="form_config.labelWidth" class="filter-main">
          <template v-for="(value,key) in form_config.formItemList">
            <el-row :key="key">
              <template v-for="item in value">
                <el-col :span="6" :key="item.name">
                  <template v-if="item.type=== 'text' ">
                    <el-form-item :label="item.label">
                      <el-input
                        v-model="formInfo[item.name]"  
                        :clearable="item.clearable" 
                        :placeholder="item.placeholder" 
                      />
                    </el-form-item>
                  </template>
                  <template v-if=" ['data', 'daterange', 'datetimerange', 'datetime'].indexOf(item.type) !== -1 ">
                    <el-form-item :label="item.label">
                      <el-date-picker
                        v-model="formInfo[item.name]"
                        :type="item.type"
                        value-format="yyyy-MM-dd"
                        @change="item.callback && item.callback(formInfo[item.name])"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        style="width:100%">
                      </el-date-picker>
                    </el-form-item>
                  </template>
                  <template v-if="item.type=== 'select' ">
                    <el-form-item :label="item.label">
                      <el-select 
                        v-model="formInfo[item.name]"
                        :clearable="item.clearable" 
                        :multiple="item.multiple" 
                        :collapse-tags="item.collapseTags"
                        :placeholder="item.placeholder" 
                        style="width:100%">
                        <el-option v-for="ele in item.optList" :key="ele.value" :value="ele.value" :label="ele.label"/>
                      </el-select>
                    </el-form-item>
                  </template>
                </el-col>
              </template>
            </el-row>
          </template>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default: () => {}
    },  
    formInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      activeNames: ['1'],
      showFilter: true,
      form_config: {
        labelWidth: '100px',
        formItemList: {},
        operate: []
      }
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
  methods: {
    // 初始化配置
    initConfig() {
      for(let key in this.config) {
        if(Object.keys(this.form_config).includes(key)) {
          this.form_config[key] = this.config[key]
        }
      }
    },
    filterChange (val) {
      if (val.length <= 0) {
        this.showFilter = false
      } else {
        this.showFilter = true
      }
    }
  }
}
</script>

<style scoped>
.collapse >>> .el-collapse-item>div[role=tab] {
  padding: 0 200px;
  height: 50px;
  position: relative;
  border-top: 1px solid #ccc;
}
.collapse >>> .el-collapse-item__header{
  width: auto!important;
  border: 0;
  float: right;
  font-size: 14px;
  color: #409EFF;
}
.collapse .filter-item-search {
  position: absolute;
  right: 60px;
}

.filter-main{
  padding: 30px;
  background: #f3f4f9;
}
.collapse >>> .el-collapse-item__content{
  padding-bottom: 10px;
}
</style>

