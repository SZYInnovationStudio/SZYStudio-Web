<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t, locale } = useI18n()
const router = useRouter()

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function openStatus() {
  window.open('https://status.szystudio.cn', '_blank', 'noopener')
}

function toggleLanguage() {
  const newLocale = locale.value === 'zh' ? 'en' : 'zh'
  locale.value = newLocale
  const currentPath = router.currentRoute.value.path
  if (newLocale === 'en' && !currentPath.startsWith('/en')) {
    router.push(currentPath === '/' ? '/en' : `/en${currentPath}`)
  } else if (newLocale === 'zh' && currentPath.startsWith('/en')) {
    router.push(currentPath.replace(/^\/en/, '') || '/')
  }
}
</script>

<template>
  <div
    class="side-floating fixed right-3 md:right-[18px] z-[1000] flex gap-2 md:gap-3 pointer-events-none"
  >
    <button
      class="side-btn"
      :title="t('side.top')"
      :aria-label="t('side.top')"
      @click="scrollToTop"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>

    <button
      class="side-btn"
      :title="t('side.status')"
      :aria-label="t('side.status')"
      @click="openStatus"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    </button>

    <button
      class="side-btn font-bold text-sm"
      :title="t('side.language')"
      :aria-label="t('side.language')"
      @click="toggleLanguage"
    >
      {{ locale === 'zh' ? 'EN' : 'ZH' }}
    </button>
  </div>
</template>

<style scoped>
.side-floating {
  flex-direction: column;
  top: 50%;
  bottom: auto;
  transform: translateY(-50%);
}

@media (max-width: 767.98px) {
  .side-floating {
    flex-direction: row;
    top: auto;
    bottom: 18px;
    right: 12px;
    transform: none;
  }
}

.side-btn {
  pointer-events: auto;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: var(--accent);
  border: 1px solid rgba(61, 90, 128, 0.12);
  box-shadow: 0 6px 18px rgba(61, 90, 128, 0.08);
  cursor: pointer;
  transition: transform 0.18s ease, background 0.18s ease, box-shadow 0.18s ease, color 0.18s ease;
}

.side-btn:hover,
.side-btn:focus {
  transform: translateY(-4px) scale(1.03);
  background: linear-gradient(135deg, var(--accent), var(--accent-light));
  color: #fff;
  outline: none;
  box-shadow: 0 8px 24px rgba(61, 90, 128, 0.2);
}

@media (max-width: 767.98px) {
  .side-btn {
    width: 44px;
    height: 44px;
    border-radius: 10px;
  }
}
</style>
