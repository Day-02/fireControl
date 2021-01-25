<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>居民管理</el-breadcrumb-item>
      <el-breadcrumb-item>居民列表</el-breadcrumb-item>
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
        ><el-col :span="4">
          <el-button type="primary" @click="addResDialogVisible = true"
            >添加居民</el-button
          >
        </el-col></el-row
      >
    </el-card>
    <!-- 表格区域 -->
    <el-table :data="residentList" style="width: 100%" border stripe>
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="resident_username" label="用户名" width="120">
      </el-table-column
      ><el-table-column prop="resident_password" label="居民密码" width="130">
      </el-table-column>
      <el-table-column
        prop="resident_realname"
        label="居民真实姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="resident_tel" label="居民手机号" width="180">
      </el-table-column>
      <el-table-column prop="resident_address" label="居民地址" width="180">
      </el-table-column>
      <el-table-column prop="resident_status" label="账号状态" width="120">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.resident_status">正常</el-tag>
          <el-tag type="info" v-else>拉黑</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="editResDialogVisible = true"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeResById()"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加居民信息的对话框 -->
    <el-dialog
      title="添加居民信息"
      :visible.sync="addResDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <el-form ref="addFormRef" :model="addForm" label-width="80px">
        <el-form-item label="居民姓名"> <el-input></el-input> </el-form-item
      ></el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addResDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addResDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 修改居民信息的对话框 -->
    <el-dialog
      title="修改居民信息"
      :visible.sync="editResDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form ref="editFormRef" :model="editForm" label-width="80px">
        <el-form-item label="居民姓名"> <el-input></el-input> </el-form-item
      ></el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editResDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editResDialogVisible = false"
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
      residentList: [],
      addResDialogVisible: false,
      addForm: {},
      editResDialogVisible: false,
      editForm: {},
    }
  },
  created() {
    this.getResidentList()
  },
  methods: {
    async getResidentList() {
      const { data: res } = await this.$axios.post(`user/allUser`)
      if (res.status !== 0) {
        return this.$message.error('获取居民列表失败！')
      } else {
        this.residentList = res.data
      }
    },

    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },

    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },

    // 根据Id删除对应的用户信息
    async removeResById() {
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
        this.getResidentList()
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