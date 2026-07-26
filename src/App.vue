<script setup>
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { watch, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import SideBar from '@/components/layout/SideBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const { locale } = useI18n()
const route = useRoute()

const htmlAttrs = computed(() => ({ lang: locale.value }))

useHead({
  htmlAttrs,
  meta: [
    { name: 'description', content: '一个由小学生和初中生创建的科技工作室，致力于用代码改变互联网' },
    { property: 'og:title', content: 'SZY创新工作室' },
    { property: 'og:description', content: '一个由小学生和初中生创建的科技工作室，致力于用代码改变互联网' },
    { property: 'og:image', content: 'https://szycdn.szyd.fun/szystudio/favicon.png' }
  ],
  link: [
    { rel: 'icon', href: 'https://szycdn.szyd.fun/szystudio/favicon.png', type: 'image/png' }
  ]
})

watch(
  () => route.params.locale,
  (val) => {
    locale.value = val === 'en' ? 'en' : 'zh'
  },
  { immediate: true }
)

watch(locale, (val) => {
  document.title = val === 'zh' ? 'SZY创新工作室' : 'SZY Innovation Studio'
}, { immediate: true })

watch(
  () => route.path,
  () => {
    nextTick(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
    })
  }
)
</script>

<template>
  <div class="bg-layer" aria-hidden="true" />

  <div class="relative z-0 min-h-screen flex flex-col">
    <AppHeader />

    <main class="grow min-h-0">
      <router-view v-slot="{ Component, route }">
        <transition name="page" mode="out-in" appear>
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>

    <SideBar />
    <div class="shrink-0">
      <AppFooter />
    </div>
  </div>
</template>

<style>
.page-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.page-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
