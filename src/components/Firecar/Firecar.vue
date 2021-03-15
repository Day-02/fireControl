<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>消防车信息</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <el-row :gutter="20"
        ><el-col :span="8">
          <el-input
            placeholder="请输入消防车编号进行查询"
            v-model="queryInfo.query"
            clearable
            @clear="getInfoList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="FindFirecarByNum(queryInfo.query)"
            ></el-button> </el-input></el-col
        ><el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加消防车</el-button
          >
        </el-col></el-row
      >

      <!-- 表格区域 -->
      <el-table :data="infoList" style="width: 100%" border stripe>
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="firecar_num" label="消防车编号" width="180">
        </el-table-column
        ><el-table-column
          prop="firecar_belong_firehouse"
          label="所属消防站"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="firecar_status" label="消防车状态" width="110">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row === null"></el-tag>
            <el-tag type="success" v-else-if="scope.row.firecar_status === 0"
              >空闲</el-tag
            >
            <el-tag type="warning" v-else-if="scope.row.firecar_status === 1"
              >出警</el-tag
            >
            <el-tag v-else>维护</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="apartment" label="火灾小区地点">
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
              @click="removeInfoByNum(scope.row.firecar_num)"
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

    <!-- 添加消防车的对话框 -->
    <el-dialog
      title="添加消防车"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="addForm"
        :rules="editFormRules"
        ref="addFormRef"
        label-width="130px"
      >
        <el-form-item label="消防车编号" prop="firecar_num">
          <el-input v-model="addForm.firecar_num"></el-input>
        </el-form-item>
        <el-form-item label="所属消防站" prop="firecar_belong_firehouse">
          <el-input
            v-model="addForm.firecar_belong_firehouse"
          ></el-input> </el-form-item
        ><el-form-item label="消防车状态" prop="firecar_status">
          <el-input v-model="addForm.firecar_status"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFirecar">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改消防车信息的对话框 -->
    <el-dialog
      title="修改消防车信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form
        ref="editFormRef"
        :rules="editFormRules"
        :model="editForm"
        label-width="130px"
      >
        <el-form-item label="消防车编号" prop="firecar_num">
          <el-input
            v-model="editForm.firecar_num"
            disabled
          ></el-input> </el-form-item
        ><el-form-item label="所属消防站" prop="firecar_belong_firehouse">
          <el-input
            v-model="editForm.firecar_belong_firehouse"
          ></el-input> </el-form-item
        ><el-form-item label="消防车状态" prop="firecar_status">
          <el-input v-model="editForm.firecar_status"></el-input> </el-form-item
      ></el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editFirecarInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// TODO:查(完善)
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
        firecar_num: '',
        firecar_belong_firehouse: '',
        firecar_status: '',
      },
      addFormRules: {},
      editDialogVisible: false,
      editForm: {},
      editFormRules: {
        firecar_num: [
          {
            required: true,
            message: '请输入消防车编号',
            trigger: 'blur',
          },
        ],
        firecar_belong_firehouse: [
          {
            required: true,
            message: '请输入消防车所属消防站编号，消防站编号需已存储',
            trigger: 'blur',
          },
        ],
        firecar_status: [
          {
            required: true,
            message: '请输入消防车状态（0空闲/1出警/2维护）',
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
    //获得消防车信息
    async getInfoList() {
      const { data: res } = await this.$axios.post(
        '/firecar/allFirecar' +
          '?pageNum=' +
          this.queryInfo.pageNum +
          '&pageSize=' +
          this.queryInfo.pageSize
      )
      if (res.code !== 200) {
        return this.$message.error('获取消防车信息列表失败！')
      }
      this.infoList = res.data
      this.total = res.total
    },
    //FIXME:查询不到时，返回空表格
    //根据编号查询消防车
    async FindFirecarByNum(num) {
      if (num === '') {
        this.getInfoList()
      } else {
        const { data: res } = await this.$axios.post(
          `/firecar/FindFirecarByNum?Firecar_num=` + num
        )
        if (res.status !== 0) {
          {
            this.$message.error('查询消防车失败！')
          }
        }
        const findList = []
        findList[0] = res.data
        this.infoList = findList
      }
    },

    // 监听添加消防车对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 点击按钮，添加新消防车
    addFirecar() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        const firecar = this.addForm
        // 可以发起添加消防车的网络请求
        const { data: res } = await this.$axios.post(
          '/firecar/addFirecar',
          firecar
        )

        if (res.status !== 0) {
          this.$message.error('添加消防车失败！')
        }
        this.addDialogVisible = false
        this.getInfoList()
      })
    },
    //修改消防车信息的窗口展示
    async showEditDialog(e) {
      this.editDialogVisible = true
      this.editForm = e
    },

    // 监听修改消防车对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },

    // 修改消防车信息并提交
    async editFirecarInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        // 发起修改消防车信息的数据请求
        const firecar = this.editForm
        const { data: res } = await this.$axios.post(
          `/firecar/updateFirecar`,
          firecar
        )

        if (res.status !== 0) {
          return this.$message.error('更新消防车信息失败！')
        }
        // 关闭对话框
        this.editDialogVisible = false
        // 刷新数据列表
        this.getInfoList()
        // 提示修改成功
      })
    },

    // 根据num删除对应的消防车
    async removeInfoByNum(num) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该消防车, 是否继续?',
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
          '/firecar/deleteFirecar' + '?Firecar_num=' + num
        )
        if (res.status !== 0) {
          return this.$message.error('删除消防车信息失败！')
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