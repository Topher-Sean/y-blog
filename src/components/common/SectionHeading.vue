<script setup lang="ts">
/**
 * 区块标题：宽字距英文小标签 + 中文标题（doisena 式标题结构）
 * 用法：<SectionHeading en="WORKS" title="作品" />
 */
withDefaults(
  defineProps<{
    en?: string
    title: string
    align?: 'left' | 'center'
    /** 标题标签：首页区块用 h2，独立列表页传 h1 以保证语义与 SEO */
    as?: 'h1' | 'h2'
  }>(),
  { en: '', align: 'left', as: 'h2' },
)
</script>

<template>
  <div
    class="flex items-baseline gap-4"
    :class="align === 'center' ? 'justify-center text-center' : 'justify-start'"
  >
    <span v-if="en" class="text-[11px] tracking-label text-faint dark:text-dark-faint">{{ en }}</span>
    <component :is="as" class="text-lg md:text-xl font-bold tracking-wider2">{{ title }}</component>
  </div>
</template>
