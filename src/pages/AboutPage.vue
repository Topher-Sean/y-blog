<script setup lang="ts">
/**
 * 关于 / 简历页 /about
 * 数据全部来自 src/data/resume.ts（2026 新版简历）
 */
import { useHead } from '@unhead/vue'
import { resume } from '@/data/resume'
import { site } from '@/data/site'
import Reveal from '@/components/common/Reveal.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import ResumeProjectBlock from '@/components/resume/ResumeProjectBlock.vue'

useHead({
  title: '关于',
  meta: [
    {
      name: 'description',
      content: '叶泽顺，前端开发工程师，厦门。技能、项目经验、工作经历、教育背景与自我评价。',
    },
  ],
})

/** 基本信息条目（用于循环展示） */
const basicInfo = [
  { label: '出生年月', value: resume.basic.birth },
  { label: '性别', value: resume.basic.gender },
  { label: '籍贯', value: resume.basic.hometown },
  { label: '政治面貌', value: resume.basic.political },
  { label: '电话', value: resume.basic.phone },
  { label: '邮箱', value: resume.basic.email },
]

/** 区块小标题 */
const sectionMeta = [
  { id: 'skills', en: 'SKILLS', title: '技能特长' },
  { id: 'projects', en: 'PROJECTS', title: '项目经验' },
  { id: 'work', en: 'WORK EXPERIENCE', title: '工作经历' },
  { id: 'education', en: 'EDUCATION', title: '教育背景' },
  { id: 'research', en: 'RESEARCH', title: '科研成果' },
  { id: 'honors', en: 'HONORS', title: '荣誉证书' },
  { id: 'evaluation', en: 'SELF EVALUATION', title: '自我评价' },
]
</script>

