<script setup lang="ts">
/**
 * 应用根组件
 * 固定导航 + 路由页面（带淡入淡出过渡）+ 页脚
 */
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import { useLenis } from '@/composables/useLenis'

/** 全局标题模板：子页面标题自动追加站名 */
useHead({
  titleTemplate: (title) => (title ? `${title} · 叶泽顺` : '叶泽顺 · 小叶的前端笔记'),
})

const { startLenis } = useLenis()

onMounted(() => {
  startLenis()
})
</script>

<template>
  <TheHeader />

  <RouterView v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>

  <TheFooter />
</template>
