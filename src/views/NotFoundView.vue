<script setup>
import { useI18n } from 'vue-i18n'
import FluidButton from '@/components/ui/FluidButton.vue'

const { t, locale } = useI18n()
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 pt-24 pb-16 min-h-[80vh] flex flex-col items-center justify-center text-center">
    <p class="text-[clamp(4rem,10vw,8rem)] font-extrabold text-accent/20 leading-none select-none">404</p>
    <h1 class="text-2xl font-bold text-neutral-800 mt-2 mb-4">
      {{ locale === 'zh' ? '抱歉，页面不存在' : 'Sorry, the page you are looking for does not exist.' }}
    </h1>
    <p class="text-neutral-500 mb-8">
      {{ locale === 'zh' ? '您访问的页面可能已被移除或链接错误。' : 'The page may have been removed or the link is incorrect.' }}
    </p>
    <FluidButton variant="primary" to="/">
      {{ locale === 'zh' ? '返回首页' : 'Back to Home' }}
    </FluidButton>
  </div>
</template>
