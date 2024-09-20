import { fileURLToPath, URL } from 'node:url'
import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteLogo } from './src/core/config'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  viteLogo(process.env)
  return {
    base: env.VITE_MODE === 'production' ? './' : '/',
    // vite 配置
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue','vue-router','pinia','vue-i18n'],
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      })
    ],
    server:{
      // 如果使用docker-compose开发模式，设置为false
      open: true,
      port: 8777,
      proxy: {
        // 把key的路径代理到target位置
        [env.VITE_BASE_API]: { // 需要代理的路径   例如 '/api'
          target: `${env.VITE_BASE_PATH}/`, // 代理到 目标路径
          changeOrigin: true,
          //rewrite: path => path.replace(new RegExp('^' + env.VITE_BASE_API), ''),
        }
      },
    },
     // 构建配置
     build: {
      // 输出目录，默认是 dist
      outDir: 'dist',
      // 是否开启 sourcemap
      sourcemap: false,
      // 是否开启压缩
      minify: 'terser', // 可选值：'terser' | 'esbuild'
      // 是否开启 brotli 压缩
      brotli: true,
      // 是否将模块提取到单独的 chunk 中，默认是 true
      chunkSizeWarningLimit: 500,
      // 是否提取 CSS 到单独的文件中
      cssCodeSplit: true,
      // 是否开启 CSS 压缩
      cssMinify: true,
      // 是否开启 CSS 去重
      cssInlineLimit: 4096,
      // 启用/禁用 esbuild 的 minification，如果设置为 false 则使用 Terser 进行 minification
      target: 'es2018', // 可选值：'esnext' | 'es2020' | 'es2019' | 'es2018' | 'es2017' | 'es2016' | 'es2015' | 'es5'
      // 是否开启 Rollup 的代码拆分功能
      rollupOptions: {
          output: {
              manualChunks: {},
          },
      },
      terserOptions: { 
        compress: { // 打包时清除 console 和 debug 相关代码
          drop_console: true,
          drop_debugger: true,
        },
      },
      // 是否开启增量式构建
      // https://vitejs.dev/guide/build.html#incremental-build
      incremental: false
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // 优化配置
    optimizeDeps: {
        // 是否将 Vue、React、@vueuse/core 和 @vueuse/head 作为外部依赖提取出来
        include: ['vue', 'react', '@vueuse/core', '@vueuse/head','axios'],
        // 是否开启预构建，将预构建后的代码提前注入到浏览器缓存中，以减少首次加载的时间
        prebuild: false,
    }
  }
})


