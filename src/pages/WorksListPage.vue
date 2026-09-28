<script setup lang="ts">
/**
 * 作品列表页 /works
 * 结构与首页作品区块一致（标题 + 筛选 + 网格），便于独立浏览与 SEO
 */
import { useHead } from '@unhead/vue'
import WorksSection from '@/components/home/WorksSection.vue'

useHead({
  title: '全部作品',
  meta: [{ name: 'description', content: '叶泽顺的全部项目作品：AI 应用、平台与中后台、早期项目记录。' }],
})
</script>

<template>
  <main class="pt-16 md:pt-24">
    <WorksSection heading-as="h1" />
  </main>
</template>
