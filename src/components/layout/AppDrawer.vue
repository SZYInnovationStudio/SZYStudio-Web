<script setup>
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const props = defineProps({
  open: { type: Boolean, default: false }
})

const emit = defineEmits(['close'])

const { t, locale } = useI18n()
const router = useRouter()

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

function close() {
  emit('close')
}

function goServices() {
  close()
  const isHome = router.currentRoute.value.path === '/' || router.currentRoute.value.path === '/en'
  if (isHome) {
    setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 350)
  } else {
    router.push(locale.value === 'zh' ? '/' : '/en').then(() => {
      setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 300)
    })
  }
}

watch(() => props.open, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})
</script>

<template>
  <Teleport to="body">
    <transition name="drawer-fade">
      <div
        v-if="open"
        class="fixed inset-0 z-[1100] bg-black/30 backdrop-blur-sm"
        @click="close"
        aria-hidden="true"
      />
    </transition>

    <transition name="drawer-slide">
      <div
        v-if="open"
        class="fixed inset-x-0 bottom-0 z-[1101] max-h-[75vh] overflow-y-auto rounded-t-3xl bg-white/95 backdrop-blur-xl border-t border-white/20 shadow-[0_-8px_32px_rgba(0,0,0,0.12)]"
        :style="{ paddingBottom: 'env(safe-area-inset-bottom, 16px)' }"
      >
        <div class="flex justify-center pt-3 pb-1">
          <div class="w-10 h-1 rounded-full bg-neutral-300" />
        </div>

        <nav class="px-6 py-4 space-y-1">
          <button
            class="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-lg font-medium text-neutral-700 hover:bg-accent-soft transition-colors text-left"
            @click="goServices"
          >
            <svg class="w-5 h-5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
            {{ t('nav.services') }}
          </button>
          <router-link
            :to="localeLink('about')"
            class="flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium text-neutral-700 hover:bg-accent-soft transition-colors"
            @click="close"
          >
            <svg class="w-5 h-5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" stroke-linecap="round" />
            </svg>
            {{ t('nav.about') }}
          </router-link>
          <router-link
            :to="localeLink('members')"
            class="flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium text-neutral-700 hover:bg-accent-soft transition-colors"
            @click="close"
          >
            <svg class="w-5 h-5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke-linecap="round" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke-linecap="round" />
            </svg>
            {{ t('nav.members') }}
          </router-link>

          <hr class="my-3 border-neutral-200" />

          <button
            class="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-lg font-medium text-neutral-700 hover:bg-accent-soft transition-colors"
            @click="toggleLang"
          >
            <svg class="w-5 h-5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <circle cx="12" cy="12" r="10" />
              <ellipse cx="12" cy="12" rx="4" ry="10" />
              <path d="M2 12h20" />
            </svg>
            {{ locale === 'zh' ? 'Switch to English' : '切换到中文' }}
          </button>

          <a
            href="https://status.szystudio.cn"
            target="_blank"
            rel="noopener"
            class="flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium text-neutral-700 hover:bg-accent-soft transition-colors"
            @click="close"
          >
            <svg class="w-5 h-5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <rect x="2" y="2" width="20" height="8" rx="2" />
              <rect x="2" y="14" width="20" height="8" rx="2" />
              <circle cx="6" cy="6" r="1" fill="currentColor" />
              <circle cx="6" cy="18" r="1" fill="currentColor" />
            </svg>
            {{ t('side.status') }}
          </a>
        </nav>

        <div class="px-6 pb-6 pt-2 text-center text-sm text-neutral-400">
          SZY Innovation Studio © 2026
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.3s ease;
}
.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}

.drawer-slide-enter-active {
  transition: transform 0.45s cubic-bezier(0.32, 0.72, 0, 1);
}
.drawer-slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateY(100%);
}
</style>
