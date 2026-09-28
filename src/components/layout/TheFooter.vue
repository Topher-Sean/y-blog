<script setup lang="ts">
/**
 * 页脚
 * --------------------------------------------------
 * 参考 doisena.jp：无边框、左对齐、版权 + 导航链接。
 */
import { site } from '@/data/site'
import AppIcon from '@/components/common/AppIcon.vue'
</script>

<template>
  <footer class="border-t border-line dark:border-dark-line">
    <div class="mx-auto max-w-content px-6 py-14 md:px-10 md:py-20">
      <!-- 字标 -->
      <div class="mb-10 flex flex-col">
        <span class="text-xl font-bold tracking-wider2">{{ site.author }}</span>
        <span class="mt-1 text-[10px] tracking-label text-faint dark:text-dark-faint">
          {{ site.heroTagline }}
        </span>
      </div>

      <div class="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <!-- 导航 -->
        <nav class="flex flex-wrap gap-x-7 gap-y-3">
          <RouterLink
            v-for="item in site.nav"
            :key="item.label"
            :to="item.to"
            class="text-[13px] font-bold tracking-wider2 transition-opacity hover:opacity-60"
          >
            {{ item.label }}
          </RouterLink>
        </nav>

        <!-- 社交 -->
        <div class="flex flex-wrap gap-x-6 gap-y-3">
          <a
            v-for="social in site.social"
            :key="social.label"
            :href="social.url"
            class="flex items-center gap-2 text-[12px] text-muted transition-opacity hover:opacity-60 dark:text-dark-muted"
          >
            <AppIcon :name="social.icon" :size="14" />
            <span>{{ social.label }}</span>
          </a>
        </div>
      </div>

      <!-- 版权 -->
      <div class="mt-14 flex flex-col gap-2 text-[11px] text-faint dark:text-dark-faint md:flex-row md:items-center md:justify-between">
        <span>© {{ new Date().getFullYear() }} {{ site.author }}. ALL RIGHTS RESERVED.</span>
        <span class="tracking-label">{{ site.title }}</span>
      </div>
    </div>
  </footer>
</template>
