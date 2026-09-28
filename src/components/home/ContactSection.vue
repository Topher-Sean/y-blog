<script setup lang="ts">
/**
 * 首页 · 联系区块
 * --------------------------------------------------
 * 大邮箱链接 + 电话 / 社交 / 简历下载；克制留白。
 */
import { site } from '@/data/site'
import Reveal from '@/components/common/Reveal.vue'
import AppIcon from '@/components/common/AppIcon.vue'
</script>

<template>
  <section class="bg-surface dark:bg-dark-surface">
    <div class="mx-auto max-w-content px-6 py-24 md:px-10 md:py-36">
      <Reveal>
        <p class="text-[11px] tracking-label text-faint dark:text-dark-faint">CONTACT</p>
        <h2 class="mt-4 text-2xl font-bold tracking-wider2 md:text-3xl">保持联系</h2>
      </Reveal>

      <!-- 大邮箱 -->
      <Reveal :delay="100">
        <a
          href="mailto:1274300766@qq.com"
          class="group mt-12 block border-b border-line pb-8 dark:border-dark-line md:mt-16"
        >
          <span class="flex items-center justify-between gap-6">
            <span class="font-serif text-[7vw] font-medium leading-none md:text-6xl">
              1274300766@qq.com
            </span>
            <AppIcon
              name="arrow-up-right"
              :size="34"
              class="shrink-0 text-faint transition-all duration-500 ease-smooth group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink dark:group-hover:text-dark-ink"
            />
          </span>
        </a>
      </Reveal>

      <!-- 信息列 -->
      <div class="mt-14 grid gap-10 md:grid-cols-3">
        <Reveal :delay="120">
          <p class="text-[10px] tracking-label text-faint dark:text-dark-faint">PHONE</p>
          <a href="tel:1506816236" class="mt-3 block text-base font-bold">15060816236</a>
        </Reveal>
        <Reveal :delay="200">
          <p class="text-[10px] tracking-label text-faint dark:text-dark-faint">SOCIAL</p>
          <div class="mt-3 flex flex-col gap-2">
            <a
              v-for="social in site.social.filter((s) => s.icon === 'github' || s.icon === 'link')"
              :key="social.label"
              :href="social.url"
              class="link-underline w-fit text-[14px] font-bold"
              >{{ social.label }}</a
            >
          </div>
        </Reveal>
        <Reveal :delay="280">
          <p class="text-[10px] tracking-label text-faint dark:text-dark-faint">RESUME</p>
          <a
            :href="site.resumePdf"
            download
            class="mt-3 inline-flex items-center gap-2 text-[14px] font-bold"
          >
            下载 PDF 简历
            <AppIcon name="arrow-right" :size="15" />
          </a>
        </Reveal>
      </div>
    </div>
  </section>
</template>
