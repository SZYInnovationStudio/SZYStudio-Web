<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import GlassCard from '@/components/ui/GlassCard.vue'
import CounterAnimation from '@/components/specific/CounterAnimation.vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { t, locale } = useI18n()
const router = useRouter()
const { animate } = useScrollAnimation({ stagger: 100 })
const pageRef = ref(null)

onMounted(() => {
  if (pageRef.value) animate(pageRef.value)
})

function goBack() { router.push(locale.value === 'zh' ? '/' : '/en') }
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
      <div class="relative pl-8 md:pl-12">
        <div class="absolute left-[11px] md:left-[15px] top-1 bottom-1 w-px bg-accent/20" />

        <div class="fade-in-up relative mb-9">
          <div class="absolute left-[-28px] md:left-[-38px] top-1 w-3 h-3 rounded-full bg-accent ring-4 ring-accent/10" />
          <span class="text-xs font-semibold text-accent/60 uppercase tracking-wider">{{ locale==='zh'?'2024年末':'Late 2024' }}</span>
          <h3 class="text-lg font-bold text-neutral-800 mt-1">{{ locale==='zh'?'工作室成立':'Studio Founded' }}</h3>
          <p class="text-neutral-600 text-sm mt-1 max-w-lg">{{ locale==='zh'?'几名初中生和小学生因共同的编程爱好走到一起，SZY 创新工作室正式成立。':'Several students came together through a shared passion for programming.' }}</p>
        </div>
        <div class="fade-in-up relative mb-9">
          <div class="absolute left-[-28px] md:left-[-38px] top-1 w-3 h-3 rounded-full bg-accent ring-4 ring-accent/10" />
          <span class="text-xs font-semibold text-accent/60 uppercase tracking-wider">{{ locale==='zh'?'2025年中':'Mid 2025' }}</span>
          <h3 class="text-lg font-bold text-neutral-800 mt-1">{{ locale==='zh'?'首个公益服务上线':'First Public Service Launched' }}</h3>
          <p class="text-neutral-600 text-sm mt-1 max-w-lg">{{ locale==='zh'?'SZY图床正式上线，为开发者提供免费、高速的图片托管服务。':'SZY Image Hosting went live, providing free and high-speed image hosting.' }}</p>
        </div>
        <div class="fade-in-up relative mb-9">
          <div class="absolute left-[-28px] md:left-[-38px] top-1 w-3 h-3 rounded-full bg-accent ring-4 ring-accent/10" />
          <span class="text-xs font-semibold text-accent/60 uppercase tracking-wider">{{ locale==='zh'?'2025年末':'Late 2025' }}</span>
          <h3 class="text-lg font-bold text-neutral-800 mt-1">{{ locale==='zh'?'服务扩展':'Service Expansion' }}</h3>
          <p class="text-neutral-600 text-sm mt-1 max-w-lg">{{ locale==='zh'?'陆续推出 SZY云盘、SZY云等多项服务，并启动多个开源项目。':'Launched multiple services and open-source projects.' }}</p>
        </div>
        <div class="fade-in-up relative mb-4">
          <div class="absolute left-[-28px] md:left-[-38px] top-1 w-3 h-3 rounded-full bg-accent ring-4 ring-accent/10" />
          <span class="text-xs font-semibold text-accent/60 uppercase tracking-wider">{{ locale==='zh'?'2025 — 至今':'2025 — Present' }}</span>
          <h3 class="text-lg font-bold text-neutral-800 mt-1">{{ locale==='zh'?'持续创新':'Continuous Innovation' }}</h3>
          <p class="text-neutral-600 text-sm mt-1 max-w-lg">{{ locale==='zh'?'官网全面升级为 Vue 3 SPA，以更现代的技术栈服务社区。':'Website upgraded to Vue 3 SPA with modern tech stack.' }}</p>
        </div>
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
  </div>
</template>
