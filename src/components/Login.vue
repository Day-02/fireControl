<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="logo_box">
        <img src="../assets/biglogo.jpg" alt="" />
      </div>

      <div class="title">智慧社区消防应急综合服务平台</div>

      <!-- 输入表单 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        class="login_form"
        :rules="loginFormRules"
      >
        <!-- 用户名输入框 -->
        <el-form-item label="" prop="username">
          <!-- v-model="form.name".为每一个表单项绑定对应的数据 -->
          <el-input
            label="用户名"
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
          >
          </el-input>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item label="" prop="password">
          <el-input
            label="密码"
            type="password"
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
          >
          </el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="reset" @click="resetLoginFrom">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //登陆表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      //表单的验证规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  methods: {
    resetLoginFrom() {
      //resetFields()是在el-form中定义好的,this.$refs.loginFormRef是表单的实例对象,调用它的方法
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$router.push('/home')
    },
  },
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #e9edf1;
  height: 100%;
}

.login_box {
  position: absolute;
  top: 150px;
  left: 400px;
  width: 500px;
  height: 345px;
  background-color: #b12412;
  border-radius: 3px;
}

.logo_box {
  position: absolute;
  left: calc(50% - 65px);
  top: -65px;
  padding: 10px;
  width: 130px;
  height: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 0 10px #ddd; //加阴影
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.title {
  position: absolute;
  width: 100%;
  margin-top: 101px;
  font-size: 25px;
  color: #eee;
  text-align: center;
}

.login_form {
  position: absolute;
  bottom: 0;
  margin: 0 15px;
  width: 90%;
}
.btns {
  float: right;
}
</style>