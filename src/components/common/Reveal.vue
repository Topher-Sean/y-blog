<script setup lang="ts">
/**
 * 滚动进入动画容器
 * --------------------------------------------------
 * 用法：<Reveal :delay="120">内容</Reveal>
 * 进入视口后加 .reveal-in 触发淡入上移；图片类元素可用 variant="media"。
 * 初始隐藏态由 CSS 控制（SSR HTML 中即带 data-reveal，无闪烁）。
 */
import { onMounted, onBeforeUnmount, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    /** 动画延迟（ms），用于逐项 stagger */
    delay?: number
    /** 普通元素位移淡入 / 媒体元素缩放淡入 */
    variant?: 'up' | 'media'
    /** 渲染标签 */
    as?: string
  }>(),
  { delay: 0, variant: 'up', as: 'div' },
)

const el = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!el.value) return
  // 不支持 IO 时直接显示
  if (!('IntersectionObserver' in window)) {
    el.value.classList.add('reveal-in')
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.value?.classList.add('reveal-in')
          observer?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  )
  observer.observe(el.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <component
    :is="props.as"
    ref="el"
    :class="props.variant === 'media' ? 'reveal-media' : 'reveal'"
    :style="props.delay ? { '--reveal-delay': `${props.delay}ms` } : undefined"
  >
    <slot />
  </component>
</template>
