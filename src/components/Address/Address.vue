<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>地址信息</el-breadcrumb-item>
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
          <el-button type="primary" @click="addDialogVisible = true"
            >添加地址</el-button
          >
        </el-col></el-row
      >
      <!-- 表格区域 -->
      <el-table :data="infoList" style="width: 100%" border stripe>
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="id" label="地址ID" width="120">
        </el-table-column>
        <el-table-column prop="province" label="省份" width="140">
        </el-table-column>
        <el-table-column prop="city" label="市" width="140"> </el-table-column>
        <el-table-column prop="district" label="区/县" width="140">
        </el-table-column>
        <el-table-column prop="town" label="镇/街道" width="200">
        </el-table-column>
        <el-table-column label="操作" width="180">
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
              @click="removeInfoById(scope.row.id)"
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

    <!-- 添加地址的对话框 -->
    <el-dialog
      title="添加地址"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="addForm"
        :rules="editFormRules"
        ref="addFormRef"
        label-width="80px"
        ><el-form-item label="省" prop="province">
          <el-input v-model="addForm.province"></el-input> </el-form-item
        ><el-form-item label="市" prop="city">
          <el-input v-model="addForm.city"></el-input> </el-form-item
        ><el-form-item label="区/县" prop="district">
          <el-input v-model="addForm.district"></el-input> </el-form-item
        ><el-form-item label="镇/街道" prop="town">
          <el-input v-model="addForm.town"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAddress">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改地址信息的对话框 -->
    <el-dialog
      title="修改地址信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form
        ref="editFormRef"
        :model="editForm"
        :rules="editFormRules"
        label-width="80px"
      >
        <el-form-item label="省" prop="province">
          <el-input v-model="editForm.province"></el-input> </el-form-item
        ><el-form-item label="市" prop="city">
          <el-input v-model="editForm.city"></el-input> </el-form-item
        ><el-form-item label="区/县" prop="district">
          <el-input v-model="editForm.district"></el-input> </el-form-item
        ><el-form-item label="镇/街道" prop="town">
          <el-input v-model="editForm.town"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editAddress">确 定</el-button>
      </span>
    </el-dialog>
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
      addDialogVisible: false,
      addForm: {
        province: '',
        city: '',
        district: '',
        town: '',
      },
      addFormRules: {},
      editDialogVisible: false,
      editForm: {},
      editFormRules: {
        province: [{ required: true, message: '请输入省', trigger: 'blur' }],
        city: [{ required: true, message: '请输入市', trigger: 'blur' }],
        district: [
          {
            required: true,
            message: '请输入区/县',
            trigger: 'blur',
          },
        ],
        town: [
          {
            required: true,
            message: '请输入镇/街道',
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
    //查询所有地址信息
    async getInfoList() {
      const { data: res } = await this.$axios.post(
        '/community_address/allCommunity_Address' +
          '?pageNum=' +
          this.queryInfo.pageNum +
          '&pageSize=' +
          this.queryInfo.pageSize
      )
      if (res.code !== 200) {
        return this.message.error('获取地址信息列表失败！')
      }
      this.infoList = res.data
      this.total = res.total
    },

    // 监听添加地址对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },

    // 点击按钮，添加新地址
    addAddress() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        const community_address = this.addForm
        // 可以发起添加地址的网络请求
        const { data: res } = await this.$axios.post(
          '/community_address/addCommunity_Address',
          community_address
        )

        if (res.status !== 0) {
          this.$message.error('添加地址失败！')
        }
        this.addDialogVisible = false
        this.getInfoList()
      })
    },

    //修改地址信息的窗口展示
    async showEditDialog(e) {
      this.editDialogVisible = true
      this.editForm = e
    },

    // 监听修改地址对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },

    // 修改地址信息并提交
    async editAddress() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        // 发起修改地址信息的数据请求
        const community_address = this.editForm
        const { data: res } = await this.$axios.post(
          `/community_address/updateCommunity_Address`,
          community_address
        )

        if (res.status !== 0) {
          return this.$message.error('更新地址信息失败！')
        }
        this.editDialogVisible = false
        this.getInfoList()
      })
    },
    // 根据id删除对应的地址
    async removeInfoById(id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该地址, 是否继续?',
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
        const { data: res } = await this.$axios.post(
          '/community_address/deleteCommunity_Address' + '?id=' + id
        )
        if (res.status !== 0) {
          return this.$message.error('删除地址信息失败！')
        } else {
          this.getInfoList()
        }
      }
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getInfoList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.pageNum = newPage
      this.getInfoList()
    },
  },
}
</script>
<style lang="less" scoped>
.el-table {
  margin-top: 20px;
}
</style>