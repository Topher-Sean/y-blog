<script setup lang="ts">
/**
 * 首页
 * 区块：Hero → 精选作品 → 简介 → 最新笔记 → 联系
 */
import { useHead } from '@unhead/vue'
import { site } from '@/data/site'
import HeroSection from '@/components/home/HeroSection.vue'
import WorksSection from '@/components/home/WorksSection.vue'
import ProfileSection from '@/components/home/ProfileSection.vue'
import NotesSection from '@/components/home/NotesSection.vue'
import ContactSection from '@/components/home/ContactSection.vue'

useHead({
  title: `叶泽顺 · ${site.title}`,
  meta: [
    { name: 'description', content: site.description },
    { property: 'og:title', content: `叶泽顺 · ${site.title}` },
    { property: 'og:description', content: site.description },
  ],
})
</script>

<template>
  <main>
    <HeroSection />
    <template v-if="site.sections.works"><WorksSection /></template>
    <template v-if="site.sections.profile"><ProfileSection /></template>
    <template v-if="site.sections.notes"><NotesSection /></template>
    <template v-if="site.sections.contact"><ContactSection /></template>
  </main>
</template>
