import axios from 'axios'
import { Message } from 'element-ui'
import loginUrl from './needLogin/loginUrl';
import { getCookie } from '@/utils/cookie';
// import { getToken } from '@/utils/auth'
// import { MessageBox, Message } from 'element-ui'



//可以创建多个axois实例，需要用哪个就引入使用哪个
const cloudMusic = axios.create({
    // baseURL: 'https://biejuanle.icu/',
    baseURL: 'http://localhost:3000/',
    // changeOrigin: true,  //解决跨域
    withCredentials: true,
});
const cloudMusic2 = axios.create({
    baseURL: 'https://biejuanle.icu/',
    // baseURL:'http://localhost:3000/'
    // changeOrigin: true,  //解决跨域
    withCredentials: true,
});

//配置全局的axios默认值
// axios.defaults.baseURL = '你的基础域名'
axios.defaults.timeout = 5000

// 在全局请求和响应拦截器中添加请求状态
// Add a request interceptor
cloudMusic.interceptors.request.use(config => {
    // Do something before request is sent
    // if (localStorage.getItem('token')) {
    //     config.headers.Authorization = localStorage.getItem('token');
    // M}
    // let cookie = '6bf80db2682091e66db7c358940e6034f555d03d999284f42033476c98e45796993166e004087dd3e30340b48322c4fd7a82616b73ff591e0195ea446a99c0ab92386fc4f57b0915a0d2166338885bd7'
    // Cookies.set('MUSIC_U', cookie)
    // console.log(document.cookie)
    // console.log('000', Cookies.get('NMTID'))
    // console.log('000', encodeURIComponent(1481119727062))
    // console.log('cookie', Cookies.get('MUSIC_U'))
    /*
    在每次请求中添加cookie
      config.params = {
         cookie: Cookies.get('cookie'),
         ...config.params
     } */
    // config.headers.cookie = Cookies.get('cookie');
    // console.log(config)
    // console.log(store)
    // console.log(loginUrl)
    if (loginUrl.includes(config.url) && !getCookie("__csrf")) {//当请求的url需要登录，并且此时未登录时，进入此处
        Message({
            type: 'error',
            message: '该操作需要登录'
        })
        return false
    }

    return config


}, error => {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
cloudMusic.interceptors.response.use(response => {
    // Do something with response data
    // console.log('----', response)
    return response;
}, error => {
    // Do something with response error
    return Promise.reject(error);
});


export { cloudMusic, cloudMusic2 };//其他文件可通过import { cloudMusic, cloudMusic2 } from  ...导入使用
// export default cloudMusic2;//default只能导出一个


