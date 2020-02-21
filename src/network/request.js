import axios from 'axios'

axios.defaults.baseURL = 'http://123.207.32.32:8000/api/hy'
// axios.defaults.baseURL = 'http://106.54.54.237:8000http://123.207.32.32:8000/api/v2/api/hy'
axios.defaults.timeout = 5000

export function request(config) {
  const instance = axios.create({
    baseURI: 'http://123.207.32.32:8000/api/hy',
    // baseURI: 'http://106.54.54.237:8000/api/hy',
    // timeout: 5000
  })

  //请求拦截
  instance.interceptors.request.use(config => {
    // console.log(config);
    return config
  },err => {
    // console.log(err);
  })

  //响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  },err => {
    // console.log(err);
  })

  return  instance(config)
}
