<script setup lang="ts">
/**
 * 笔记列表页 /notes
 * 列表行形式展示全部经验文章
 */
import { useHead } from '@unhead/vue'
import { getCollection } from '@/lib/content'
import SectionHeading from '@/components/common/SectionHeading.vue'
import Reveal from '@/components/common/Reveal.vue'
import AppIcon from '@/components/common/AppIcon.vue'

const notes = getCollection('notes')

useHead({
  title: '笔记',
  meta: [{ name: 'description', content: '前端开发笔记：axios 封装、自动化部署、支付接入、WebSocket 等。' }],
})
</script>

<template>
  <main class="pt-28 md:pt-36">
    <div class="mx-auto max-w-content px-6 py-20 md:px-10 md:py-28">
      <Reveal>
        <SectionHeading en="NOTES" title="问题及处理" as="h1" />
        <p class="mt-4 text-[12px] tracking-label text-faint dark:text-dark-faint">
          {{ notes.length }} NOTES
        </p>
      </Reveal>

      <ul class="mt-12 border-t border-line dark:border-dark-line">
        <li v-for="(note, i) in notes" :key="note.slug">
          <Reveal :delay="(i % 5) * 70" as="div">
            <RouterLink
              :to="`/notes/${note.slug}`"
              class="group flex items-center gap-5 border-b border-line py-6 dark:border-dark-line md:gap-8"
            >
              <span class="w-8 shrink-0 text-[11px] tracking-label text-faint dark:text-dark-faint">
                {{ String(i + 1).padStart(2, '0') }}
              </span>
              <div class="min-w-0 flex-1">
                <h3 class="truncate text-[15px] font-bold md:text-base">{{ note.title }}</h3>
                <p class="mt-1.5 truncate text-[12px] text-muted dark:text-dark-muted">
                  {{ note.summary }}
                </p>
              </div>
              <AppIcon
                name="arrow-up-right"
                :size="16"
                class="shrink-0 text-faint transition-all duration-400 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink dark:group-hover:text-dark-ink"
              />
            </RouterLink>
          </Reveal>
        </li>
      </ul>
    </div>
  </main>
</template>
