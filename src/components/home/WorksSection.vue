<script setup lang="ts">
/**
 * 首页 · 作品区块
 * --------------------------------------------------
 * 分类筛选（全部 / AI 应用 / 平台与中后台 / 早期记录）
 * + 直角网格；大量上下留白，对齐 doisena.jp 的 work 区。
 */
import { computed, ref } from 'vue'
import { getCollection } from '@/lib/content'
import { workCategories, featuredWorks } from '@/data/works'
import SectionHeading from '@/components/common/SectionHeading.vue'
import Reveal from '@/components/common/Reveal.vue'
import WorkCard from '@/components/works/WorkCard.vue'

/**
 * 标题标签：首页区块为 h2；
 * 在独立 /works 列表页使用时传 'h1'，保证每页一个 h1
 */
const props = withDefaults(defineProps<{ headingAs?: 'h1' | 'h2' }>(), {
  headingAs: 'h2',
})

const active = ref('all')

/** 全部作品：精选 6 个按指定顺序在前，其余按 frontmatter 顺序补入 */
const works = computed(() => {
  const all = getCollection('works')
  const featuredSet = new Set(featuredWorks)
  const orderedFeatured = featuredWorks
    .map((slug) => all.find((w) => w.slug === slug))
    .filter((w): w is NonNullable<typeof w> => Boolean(w))
  const rest = all.filter((w) => !featuredSet.has(w.slug))
  return [...orderedFeatured, ...rest]
})

/** 当前分类下的作品 */
const filtered = computed(() =>
  active.value === 'all' ? works.value : works.value.filter((w) => w.category === active.value),
)
</script>

<template>
  <section id="works" class="scroll-mt-24">
    <!-- 大留白：py-24/32 对齐参考站 173/157 区块间距感 -->
    <div class="mx-auto max-w-content px-6 py-24 md:px-10 md:py-32">
      <!-- 标题行 -->
      <Reveal>
        <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading en="SELECTED WORKS" title="作品" :as="props.headingAs" />
          <span class="text-[11px] tracking-label text-faint dark:text-dark-faint">
            {{ filtered.length }} WORKS
          </span>
        </div>
      </Reveal>

      <!-- 分类筛选 -->
      <Reveal :delay="80">
        <div class="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-b border-line pb-5 dark:border-dark-line">
          <button
            v-for="cat in workCategories"
            :key="cat.value"
            type="button"
            class="text-[12px] font-bold tracking-wider2 transition-colors"
            :class="
              active === cat.value
                ? 'text-accent'
                : 'text-muted hover:text-ink dark:text-dark-muted dark:hover:text-dark-ink'
            "
            @click="active = cat.value"
          >
            {{ cat.label }}
            <span class="ml-1 text-[10px] font-normal tracking-label opacity-60">{{ cat.en }}</span>
          </button>
        </div>
      </Reveal>

      <!-- 作品网格：移动端 2 列，桌面 4 列 -->
      <div class="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 md:gap-x-6 md:gap-y-16 lg:grid-cols-4">
        <Reveal
          v-for="(work, i) in filtered"
          :key="work.slug"
          :delay="(i % 4) * 90"
        >
          <WorkCard :work="work" :index="i" />
        </Reveal>
      </div>
    </div>
  </section>
</template>
