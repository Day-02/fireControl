// index。js  文件   》》》在终端输入 node  index  就可以运行查看了
// const { random } = require("core-js/fn/number");
const Mock = require("mockjs"); //引入
const url = require("url")
// const Random = Mock.Random

/*

mock.mock()
参数1：请求地址 选填  url
参数2: 请求类型 选填  type
参数3：数据模板 | 函数    
*/

//居民信息
var resident = Mock.mock({
  "data|10": [
    {
      "id|+1": 0,   //初始值是0每次id都+1
      "res_Name": "@cname",
      "tel": /^1(3|5|7|8|9)\d{9}$/,
      "apartment": "@ctitle(5)",
      "address": "@county(true)",
      "report-count|1-10": 1,
      "state": "@boolean"
    }
  ]
})
Mock.mock(/\menu\/resList/, "get", function (options) {
  return resident.data
})

//报警管理-火警信息
var call = Mock.mock({
  "data|10": [   //意思是data数组中有100条数据
    {  //这个对象是用来写数据模板的
      "id|+1": 100,
      "number": /\d{9}$/,
      "location": "@county(true)",
      "state": "@boolean",
      "time": /^(1)\d{9}$/,
      "res_Name": "@cname",
      "tel": /^1(3|5|7|8|9)\d{9}$/,
    }
  ]
})
Mock.mock(/\menu\/callList/, "get", function (options) {
  return call.data
})

//信息管理-接警推送信息
var info = Mock.mock({
  "data|10": [   //意思是data数组中有100条数据
    {  //这个对象是用来写数据模板的
      "id|+1": 1000,
      "number": /\d{9}$/,
      "name": "@ctitle(5)",
      "carNumber": /\d{5}$/,
      "count|5-10": 5,
      "apartment": "@county(true)",
      "time": /^(1)\d{9}$/,
    }
  ]
})

Mock.mock(/\menu\/infoList/, "get", function (options) {
  return info.data
})

var goods = Mock.mock({
  "data|10": [{
    "id|+1": 0,
    "goodsName": "@ctitle(10,15)",
    "goodsPrice|0-500": 1,
    "goodsWeight|100-200": 1,
    "time": /^(1)\d{9}$/,
    // "date": Random.date('yyyy-MM-dd')
  }]
})

var catelist = Mock.mock({
  "data|5": [{
    "cat_id|+1": 0,
    "cat_name": "@ctitle(3,5)"
  }]
})
Mock.mock(/\user\/userList/, "get", function (options) {
  let { limit, page } = url.parse(options.url, true).query;//要传递的参数 解构赋值，结合上面看就懂了
  // return data.data.slice(0,4);//获取0-4条的数据，在app.vue 中可以打印查看
  return users.data.slice((page - 1) * limit, (limit * page))  //data.data是上面的数据，这里获取的是
})

Mock.mock(/\user\/userList\/adduser/, "post", function (options) {
  let { username, password, email, mobile } = url.parse(options.url, true).query;
  return { username, password, email, mobile }
})

Mock.mock(/\user\/userList\/\:id/, "put", function (options) {
  let { email, mobile } = url.parse(options.url, true).query;//要传递的参数 解构赋值，结合上面看就懂了
  return { email, mobile }
})

Mock.mock(/\goods\/goodsList/, "get", function (options) {
  let { query, pageNum, pageSize } = url.parse(options.url, true).query;//要传递的参数 解构赋值，结合上面看就懂了
  return goods.data.slice((pageNum - 1) * pageSize, 10)  //data.data是上面的数据，这里获取的是
})

Mock.mock(/\cate\/cateList/, "get", function (options) {
  let { query } = url.parse(options.url, true).query;//要传递的参数 解构赋值，结合上面看就懂了
  return catelist.data
})