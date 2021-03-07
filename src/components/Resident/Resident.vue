<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>居民管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <el-row :gutter="20"
        ><el-col :span="8">
          <el-input placeholder="请输入内容" clearable>
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button> </el-input
        ></el-col>
      </el-row>

      <!-- 表格区域 -->
      <el-table :data="residentList" style="width: 100%" border stripe>
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="resident_username" label="用户名" width="100">
        </el-table-column
        ><el-table-column prop="resident_password" label="居民密码" width="120">
        </el-table-column>
        <el-table-column
          prop="resident_realname"
          label="居民真实姓名"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="resident_tel" label="居民手机号" width="140">
        </el-table-column>
        <el-table-column prop="resident_address" label="居民地址" width="160">
        </el-table-column>
        <el-table-column prop="resident_status" label="账号状态" width="120">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.resident_status"
              >正常</el-tag
            >
            <el-tag type="info" v-else>拉黑</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserByName(scope.row.resident_username)"
            ></el-button>
          </template>
        </el-table-column>
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

    <!-- 修改居民信息的对话框 -->
    <el-dialog
      title="修改居民信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="resident_username">
          <el-input v-model="editForm.resident_username" disabled></el-input>
        </el-form-item>
        <el-form-item label="居民ID" prop="resident_id">
          <el-input v-model="editForm.resident_id"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="resident_password">
          <el-input
            v-model="editForm.resident_password"
          ></el-input> </el-form-item
        ><el-form-item label="真实姓名" prop="resident_realname">
          <el-input v-model="editForm.resident_realname"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="resident_tel">
          <el-input v-model="editForm.resident_tel"></el-input>
        </el-form-item>
        <el-form-item label="居民地址" prop="resident_address">
          <el-input v-model="editForm.resident_address"></el-input>
        </el-form-item>
        <el-form-item label="账号状态" prop="resident_status">
          <el-input v-model="editForm.resident_status"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      residentList: [],
      editDialogVisible: false,
      editForm: {},
      //修改表单的验证规则对象
      editFormRules: {
        resident_id: [
          { required: true, message: '请输入居民ID', trigger: 'blur' },
        ],
        resident_address: [
          { required: true, message: '请输入居民地址', trigger: 'blur' },
        ],
        resident_password: [
          { required: true, message: '请输入居民密码', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '密码的长度在3~10个字符之间',
            trigger: 'blur',
          },
        ],
        resident_realname: [
          { required: true, message: '请输入居民真实姓名', trigger: 'blur' },
        ],
        resident_tel: [
          { required: true, message: '请输入居民手机号码', trigger: 'blur' },
        ],
        resident_status: [
          { required: true, message: '请输入居民账号状态', trigger: 'blur' },
        ],
      },
      query: {},
      onStatus: 0,
    }
  },
  created() {
    this.getResidentList()
  },
  methods: {
    //获取居民信息
    async getResidentList() {
      const { data: res } = await this.$axios.post(
        '/user/allUser' +
          '?pageNum=' +
          this.queryInfo.pageNum +
          '&pageSize=' +
          this.queryInfo.pageSize
      )
      if (res.code !== 200) {
        return this.$message.error('获取居民列表失败！')
      } else {
        this.residentList = res.data
        this.total = res.total
      }
    },

    // 监听修改居民对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },

    //修改居民信息
    async showEditDialog(e) {
      this.editDialogVisible = true
      this.editForm = e
      console.log(e)
    },
    // 修改居民信息并提交
    async editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        // 发起修改居民信息的数据请求
        const { data: res } = await this.$axios.post(
          `/user/update`,
          this.editForm
        )
        if (res.status !== 0) {
          return this.$message.error('更新居民信息失败！')
        }
        console.log(this.editForm)
        // 关闭对话框
        this.editDialogVisible = false
        // 刷新数据列表
        this.getResidentList()
        // 提示修改成功
        this.$message.success('更新居民信息成功！')
      })
    },

    // 根据username删除对应的居民信息
    async removeUserByName(username) {
      // 弹框询问居民是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该居民, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)

      // 确认删除，则返回字符串confirm；取消删除返回 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      } else {
        const { data: res } = await this.$axios.post(
          '/user/delete' + '?username=' + username
        )
        if (res.status !== 0) {
          return this.$message.error('删除居民信息失败！')
        } else {
          this.$message.success('删除居民信息成功！')
          this.getResidentList()
        }
      }
    },

    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getResidentList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getResidentList()
    },
  },
}
</script>
<style lang="less" scoped>
</style>