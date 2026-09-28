<script setup lang="ts">
/**
 * 训练计划列表页 /training（当前仅一篇，卡片形式）
 */
import { useHead } from '@unhead/vue'
import { getCollection } from '@/lib/content'
import SectionHeading from '@/components/common/SectionHeading.vue'
import Reveal from '@/components/common/Reveal.vue'
import AppIcon from '@/components/common/AppIcon.vue'

const items = getCollection('training')

useHead({
  title: '训练计划',
  meta: [{ name: 'description', content: '半年周期分阶段训练计划与经济型饮食计划。' }],
})
</script>

<template>
  <main class="pt-28 md:pt-36">
    <div class="mx-auto max-w-content px-6 py-20 md:px-10 md:py-28">
      <Reveal>
        <SectionHeading en="TRAINING" title="训练计划" as="h1" />
      </Reveal>

      <div class="mt-14">
        <Reveal v-for="item in items" :key="item.slug">
          <RouterLink
            :to="`/training/${item.slug}`"
            class="group flex items-center justify-between gap-6 border border-line p-8 transition-colors hover:border-ink dark:border-dark-line dark:hover:border-dark-ink md:p-10"
          >
            <div>
              <span class="text-[10px] tracking-label text-faint">TRAINING PLAN</span>
              <h3 class="mt-4 text-xl font-bold md:text-2xl">{{ item.title }}</h3>
              <p class="mt-3 text-[13px] text-muted dark:text-dark-muted">{{ item.summary }}</p>
            </div>
            <AppIcon
              name="arrow-right"
              :size="20"
              class="shrink-0 text-faint transition-all duration-400 ease-smooth group-hover:translate-x-1 group-hover:text-ink dark:group-hover:text-dark-ink"
            />
          </RouterLink>
        </Reveal>
      </div>
    </div>
  </main>
</template>
