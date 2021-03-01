import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import './assets/css/global.css'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

import {
  Button, Form, FormItem, Input, Container, Message,
  Header, Aside, Main, Menu, Submenu, MenuItem, MenuItemGroup, Breadcrumb,
  BreadcrumbItem, Card, Row, Col, Table, TableColumn, Pagination,
  Dialog, Alert, Tabs, TabPane, Cascader, Tag, Tree, Switch, MessageBox
} from 'element-ui'

Vue.config.productionTip = false
/* 引入mock数据文件 */
import './mock/mock.js'

//配置请求的根路径
axios.defaults.baseURL = 'http://106.14.93.164:8090'
Vue.prototype.$axios = axios
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Alert)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Cascader)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Switch)

//注册全局过滤器,格式化时间
Vue.filter('dateFormat', function (originVal) {

  // return originVal + 123
  const dateNum = parseInt(originVal)
  const date = new Date(dateNum)//根据给定的时间（毫秒数）得到一个时间对象
  const y = date.getFullYear()
  const m = (date.getMonth() + 1 + '').padStart(2, '0')//getMonth为从0开始，padstart为字符填充
  const d = (date.getDate() + '').padStart(2, '0')
  const hh = (date.getHours() + '').padStart(2, '0')
  const mm = (date.getMinutes() + '').padStart(2, '0')
  const ss = (date.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
var hub=new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
