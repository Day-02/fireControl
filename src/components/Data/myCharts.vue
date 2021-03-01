<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <div class="charts">
      <el-card class="resChartCard">
        <div id="resChart" style="width: 300px; height: 200px"></div>
      </el-card>
      <el-card class="adrChartCard">
        <div id="addressChart" style="width: 800px; height: 300px"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import resident from '../Resident/Resident.vue'

export default {
  components: { resident },

  data() {
    return {
      onStatus: 0,
      offStatus: 0,
      residentList: [],
      resChart: null,
      addressList: [],
      adrChart: null,
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
      nums: [],
    }
  },
  created() {
    this.getAddressList()
    this.getResidentList()
  },
  mounted() {},
  methods: {
    //获得居民账号信息生成图表
    async getResidentList() {
      const { data: res } = await this.$axios.post(`/user/allUser`)
      if (res.status !== 0) {
        return this.$message.error('获取居民列表失败！')
      } else {
        this.residentList = res.data
      }
      this.residentList.forEach((item) => {
        if (item.resident_status === 0) this.offStatus++
        else this.onStatus++
      })
      this.initResStateCharts()
    },
    //生成居民账号状态信息图表
    initResStateCharts() {
      this.resChart = echarts.init(document.getElementById('resChart'))
      var option = {
        title: {
          text: '居民账号状态统计图',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          bottom: '2%',
          left: '2%',
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '60%',
            top: '7%',
            data: [
              { value: this.offStatus, name: '被拉黑账号' },
              { value: this.onStatus, name: '正常账号' },
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
      }
      this.resChart.setOption(option)
      window.addEventListener('resize', function () {
        this.resChart.resize()
      })
    },
    //获得地址信息
    async getAddressList() {
      const { data: res } = await this.$axios.post('/address/allAddress')
      if (res.status !== 0) {
        return this.message.error('获取地址信息列表失败！')
      }
      this.addressList = res.data

      var nums = new Array(16).fill(0)
      this.addressList.forEach((item) => {
        for (let i = 0; i < this.areas.length; i++) {
          if (item.area === this.areas[i]) nums[i]++
        }
      })
      this.nums = nums
      this.initAddressCharts()
    },
    //生成火警信息图表
    initAddressCharts() {
      this.adrChart = echarts.init(document.getElementById('addressChart'))
      var option = {
        title: {
          text: '上海各区发生火警次数统计图',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        grid: {
          left: '3%',
        },
        xAxis: {
          type: 'category',
          data: this.areas,
          nameTextStyle: {
            fontSize: 20,
          },
          axisLabel: {
            fontSize: '12',
            interval: 0,
          },
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: this.nums,
            type: 'bar',
            barWidth: 20,
            itemStyle: {
              color: 'rgb(177,36,100)',
              borderRadius: [5, 5, 0, 0],
            },
          },
        ],
      }
      this.adrChart.setOption(option)
      window.onresize = function () {
        this.adrChart.resize()
      }
    },
  },
}
</script>
<style>
.el-card {
  margin-top: 10px;
}
.el-card__body {
  padding: 10px;
}
.resChartCard {
  margin-right: 15px;
  display: inline-block;
}
.adrChartCard {
  width: 820px;
}
</style>