<template>
  <main class="pt-28 md:pt-36">
    <!-- 页头 -->
    <header class="mx-auto max-w-content px-6 md:px-10">
      <Reveal>
        <p class="text-[11px] tracking-label text-faint dark:text-dark-faint">ABOUT / RESUME</p>
        <h1 class="mt-5 font-serif text-5xl font-medium tracking-wide md:text-7xl">
          {{ resume.name }}
        </h1>
        <p class="mt-5 text-base font-bold tracking-wider2 md:text-lg">{{ resume.headline }}</p>

        <div class="mt-8 flex flex-wrap gap-3">
          <a
            :href="site.resumePdf"
            download
            class="inline-flex items-center gap-2 bg-ink px-5 py-3 text-[12px] font-bold tracking-wider2 text-paper transition-opacity hover:opacity-80 dark:bg-dark-ink dark:text-dark-paper"
          >
            下载 PDF 简历
            <AppIcon name="arrow-right" :size="14" />
          </a>
          <a
            v-for="social in site.social.filter((s) => s.icon === 'mail' || s.icon === 'phone')"
            :key="social.label"
            :href="social.url"
            class="inline-flex items-center gap-2 border border-line px-5 py-3 text-[12px] font-bold tracking-wider2 transition-colors hover:border-ink dark:border-dark-line dark:hover:border-dark-ink"
          >
            <AppIcon :name="social.icon" :size="14" />
            {{ social.label }}
          </a>
        </div>
      </Reveal>
    </header>

    <div class="mx-auto mt-16 max-w-content px-6 md:px-10">
      <!-- 基本信息 -->
      <Reveal>
        <section class="border-t border-line pt-10 dark:border-dark-line">
          <h2 class="text-sm font-bold tracking-label">BASIC INFO · 基本信息</h2>
          <dl class="mt-8 grid grid-cols-2 gap-x-8 gap-y-7 md:grid-cols-3">
            <div v-for="info in basicInfo" :key="info.label">
              <dt class="text-[10px] tracking-label text-faint">{{ info.label }}</dt>
              <dd class="mt-1.5 text-[14px] font-bold">{{ info.value }}</dd>
            </div>
            <div>
              <dt class="text-[10px] tracking-label text-faint">个人博客</dt>
              <dd class="mt-1.5">
                <a
                  :href="resume.basic.blog.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-[14px] font-bold link-underline"
                  >{{ resume.basic.blog.name }}</a
                >
              </dd>
            </div>
          </dl>
        </section>
      </Reveal>

      <!-- 技能特长 -->
      <Reveal>
        <section class="pt-20">
          <p class="text-[11px] tracking-label text-faint">SKILLS</p>
          <h2 class="mt-3 text-2xl font-bold tracking-wider2">技能特长</h2>
          <ul class="resume-list mt-8">
            <li v-for="(skill, i) in resume.skills" :key="i">{{ skill }}</li>
          </ul>
        </section>
      </Reveal>

      <!-- 项目经验 -->
      <section class="pt-24">
        <Reveal>
          <p class="text-[11px] tracking-label text-faint">PROJECTS</p>
          <h2 class="mt-3 text-2xl font-bold tracking-wider2">项目经验</h2>
        </Reveal>
        <div class="mt-12">
          <Reveal
            v-for="(project, i) in resume.projects"
            :key="project.title"
            :delay="i * 60"
          >
            <ResumeProjectBlock :project="project" :index="i" />
          </Reveal>
        </div>
      </section>

      <!-- 工作经历 -->
      <section class="pt-24">
        <Reveal>
          <p class="text-[11px] tracking-label text-faint">WORK EXPERIENCE</p>
          <h2 class="mt-3 text-2xl font-bold tracking-wider2">工作经历</h2>
        </Reveal>

        <div class="mt-10">
          <Reveal
            v-for="(work, i) in resume.work"
            :key="work.company"
            :delay="i * 80"
          >
            <article class="pb-12">
              <div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h3 class="text-lg font-bold md:text-xl">{{ work.company }}</h3>
                <span class="text-[12px] tracking-label text-faint">{{ work.period }}</span>
              </div>
              <p class="mt-1.5 text-[12px] font-bold text-muted dark:text-dark-muted">
                {{ work.role }}
              </p>
              <ul class="resume-list mt-5">
                <li v-for="(duty, di) in work.duties" :key="di">{{ duty }}</li>
              </ul>
            </article>
          </Reveal>
        </div>
      </section>

      <!-- 教育背景 -->
      <section class="pt-16">
        <Reveal>
          <p class="text-[11px] tracking-label text-faint">EDUCATION</p>
          <h2 class="mt-3 text-2xl font-bold tracking-wider2">教育背景</h2>
        </Reveal>
        <Reveal :delay="80">
          <article class="mt-8 border-l-2 border-line pl-6 dark:border-dark-line">
            <div class="flex flex-wrap items-baseline justify-between gap-x-6">
              <h3 class="text-lg font-bold">{{ resume.education.school }}</h3>
              <span class="text-[12px] tracking-label text-faint">{{ resume.education.period }}</span>
            </div>
            <p class="mt-2 text-[14px] font-bold text-muted dark:text-dark-muted">
              {{ resume.education.major }} · {{ resume.education.degree }}
            </p>
            <p class="mt-4 text-[13px] leading-7 text-muted dark:text-dark-muted">
              {{ resume.education.courses }}
            </p>
            <p class="mt-1 text-[13px] leading-7 text-muted dark:text-dark-muted">
              {{ resume.education.skills }}
            </p>
          </article>
        </Reveal>
      </section>

      <!-- 科研成果 -->
      <section class="pt-20">
        <Reveal>
          <p class="text-[11px] tracking-label text-faint">RESEARCH</p>
          <h2 class="mt-3 text-2xl font-bold tracking-wider2">科研成果</h2>
        </Reveal>
        <Reveal :delay="80">
          <ul class="resume-list mt-8">
            <li v-for="(paper, i) in resume.research" :key="i">{{ paper }}</li>
          </ul>
        </Reveal>
      </section>

      <!-- 荣誉证书 -->
      <section class="pt-20">
        <Reveal>
          <p class="text-[11px] tracking-label text-faint">HONORS</p>
          <h2 class="mt-3 text-2xl font-bold tracking-wider2">荣誉证书</h2>
        </Reveal>
        <Reveal :delay="80">
          <ul class="resume-list mt-8">
            <li v-for="(honor, i) in resume.honors" :key="i">{{ honor }}</li>
          </ul>
        </Reveal>
      </section>

      <!-- 自我评价 -->
      <section class="pt-20 pb-28 md:pb-36">
        <Reveal>
          <p class="text-[11px] tracking-label text-faint">SELF EVALUATION</p>
          <h2 class="mt-3 text-2xl font-bold tracking-wider2">自我评价</h2>
        </Reveal>
        <div class="mt-8 flex flex-col gap-4">
          <Reveal v-for="(text, i) in resume.selfEvaluation" :key="i" :delay="i * 70">
            <p class="text-[15px] leading-8 text-muted dark:text-dark-muted">{{ text }}</p>
          </Reveal>
        </div>
      </section>
    </div>
  </main>
</template>
