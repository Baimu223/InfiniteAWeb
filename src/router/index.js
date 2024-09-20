import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
// 获取状态管理的token
import { useUserStore } from '@/stores/user.js'
import { useMenuTabStore } from '@/stores/menuTab.js'
import Layout from "@/layout/Index.vue";
import settings from '@/settings.js'
import addDynamicRoutes from '@/router/dynamic.js'
// 显示右上角螺旋加载提示
NProgress.configure({ showSpinner: true })

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Layout
    },
    {
      path: '/login',
      name: 'Login',
      meta: { title: "login" },
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/nopermission',
      name: 'NoPermission',
      meta: { title: "nopermission" },
      component: () => import('@/views/error/NoPermission.vue')
    }
  ]
})

const router404 = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('@/views/error/NotFound.vue')
}

router.beforeEach(async (to,from,next) => {
  //开启进度条
  NProgress.start()
  const userStore = useUserStore();
  // 如果当前是登录状态，用户访问又是登录，属于无用操作，应该跳转到首页去
  if(to.path === '/login'){
    if(userStore.isLogin){
      next({name:"Home"})
    }
    next()
  }

  // 判断是否登录
  if (!userStore.isLogin ) {
    if(to.name !== 'Login'){
      // 这里的query就是为了记录用户最后一次访问的路径，这个路径是通过to的参数获取
      // 后续在登录成功以后，就可以根据这个path的参数，然后调整到你最后一次访问的路径
      next({ name: 'Login', query: { "path": to.path }})
    }else{
      next()
    }
  }else{
    // 动态加载路由---这里需要耗时---db--ajax-
    const userStore = useUserStore();
    // 404可以这样处理
    router.addRoute(router404)
    // 必须服务器返回的菜单和views去碰撞形成一个完整的route信息，然后注册到home下
    if( userStore.menuTree && userStore.menuTree.length > 0){
      addDynamicRoutes(userStore.menuTree)
    }

    // 如果刷新出现空白的问题，那么就使用下面这行代码
    if (!to.name && hasRoute(to)) {
      next({ ...to })
    }

    // 如果访问的是首页，就跳转到/dashboard页面
    if(to.path === "/"){
      // 读取默认菜单的默认页面,需要从数据库的菜单表中去读取
      next(settings.defaultPage)
    }

    next()
  } 
})


// 判断当前路由是否存在动态添加的路由数据中
function hasRoute(to) {
  const item = router.getRoutes().find((item) => item.path === to.path);
  return !!item;
}

router.afterEach((to) => {
  // 获取菜单tab的状态信息
  const menuTabStore = useMenuTabStore();
  menuTabStore.addMenuTab(to);
  //完成进度条
  NProgress.done()
})

export default router
