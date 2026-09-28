<script setup lang="ts">
/** 作品详情：复用 ArticleDetail，并注入作品外链 */
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ArticleDetail from '@/components/common/ArticleDetail.vue'
import { workLinks } from '@/data/works'

const route = useRoute()
const links = computed(() => workLinks[String(route.params.slug)] ?? [])
</script>

<template>
  <ArticleDetail collection="works" base-path="/works" label="作品" :links="links" />
</template>
