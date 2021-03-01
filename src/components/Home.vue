<template>
  <el-container class="main-comtainer">
    <!-- 头部区域 -->
    <el-header>
      <span class="img"><img src="../assets/logo.jpg" /></span>
      <span class="title">智慧社区消防应急综合服务平台</span
      ><el-button class="quit" @click="quit">退出</el-button>
    </el-header>
    <!-- 主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px"
        ><el-menu default-active="2" class="el-menu-vertical-demo" router>
          <el-menu-item index="/screen">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据大屏</span>
          </el-menu-item>
          <el-menu-item index="/address">
            <i class="el-icon-map-location"></i>
            <span slot="title">地址信息</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/user">用户管理</el-menu-item>
              <el-menu-item index="/role">角色管理</el-menu-item>
              <el-menu-item index="/power">权限管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="/resident">
            <i class="el-icon-school"></i>
            <span slot="title">居民管理</span>
          </el-menu-item>
          <el-menu-item index="/apartment">
            <i class="el-icon-office-building"></i>
            <span slot="title">社区管理</span>
          </el-menu-item>
          <el-menu-item index="/station">
            <i class="el-icon-help"></i>
            <span slot="title">消防站管理</span> </el-menu-item
          ><el-menu-item index="/firecar">
            <i class="el-icon-truck"></i>
            <span slot="title">消防车管理</span>
          </el-menu-item>
          <el-menu-item index="/fireman">
            <i class="el-icon-user"></i>
            <span slot="title">消防员管理</span>
          </el-menu-item>
          <el-menu-item index="/call">
            <i class="el-icon-phone-outline"></i>
            <span slot="title">报警管理</span>
          </el-menu-item>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>信息管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/firewarning">居民报警信息</el-menu-item>
              <el-menu-item index="/appraise">用户评价信息</el-menu-item>
              <el-menu-item index="/feedback">报警反馈信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/mycharts">
            <i class="el-icon-data-line"></i>
            <span slot="title">数据统计</span>
          </el-menu-item>
        </el-menu></el-aside
      >
      <!-- 页面主部分 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  methods: {
    quit() {
      this.$router.push('/login')
    },
  },
}
</script>
<style lang="less" scoped>
.main-comtainer {
  height: 100%;
}
.el-header {
  background-color: #b12412;
  height: 80px !important;
  line-height: 40px;
  align-items: center;
}
.el-header .img {
  float: left;
  margin-top: 2px;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-color: #fff;
}
.el-header img {
  float: left;
  margin: 2px 0 0 3px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.el-header .title {
  float: left;
  color: white;
  font-size: 30px;
  margin-top: 20px;
  margin-left: 10px;
}
.quit {
  float: right;
  width: 90px;
  height: 50px;
  margin: 15px;
  font-size: 24px;
  color: #fff;
  border: none;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.29);
}
.el-aside {
  background-color: #b12412;
}
.el-main {
  background-color: #e9edf1;
}
</style>