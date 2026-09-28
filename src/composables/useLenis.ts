/**
 * Lenis 平滑滚动
 * --------------------------------------------------
 * 全站统一惯性滚动（参考站 doisena.jp 同样使用 Lenis）。
 * 仅在客户端初始化；尊重系统“减少动态效果”设置。
 */
import Lenis from 'lenis'

let lenis: Lenis | null = null
let rafId = 0

export function useLenis() {
  /** 启动平滑滚动（幂等，可重复调用） */
  function startLenis() {
    if (lenis || typeof window === 'undefined') return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return // 用户偏好减少动态：不接管滚动

    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })

    const raf = (time: number) => {
      lenis?.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
  }

  /** 平滑滚动到指定位置（数字 = 距顶部像素）、选择器或具体元素 */
  function scrollTo(
    target: string | number | HTMLElement,
    options?: { offset?: number; immediate?: boolean },
  ) {
    if (!lenis) {
      // 未启用平滑滚动时退化为原生
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: options?.immediate ? 'auto' : 'smooth' })
      } else if (typeof target === 'string') {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        target.scrollIntoView({ behavior: 'smooth' })
      }
      return
    }
    lenis.scrollTo(target, { offset: options?.offset ?? 0, immediate: options?.immediate })
  }

  /** 立即回到顶部（路由切换时使用，无动画） */
  function scrollToTop() {
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }

  /** 停止 / 恢复滚动（全屏菜单打开时使用） */
  function stop() {
    lenis?.stop()
  }
  function start() {
    lenis?.start()
  }

  function destroy() {
    cancelAnimationFrame(rafId)
    lenis?.destroy()
    lenis = null
  }

  return { startLenis, scrollTo, scrollToTop, stop, start, destroy }
}
