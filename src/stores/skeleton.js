import { defineStore } from 'pinia'

export const useSkeletonStore = defineStore('skeleton', {
  // 定义状态
  state: () => ({
    skLoading:true
  }),

  // 定义动作
  actions: {
   /* 设置loading */ 
   setLoading(loading){
      this.skLoading = loading
   }
  },
  persist: {
    key: 'kva-pinia-skeleton',
    storage: sessionStorage
  }
})