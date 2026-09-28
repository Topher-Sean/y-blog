/**
 * 应用入口
 * --------------------------------------------------
 * 使用 ViteSSG：构建时把每个路由预渲染为静态 HTML（SEO 友好），
 * 客户端注水为 SPA；产物是纯静态文件，可部署到任何静态托管。
 */
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes, setupScrollGuard } from './router'
import 'lenis/dist/lenis.css'
import './styles/main.css'

export const createApp = ViteSSG(
  App,
  { routes },
  // 应用上下文：路由创建后挂载滚动守卫
  (ctx) => {
    setupScrollGuard(ctx.router)
  },
)
