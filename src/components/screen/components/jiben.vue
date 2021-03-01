<template>
  <div class="com-container">
    <div class="com-chart" ref="jiben_ref" id="jiben">
      <ul v-for="item in chartData" :key="item.name">
        <li>
          <span class="data_name">{{ item.name }}</span>
          <span class="data_num">{{ item.num }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chartInstance: null,
      chartData: [
        { name: '消防车数量', num: 26 },
        { name: '消防站服务人员数量', num: 100 },
        { name: '覆盖小区个数', num: 52 },
        { name: '服务人群数量', num: 32000 },
        { name: '救援请求数', num: 27 },
        { name: '出警次数', num: 21 },
      ],
    }
  },
  mounted() {
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  methods: {
    screenAdapter() {
      const titleFontSize = (this.$refs.jiben_ref.offsetWidth / 100) * 3.6
      var jiben = document.getElementById('jiben')
      jiben.style.fontSize = titleFontSize + 'px'
    },
  },
}
</script>
<style lang="less" scoped>
.data_name {
  color: #14b9bb;
}
.data_num {
  color: #fff;
  margin-left: 5px;
}
</style>