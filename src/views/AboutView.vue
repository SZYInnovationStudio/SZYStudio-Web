<script setup>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import GlassCard from '@/components/ui/GlassCard.vue'
import FluidButton from '@/components/ui/FluidButton.vue'
import CounterAnimation from '@/components/specific/CounterAnimation.vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const INITIAL_VISIBLE = 3

const { t, locale } = useI18n()
const router = useRouter()
const { animate } = useScrollAnimation({ stagger: 100 })
const pageRef = ref(null)
const contentRef = ref(null)

const expanded = ref(false)
const collapsedHeight = ref(null)
const fullHeight = ref(null)

const journey = [
  {
    key: 'founded',
    time: { zh: '2024年末', en: 'Late 2024' },
    title: { zh: '工作室成立', en: 'Studio Founded' },
    desc: { zh: '几名初中生和小学生因共同的编程爱好走到一起，SZY 创新工作室正式成立。', en: 'Several students came together through a shared passion for programming.' },
    images: []
  },
  {
    key: 'first-service',
    time: { zh: '2025年中', en: 'Mid 2025' },
    title: { zh: '首个公益服务上线', en: 'First Public Service Launched' },
    desc: { zh: 'SZY图床正式上线，为开发者提供免费、高速的图片托管服务。', en: 'SZY Image Hosting went live, providing free and high-speed image hosting.' },
    images: []
  },
  {
    key: 'cfimmerse2025-1',
    time: { zh: '2025年9月', en: 'Sep 2025' },
    title: { zh: '首次受邀参会', en: 'Invited to Attend (First Time)' },
    desc: { zh: '第一次受邀参加 Cloudflare Immerse 2025 Guangzhou。Cloudflare Immerse 是 Cloudflare 面向业界高层决策者及 AI、网络、应用安全领域领导者举办的高级会议，在全球多个主要国家和地区同步举行。', en: 'Invited to attend Cloudflare Immerse 2025 Guangzhou for the first time. Cloudflare Immerse is a premier conference hosted by Cloudflare for senior decision-makers and leaders in AI, networking and application security across major countries and regions worldwide.' },
    images: [
      'https://szycdn.szyd.fun/shizhongyan/6acb687d72c24.jpg',
      'https://szycdn.szyd.fun/shizhongyan/6acb687b6404f.jpg',
      'https://szycdn.szyd.fun/shizhongyan/6acb687da9ad9.jpg'
    ]
  },
  {
    key: 'expansion',
    time: { zh: '2025年末', en: 'Late 2025' },
    title: { zh: '服务扩展', en: 'Service Expansion' },
    desc: { zh: '陆续推出 SZY云盘、SZY云等多项服务，并启动多个开源项目。', en: 'Launched multiple services and open-source projects.' },
    images: []
  },
  {
    key: 'cfimmerse2026-1',
    time: { zh: '2026年4月', en: 'Apr 2026' },
    title: { zh: '第二次受邀参会', en: 'Invited to Attend (Second Time)' },
    desc: { zh: '受主办方邀请，工作室以特邀嘉宾身份参加 Cloudflare Immerse 2026 Shanghai。成员 ZHANGZHAORUI 以 CTO 身份参与圆桌讨论，分享工作室的创新案例与技术经验。', en: 'Invited by the organizer, the studio attended Cloudflare Immerse 2026 Shanghai as a special guest. ZHANGZHAORUI, CTO of SZY Innovation Studio, joined a roundtable discussion and shared its case studies and technical expertise.' },
    images: [
      'https://szycdn.szyd.fun/shizhongyan/6acb687defb92.jpg',
      'https://szycdn.szyd.fun/shizhongyan/6acb687e00f8a.jpg',
      'https://szycdn.szyd.fun/shizhongyan/6acb687dd91d5.jpg',
      'https://szycdn.szyd.fun/shizhongyan/6acb687b995b7.jpeg',
      'https://szycdn.szyd.fun/shizhongyan/6acb687b67454.jpeg'
    ]
  },
  {
    key: 'innovation',
    time: { zh: '2026年5月', en: 'May 2026' },
    title: { zh: '持续创新', en: 'Continuous Innovation' },
    desc: { zh: '官网全面升级为 Vue 3 SPA，以更现代的技术栈服务社区。', en: 'Website upgraded to Vue 3 SPA with modern tech stack.' },
    images: []
  },
  {
    key: 'cfimmerse2026-2',
    time: { zh: '2026年6月', en: 'Jun 2026' },
    title: { zh: '第三次受邀参会', en: 'Invited to Attend (Third Time)' },
    desc: { zh: '工作室第三次受邀参加 Cloudflare Immerse 2026 Hong Kong。', en: 'Invited to attend Cloudflare Immerse 2026 Hong Kong for the third time.' },
    images: [
      'https://szycdn.szyd.fun/shizhongyan/6acb687e18eb2.jpg',
      'https://szycdn.szyd.fun/shizhongyan/6acb687d3ab74.jpg',
      'https://szycdn.szyd.fun/shizhongyan/6acb687dc536c.jpg',
      'https://szycdn.szyd.fun/shizhongyan/6acb687da080d.jpg'
    ]
  },
]

