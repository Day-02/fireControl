<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>报警信息</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <el-row :gutter="20"
        ><el-col :span="8">
          <el-input
            placeholder="请输入报警状态码查询"
            v-model="queryInfo.query"
            clearable
            @clear="getInfoList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="FindFirewarningByStatus(queryInfo.query)"
            ></el-button> </el-input></el-col
      ></el-row>

      <!-- 表格区域 -->
      <el-table :data="infoList" style="width: 100%" border stripe>
        <el-table-column type="index"> </el-table-column>
        <el-table-column
          prop="firewarning_community_num"
          label="发生火灾的小区编号"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="firewarning_address_detail"
          label="火灾位置详细信息"
          width="150"
        >
        </el-table-column>

        <el-table-column prop="firewarning_status" label="接警状态" width="110">
          <template slot-scope="scope"
            ><el-tag type="danger" v-if="scope.row.firewarning_status === 0"
              >未接警</el-tag
            >
            <el-tag
              type="warning"
              v-else-if="scope.row.firewarning_status === 1"
              >接警处理中</el-tag
            >
            <el-tag type="success" v-else>处理完毕</el-tag></template
          >
        </el-table-column>
        <el-table-column prop="firewarning_mp4" label="现场视频">
        </el-table-column>
        <el-table-column prop="firewarning_pic" label="现场照片">
        </el-table-column>

        <el-table-column
          prop="firewarning_situation"
          label="灾情发生场所"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="firewarning_time" label="报警时间" width="180">
        </el-table-column
        ><el-table-column
          prop="firewarning_trap"
          label="人员被困情况"
          width="110"
        >
        </el-table-column
        ><el-table-column prop="firewarning_username" label="报警人" width="80">
        </el-table-column>
        <el-table-column prop="firewarning_role" label="报警人角色" width="100">
          <template slot-scope="scope"
            ><el-tag v-if="scope.row.firewarning_role === 0">居民</el-tag>
            <el-tag type="info" v-else-if="scope.row.firewarning_role === 1"
              >物业</el-tag
            >
            <el-tag type="warning" v-else-if="scope.row.firewarning_role == 2"
              >志愿者</el-tag
            >
            <el-tag type="danger" v-else>消防员</el-tag></template
          >
        </el-table-column>

        <el-table-column
          prop="firewarning_longitude"
          label="报警人当前经度"
          width="140"
        >
        </el-table-column>
        <el-table-column
          prop="firewarning_latitude"
          label="报警人当前纬度"
          width="140"
        >
        </el-table-column>
        <el-table-column
          prop="firewarning_tel"
          label="报警人联系方式"
          width="150"
        >
        </el-table-column>
        <!-- 分页区域 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      infoList: [],
    }
  },
  created() {
    this.getInfoList()
  },
  methods: {
    //获得数据列表
    async getInfoList() {
      const { data: res } = await this.$axios.post(
        '/firewarning/allFirewarning' +
          '?pageNum=' +
          this.queryInfo.pageNum +
          '&pageSize=' +
          this.queryInfo.pageSize
      )
      if (res.code !== 200) {
        return this.$message.error('获取报警信息列表失败！')
      }
      this.infoList = res.data
      this.total = res.total
    },
    //根据报警状态码查询报警信息
    async FindFirewarningByStatus(num) {
      if (num === '') {
        this.getInfoList()
      } else {
        const { data: res } = await this.$axios.post(
          `/firewarning/FirewarningByStatus` +
            '?pageNum=' +
            this.queryInfo.pageNum +
            '&pageSize=' +
            this.queryInfo.pageSize +
            '&status=' +
            num
        )
        console.log(res)
        if (res.code !== 200) {
          this.$message.error('查询报警信息失败！')
        }
        this.infoList = res.data
      }
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getInfoList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getInfoList()
    },
  },
}
</script>
<style lang="less" scoped>
</style>