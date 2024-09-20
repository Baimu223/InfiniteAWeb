import request from '@/request/index.js'
import { C2B  } from '../utils/wordtransfer'


/**
 * 查询系统用户列表并分页
 */
export const LoadData = (data)=>{
   return request.post(`/sys/user/load`,data)
}

/**
 * 根据id查询系统用户信息
 */
export const GetById = ( id )=>{
   return request.post(`/sys/user/get/${id}`)
}

/**
 * 保存系统用户
 */
export const SaveData = ( data )=>{
   return request.post(`/sys/user/save`,data)
}

/**
 * 更新系统用户信息
 */
export const UpdateData = ( data )=>{
   return request.post(`/sys/user/update`,data)
}

/**
 * 系统用户启用和未启用
 */
export const UpdateStatus = ( data )=>{
   data.field = C2B(data.field)
   return request.post(`/sys/user/update/status`,data)
}

/**
 * 根据id删除系统用户信息
 */
export const DelById = ( id )=>{
   return request.post(`/sys/user/del/${id}`)
}

/**
 * 根据ids批量删除系统用户信息
 */
export const DelByIds = ( ids )=>{
   return request.post(`/sys/user/dels?ids=${ids}`)
}

/**
 * 重置系统用户密码
 */
export const ResetPassword = ( data )=>{
   return request.post(`/sys/user/updatePwd`, data)
}

/**
 * 系统用户授权角色
 */
export const SaveUserRole = ( data )=>{
   return request.post(`/sys/user/role/save`, data)
}