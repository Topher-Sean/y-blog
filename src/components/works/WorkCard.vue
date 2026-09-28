<script setup lang="ts">
/**
 * 作品卡片
 * --------------------------------------------------
 * 直角、无圆角无阴影（doisena 式）；有封面图显示图，
 * 没有封面图时显示「序号 + 分类」排版占位，等待替换真实图片。
 */
import type { ContentItem } from '@/lib/content'
import AppIcon from '@/components/common/AppIcon.vue'

const props = defineProps<{
  work: ContentItem
  /** 在全部作品中的序号（用于占位排版） */
  index: number
}>()

/**
 * 封面图约定：src/assets/images/covers/{slug}.jpg
 * 构建时扫描该目录；放对应文件即自动生效，无需改代码。
 */
const coverModules = import.meta.glob('@/assets/images/covers/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const coverSrc = (slug: string): string | undefined => {
  const hit = Object.entries(coverModules).find(([path]) => {
    const name = path.split('/').pop()?.replace(/\.(jpg|jpeg|png|webp|avif)$/, '')
    return name === slug
  })
  return hit?.[1]
}

/** 分类中文小标签 */
const categoryLabel: Record<string, string> = {
  ai: 'AI APP',
  platform: 'PLATFORM',
  archive: 'ARCHIVE',
}
</script>

<template>
  <RouterLink :to="`/works/${props.work.slug}`" class="group block">
    <!-- 媒体区：4:5 比例（对齐参考站卡片比例） -->
    <div class="relative aspect-[4/5] overflow-hidden bg-line/50 dark:bg-dark-line/50">
      <img
        v-if="coverSrc(props.work.slug)"
        :src="coverSrc(props.work.slug)"
        :alt="props.work.title"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-[1.2s] ease-smooth group-hover:scale-[1.03]"
      />
      <!-- 无封面时的排版占位 -->
      <div
        v-else
        class="flex h-full w-full flex-col justify-between p-4 md:p-5"
      >
        <span class="text-[10px] tracking-label text-muted dark:text-dark-muted">
          {{ categoryLabel[props.work.category] ?? 'WORK' }}
        </span>
        <span class="font-serif text-6xl leading-none opacity-25 md:text-7xl">
          {{ String(props.index + 1).padStart(2, '0') }}
        </span>
      </div>

      <!-- hover 右上角箭头 -->
      <span
        class="absolute right-3 top-3 flex h-8 w-8 translate-y-2 items-center justify-center bg-paper/90 opacity-0 transition-all duration-500 ease-smooth group-hover:translate-y-0 group-hover:opacity-100 dark:bg-dark-paper/90"
      >
        <AppIcon name="arrow-up-right" :size="15" />
      </span>
    </div>

    <!-- 文字信息 -->
    <div class="pt-4">
      <div class="flex items-baseline justify-between gap-3">
        <h3 class="text-sm font-bold tracking-wide md:text-[15px]">{{ props.work.title }}</h3>
        <span
          v-if="props.work.date"
          class="shrink-0 text-[11px] text-faint dark:text-dark-faint"
          >{{ props.work.date }}</span
        >
      </div>
      <p
        v-if="props.work.summary"
        class="mt-2 line-clamp-2 text-[12px] leading-relaxed text-muted dark:text-dark-muted"
      >
        {{ props.work.summary }}
      </p>
    </div>
  </RouterLink>
</template>
