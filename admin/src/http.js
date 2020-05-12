import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

// 添加请求拦截器
http.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  // 加请求头————请求带上token
  if(localStorage.token){
    config.headers.Authorization = "Bearer " + localStorage.token
  }
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});


// 添加响应拦截器
http.interceptors.response.use(res => {
  // 对响应数据做点什么
  return res;
}, err => {
  // 对响应错误做点什么
  // 如果相应错误，弹出提示信息
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: "error",
      message: err.response.data.message
    })
  }
  // 如果错误状态码为401（与后端约定好），说明未登录；跳转到登录页面
  if(err.response.status  === 401){
    router.push('/login')
  }
  console.log(err.response.status)
  return Promise.reject(err);
})

export default http