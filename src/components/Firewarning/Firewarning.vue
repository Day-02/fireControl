<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>居民报警信息</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <el-row :gutter="20"
        ><el-col :span="8">
          <el-input placeholder="请输入内容" clearable>
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button> </el-input></el-col
      ></el-row>

      <!-- 表格区域 -->
      <el-table :data="infoList" style="width: 100%" border stripe>
        <el-table-column type="index"> </el-table-column>
        <el-table-column
          prop="firewarning_address"
          label="火灾位置"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="firewarning_id" label="火警编号ID" width="180">
        </el-table-column>
        <el-table-column
          prop="firewarning_latitude"
          label="报警人当前纬度"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="firewarning_longitude" label="报警人当前经度">
        </el-table-column>
        <el-table-column prop="firewarning_mp4" label="现场视频" width="180">
        </el-table-column>
        <el-table-column prop="firewarning_pic" label="现场照片" width="180">
        </el-table-column>
        <el-table-column prop="firewarning_role" label="报警人角色" width="180">
        </el-table-column>
        <el-table-column
          prop="firewarning_situation"
          label="灾情发生场所"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="firewarning_time" label="报警时间" width="180">
        </el-table-column
        ><el-table-column
          prop="firewarning_trap"
          label="人员被困情况"
          width="180"
        >
        </el-table-column
        ><el-table-column
          prop="firewarning_username"
          label="报警人"
          width="180"
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

    <!-- 修改接警推送信息的对话框 -->
    <el-dialog
      title="修改接警推送信息"
      :visible.sync="editInfoDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form ref="editFormRef" :model="editForm" label-width="80px">
        <el-form-item label="火警编号"> <el-input></el-input> </el-form-item
      ></el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editInfoDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editInfoDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryInfo: {
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