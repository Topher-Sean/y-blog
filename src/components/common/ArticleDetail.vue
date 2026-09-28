<script setup lang="ts">
/**
 * 文章详情通用组件
 * --------------------------------------------------
 * 作品 / 笔记 / 题库 / 训练 四个详情页复用；
 * 包含：返回链接、标题头、外部链接、正文、上一篇/下一篇。
 */
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import {
  getBySlug,
  getCollection,
  type Collection,
  type ContentItem,
} from '@/lib/content'
import Reveal from '@/components/common/Reveal.vue'
import MarkdownView from '@/components/common/MarkdownView.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

const props = defineProps<{
  collection: Collection
  /** 列表页基础路径（如 /works） */
  basePath: string
  /** 集合中文名 */
  label: string
  /** 外部链接（作品详情使用） */
  links?: { label: string; url: string; note?: string }[]
}>()

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const item = computed<ContentItem | undefined>(() => getBySlug(props.collection, slug.value))

// 同集合排序后的条目，用于上一篇/下一篇
const siblings = computed(() => getCollection(props.collection))
const currentIndex = computed(() => siblings.value.findIndex((s) => s.slug === slug.value))
const prev = computed(() =>
  currentIndex.value > 0 ? siblings.value[currentIndex.value - 1] : undefined,
)
const next = computed(() =>
  currentIndex.value >= 0 && currentIndex.value < siblings.value.length - 1
    ? siblings.value[currentIndex.value + 1]
    : undefined,
)

useHead(
  computed(() =>
    item.value
      ? {
          title: item.value.title,
          meta: [{ name: 'description', content: item.value.summary }],
        }
      : { title: '页面不存在' },
  ),
)
</script>

<template>
  <NotFoundPage v-if="!item" />
  <main v-else class="pt-28 md:pt-36">
    <article>
      <!-- 头部 -->
      <header class="mx-auto max-w-content px-6 md:px-10">
        <Reveal>
          <RouterLink
            :to="basePath"
            class="inline-flex items-center gap-2 text-[11px] tracking-label text-faint transition-opacity hover:opacity-60 dark:text-dark-faint"
          >
            BACK TO {{ label.toUpperCase() }}
          </RouterLink>
        </Reveal>

        <Reveal :delay="80">
          <p class="mt-8 text-[11px] tracking-label text-faint dark:text-dark-faint">
            {{ label }}{{ item.date ? ` · ${item.date}` : '' }}
          </p>
          <h1 class="mt-3 max-w-3xl text-3xl font-bold leading-snug tracking-wide md:text-4xl">
            {{ item.title }}
          </h1>
          <p v-if="item.summary" class="mt-5 max-w-2xl text-[15px] leading-8 text-muted dark:text-dark-muted">
            {{ item.summary }}
          </p>
        </Reveal>

        <!-- 外部访问链接 -->
        <Reveal v-if="links && links.length" :delay="140">
          <div class="mt-9 flex flex-wrap gap-3">
            <a
              v-for="link in links"
              :key="link.label"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex items-center gap-2 border border-line px-4 py-2.5 text-[12px] font-bold tracking-wide transition-colors hover:border-ink dark:border-dark-line dark:hover:border-dark-ink"
            >
              {{ link.label }}
              <AppIcon name="arrow-up-right" :size="13" />
            </a>
          </div>
        </Reveal>

        <div class="mt-12 border-t border-line dark:border-dark-line"></div>
      </header>

      <!-- 正文 -->
      <div class="mx-auto max-w-prose px-6 py-14 md:px-8 md:py-20">
        <MarkdownView :body="item.body" />
      </div>
    </article>

    <!-- 上一篇 / 下一篇 -->
    <nav class="mx-auto max-w-content px-6 pb-24 md:px-10 md:pb-32">
      <div class="grid border-t border-line dark:border-dark-line md:grid-cols-2">
        <RouterLink
          v-if="prev"
          :to="`${basePath}/${prev.slug}`"
          class="group flex items-center gap-4 border-b border-line py-7 dark:border-dark-line md:border-b-0 md:border-r md:pr-8"
        >
          <AppIcon name="arrow-right" :size="16" class="rotate-180 text-faint" />
          <span class="min-w-0">
            <span class="block text-[10px] tracking-label text-faint">PREV</span>
            <span class="mt-1 block truncate text-sm font-bold">{{ prev.title }}</span>
          </span>
        </RouterLink>
        <span v-else class="hidden md:block"></span>

        <RouterLink
          v-if="next"
          :to="`${basePath}/${next.slug}`"
          class="group flex items-center justify-end gap-4 py-7 md:pl-8"
        >
          <span class="min-w-0 text-right">
            <span class="block text-[10px] tracking-label text-faint">NEXT</span>
            <span class="mt-1 block truncate text-sm font-bold">{{ next.title }}</span>
          </span>
          <AppIcon name="arrow-right" :size="16" class="text-faint" />
        </RouterLink>
      </div>
    </nav>
  </main>
</template>
