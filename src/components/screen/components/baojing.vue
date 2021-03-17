<template>
  <div class="com-container">
    <div class="com-chart" ref="baojing_ref" id="baojing"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
      chartInstance: null,
      firewarnNumList: [],
    }
  },
  mounted() {
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },

  methods: {
    initChart() {
      this.chartInstance = echarts.init(document.getElementById('baojing'))
      const initOption = {
        title: {
          text: '报警状态统计图',
          left: 'center',
          textStyle: {
            color: '#ccc',
            fontSize: 12,
          },
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: '5%',
          bottom: '5%',
          textStyle: {
            color: '#ccc',
            fontSize: 6,
          },
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '60%',
            top: '7%',
            data: [
              { value: this.firewarnNumList[0], name: '未接警' },
              { value: this.firewarnNumList[1], name: '接警处理中' },
              { value: this.firewarnNumList[2], name: '处理完毕' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
        color: ['#e70012', '#ff8130', '#b6ea7b'],
      }
      this.chartInstance.setOption(initOption)
    },

    async getData() {
      var num = new Array(3).fill(0)
      for (var i = 0; i < 3; i++) {
        const { data: res } = await this.$axios.post(
          `/firewarning/FirewarningByStatus` +
            '?pageNum=1' +
            '&pageSize=100' +
            '&status=' +
            i
        )
        num[i] = res.total
        this.firewarnNumList = num
      }
      this.initChart()
      this.updataChart()
    },

    updataChart() {
      const updateChart = {}
      this.chartInstance.setOption(updateChart)
    },
    screenAdapter() {
      const titleFontSize = (this.$refs.baojing_ref.offsetWidth / 100) * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize / 1.5,
          },
        },
        legend: {
          itemWidth: titleFontSize / 2,
          itemHeight: titleFontSize / 2,
          itemGap: titleFontSize / 2,
          textStyle: {
            fontSize: titleFontSize / 3,
          },
        },
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },
  },
}
</script>

<style>
</style>