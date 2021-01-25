<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>报警管理</el-breadcrumb-item>
      <el-breadcrumb-item>报警列表</el-breadcrumb-item>
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
    <el-table :data="callList" style="width: 100%" border stripe>
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="number" label="火警编号" width="180">
      </el-table-column>
      <el-table-column prop="location" label="火警位置" width="180">
      </el-table-column>
      <el-table-column prop="state" label="火警状态" width="120"
        ><template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.state">进行中</el-tag>
          <el-tag type="info" v-else>已完成</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="报警时间">
        <template slot-scope="scope">{{
          scope.row.time | dateFormat
        }}</template>
      </el-table-column>
      <el-table-column prop="res_Name" label="报警人姓名" width="120">
      </el-table-column>
      <el-table-column prop="tel" label="报警人手机号" width="180">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="editCallDialogVisible = true"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeCallById()"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改报警信息的对话框 -->
    <el-dialog
      title="修改报警信息"
      :visible.sync="editCallDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form ref="editFormRef" :model="editForm" label-width="80px">
        <el-form-item label="火警编号"> <el-input></el-input> </el-form-item
      ></el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCallDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCallDialogVisible = false"
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
      callList: [],
      editCallDialogVisible: false,
      editForm: {},
    }
  },
  created() {
    this.getCallList()
  },
  methods: {
    async getCallList() {
      const { data: res } = await this.$axios.get('/menu/callList/')
      this.callList = res
      console.log(this.callList)
    },

    // 监听修改火警信息对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 根据Id删除对应的火警信息
    async removeCallById() {
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
        this.getCallList()
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