const collapsible = computed(() => journey.length > INITIAL_VISIBLE)

const clipStyle = computed(() => {
  if (!collapsible.value) return undefined
  const height = expanded.value ? fullHeight.value : collapsedHeight.value
  return height ? { maxHeight: `${height}px` } : undefined
})

const lightbox = reactive({ open: false, images: [], index: 0 })

function measure() {
  const content = contentRef.value
  if (!content) return
  const items = content.children
  if (!items.length) return
  fullHeight.value = content.scrollHeight
  const last = items[Math.min(INITIAL_VISIBLE, items.length) - 1]
  collapsedHeight.value = last.offsetTop + last.offsetHeight
}

function openLightbox(images, index) {
  if (!images || !images.length) return
  lightbox.images = images
  lightbox.index = index
  lightbox.open = true
}

function closeLightbox() {
  lightbox.open = false
}

function stepLightbox(step) {
  const total = lightbox.images.length
  if (!total) return
  lightbox.index = (lightbox.index + step + total) % total
}

function onKeydown(e) {
  if (!lightbox.open) return
  if (e.key === 'Escape') closeLightbox()
  else if (e.key === 'ArrowLeft') stepLightbox(-1)
  else if (e.key === 'ArrowRight') stepLightbox(1)
}

function goBack() { router.push(locale.value === 'zh' ? '/' : '/en') }

let observer = null

