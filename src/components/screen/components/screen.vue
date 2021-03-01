<template>
  <div class="com-page">
    <!-- 头部 -->
    <div class="header">
      <h1>智慧消防数据大屏</h1>
    </div>
    <div class="mainbox">
      <!-- 左侧容器 -->
      <div class="column">
        <!-- 左侧容器—单独一个 -->
        <div class="panel jiben">
          <jiben class="chart"></jiben>
        </div>
        <div class="panel chujing">
          <chujing class="chart"></chujing>
        </div>
        <div class="panel jiben"></div>
      </div>
      <!-- 中间容器 -->
      <div class="column">
        <div class="panel map">
          <mapdata></mapdata>
        </div>
        <div class="panel"></div>
      </div>
      <!-- 右侧容器 -->
      <div class="column">
        <!-- 右侧容器—单独一个 -->
        <div class="panel jiben"></div>
        <div class="panel chujing"></div>
        <div class="panel jiben"></div>
      </div>
    </div>
  </div>
</template>

<script>
import jiben from '../components/jiben.vue'
import chujing from '../components/chujing.vue'
import mapdata from '../components/mapdata.vue'
export default {
  components: {
    jiben,
    chujing,
    mapdata,
  },
}
</script>

<style lang="less" scoped>
@import '../css/screenstyle.css';
</style>