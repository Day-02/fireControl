<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>消防员信息</el-breadcrumb-item>
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
          prop="fireman_username"
          label="消防员用户名"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="fireman_realname"
          label="消防员真实姓名"
          width="140"
        >
        </el-table-column
        ><el-table-column
          prop="fireman_password"
          label="消防员密码"
          width="150"
        >
        </el-table-column>
        <el-table-column prop="fireman_tel" label="消防员手机号" width="180">
        </el-table-column
        ><el-table-column
          prop="fireman_belong_firehouse"
          label="消防员所属消防站"
          width="160"
        >
        </el-table-column>
        <el-table-column prop="role" label="角色" width="160">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.role == 0">居民</el-tag>
            <el-tag type="info" v-else-if="scope.row.role == 1">物业</el-tag>
            <el-tag type="warning" v-else-if="scope.row.role == 2"
              >志愿者</el-tag
            >
            <el-tag type="danger" v-else>消防员</el-tag>
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
              @click="removeInfoByName(scope.row.fireman_username)"
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

    <!-- 修改消防员信息的对话框 -->
    <el-dialog
      title="修改消防员信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form
        ref="editFormRef"
        :model="editForm"
        :rules="editFormRules"
        label-width="150px"
      >
        <el-form-item label="消防员用户名" prop="fireman_username">
          <el-input v-model="editForm.fireman_username" disabled></el-input>
        </el-form-item>
        <el-form-item label="消防员真实姓名" prop="fireman_realname">
          <el-input
            v-model="editForm.fireman_realname"
          ></el-input> </el-form-item
        ><el-form-item label="消防员密码" prop="fireman_password">
          <el-input v-model="editForm.fireman_password"></el-input>
        </el-form-item>
        <el-form-item label="消防员手机号码" prop="fireman_tel">
          <el-input v-model="editForm.fireman_tel"></el-input> </el-form-item
        ><el-form-item label="消防员所属消防站" prop="fireman_belong_firehouse">
          <el-input v-model="editForm.fireman_belong_firehouse"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-input v-model="editForm.role" disabled></el-input>
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
      queryInfo: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      infoList: [],
      editDialogVisible: false,
      editForm: {},
      //修改表单的验证规则对象
      editFormRules: {
        fireman_username: [
          { required: true, message: '请输入消防员用户名', trigger: 'blur' },
        ],
        fireman_password: [
          { required: true, message: '请输入消防员密码', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '密码的长度在3~10个字符之间',
            trigger: 'blur',
          },
        ],
        fireman_realname: [
          { required: true, message: '请输入消防员真实姓名', trigger: 'blur' },
        ],
        fireman_tel: [
          { required: true, message: '请输入消防员手机号码', trigger: 'blur' },
        ],
        fireman_belong_firehouse: [
          {
            required: true,
            message: '请输入消防员所属消防站编号',
            trigger: 'blur',
          },
        ],
        role: [
          {
            required: true,
            message: '请输入消防员角色',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  created() {
    this.getInfoList()
  },
  methods: {
    //获得消防员信息列表
    async getInfoList() {
      const { data: res } = await this.$axios.post(
        '/fireman/allFireman' +
          '?pageNum=' +
          this.queryInfo.pageNum +
          '&pageSize=' +
          this.queryInfo.pageSize
      )
      if (res.code !== 200) {
        return this.$message.error('获取消防员信息列表失败！')
      }
      this.infoList = res.data
      this.total = res.total
    },
    //修改消防员信息的窗口展示
    async showEditDialog(e) {
      this.editDialogVisible = true
      this.editForm = e
    },
    // 监听修改消防员信息对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },

    // 修改消防员信息并提交
    async editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        // 发起修改消防员信息的数据请求
        const fireman = this.editForm

        const { data: res } = await this.$axios.post(`/fireman/update`, fireman)
        if (res.status !== 0) {
          return this.$message.error('更新消防员信息失败！')
        }
        // 关闭对话框
        this.editDialogVisible = false
        // 刷新数据列表
        this.getInfoList()
      })
    },

    // 根据username删除对应的消防员信息
    async removeInfoByName(username) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该消防员, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      } else {
        const { dat: res } = await this.$axios.post(
          '/fireman/delete' + '?username=' + username
        )
        if (res.status !== 0) {
          return this.$message.error('删除消防员信息失败！')
        }
        this.getInfoList()
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