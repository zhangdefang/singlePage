<template>
  <div class="contain">
    <header>
      <div class="img"></div>
    </header>
    <section>
      <el-row>
        <el-col :span="24">
          <span class="tag" style="margin-left: 10px">一级功能模块：</span>
          <el-input placeholder="请输入" style="width: 10%" size="mini" v-model="callOneModule">
          </el-input>
          <span class="tag" style="margin-left: 10px">二级功能模块：</span>
          <el-input placeholder="请输入" style="width: 10%" size="mini" v-model="callTwoModule">
          </el-input>
          <span class="tag" style="margin-left: 10px">调用服务名称：</span>
          <el-input placeholder="请输入" style="width: 10%" size="mini" v-model="serviceName">
          </el-input>
          <span class="tag" style="margin: 0 10px">调用时间:</span>
          <el-date-picker v-model="rangeDate" size="mini" type="daterange" align="center" unlink-panels style="width: 18%"
            range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"
            value-format="yyyy-MM-dd">
          </el-date-picker>

          <el-button size="mini" icon="el-icon-search" style="margin-left: 10px; background-color: #00a291; color: #fff"
            @click="search">
            查询
          </el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" ref="multipleTable" height="calc(90% - 10px)" style="margin-top: 10px; width: 100%"
        class="centerTable" border v-loading="tableLoading" highlight-current-row :header-cell-style="{
          background: '#00a291',
          color: '#fff',
        }">
        <el-table-column label="序号" type="index" width="55" align="center" />
        <el-table-column align="center" prop="callOneModule" label="一级功能模块" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.callOneModule && scope.row.callOneModule.length > 10">
              <el-popover placement="top-start" title="" width="1000" trigger="hover"
                popper-class="workorder-problem-desc">
                <div>{{ scope.row.callOneModule }}</div>
                <span slot="reference">
                  {{ scope.row.callOneModule.substr(0, 10) + '...' }}
                </span>
              </el-popover>
            </span>
            <span v-else>{{ scope.row.callOneModule }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="callTwoModule" show-overflow-tooltip label="二级功能模块">
        </el-table-column>
        <el-table-column align="center" prop="serviceName" show-overflow-tooltip label="调用服务名称">
        </el-table-column>
        <el-table-column align="center" prop="callPath" show-overflow-tooltip label="调用路径">
        </el-table-column>
        <el-table-column align="center" prop="inputParams" label="中台接口入参" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.inputParams && scope.row.inputParams.length > 10">
              <el-popover placement="top-start" title="" width="1000" trigger="hover"
                popper-class="workorder-problem-desc">
                <div>{{ scope.row.inputParams }}</div>
                <span slot="reference">
                  {{ scope.row.inputParams.substr(0, 10) + '...' }}
                </span>
              </el-popover>
            </span>
            <span v-else>{{ scope.row.inputParams }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="returnParams" label="中台接口回参" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.returnParams && scope.row.returnParams.length > 10">
              <el-popover placement="top-start" title="" width="1000" trigger="hover"
                popper-class="workorder-problem-desc">
                <div>{{ scope.row.returnParams }}</div>
                <span slot="reference">
                  {{ scope.row.returnParams.substr(0, 10) + '...' }}
                </span>
              </el-popover>
            </span>
            <span v-else>{{ scope.row.returnParams }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="callTime" show-overflow-tooltip label="调用时间">
        </el-table-column>
      </el-table>
      <div class="tabListPage">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="pageSizes" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      callOneModule: '',
      callTwoModule: '',
      serviceName: '',
      rangeDate: [],
      startTime: '',
      endTime: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
      tableLoading: false,
      currentPage: 1,
      totalCount: 0,
      pageSizes: [10, 20, 30],
      PageSize: 20,
      tableData: [],
    }
  },
  components: {},
  created() {
    this.startTime =
      this.getQueryStringRegExp('startTime') || this.getSpecifyDate(-0)
    this.endTime =
      this.getQueryStringRegExp('endTime') || this.getSpecifyDate(-0)
    this.rangeDate = [this.startTime, this.endTime]
  },
  mounted() {
    this.queryAll()
  },
  methods: {
    formate3(date) {
      return date >= 10 ? date : '0' + date
    },
    formateDay(now) {
      var year = now.getFullYear() //取得4位数的年份
      var month = this.formate3(now.getMonth() + 1) //取得日期中的月份，其中0表示1月，11表示12月
      var date = this.formate3(now.getDate()) //返回日期月份中的天数（1到31）
      return year + '-' + month + '-' + date
    },
    getSpecifyDate(num) {
      var date1 = new Date()
      var date2 = new Date(date1.setDate(date1.getDate() + num))
      return this.formateDay(date2)
    },
    getQueryStringRegExp(name) {
      var reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(\\s|&|$)', 'i')
      if (reg.test(location.href))
        return unescape(RegExp.$2.replace(/\+/g, ' '))
      return ''
    },
    queryAll() {
      this.tableLoading = true
      let options = {
        emulateJSON: false,
        headers: { 'Content-Type': 'application/json;' },
      }
      const data = {
        pageNum: this.currentPage,
        pageSize: this.PageSize,
        callOneModule: this.callOneModule,
        callTwoModule: this.callTwoModule,
        serviceName: this.serviceName,
        startTime: this.rangeDate[0],
        endTime: this.rangeDate[1],
      }
      let url = '/apis/log/query'
      this.$http.post(url, data, options).then((res) => {
        this.tableLoading = false
        let { code, data, total, message } = res.data
        if (code == '200') {
          this.tableData = data
          this.totalCount = Number(total)
        } else {
          this.$message.error(message)
        }
      })
    },

    search() {
      this.queryAll()
    },
    handleSizeChange(val) {
      this.PageSize = val
      this.currentPage = 1
      this.queryAll()
    },
    // 显示第几页
    handleCurrentChange(val) {
      this.currentPage = val
      this.queryAll()
    },
  },
}
</script>
<style lang="less">
.workorder-problem-desc {
  // height: 50% !important;
  // overflow-y: scroll;
  // background-color: #303133!important;
  // color: #fff!important;
  // border-color: #303133!important;
}

// .el-tooltip__popper {
//   max-width: 20% !important;
// }

// .el-tooltip__popper,
// .el-tooltip__popper .is-dark {
//   padding: 10px 30px !important;
// }

.contain {
  height: 100%;
  width: 100%;

  header {
    width: 100%;
    height: 9%;

    .img {
      height: 100%;
      background: url('./img/header.png');
      background-size: 100% 100%;
    }
  }

  section {
    padding: 0 10px;
    margin-top: 10px;
    width: calc(100% - 20px);
    height: calc(91% - 10px);

    /deep/.el-table td,
    /deep/.el-table th {
      padding: 5px 0 !important;
    }

    .set-popper {
      width: 500px;
    }

    .tabListPage {
      text-align: right;
      margin-top: 11px;
    }
  }
}
</style>