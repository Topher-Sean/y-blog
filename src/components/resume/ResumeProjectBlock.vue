<script setup lang="ts">
/**
 * 简历 · 单个项目块
 * 完整呈现：项目名/角色/时间、定位、技术栈、职责分组、亮点、访问链接
 */
import type { ResumeProject } from '@/data/resume'
import AppIcon from '@/components/common/AppIcon.vue'

defineProps<{ project: ResumeProject; index: number }>()
</script>

<template>
  <article class="project-block">
    <!-- 项目标题行 -->
    <div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
      <h3 class="text-xl font-bold tracking-wide md:text-2xl">
        <span class="mr-3 text-faint">{{ String(index + 1).padStart(2, '0') }}</span>
        {{ project.title }}
      </h3>
      <span class="text-[12px] tracking-label text-faint">{{ project.period }}</span>
    </div>
    <p class="mt-2 text-[12px] font-bold text-muted dark:text-dark-muted">{{ project.role }}</p>

    <!-- 定位 -->
    <p v-if="project.positioning" class="mt-6 text-[15px] leading-8">
      {{ project.positioning }}
    </p>

    <!-- 技术栈 -->
    <div v-if="project.stack && project.stack.length" class="mt-6 flex flex-wrap gap-2">
      <span
        v-for="tech in project.stack"
        :key="tech"
        class="border border-line px-3 py-1 text-[11px] tracking-wide text-muted dark:border-dark-line dark:text-dark-muted"
        >{{ tech }}</span
      >
    </div>

    <!-- 职责 -->
    <div v-if="project.duties" class="mt-7">
      <template v-for="(group, gi) in project.duties" :key="gi">
        <h4 v-if="group.heading" class="mb-3 mt-7 text-[13px] font-bold tracking-wider2">
          {{ group.heading }}
        </h4>
        <ul class="resume-list">
          <li v-for="(item, ii) in group.items" :key="ii">{{ item }}</li>
        </ul>
      </template>
    </div>

    <!-- 亮点 -->
    <div v-if="project.highlights && project.highlights.length" class="mt-7">
      <h4 class="mb-3 text-[13px] font-bold tracking-wider2 text-accent">项目亮点</h4>
      <ul class="resume-list">
        <li v-for="(item, ii) in project.highlights" :key="ii">{{ item }}</li>
      </ul>
    </div>

    <!-- 链接 -->
    <div v-if="project.links && project.links.length" class="mt-7 flex flex-col gap-2.5">
      <template v-for="(link, li) in project.links" :key="li">
        <a
          v-if="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group inline-flex items-center gap-2 text-[13px] font-bold link-underline w-fit"
        >
          <AppIcon name="link" :size="13" class="text-faint" />
          {{ link.label }}
          <span v-if="link.note" class="font-normal text-muted dark:text-dark-muted">（{{ link.note }}）</span>
        </a>
        <p v-else class="flex items-center gap-2 text-[13px] text-muted dark:text-dark-muted">
          <AppIcon name="link" :size="13" class="text-faint" />
          {{ link.label }}
          <span v-if="link.note">（{{ link.note }}）</span>
        </p>
      </template>
    </div>

    <div class="mt-14 border-t border-line dark:border-dark-line"></div>
  </article>
</template>
