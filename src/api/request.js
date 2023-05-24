import axios from 'axios'
import { Message } from 'element-ui'
import loginUrl from './needLogin/loginUrl';
import { getToken } from '@/utils/token'
// import { MessageBox, Message } from 'element-ui'



//可以创建多个axois实例，需要用哪个就引入使用哪个
const cloudMusic = axios.create({
    baseURL: 'https://wacht.fun/',
    // baseURL: 'https://biejuanle.icu/',
    // baseURL: 'http://localhost:3000/',
    // changeOrigin: true,  //解决跨域
    withCredentials: true,
});
const cloudMusic2 = axios.create({
    // baseURL: 'https://biejuanle.icu/',
    // baseURL:'http://localhost:3000/'
    // changeOrigin: true,  //解决跨域
    // withCredentials: true,
});

//配置全局的axios默认值
// axios.defaults.baseURL = '你的基础域名'
axios.defaults.timeout = 5000

// 在全局请求和响应拦截器中添加请求状态
// Add a request interceptor
cloudMusic.interceptors.request.use(config => {

    if (loginUrl.includes(config.url) && !getToken()) {//当请求的url需要登录，并且此时未登录时，进入此处
        Message.error('该操作需要登录')
        return false
    }
    // console.log(config)
    //判断请求的类型：如果是post请求就把默认参数拼到data里面；如果是get请求就拼到params里面
    if (config.method === 'post') {
        config.data = {

            'csrf_token': getToken(), ...config.data,
        }
    } else if (config.method === 'get') {
        config.params = {

            'csrf_token': getToken(), ...config.params,
        }
    }
    // console.log(config)
    // config.data.csrf_token = getToken()
    return config
}, error => {
    // Do something with request error
    return Promise.reject(error);
});
// Add a response interceptor
cloudMusic.interceptors.response.use(response => {

    return response;
}, error => {
    if (loginUrl.includes(config.url) && !localStorage.getItem("user")) {//当请求的url需要登录，并且此时未登录时，进入此处
        Message.error('请求错误')
        return false
    }

    return Promise.reject(error);
});
export { cloudMusic, cloudMusic2 };//其他文件可通过import { cloudMusic, cloudMusic2 } from  ...导入使用
// export default cloudMusic2;//default只能导出一个


