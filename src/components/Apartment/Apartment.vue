<template>
  <!-- 社区管理 -->
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>社区管理</el-breadcrumb-item>
      <el-breadcrumb-item>社区信息</el-breadcrumb-item>
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
            >添加社区</el-button
          >
        </el-col></el-row
      >
      <!-- 表格区域 -->
      <el-table :data="infoList" style="width: 100%" border stripe>
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="community_num" label="社区编号">
        </el-table-column>
        <el-table-column
          prop="community_belong_firehousenum"
          label="该社区绑定的消防站"
          width="180"
        >
        </el-table-column
        ><el-table-column prop="community_address_id" label="社区所属地址ID">
        </el-table-column
        ><el-table-column prop="community_name" label="社区名称">
        </el-table-column>

        <el-table-column prop="community_longitude" label="社区经度">
        </el-table-column>
        <el-table-column prop="community_latitude" label="社区纬度">
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
              @click="removeInfoByNum(scope.row.community_num)"
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

    <!-- 添加社区的对话框 -->
    <el-dialog
      title="添加社区"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="addForm"
        :rules="editFormRules"
        ref="addFormRef"
        label-width="150px"
      >
        <el-form-item label="社区编号" prop="community_num">
          <el-input v-model="addForm.community_num"></el-input>
        </el-form-item>
        <el-form-item
          label="该社区绑定的消防站"
          prop="community_belong_firehousenum"
        >
          <el-input
            v-model="addForm.community_belong_firehousenum"
          ></el-input> </el-form-item
        ><el-form-item label="社区所属地址ID" prop="community_address_id">
          <el-input
            v-model="addForm.community_address_id"
          ></el-input> </el-form-item
        ><el-form-item label="社区名称" prop="community_name">
          <el-input v-model="addForm.community_name"></el-input> </el-form-item
        ><el-form-item label="社区经度" prop="community_longitude">
          <el-input
            v-model="addForm.community_longitude"
          ></el-input> </el-form-item
        ><el-form-item label="社区纬度" prop="community_latitude">
          <el-input v-model="addForm.community_latitude"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addApartmentInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改信息的对话框 -->
    <el-dialog
      title="修改社区信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form
        ref="editFormRef"
        :rules="editFormRules"
        :model="editForm"
        label-width="150px"
      >
        <el-form-item label="社区编号" prop="community_num">
          <el-input
            v-model="editForm.community_num"
            disabled
          ></el-input> </el-form-item
        ><el-form-item
          label="该社区绑定的消防站"
          prop="community_belong_firehousenum"
        >
          <el-input v-model="editForm.community_belong_firehousenum"></el-input>
        </el-form-item>
        <el-form-item label="社区所属地址ID" prop="community_address_id">
          <el-input
            v-model="editForm.community_address_id"
          ></el-input> </el-form-item
        ><el-form-item label="社区名称" prop="community_name">
          <el-input v-model="editForm.community_name"></el-input> </el-form-item
        ><el-form-item label="社区经度" prop="community_longitude">
          <el-input
            v-model="editForm.community_longitude"
          ></el-input> </el-form-item
        ><el-form-item label="社区纬度" prop="community_latitude">
          <el-input
            v-model="editForm.community_latitude"
          ></el-input> </el-form-item
      ></el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editApartmentInfo">确 定</el-button>
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
      addForm: {
        community_belong_firehousenum: '',
        community_address_id: '',
        community_name: '',
        community_num: '',
        community_longitude: '',
        community_latitude: '',
      },
      addFormRules: {},
      addDialogVisible: false,
      editDialogVisible: false,
      editForm: {},
      editFormRules: {
        community_num: [
          {
            required: true,
            message: '请输入社区编号，编号不允许重复',
            trigger: 'blur',
          },
        ],
        community_belong_firehousenum: [
          {
            required: true,
            message: '请输入该社区绑定的消防站，消防站编号需已存储',
            trigger: 'blur',
          },
        ],
        community_address_id: [
          {
            required: true,
            message: '请输入社区所属地址ID，地址ID需已存储',
            trigger: 'blur',
          },
        ],
        community_name: [
          { required: true, message: '请输入社区名称', trigger: 'blur' },
        ],

        community_longitude: [
          { required: true, message: '请输入社区经度', trigger: 'blur' },
        ],
        community_latitude: [
          { required: true, message: '请输入社区纬度', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.getInfoList()
  },
  methods: {
    //查询社区信息
    async getInfoList() {
      const { data: res } = await this.$axios.post(
        '/community/allCommunity' +
          '?pageNum=' +
          this.queryInfo.pageNum +
          '&pageSize=' +
          this.queryInfo.pageSize
      )
      if (res.code !== 200) {
        return this.$message.error('获取社区信息失败！')
      }
      this.infoList = res.data
      this.total = res.total
    },
    // 监听添加社区对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 点击按钮，添加新社区
    addApartmentInfo() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        const community = this.addForm
        console.log(community)
        // 可以发起添加社区的网络请求
        const { data: res } = await this.$axios.post(
          '/community/addCommunity',
          community
        )

        // if (res.status !== 0) {
        //   this.$message.error('添加社区失败！')
        // }
        console.log(res)
        this.addDialogVisible = false
        this.getInfoList()
      })
    },

    //修改社区信息的窗口展示
    async showEditDialog(e) {
      this.editDialogVisible = true
      this.editForm = e
    },

    // 监听修改社区信息对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },

    // 修改社区信息并提交
    async editApartmentInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        // 发起修改社区信息的数据请求
        const community = this.editForm
        console.log(this.editForm)
        const { data: res } = await this.$axios.post(
          `/community/updateCommunity`,
          community
        )

        if (res.status !== 0) {
          return this.$message.error('更新社区信息失败！')
        }
        // 关闭对话框
        this.editDialogVisible = false
        // 刷新数据列表
        this.getInfoList()
      })
    },

    // 根据num删除对应的社区
    async removeInfoByNum(num) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该社区, 是否继续?',
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
          '/community/deleteCommunity' + '?community_num=' + num
        )
        if (res.status !== 0) {
          return this.$message.error('删除社区信息失败！')
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
      this.queryInfo.pageNum = newPage
      this.getInfoList()
    },
  },
}
</script>
<style lang="less" scoped>
</style>