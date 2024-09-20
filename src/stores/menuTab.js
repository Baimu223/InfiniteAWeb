import { defineStore } from 'pinia'
import router from '@/router/index.js'

export const useMenuTabStore = defineStore('menuTab', {
  // 定义状态
  state: () => ({
      skLoading:true,
      activePath:"/dashboard",
      menuList:[]
  }),

  // 定义动作
  actions: {
    // 点击改变菜单
    changeMenuTab(path){
      this.activePath = path
      router.push(path);
    },

    clear(){
      this.skLoading = false;
      this.menuList = []
    },

    // 添加菜单
    addMenuTab({name,path}){
      if(name && path){
        var index =  this.menuList.findIndex(m=>m.path==path);
        // 激活当前路径
        this.activePath = path
        // 不存在就添加，index==-1就意味着不存在
        if(index === -1){
          this.menuList.push({name,path})
        }
      }
    },
    // 移除
    removeMenuTab(path){
       // 1: 获取当前操作容器
       var tabs = this.menuList
       // 2: 获取激活路径
       var activeTabPath = this.activePath;

       // 如果激活路径和关闭路径是同一个，那么就要选择后面一个
       // 如果后面没有就选择前面
       if(activeTabPath === path){
          tabs.forEach((tab,index)=>{
            if(tab.path === path){
               const nextTab = tabs[index + 1] || tabs[index - 1]
               if(nextTab){
                 activeTabPath = nextTab.path
               }
            }
          })
       }

       this.activePath = activeTabPath;
       // 如果是关闭其它菜单，直接删除即可，不需要做任何的处理
       const index = this.menuList.findIndex(m=>m.path===path);
       // 开始删除
       this.menuList.splice(index,1)
       // 开始激活下一个路由
       router.push(activeTabPath)
    }
  },
  persist: {
    key: 'kva-pinia-menutabs',
    storage: localStorage,//sessionStorage
  }
})