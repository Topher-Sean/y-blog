<script setup lang="ts">
/**
 * 固定顶部导航
 * --------------------------------------------------
 * - 初始透明无边界；滚动后纸色半透明 + 模糊 + 细线
 * - 桌面：右侧粗体宽字距导航；移动：汉堡按钮 → 全屏菜单
 * - 深色模式切换
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { site } from '@/data/site'
import { useTheme } from '@/composables/useTheme'
import AppIcon from '@/components/common/AppIcon.vue'
import MobileMenu from '@/components/layout/MobileMenu.vue'

const { isDark, initTheme, toggleTheme } = useTheme()

const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  initTheme()
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

/** 点击导航后关闭移动菜单 */
function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth"
    :class="
      scrolled
        ? 'bg-paper/85 dark:bg-dark-paper/85 backdrop-blur-md border-b border-line/70 dark:border-dark-line/70'
        : 'bg-transparent border-b border-transparent'
    "
  >
    <div class="mx-auto max-w-content px-6 md:px-10">
      <div class="flex h-16 items-center justify-between md:h-24">
        <!-- 左：字标 -->
        <RouterLink
          to="/"
          class="group flex flex-col leading-tight"
          @click="closeMenu"
        >
          <span class="text-base md:text-lg font-bold tracking-wider2">
            {{ site.author }}
          </span>
          <span
            class="hidden text-[10px] tracking-label text-faint dark:text-dark-faint md:block"
          >
            {{ site.title }}
          </span>
        </RouterLink>

        <!-- 右：桌面导航 -->
        <nav class="hidden items-center gap-9 md:flex">
          <RouterLink
            v-for="item in site.nav"
            :key="item.label"
            :to="item.to"
            class="link-underline text-[13px] font-bold tracking-wider2 transition-colors"
            active-class="text-accent"
          >
            {{ item.label }}
          </RouterLink>

          <!-- 深色模式切换 -->
          <button
            type="button"
            class="ml-2 flex h-9 w-9 items-center justify-center transition-opacity hover:opacity-60"
            :aria-label="isDark ? '切换为浅色模式' : '切换为深色模式'"
            @click="toggleTheme"
          >
            <AppIcon :name="isDark ? 'sun' : 'moon'" :size="18" />
          </button>
        </nav>

        <!-- 右：移动端按钮组 -->
        <div class="flex items-center gap-1 md:hidden">
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center"
            :aria-label="isDark ? '切换为浅色模式' : '切换为深色模式'"
            @click="toggleTheme"
          >
            <AppIcon :name="isDark ? 'sun' : 'moon'" :size="19" />
          </button>
          <button
            type="button"
            class="flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
            aria-label="打开菜单"
            @click="menuOpen = true"
          >
            <span class="h-px w-6 bg-current"></span>
            <span class="h-px w-6 bg-current"></span>
          </button>
        </div>
      </div>
    </div>

    <!-- 移动端全屏菜单 -->
    <MobileMenu :open="menuOpen" @close="closeMenu" />
  </header>
</template>
