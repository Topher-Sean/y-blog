<script setup lang="ts">
/**
 * 首页 · 最新笔记区块
 * --------------------------------------------------
 * doisena news 式的列表行：序号 + 标题 + 摘要 + 箭头，细线分隔。
 */
import { getLatestNotes } from '@/lib/content'
import SectionHeading from '@/components/common/SectionHeading.vue'
import Reveal from '@/components/common/Reveal.vue'
import AppIcon from '@/components/common/AppIcon.vue'

const notes = getLatestNotes(5)
</script>

<template>
  <section>
    <div class="mx-auto max-w-content px-6 py-24 md:px-10 md:py-32">
      <Reveal>
        <div class="flex items-end justify-between">
          <SectionHeading en="LATEST NOTES" title="最新笔记" />
          <RouterLink
            to="/notes"
            class="link-underline hidden text-[12px] font-bold tracking-wider2 md:inline-flex md:items-center md:gap-2"
          >
            查看全部
            <AppIcon name="arrow-right" :size="14" />
          </RouterLink>
        </div>
      </Reveal>

      <ul class="mt-12 border-t border-line dark:border-dark-line">
        <li v-for="(note, i) in notes" :key="note.slug">
          <Reveal :delay="i * 70" as="div">
            <RouterLink
              :to="`/notes/${note.slug}`"
              class="group flex items-center gap-5 border-b border-line py-6 transition-colors dark:border-dark-line md:gap-8"
            >
              <span class="w-8 shrink-0 text-[11px] tracking-label text-faint dark:text-dark-faint">
                {{ String(i + 1).padStart(2, '0') }}
              </span>
              <div class="min-w-0 flex-1">
                <h3 class="truncate text-[15px] font-bold tracking-wide md:text-base">
                  {{ note.title }}
                </h3>
                <p
                  v-if="note.summary"
                  class="mt-1.5 truncate text-[12px] text-muted dark:text-dark-muted"
                >
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

      <RouterLink
        to="/notes"
        class="link-underline mt-10 inline-flex items-center gap-2 text-[12px] font-bold tracking-wider2 md:hidden"
      >
        查看全部笔记
        <AppIcon name="arrow-right" :size="14" />
      </RouterLink>
    </div>
  </section>
</template>
