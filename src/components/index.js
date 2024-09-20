export default {
    install(app){
        // 全自动化过程注册全局组件，就不需要在引入在注册
        // 把src/components目录下的以.vue结尾的文件全部匹配出来。包括子孙目录下的.vue结尾的文件
         const modules = import.meta.glob('../components/**/*.vue');
         for(let key in modules){
             var componentName = key.substring(key.lastIndexOf('/')+1,key.lastIndexOf("."))
             app.component(componentName,modules[key])
         }
    }
}