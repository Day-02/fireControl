<template>
  <div id="app">
    <div id="allmap" ref="allmap"></div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  //表格，动态数据
  name: 'App',
  data() {
    return {
      firehouseLatiList: [],
      firehouseLongiList: [],
      total: 0,
    }
  },
  created() {
    this.getFirehouseAdrList()
  },
  mounted() {},
  methods: {
    map() {
      let map = new BMapGL.Map(this.$refs.allmap) // 创建Map实例
      //东方明珠 经度121.506 纬度31.245
      var point = new BMapGL.Point(121.506, 31.245)
      map.centerAndZoom(point, 11)
      map.addControl(
        new BMapGL.MapTypeControl({
          // 添加地图类型控件
          mapTypes: [window.BMAP_NORMAL_MAP, window.BMAP_HYBRID_MAP],
        })
      )
      map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
      var marker = new BMapGL.Marker(point)
      map.addOverlay(marker)

      var points = []
      var markers = []

      for (var i = 0; i < this.total; i++) {
        points[i] = new BMapGL.Point(
          this.firehouseLongiList[i],
          this.firehouseLatiList[i]
        )
        markers[i] = new BMapGL.Marker(points[i])
        map.addOverlay(markers[i])
      }

      //标记的点击事件
      marker.addEventListener('click', function (e) {
        alert('标注')
        console.log(e)
      })
      //地图的点击事件
      map.addEventListener('click', function (e) {
        console.log(e)
      })
      // //添加标记
      // // 创建小车图标
      // var myIcon = new BMapGL.Icon(
      //   '/img/firehouse.png',
      //   new BMapGL.Size(100, 26)
      // )
      // // 创建Marker标注，使用小车图标
      // // var marker = new BMapGL.Marker(point, {
      // //   icon: myIcon,
      // // })
    },

    //获得消防站地址信息
    async getFirehouseAdrList() {
      const { data: res } = await this.$axios.post(
        '/firehouse/allFirehouse' + '?pageNum=1&pageSize=20'
      )
      if (res.code !== 200) {
        return this.$message.error('获取消防站信息失败！')
      }
      //获得消防站经度数据列表
      this.firehouseLongiList = res.data.map((item) => {
        return item.firehouse_longitude
      })
      //获得消防站纬度数据列表
      this.firehouseLatiList = res.data.map((item) => {
        return item.firehouse_latitude
      })

      this.total = res.total
      this.map()
    },
  },
}
</script>
<style lang="less" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#allmap {
  height: 500px;
  overflow: hidden;
}
</style>

