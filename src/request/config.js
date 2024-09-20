export default {
    method: 'get',
    // 基础url前缀
    baseURL: import.meta.env.VITE_BASE_API,
    // 请求头信息VITE_BASE_PATH
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    // 设置超时时间
    timeout: 30000,
    // 返回数据类型
    responseType: 'json'
}
