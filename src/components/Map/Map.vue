<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>接警推送信息</el-breadcrumb-item>
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
    </el-card>
    <!-- 表格区域 -->
    <el-table :data="infoList" style="width: 100%" border stripe>
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="number" label="火警编号" width="180">
      </el-table-column>
      <el-table-column prop="name" label="消防站名称" width="180">
      </el-table-column>
      <el-table-column prop="carNumber" label="消防车编号" width="180">
      </el-table-column>
      <el-table-column prop="count" label="消防员个数"> </el-table-column>
      <el-table-column prop="apartment" label="火灾小区地点" width="180">
      </el-table-column>
      <el-table-column prop="time" label="时间" width="180">
        <template slot-scope="scope">{{
          scope.row.time | dateFormat
        }}</template> </el-table-column
      ><el-table-column label="操作" width="180">
        <template slot-scope="">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="editInfoDialogVisible = true"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeInfoById()"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

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
      infoList: [],
      editInfoDialogVisible: false,
      editForm: {},
    }
  },
  created() {
    this.getInfoList()
  },
  methods: {
    async getInfoList() {
      const { data: res } = await this.$axios.get('/menu/infoList/')
      this.infoList = res
      console.log(this.infoList)
    },

    // 监听修改火警信息对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 根据Id删除对应的火警信息
    async removeInfoById() {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)

      // 如果用户确认删除，则返回字符串 confirm；取消了删除，则返回 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      } else {
        this.$message.success('删除用户成功！')
        this.getInfoList()
      }
    },
  },
}
</script>
<style lang="less" scoped>
.el-card {
  margin-top: 20px;
}
</style>