import request from '@/request/index.js'
import { C2B  } from '../utils/wordtransfer'

/**
 * 查询权限列表并分页
 */
export const LoadTreeData = (data={keyword:''})=>{
   return request.post(`/sys/apis/tree?keyword=${data.keyword}`,data)
}

/**
 * 查询父菜单
 */
export const LoadRootData = ()=>{
   return request.post(`/sys/apis/root`,{})
}


/**
 * 根据id查询权限信息
 */
export const GetById = ( id )=>{
   return request.post(`/sys/apis/get/${id}`)
}

/**
 * 保存权限
 */
export const SaveData = ( data )=>{
   return request.post(`/sys/apis/save`,data)
}

/**
 * 更新权限信息
 */
export const UpdateData = ( data )=>{
   return request.post(`/sys/apis/update`,data)
}


/**
 * 根据id删除权限信息
 */
export const DelById = ( id )=>{
   return request.post(`/sys/apis/del/${id}`)
}

/**
 * 根据ids批量删除权限信息
 */
export const DelByIds = ( ids )=>{
   return request.post(`/sys/apis/dels?ids=${ids}`)
}

/**
 * 权限启用和未启用
 */
export const UpdateStatus = ( data )=>{
   data.field = C2B(data.field)
   return request.post(`/sys/apis/update/status`,data)
}


/**
 * 复制数据
 */
export const CopyData = ( id )=>{
   return request.post(`/sys/apis/copy/${id}`,{})
}
