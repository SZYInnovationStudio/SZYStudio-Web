<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import AppDrawer from './AppDrawer.vue'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()

const drawerOpen = ref(false)
const scrolled = ref(false)

function localeLink(name) {
  return { name, params: { locale: locale.value === 'en' ? 'en' : undefined } }
}

function toggleLang() {
  const newLocale = locale.value === 'zh' ? 'en' : 'zh'
  locale.value = newLocale
  const currentPath = router.currentRoute.value.path
  if (newLocale === 'en' && !currentPath.startsWith('/en')) {
    router.push(currentPath === '/' ? '/en' : `/en${currentPath}`)
  } else if (newLocale === 'zh' && currentPath.startsWith('/en')) {
    router.push(currentPath.replace(/^\/en/, '') || '/')
  }
}

function onScroll() {
  scrolled.value = window.scrollY > 10
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

function isActive(path) {
  if (path === '/') return route.path === '/' || route.path === '/en'
  return route.path.includes(path)
}

function goServices() {
  const isHome = route.path === '/' || route.path === '/en'
  if (isHome) {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
  } else {
    router.push(locale.value === 'zh' ? '/' : '/en').then(() => {
      setTimeout(() => {
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    })
  }
}
</script>

<template>
  <header
    class="fixed top-0 inset-x-0 z-50 transition-shadow duration-300"
    :class="scrolled ? 'shadow-[0_2px_24px_rgba(0,0,0,0.08)]' : 'shadow-[0_1px_8px_rgba(0,0,0,0.04)]'"
  >
    <div class="bg-white/80 backdrop-blur-md border-b border-white/20">
      <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <router-link :to="localeLink('home')" class="flex items-center gap-3 no-underline">
          <img
            src="https://szycdn.szyd.fun/szystudio/favicon.png"
            alt="SZY Logo"
            class="h-9 w-9 rounded-lg"
            style="filter: drop-shadow(0 0 2px #fff) drop-shadow(0 0 8px #3D5A80)"
          />
          <span class="text-lg font-bold text-neutral-800 tracking-tight hidden sm:block">
            {{ t('footer.brand') }}
          </span>
        </router-link>

        <nav class="hidden md:flex items-center gap-1">
          <button
            @click="goServices"
            class="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
            :class="isActive('/') && !isActive('/about') && !isActive('/members')
              ? 'bg-accent-soft text-accent'
              : 'text-neutral-600 hover:text-accent hover:bg-accent-soft/50'"
          >
            {{ t('nav.services') }}
          </button>
          <router-link
            :to="localeLink('members')"
            class="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
            :class="isActive('/members')
              ? 'bg-accent-soft text-accent'
              : 'text-neutral-600 hover:text-accent hover:bg-accent-soft/50'"
          >
            {{ t('nav.members') }}
          </router-link>
          <router-link
            :to="localeLink('about')"
            class="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
            :class="isActive('/about')
              ? 'bg-accent-soft text-accent'
              : 'text-neutral-600 hover:text-accent hover:bg-accent-soft/50'"
          >
            {{ t('nav.about') }}
          </router-link>

          <span class="w-px h-5 bg-neutral-200 mx-2" />

          <button
            class="px-3 py-2 rounded-full text-xs font-semibold text-accent bg-accent-soft/50 hover:bg-accent-soft transition-colors"
            @click="toggleLang"
            :title="t('side.language')"
          >
            {{ locale === 'zh' ? 'EN' : 'ZH' }}
          </button>
        </nav>

        <button
          class="md:hidden flex flex-col gap-1.5 p-2 -mr-2 z-50"
          @click="drawerOpen = !drawerOpen"
          :aria-label="drawerOpen ? '关闭菜单' : '打开菜单'"
        >
          <span
            class="block w-5 h-0.5 bg-neutral-700 rounded-full transition-all duration-300 origin-center"
            :class="drawerOpen ? 'rotate-45 translate-y-1' : ''"
          />
          <span
            class="block w-5 h-0.5 bg-neutral-700 rounded-full transition-all duration-300"
            :class="drawerOpen ? 'opacity-0' : ''"
          />
          <span
            class="block w-5 h-0.5 bg-neutral-700 rounded-full transition-all duration-300 origin-center"
            :class="drawerOpen ? '-rotate-45 -translate-y-1' : ''"
          />
        </button>
      </div>
    </div>

    <AppDrawer :open="drawerOpen" @close="drawerOpen = false" />
  </header>
</template>
