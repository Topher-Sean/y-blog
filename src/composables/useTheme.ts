/**
 * 深色 / 浅色模式管理
 * --------------------------------------------------
 * 优先读取用户上次选择（localStorage），否则跟随系统；
 * 通过切换 <html> 的 .dark 类生效（Tailwind darkMode: 'class'）。
 */
import { ref } from 'vue'

const STORAGE_KEY = 'theme'
const isDark = ref(false)
let initialized = false

/** 应用当前主题到 <html> */
function apply(dark: boolean) {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', dark)
}

export function useTheme() {
  /** 初始化（仅客户端执行一次） */
  function initTheme() {
    if (initialized || typeof window === 'undefined') return
    initialized = true
    const saved = localStorage.getItem(STORAGE_KEY)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = saved ? saved === 'dark' : prefersDark
    apply(isDark.value)

    // 系统主题变化时，若用户未手动指定则跟随
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        isDark.value = e.matches
        apply(isDark.value)
      }
    })
  }

  /** 切换主题并记住选择 */
  function toggleTheme() {
    isDark.value = !isDark.value
    apply(isDark.value)
    localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
  }

  return { isDark, initTheme, toggleTheme }
}
