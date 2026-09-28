<script setup lang="ts">
/**
 * 题库列表页 /interview
 * 卡片形式展示 HTML/CSS、JavaScript 两份题库
 */
import { useHead } from '@unhead/vue'
import { getCollection } from '@/lib/content'
import SectionHeading from '@/components/common/SectionHeading.vue'
import Reveal from '@/components/common/Reveal.vue'
import AppIcon from '@/components/common/AppIcon.vue'

const items = getCollection('interview')

useHead({
  title: '题库',
  meta: [{ name: 'description', content: '前端面试题库：HTML/CSS 与 JavaScript 高频问题整理。' }],
})
</script>

<template>
  <main class="pt-28 md:pt-36">
    <div class="mx-auto max-w-content px-6 py-20 md:px-10 md:py-28">
      <Reveal>
        <SectionHeading en="INTERVIEW" title="题库" as="h1" />
      </Reveal>

      <div class="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
        <Reveal v-for="(item, i) in items" :key="item.slug" :delay="i * 100">
          <RouterLink
            :to="`/interview/${item.slug}`"
            class="group flex h-full flex-col justify-between border border-line p-8 transition-colors hover:border-ink dark:border-dark-line dark:hover:border-dark-ink md:p-10"
          >
            <div>
              <span class="text-[10px] tracking-label text-faint">QUESTION BANK 0{{ i + 1 }}</span>
              <h3 class="mt-5 text-xl font-bold md:text-2xl">{{ item.title }}</h3>
              <p class="mt-4 text-[13px] leading-7 text-muted dark:text-dark-muted">
                {{ item.summary }}
              </p>
            </div>
            <span class="mt-10 inline-flex items-center gap-2 text-[12px] font-bold tracking-wider2">
              开始阅读
              <AppIcon
                name="arrow-right"
                :size="14"
                class="transition-transform duration-400 ease-smooth group-hover:translate-x-1"
              />
            </span>
          </RouterLink>
        </Reveal>
      </div>
    </div>
  </main>
</template>
