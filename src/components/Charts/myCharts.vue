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
      <el-card class="smallChartCard">
        <div id="resChart" style="width: 300px; height: 200px"></div>
      </el-card>
      <el-card class="smallChartCard">
        <div id="firewarningChart" style="width: 300px; height: 200px"></div>
      </el-card>
      <el-card class="adrChartCard">
        <div id="addressChart" style="width: 800px; height: 300px"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
// TODO:区的数据表格
//TODO:根据报警状态码查询报警信息
export default {
  data() {
    return {
      resTotal: 100,
      firewarnTotal: 100,
      addTotal: 100,
      onStatus: 0,
      offStatus: 0,
      residentList: [],
      firewarnNumList: [],
      addressList: [],
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
  created() {},
  mounted() {
    this.getAddressList()
    this.getFirewarningList()
    this.getResidentList()
  },
  methods: {
    //获得居民账号信息生成图表
    async getResidentList() {
      const { data: res } = await this.$axios.post(
        '/user/allUser' + '?pageNum=1' + '&pageSize=' + this.resTotal
      )
      if (res.code !== 200) {
        return this.$message.error('获取居民列表失败！')
      } else {
        this.residentList = res.data
        this.resTotal = res.total
      }
      this.residentList.forEach((item) => {
        if (item.resident_status === 0) this.offStatus++
        else this.onStatus++
      })
      this.initResStateCharts()
    },
    //生成居民账号状态信息图表
    initResStateCharts() {
      var resChart = echarts.init(document.getElementById('resChart'))
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
        color: ['#cbccce', '#b6ea7b'],
      }
      resChart.setOption(option)
    },
    //根据报警状态码查询报警信息
    async getFirewarningList() {
      var num = new Array(3).fill(0)
      for (var i = 0; i < 3; i++) {
        const { data: res } = await this.$axios.post(
          `/firewarning/FirewarningByStatus` +
            '?pageNum=1' +
            '&pageSize=' +
            this.firewarnTotal +
            '&status=' +
            i
        )
        num[i] = res.total
        this.firewarnNumList = num
      }
      this.initFirewarningCharts()
    },
    //生成报警状态码信息图表
    initFirewarningCharts() {
      var firewChart = echarts.init(document.getElementById('firewarningChart'))
      var option = {
        title: {
          text: '报警状态统计图',
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
      firewChart.setOption(option)
    },
    //获得地址信息
    async getAddressList() {
      const { data: res } = await this.$axios.post(
        '/community_address/allCommunity_Address' +
          '?pageNum=1' +
          '&pageSize=' +
          this.addTotal
      )
      if (res.code !== 200) {
        return this.message.error('获取地址信息列表失败！')
      }
      this.addressList = res.data
      this.addTotal = res.total

      var nums = new Array(16).fill(0)
      this.addressList.forEach((item) => {
        for (let i = 0; i < this.areas.length; i++) {
          if (item.area === this.areas[i]) nums[i]++
        }
      })
      this.nums = nums
      this.initAddressCharts()
    },
    //生成上海各区发生火警次数信息图表
    initAddressCharts() {
      var myChart
      if (myChart != null && myChart != '' && myChart != undefined) {
        myChart.dispose()
      }
      myChart = echarts.init(document.getElementById('addressChart'))
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
      myChart.setOption(option)
      // window.onresize = function () {
      //   this.adrChart.resize()
      // }
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
.smallChartCard {
  margin-right: 15px;
  display: inline-block;
}
.adrChartCard {
  width: 820px;
}
</style>