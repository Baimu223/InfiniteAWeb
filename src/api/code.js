import request from "@/request"

// 获取验证码
export const getCapatcha = ()=>{
    return request.get("code/get",{noToken:true})
}