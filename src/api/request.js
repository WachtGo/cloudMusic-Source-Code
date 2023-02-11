import axios from 'axios'
// import { Message, MessageBox } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
// import { MessageBox, Message } from 'element-ui'
//创建axois实例
const service = axios.create({
    baseURL:'https://biejuanle.icu/'
    // baseURL:'http://localhost:3000/'
    // changeOrigin: true,  //解决跨域
    // withCredentials: true,
});
// respone拦截器
// service.interceptors.response.use({})
export default service;