// 1: 导入axios异步请求组件
import axios from "axios";
// 2: 把axios请求的配置剥离成一个config/index.js的文件
import axiosConfig from "./config";
// 3: 获取路由对象--原因是：在加载的过程中先加载的pinia所以不能useRouter机制。
import router from '@/router'
// 4: elementplus消息框
import KVA from "@/utils/kva.js";
// 5: 获取登录的token信息
import { useUserStore } from '@/stores/user.js'
// 6: 然后创建一个axios的实例
const request = axios.create({ ...axiosConfig })

// request request请求拦截器
request.interceptors.request.use(
    function(config){
        // 这个判断就是为了那些不需要token接口做开关处理，比如：登录，检测等
        if(!config.noToken){
             // 如果 token为空，说明没有登录。你就要去登录了
            const userStore = useUserStore()
            const isLogin = userStore.isLogin
            if(!isLogin){
                router.push("/login")
                return
            }else{
                // 90b7d374acc5476eb9beabe9373b2640
                // 这里给请求头增加参数.request--header，在服务端可以通过request的header可以获取到对应参数
                // 比如go: c.GetHeader("Authorization")
                // 比如java: request.getHeader("Authorization")
                config.headers.Authorization = userStore.getToken()
                config.headers.KsdUUID = userStore.uuid
            }
        }
        return config;
    },function(error){
        // 判断请求超时
        if ( error.code === "ECONNABORTED" && error.message.indexOf("timeout") !== -1) {
            KVA.notifyError('请求超时');
            // 这里为啥不写return
        }
        return Promise.reject(error);
    }
);

// request response 响应拦截器
request.interceptors.response.use(async (response) => {
    // 在这里应该可以获取服务端传递过来头部信息
    // 开始续期
    if(response.headers["new-authorization"]){
        const userStore = useUserStore()   
        userStore.setToken(response.headers["new-authorization"])  
    }

     // 包括: 没登录，黑名单，挤下线
     if(response.data.code === 4001 ){
        KVA.notifyError(response.data.message);
        const userStore = useUserStore()   
        userStore.logout() 
        return
    }   


    // cashbin的权限拦截处理
    if(response.data?.code === 80001){
        KVA.notifyError(response.data.message);
        // 如果你想调整页面，就把下面注释打开
        //router.push("/nopermission")
        return response.data;
    }

    if(response.data?.code === 20000){
        return response.data;
    }else{
        // 所有得服务端得错误提示，全部在这里进行处理
        if (response.data?.message) {
            KVA.notifyError(response.data.message);
        }
        // 返回接口返回的错误信息
        return Promise.reject(response.data); 
    }
},(err) => {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.message = "请求错误";
                break;
            case 401:
                err.message = "未授权，请登录";
                break;
            case 403:
                err.message = "拒绝访问";
                break;
            case 404:
                err.message = `请求地址出错: ${err.response.config.url}`;
                break;
            case 408:
                err.message = "请求超时";
                break;
            case 500:
                err.message = "服务器内部错误";
                break;
            case 501:
                err.message = "服务未实现";
                break;
            case 502:
                err.message = "网关错误";
                break;
            case 503:
                err.message = "服务不可用";
                break;
            case 504:
                err.message = "网关超时";
                break;
            case 505:
                err.message = "HTTP版本不受支持";
                break;
            default:
        }
    }
    if (err.message) {
        KVA.notifyError(err.message);
    }
     // 判断请求超时
    if ( err.code === "ECONNABORTED" && err.message.indexOf("timeout") !== -1) {
        KVA.notifyError('服务已经离开地球表面，刷新或者重试...');
    }
    // 返回接口返回的错误信息
    return Promise.reject(err); 
})
  
export default request