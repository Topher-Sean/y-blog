/**
 * 路由配置
 * --------------------------------------------------
 * 注意：这里只导出路由表（routes），不创建 router 实例。
 * vite-ssg 会在客户端 / SSG 构建时分别创建合适的 history
 * （createWebHistory 需要浏览器 window，不能在模块顶层执行）。
 */
import type { RouteRecordRaw } from 'vue-router'
import type { Router } from 'vue-router'
import { useLenis } from '@/composables/useLenis'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/AboutPage.vue'),
  },
  {
    path: '/works',
    name: 'works',
    component: () => import('@/pages/WorksListPage.vue'),
  },
  {
    path: '/works/:slug',
    name: 'work-detail',
    component: () => import('@/pages/WorkDetailPage.vue'),
  },
  {
    path: '/notes',
    name: 'notes',
    component: () => import('@/pages/NotesListPage.vue'),
  },
  {
    path: '/notes/:slug',
    name: 'note-detail',
    component: () => import('@/pages/NoteDetailPage.vue'),
  },
  {
    path: '/interview',
    name: 'interview',
    component: () => import('@/pages/InterviewListPage.vue'),
  },
  {
    path: '/interview/:slug',
    name: 'interview-detail',
    component: () => import('@/pages/InterviewDetailPage.vue'),
  },
  {
    path: '/training',
    name: 'training',
    component: () => import('@/pages/TrainingListPage.vue'),
  },
  {
    path: '/training/:slug',
    name: 'training-detail',
    component: () => import('@/pages/TrainingDetailPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue'),
  },
]

/**
 * 路由滚动行为（在 vite-ssg 的应用上下文中调用）
 * - 带 hash 的导航 → Lenis 平滑滚动到锚点
 * - 普通页面切换 → 立即回顶
 */
export function setupScrollGuard(router: Router) {
  // vite-ssg 默认滚动行为也需要关闭，交给下面统一处理
  ;(router.options as { scrollBehavior?: unknown }).scrollBehavior = () => false

  /** 标记是否首次导航（首次加载不强制回顶） */
  let isFirstNavigation = true

  router.afterEach((to, from) => {
    // SSG 构建（Node 侧）直接跳过
    if (typeof window === 'undefined') return

    const { scrollTo, scrollToTop } = useLenis()

    if (isFirstNavigation) {
      isFirstNavigation = false
      if (to.hash) {
        requestAnimationFrame(() => {
          const el = document.querySelector(to.hash)
          if (el) scrollTo(el as HTMLElement, { offset: -72 })
        })
      }
      return
    }

    if (to.hash) {
      requestAnimationFrame(() => {
        const el = document.querySelector(to.hash)
        if (el) scrollTo(el as HTMLElement, { offset: -72 })
      })
    } else if (to.path !== from.path) {
      scrollToTop()
    }
  })
}
