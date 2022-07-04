import axios from 'axios'

// const baseURL1 = 'https://autumnfish.cn'
// const baseURL2 = 'http://music.zzhitong.com'
const instance = axios.create({
    // baseURL: 'https://autumnfish.cn',
    // baseURL: 'http://music.zzhitong.com',
    // baseURL: 'http://localhost:3000',
    baseURL: 'https://cloud-music-isntafzhs-wachtgo.vercel.app/',
    
    // baseURL: baseURL2,
    changeOrigin: true,  //解决跨域
});


export default instance;