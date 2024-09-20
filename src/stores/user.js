import { defineStore } from 'pinia'
import request from '@/request'
import router from '@/router'
import { handleLogout } from '../api/logout.js'
import { ChangeRoleIdMenus } from '../api/sysroles.js'
import {useSkeletonStore} from '@/stores/skeleton.js'
import {useMenuTabStore} from '@/stores/menuTab.js'



export const useUserStore = defineStore('user', {
  // 定义状态
  state: () => ({
    routerLoaded:true,
    // 登录用户
    user: {},
    username: '',
    userId: '',
    // 挤下线使用
    uuid:"",
    // 登录token
    token: '',
    // 当前角色
    currRoleName:"",
    currRoleCode:"",
    currRoleId:0,
    // 获取用户对应的角色列表
    roles:[],
    // 获取角色对应的权限
    permissions:[],
    // 获取角色对应的菜单
    menuTree:[]
  }),

  // 就是一种计算属性的机制，定义的是函数，使用的是属性就相当于computed
  getters:{
    isLogin(state){
      return state.token ? true : false
    },

    roleName(state){
      return state.roles && state.roles.map(r=>r.name).join(",")
    },

    permissionCode(state){
      return state.permissions &&  state.permissions.map(r=>r.code)
    },
    
    permissionPath(state){
      return state.permissions &&  state.permissions.map(r=>r.path)
    }
  },

  // 定义动作
  actions: {

   /* 设置token */ 
   setToken(newtoken){
      this.token = newtoken
   },

   /* 获取token*/
   getToken(){
    return this.token
   },

   // 改变用户角色的时候把对应菜单和权限查询出来，进行覆盖---更改
   async handlePianaRole(roleId,roleName,roleCode){
      if(roleId > 0 && roleId != this.currRoleId){
        this.currRoleId = roleId
        this.currRoleName = roleName;
        this.currRoleCode = roleCode
      }

      // 获取到导航菜单，切换以后直接全部清空掉
      const menuTabStore = useMenuTabStore();
      menuTabStore.clear()
      
      // 请求服务端--根据切换的角色找到角色对应的权限和菜单
      const resp = await ChangeRoleIdMenus({roleId:this.currRoleId})
      // 对应的权限和菜单进行覆盖
      this.permissions = resp.data.permissions
      this.menuTree = resp.data.roleMenus.sort((a,b)=>a.sort-b.sort)
      if(roleId > 0){
        // 激活菜单中的第一个路由
        router.push(this.menuTree[0].path)
      }
   },
   
   /* 登出*/
   async logout (){
      // 执行服务端退出
      await handleLogout()
      // 清除状态信息
      this.token = ''
      this.user = {}
      this.username = ''
      this.userId = ''
      this.uuid = ''
      this.roles = []
      this.permissions = []
      this.menuTree = []
      // 清除自身的本地存储
      localStorage.removeItem("ksd-kva-language")
      localStorage.removeItem("kva-pinia-userstore")
      sessionStorage.removeItem("kva-pinia-skeleton")
      // 把骨架屏的状态恢复到true的状态
      useSkeletonStore().setLoading(true)
      localStorage.removeItem("isWhitelist")
      // 刷新当前页面
      location.reload();
  },

  /* 登录*/
  async toLogin(loginUser){
      // 查询用户信息，角色，权限，角色对应菜单
      const resp = await request.post("login/toLogin", loginUser,{noToken:true})
      // 这个会回退，回退登录页
      var { user ,token,roles,permissions,roleMenus,uuid } = resp.data
      // 登录成功以后获取到菜单信息, 这里要调用一
      this.menuTree = roleMenus
      // 把数据放入到状态管理中
      this.user = user
      this.userId = user.id
      this.username = user.username
      this.token = token
      this.uuid = uuid
      this.roles = roles
      this.permissions = permissions
      // 把roles列表中的角色的第一个作为，当前角色
      this.currRoleId = roles && roles.length > 0 ? roles[0].id : 0
      this.currRoleName = roles && roles.length > 0 ? roles[0].roleName : ""
      this.currRoleCode = roles && roles.length > 0 ? roles[0].roleCode : ""

      return Promise.resolve(resp)
    }
  },
  persist: {
    key: 'kva-pinia-userstore',
    storage: localStorage,//sessionStorage
  }
})