onMounted(() => {
  if (pageRef.value) animate(pageRef.value)
  measure()
  if (typeof ResizeObserver !== 'undefined' && contentRef.value) {
    observer = new ResizeObserver(measure)
    observer.observe(contentRef.value)
  }
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

watch(lightbox, (value) => {
  document.body.style.overflow = value.open ? 'hidden' : ''
})

watch(locale, async () => {
  await nextTick()
  measure()
})
</script>

<template>
  <div ref="pageRef" class="max-w-4xl mx-auto px-4 pt-24 pb-16">
    <button @click="goBack" class="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-dark mb-6">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
      {{ t('about.back') }}
    </button>
    <h1 class="section-heading mb-6">{{ t('about.title') }}</h1>

    <GlassCard padding="p-5 md:p-8" class="mb-12 fade-in-up">
      <p class="text-[clamp(0.95rem,1.5vw,1.1rem)] text-neutral-700 leading-relaxed text-balance">{{ t('about.intro') }}</p>
    </GlassCard>

    <section class="mb-14">
      <h2 class="text-xl font-bold text-neutral-800 mb-7">{{ locale==='zh'?'发展历程':'Our Journey' }}</h2>
      <div
        class="relative pl-8 md:pl-12 overflow-hidden transition-[max-height] duration-500 ease-expo-out"
        :class="{ 'journey-clip': collapsible && !expanded }"
        :style="clipStyle"
      >
        <div class="absolute left-[11px] md:left-[15px] top-1 bottom-1 w-px bg-accent/20" />

        <div ref="contentRef" class="relative space-y-9">
          <div v-for="(item, index) in journey" :key="item.key" class="relative" :class="{ 'fade-in-up': !collapsible || index < INITIAL_VISIBLE }">
            <div class="absolute left-[-28px] md:left-[-38px] top-1 w-3 h-3 rounded-full bg-accent ring-4 ring-accent/10" />
            <span class="text-xs font-semibold text-accent/60 uppercase tracking-wider">{{ item.time[locale] || item.time.zh }}</span>
            <h3 class="text-lg font-bold text-neutral-800 mt-1">{{ item.title[locale] || item.title.zh }}</h3>
            <p class="text-neutral-600 text-sm mt-1 max-w-lg">{{ item.desc[locale] || item.desc.zh }}</p>
            <div v-if="item.images.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 mt-3 w-full max-w-2xl">
              <button
                v-for="(img, i) in item.images"
                :key="img"
                type="button"
                class="group overflow-hidden rounded-lg cursor-zoom-in"
                @click="openLightbox(item.images, i)"
              >
                <img :src="img" alt="" class="w-full aspect-[4/3] object-cover transition-transform duration-300 ease-expo-out group-hover:scale-105" loading="lazy" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="collapsible" class="text-center mt-8">
        <FluidButton variant="outline" @click="expanded = !expanded">
          {{ expanded ? t('about.journey_less') : t('about.journey_more') }}
          <svg class="w-4 h-4 transition-transform duration-300 ease-expo-out" :class="{ 'rotate-180': expanded }" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
        </FluidButton>
      </div>
    </section>

    <section class="mb-14">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard class="fade-in-up text-center" padding="p-5">
          <div class="text-[clamp(1.3rem,2.5vw,2rem)] font-extrabold"><CounterAnimation :to="5" suffix="+"/></div>
          <p class="text-xs text-neutral-500 mt-1">{{ locale==='zh'?'核心成员':'Core Members' }}</p>
        </GlassCard>
        <GlassCard class="fade-in-up text-center" padding="p-5">
          <div class="text-[clamp(1.3rem,2.5vw,2rem)] font-extrabold"><CounterAnimation :to="4" suffix="+"/></div>
          <p class="text-xs text-neutral-500 mt-1">{{ locale==='zh'?'开源项目':'Open Source' }}</p>
        </GlassCard>
        <GlassCard class="fade-in-up text-center" padding="p-5">
          <div class="text-[clamp(1.3rem,2.5vw,2rem)] font-extrabold"><CounterAnimation :to="3" suffix="+"/></div>
          <p class="text-xs text-neutral-500 mt-1">{{ locale==='zh'?'在线服务':'Services' }}</p>
        </GlassCard>
        <GlassCard class="fade-in-up text-center" padding="p-5">
          <div class="text-[clamp(1.3rem,2.5vw,2rem)] font-extrabold"><CounterAnimation :to="2024" :duration="1200"/></div>
          <p class="text-xs text-neutral-500 mt-1">{{ locale==='zh'?'成立年份':'Founded' }}</p>
        </GlassCard>
      </div>
    </section>

    <section class="mb-6 py-10 md:py-16 rounded-3xl bg-accent-soft/20 text-center px-4">
      <p class="text-[clamp(1.15rem,2.5vw,1.6rem)] font-bold text-neutral-800 leading-snug text-balance max-w-xl mx-auto">
        {{ locale==='zh' ? '"少年 · 技术 · 创新 · 开源 —— 我们相信，无论年龄大小，每个人都能用代码创造价值。"' : '"Youth · Technology · Innovation · Open Source — We believe that regardless of age, everyone can create value through code."' }}
      </p>
      <p class="mt-5 text-neutral-500 text-sm">— SZY Innovation Studio</p>
    </section>

    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200 ease-out"
        enter-from-class="opacity-0"
        leave-active-class="transition-opacity duration-150 ease-in"
        leave-to-class="opacity-0"
      >
        <div
          v-if="lightbox.open"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-900/85 backdrop-blur-sm px-4 py-16"
          @click.self="closeLightbox"
        >
          <button
            type="button"
            :aria-label="t('about.image_close')"
            class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
            @click="closeLightbox"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>

          <button
            v-if="lightbox.images.length > 1"
            type="button"
            :aria-label="t('about.image_prev')"
            class="absolute left-2 md:left-6 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
            @click.stop="stepLightbox(-1)"
          >
            <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>

          <img
            :src="lightbox.images[lightbox.index]"
            alt=""
            class="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            @click.stop
          />

          <button
            v-if="lightbox.images.length > 1"
            type="button"
            :aria-label="t('about.image_next')"
            class="absolute right-2 md:right-6 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
            @click.stop="stepLightbox(1)"
          >
            <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>

          <div v-if="lightbox.images.length > 1" class="absolute bottom-5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium tracking-wider">
            {{ lightbox.index + 1 }} / {{ lightbox.images.length }}
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.journey-clip {
  -webkit-mask-image: linear-gradient(to bottom, #000 calc(100% - 96px), transparent 100%);
  mask-image: linear-gradient(to bottom, #000 calc(100% - 96px), transparent 100%);
}
</style>
