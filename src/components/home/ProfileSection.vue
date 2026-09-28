<script setup lang="ts">
/**
 * 首页 · 简介区块
 * --------------------------------------------------
 * 左图右文双栏（移动端堆叠），大量留白；
 * 文案取自简历数据，不额外杜撰。
 */
import { resume } from '@/data/resume'
import Reveal from '@/components/common/Reveal.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import AppIcon from '@/components/common/AppIcon.vue'

// 头像图片（也可直接替换 src/assets/images/avatar/ 下文件）
import avatar from '@/assets/images/avatar/个人照片.jpg'
</script>

<template>
  <section class="bg-surface dark:bg-dark-surface">
    <div class="mx-auto max-w-content px-6 py-24 md:px-10 md:py-32">
      <div class="grid gap-12 md:grid-cols-12 md:gap-16">
        <!-- 照片 -->
        <Reveal variant="media" class="md:col-span-5">
          <div class="relative">
            <img
              :src="avatar"
              alt="叶泽顺个人照片"
              class="aspect-[4/5] w-full object-cover"
              loading="lazy"
            />
            <span class="absolute bottom-3 left-3 bg-paper/90 px-3 py-1.5 text-[10px] tracking-label dark:bg-dark-paper/90">
              PROFILE
            </span>
          </div>
        </Reveal>

        <!-- 文字 -->
        <div class="flex flex-col justify-center md:col-span-7">
          <Reveal>
            <SectionHeading en="PROFILE" title="关于我" />
          </Reveal>
          <Reveal :delay="100">
            <p class="mt-8 text-xl font-bold md:text-2xl">{{ resume.name }} · 前端开发工程师</p>
          </Reveal>
          <Reveal :delay="160">
            <p class="mt-6 text-[15px] leading-8 text-muted dark:text-dark-muted md:text-base">
              {{ resume.skills[0] }}
            </p>
          </Reveal>
          <Reveal :delay="220">
            <p class="mt-4 text-[15px] leading-8 text-muted dark:text-dark-muted md:text-base">
              {{ resume.skills[2] }}
            </p>
          </Reveal>
          <Reveal :delay="280">
            <RouterLink
              to="/about"
              class="link-underline mt-9 inline-flex items-center gap-3 text-[13px] font-bold tracking-wider2"
            >
              查看完整简历
              <AppIcon name="arrow-right" :size="16" />
            </RouterLink>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
</template>
