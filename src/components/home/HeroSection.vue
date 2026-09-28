<script setup lang="ts">
/**
 * 首页 · Hero（大字排版型）
 * --------------------------------------------------
 * 大量留白 + 衬线大字 + 线条遮罩逐行出现；
 * 底部信息列与滚动指示，整体对齐日式作品集首屏气质。
 */
import { onMounted, ref } from 'vue'
import { site } from '@/data/site'

const ready = ref(false)
onMounted(() => {
  // 下一帧再触发，保证过渡生效
  requestAnimationFrame(() => {
    ready.value = true
  })
})
</script>

<template>
  <section class="relative flex min-h-[100svh] flex-col">
    <!-- 顶部细标签（避开固定导航高度） -->
    <div class="mx-auto w-full max-w-content px-6 pt-28 md:px-10 md:pt-36">
      <p class="text-[10px] tracking-label text-faint dark:text-dark-faint md:text-[11px]">
        {{ site.heroTagline }}
      </p>
    </div>

    <!-- 大字区 -->
    <div
      class="mx-auto flex w-full max-w-content flex-1 flex-col justify-end px-6 md:px-10"
      :class="ready ? 'is-ready' : ''"
    >
      <span class="hero-line-mask">
        <span class="hero-line-inner">
          <h1
            class="font-serif text-[19vw] font-medium leading-[1.05] tracking-[0.04em] md:text-[10.5rem] md:leading-none"
            style="--line-delay: 120ms"
          >
            {{ site.heroTitle }}
          </h1>
        </span>
      </span>

      <span class="hero-line-mask mt-6 md:mt-8">
        <span class="hero-line-inner" style="--line-delay: 320ms">
          <span class="flex items-center gap-4">
            <span class="h-px w-10 bg-current opacity-40 md:w-16"></span>
            <span class="text-[12px] font-bold tracking-wider2 md:text-sm">
              {{ site.heroSubtitle }}
            </span>
          </span>
        </span>
      </span>
    </div>

    <!-- 底部信息列 + 滚动提示 -->
    <div class="mx-auto mt-16 w-full max-w-content px-6 md:mt-20 md:px-10">
      <div class="border-t border-line pt-6 dark:border-dark-line">
        <div class="flex items-end justify-between gap-8">
          <dl class="grid grid-cols-2 gap-x-10 gap-y-4 md:grid-cols-3">
            <div>
              <dt class="text-[10px] tracking-label text-faint dark:text-dark-faint">POSITION</dt>
              <dd class="mt-1 text-[12px] font-bold md:text-[13px]">前端开发工程师</dd>
            </div>
            <div>
              <dt class="text-[10px] tracking-label text-faint dark:text-dark-faint">BASED IN</dt>
              <dd class="mt-1 text-[12px] font-bold md:text-[13px]">厦门</dd>
            </div>
            <div class="hidden md:block">
              <dt class="text-[10px] tracking-label text-faint dark:text-dark-faint">FOCUS</dt>
              <dd class="mt-1 text-[13px] font-bold">Vue3 / TypeScript / AI 应用</dd>
            </div>
          </dl>

          <!-- 滚动指示 -->
          <div class="hidden flex-col items-center gap-3 md:flex">
            <span class="text-[10px] tracking-label text-faint dark:text-dark-faint">SCROLL</span>
            <span class="relative block h-12 w-px overflow-hidden bg-line dark:bg-dark-line">
              <span class="scroll-cue absolute inset-x-0 top-0 block h-1/2 bg-ink dark:bg-dark-ink"></span>
            </span>
          </div>
        </div>
      </div>
      <div class="h-8 md:h-10"></div>
    </div>
  </section>
</template>

<style scoped>
/* 滚动指示：细线内的短线下落循环 */
.scroll-cue {
  animation: scroll-cue 2.2s cubic-bezier(0.22, 1, 0.36, 1) infinite;
}
@keyframes scroll-cue {
  0% {
    transform: translateY(-100%);
  }
  55% {
    transform: translateY(220%);
  }
  100% {
    transform: translateY(220%);
  }
}
@media (prefers-reduced-motion: reduce) {
  .scroll-cue {
    animation: none;
  }
}
</style>
