<template>
  <div class="com-container">
    <div class="com-chart" ref="chujing_ref" id="chujing"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
      chartInstance: null,
      areas: [
        '黄浦区',
        '徐汇区',
        '长宁区',
        '静安区',
        '普陀区',
        '虹口区',
        '杨浦区',
        '浦东新区',
        '闵行区',
        '宝山区',
        '嘉定区',
        '金山区',
        '松江区',
        '青浦区',
        '奉贤区',
        '崇明区',
      ],
      nums: [2, 3, 4, 6, 1, 2, 0, 0, 8, 4, 1, 4, 2, 3, 0, 2],
    }
  },
  mounted() {
    this.initChart()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },

  methods: {
    initChart() {
      this.chartInstance = echarts.init(document.getElementById('chujing'))
      const initOption = {
        title: {
          text: '按区统计出警信息',
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
          top: '5%',
          textStyle: {
            color: '#ccc',
            fontSize: 16,
          },
        },
        series: [
          {
            type: 'pie',
            radius: '70%',
            data: [
              { value: 2, name: '黄浦区' },
              { value: 4, name: '徐汇区' },
              { value: 6, name: '长宁区' },
              { value: 2, name: '静安区' },
              { value: 7, name: '普陀区' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
              label: {
                fontSize: 20,
              },
            },
          },
        ],
      }
      this.chartInstance.setOption(initOption)
    },
    getData() {
      this.updataChart()
    },
    updataChart() {
      const updateChart = {}
      this.chartInstance.setOption(updateChart)
    },
    screenAdapter() {
      const titleFontSize = (this.$refs.chujing_ref.offsetWidth / 100) * 3.6
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