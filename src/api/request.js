import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://cloud-music-isntafzhs-wachtgo.vercel.app/',
    changeOrigin: true,  //解决跨域
});


export default instance;