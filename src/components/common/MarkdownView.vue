<script setup lang="ts">
/**
 * Markdown 渲染容器
 * body 为 markdown 原文，内部用 markdown-it 转成 HTML 后渲染。
 */
import { computed } from 'vue'
import { renderMarkdown } from '@/lib/markdown'

const props = defineProps<{ body: string }>()
const html = computed(() => renderMarkdown(props.body))
</script>

<template>
  <!-- 文章正文排版样式见 styles/main.css 的 .md-body -->
  <div class="md-body" v-html="html"></div>
</template>
