<script setup lang="ts">
/**
 * 移动端全屏菜单
 * --------------------------------------------------
 * 从右轻微淡入覆盖全屏，链接逐项 stagger 出现；
 * 打开时停止 Lenis 滚动，关闭后恢复。
 */
import { watch } from 'vue'
import { site } from '@/data/site'
import { useLenis } from '@/composables/useLenis'
import AppIcon from '@/components/common/AppIcon.vue'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const { stop, start } = useLenis()

watch(
  () => props.open,
  (open) => {
    if (open) stop()
    else start()
  },
)
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-400 ease-smooth"
    leave-active-class="transition-opacity duration-300 ease-smooth"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="open"
      class="fixed inset-0 z-[60] flex flex-col bg-paper dark:bg-dark-paper md:hidden"
      role="dialog"
      aria-modal="true"
    >
      <!-- 顶部关闭栏 -->
      <div class="flex h-16 items-center justify-end px-6">
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center"
          aria-label="关闭菜单"
          @click="emit('close')"
        >
          <span class="relative block h-5 w-5">
            <span class="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 rotate-45 bg-current"></span>
            <span class="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 -rotate-45 bg-current"></span>
          </span>
        </button>
      </div>

      <!-- 链接 -->
      <nav class="flex flex-1 flex-col justify-center gap-2 px-8">
        <RouterLink
          v-for="(item, i) in site.nav"
          :key="item.label"
          :to="item.to"
          class="menu-link group flex items-baseline justify-between border-b border-line py-5 dark:border-dark-line"
          :style="{ transitionDelay: `${120 + i * 70}ms` }"
          @click="emit('close')"
        >
          <span class="text-2xl font-bold tracking-wider2">{{ item.label }}</span>
          <AppIcon name="arrow-up-right" :size="18" class="text-faint" />
        </RouterLink>
      </nav>

      <!-- 底部社交 -->
      <div class="flex flex-wrap gap-x-6 gap-y-2 px-8 pb-12 text-xs text-muted dark:text-dark-muted">
        <a
          v-for="social in site.social"
          :key="social.label"
          :href="social.url"
          class="link-underline"
          @click="emit('close')"
          >{{ social.label }}</a
        >
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.menu-link {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.v-enter-active .menu-link,
.v-enter-done .menu-link {
  opacity: 1;
  transform: translateY(0);
}
</style>
