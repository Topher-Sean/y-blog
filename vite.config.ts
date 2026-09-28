import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { readdirSync } from 'node:fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // @ 指向 src 目录，方便引用
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // SSG 构建选项
  ssgOptions: {
    // 页面脚本加载策略，降低静态 HTML 的 TTI 阻塞
    script: 'defer',
    // 预渲染失败时给出明确报错，避免静默写坏页面
    formatting: 'minify',
    /**
     * 预渲染路由：默认只渲染不含参数的 6 个页面，
     * 这里扫描 src/content 下所有 markdown，把详情页也全部预渲染
     */
    includedRoutes(defaultPaths: string[]) {
      // 默认路由中剔除参数化 / 通配路由（如 /works/:slug、404）
      const staticPaths = defaultPaths.filter((p) => !p.includes(':') && !p.includes('*'))
      const contentRoot = fileURLToPath(new URL('./src/content', import.meta.url))
      const detailPaths: string[] = []
      try {
        for (const dir of readdirSync(contentRoot)) {
          for (const file of readdirSync(`${contentRoot}/${dir}`)) {
            if (file.endsWith('.md')) {
              detailPaths.push(`/${dir}/${file.replace(/\.md$/, '')}`)
            }
          }
        }
      } catch {
        // 目录异常时仅使用默认路由
      }
      return [...staticPaths, ...detailPaths]
    },
  },
})
