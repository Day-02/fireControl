<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>消防站信息</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <el-row :gutter="20"
        ><el-col :span="8">
          <el-input
            placeholder="请输入消防站编号进行查询"
            v-model="queryInfo.query"
            clearable
            @clear="getInfoList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="FindFirehouseByNum(queryInfo.query)"
            ></el-button> </el-input
        ></el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加消防站</el-button
          >
        </el-col></el-row
      >

      <!-- 表格区域 -->
      <el-table :data="infoList" style="width: 100%" border stripe>
        <el-table-column type="index"> </el-table-column
        ><el-table-column prop="firehouse_num" label="消防站编号" width="120">
        </el-table-column
        ><el-table-column prop="firehouse_name" label="消防站名称" width="120">
        </el-table-column>
        <el-table-column
          prop="firehouse_address"
          label="消防站地址"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="firehouse_firecar_number"
          label="消防站车辆数"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="firehouse_fireman_number"
          label="消防站消防员数"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="firehouse_longitude"
          label="消防站经度"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="firehouse_latitude"
          label="消防站纬度"
          width="120"
        >
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
              @click="removeInfoByNum(scope.row.firehouse_num)"
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

    <!-- 添加消防站的对话框 -->
    <el-dialog
      title="添加消防站"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="addForm"
        :rules="editFormRules"
        ref="addFormRef"
        label-width="125px"
        ><el-form-item label="消防站编号" prop="firehouse_num">
          <el-input v-model="addForm.firehouse_num"></el-input> </el-form-item
        ><el-form-item label="消防站名称" prop="firehouse_name">
          <el-input v-model="addForm.firehouse_name"></el-input>
        </el-form-item>
        <el-form-item label="消防站地址" prop="firehouse_address">
          <el-input
            v-model="addForm.firehouse_address"
          ></el-input> </el-form-item
        ><el-form-item label="消防站车辆数" prop="firehouse_firecar_number">
          <el-input
            v-model="addForm.firehouse_firecar_number"
          ></el-input> </el-form-item
        ><el-form-item label="消防站消防员数" prop="firehouse_fireman_number">
          <el-input v-model="addForm.firehouse_fireman_number"></el-input>
        </el-form-item>
        <el-form-item label="消防站经度" prop="firehouse_longitude">
          <el-input
            v-model="addForm.firehouse_longitude"
          ></el-input> </el-form-item
        ><el-form-item label="消防站纬度" prop="firehouse_latitude">
          <el-input v-model="addForm.firehouse_latitude"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addHouse">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改消防站信息的对话框 -->
    <el-dialog
      title="修改消防站信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form
        ref="editFormRef"
        :rules="editFormRules"
        :model="editForm"
        label-width="125px"
      >
        <el-form-item label="消防站编号" prop="firehouse_num">
          <el-input
            v-model="editForm.firehouse_num"
            disabled
          ></el-input> </el-form-item
        ><el-form-item label="消防站名称" prop="firehouse_name">
          <el-input v-model="editForm.firehouse_name"></el-input>
        </el-form-item>
        <el-form-item label="消防站地址" prop="firehouse_address">
          <el-input
            v-model="editForm.firehouse_address"
          ></el-input> </el-form-item
        ><el-form-item label="消防站车辆数" prop="firehouse_firecar_number">
          <el-input
            v-model="editForm.firehouse_firecar_number"
          ></el-input> </el-form-item
        ><el-form-item label="消防站消防员数" prop="firehouse_fireman_number">
          <el-input
            v-model="editForm.firehouse_fireman_number"
          ></el-input> </el-form-item
        ><el-form-item label="消防站经度" prop="firehouse_longitude">
          <el-input v-model="editForm.firehouse_longitude"></el-input>
        </el-form-item>
        <el-form-item label="消防站纬度" prop="firehouse_latitude">
          <el-input v-model="editForm.firehouse_latitude"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editHouseInfo">确 定</el-button>
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
        firehouse_num: '',
        firehouse_name: '',
        firehouse_address: '',
        firehouse_firecar_number: '',
        firehouse_fireman_number: '',
        firehouse_longitude: '',
        firehouse_latitude: '',
      },
      addFormRules: {},
      editDialogVisible: false,
      editForm: {},
      editFormRules: {
        firehouse_num: [
          {
            required: true,
            message: '请输入消防站编号，编号不允许重复',
            trigger: 'blur',
          },
        ],
        firehouse_name: [
          { required: true, message: '请输入消防站名称', trigger: 'blur' },
        ],
        firehouse_address: [
          { required: true, message: '请输入消防站地址', trigger: 'blur' },
        ],
        firehouse_firecar_number: [
          {
            required: true,
            message: '请输入消防站车辆数',
            trigger: 'blur',
          },
        ],
        firehouse_fireman_number: [
          {
            required: true,
            message: '请输入消防站消防员数',
            trigger: 'blur',
          },
        ],
        firehouse_longitude: [
          {
            required: true,
            message: '请输入消防站经度',
            trigger: 'blur',
          },
        ],
        firehouse_latitude: [
          {
            required: true,
            message: '请输入消防站纬度',
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
    //查询消防站信息
    async getInfoList() {
      const { data: res } = await this.$axios.post(
        '/firehouse/allFirehouse' +
          '?pageNum=' +
          this.queryInfo.pageNum +
          '&pageSize=' +
          this.queryInfo.pageSize
      )
      if (res.code !== 200) {
        return this.$message.error('获取消防站信息失败！')
      }
      this.infoList = res.data
      this.total = res.total
    },
    //根据编号查询消防站
    async FindFirehouseByNum(num) {
      if (num === '') {
        this.getInfoList()
      } else {
        const { data: res } = await this.$axios.post(
          `/firehouse/FindFirehouseByNum?Firehouse_num=` + num
        )
        if (res.status !== 0) {
          {
            this.$message.error('查询消防站失败！')
          }
        }
        console.log(res)
        const findList = []
        findList[0] = res.data
        this.infoList = findList
      }
    },
    // 监听添加消防站对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 点击按钮，添加新消防站
    addHouse() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        const firehouse = this.addForm
        // 可以发起添加消防站的网络请求
        const { data: res } = await this.$axios.post(
          '/firehouse/addFirehouse',
          firehouse
        )

        if (res.status !== 0) {
          this.$message.error('添加消防站失败！')
        }

        this.addDialogVisible = false
        this.getInfoList()
      })
    },

    //修改消防站信息的窗口展示
    async showEditDialog(e) {
      this.editDialogVisible = true
      this.editForm = e
    },

    // 监听修改消防站对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },

    // 修改消防站信息并提交
    async editHouseInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        // 发起修改消防站信息的数据请求
        const firehouse = this.editForm
        const { data: res } = await this.$axios.post(
          `/firehouse/updateFirehouse`,
          firehouse
        )

        if (res.status !== 0) {
          return this.$message.error('更新消防站信息失败！')
        }
        // 关闭对话框
        this.editDialogVisible = false
        // 刷新数据列表
        this.getInfoList()
        // 提示修改成功
      })
    },

    // 根据num删除对应的消防站
    async removeInfoByNum(num) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该消防站, 是否继续?',
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
          '/firehouse/deleteFirehouse' + '?Firehouse_num=' + num
        )
        if (res.status !== 0) {
          return this.$message.error('删除消防站信息失败！')
        } else {
          this.$message.success('删除消防站信息成功！')
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
</style>