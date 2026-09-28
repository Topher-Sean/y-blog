<script setup lang="ts">
/** 404 页面 */
import { useHead } from '@unhead/vue'
import AppIcon from '@/components/common/AppIcon.vue'

useHead({ title: '页面不存在' })
</script>

<template>
  <main class="flex min-h-[80svh] items-center">
    <div class="mx-auto w-full max-w-content px-6 py-28 md:px-10">
      <p class="text-[11px] tracking-label text-faint">ERROR 404</p>
      <h1 class="mt-6 font-serif text-[18vw] font-medium leading-none md:text-9xl">404</h1>
      <p class="mt-8 text-base font-bold tracking-wide">页面未找到</p>
      <p class="mt-3 text-[13px] text-muted dark:text-dark-muted">
        你访问的页面可能已被移动或不存在。
      </p>
      <RouterLink
        to="/"
        class="link-underline mt-10 inline-flex items-center gap-2 text-[13px] font-bold tracking-wider2"
      >
        <AppIcon name="arrow-right" :size="15" class="rotate-180" />
        返回首页
      </RouterLink>
    </div>
  </main>
</template>
