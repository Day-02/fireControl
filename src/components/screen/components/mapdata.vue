<template>
  <div class="com-container">
    <div class="com-chart" ref="map_ref" id="mapdata"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'
export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
    }
  },
  mounted() {
    this.initChart()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  methods: {
    async initChart() {
      this.chartInstance = echarts.init(document.getElementById('mapdata'))
      //不能用this.$axios，因为配备好了基地址。先import axios
      const { data: res } = await axios.get(
        'http://localhost:8080/static/map/china.json'
      )
      echarts.registerMap('china', res)
      const initOption = {
        title: {
          text: '实时地图',
          left: 20,
          top: 20,
          textStyle: {
            color: '#fff',
            fontSize: 30,
          },
        },
        geo: {
          type: 'map',
          map: 'china',
          top: '5%',
          bottom: '5%',
          itemStyle: {
            areaColor: 'rgba(255,255,255,.7)',
            borderColor: '#333',
          },
        },
        legend: {
          left: '5%',
          bottom: '5%',
          orient: 'vertical',
        },
      }
      this.chartInstance.setOption(initOption)
    },
    async getData() {
      //await this.$axios.get()
      // 对allData赋值
      const res = await this.$axios.get('/map/dataList/')
      this.allData = res.data
      console.log(this.allData)
      this.updateChart()
    },
    updateChart() {
      const legendArr = this.allData.map((item) => {
        return item.id
      })
      const seriesArr = this.allData.map((item) => {
        return {
          type: 'scatter',
          name: item.id,
          data: item.value,
          coordinateSystem: 'geo',
        }
      })
      const updateOption = {
        legend: {
          data: legendArr,
        },
        series: seriesArr,
      }
      this.chartInstance.setOption(updateOption)
    },
    screenAdapter() {
      const titleFontSize = (this.$refs.map_ref.offsetWidth / 100) * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
        legend: {
          itemWidth: titleFontSize / 2,
          itemHeight: titleFontSize / 2,
          itemGap: titleFontSize / 2,
          textStyle: {
            fontSize: titleFontSize / 2,
          },
        },
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },
  },
}
</script>

<style lang="less" scoped>
</style>