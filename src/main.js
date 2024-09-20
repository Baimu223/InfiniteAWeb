import 'normalize.css/normalize.css'
import './assets/base.css'
import "nprogress/nprogress.css"
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import i18n from '@/i18n'
import KVAComponents from '@/components/index.js'
import KVADirective from '@/directive/index.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 守卫路由
import AnimatedNumber from 'animated-number-vue3'
const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
app.use(AnimatedNumber)
app.use(pinia)
app.use(router)
app.use(i18n)
app.use(ElementPlus)
app.use(KVAComponents)
app.use(KVADirective)
// 注册elementplus的图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
