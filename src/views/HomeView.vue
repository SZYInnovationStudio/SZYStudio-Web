<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import GlassCard from '@/components/ui/GlassCard.vue'
import FluidButton from '@/components/ui/FluidButton.vue'
import BentoGrid from '@/components/specific/BentoGrid.vue'
import TerminalBlock from '@/components/specific/TerminalBlock.vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { t, locale } = useI18n()
const router = useRouter()

const { animate } = useScrollAnimation({ stagger: 80 })
const pageRef = ref(null)

onMounted(() => {
  if (pageRef.value) animate(pageRef.value)
})

function toAbout() { router.push(locale.value === 'zh' ? '/about' : '/en/about') }
function toMembers() { router.push(locale.value === 'zh' ? '/members' : '/en/members') }
function scrollToServices() {
  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div ref="pageRef" class="max-w-6xl mx-auto px-4 pt-16 pb-16">
    <section class="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10
                    min-h-[calc(100dvh-4rem)] lg:min-h-[calc(100vh-4rem)] pt-0">
      <div class="w-full lg:flex-1 text-center lg:text-left lg:max-w-lg">
        <h1 class="text-[clamp(2rem,5vw,4rem)] font-extrabold tracking-tight text-neutral-800 leading-[1.08] text-balance">
          {{ t('home.hero_title') }}
        </h1>
        <p class="mt-4 text-[clamp(0.95rem,1.8vw,1.2rem)] text-neutral-500 text-balance">
          {{ t('home.hero_subtitle') }}
        </p>
        <div class="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
          <FluidButton variant="primary" size="lg" @click="scrollToServices">{{ t('home.hero_cta') }}</FluidButton>
          <FluidButton variant="outline" size="lg" href="https://github.com/szyinnovationstudio/" external>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </FluidButton>
        </div>
      </div>
      <div class="hidden lg:block flex-1 w-full max-w-md">
        <TerminalBlock />
      </div>
    </section>

    <section id="services" class="mb-16 md:mb-20">
      <h2 class="section-heading">{{ t('home.services_title') }}</h2>
      <BentoGrid :cols="3" gap="gap-4 md:gap-5">
        <GlassCard class="fade-in-up md:col-span-2 md:row-span-2" padding="p-5 md:p-7">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-neutral-800">{{ t('services.image_hosting') }}</h3>
          </div>
          <p class="text-neutral-600 mb-5 text-sm md:text-base">{{ t('services.image_hosting_desc') }}</p>
          <div class="wave-decoration mb-5 h-7 opacity-25" />
          <FluidButton variant="outline" size="sm" href="https://img.szyd.fun" external>{{ t('services.visit') }}</FluidButton>
        </GlassCard>
        <GlassCard class="fade-in-up" padding="p-5">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path d="M20 16.2A3.5 3.5 0 0017.5 9a5 5 0 00-9.8-1A4 4 0 004 13.5 3.5 3.5 0 006.5 17h12a1.5 1.5 0 001.5-1.5v-1.3z" />
              </svg>
            </div>
            <h3 class="font-bold text-neutral-800">{{ t('services.cloud_drive') }}</h3>
          </div>
          <p class="text-sm text-neutral-600 mb-4">{{ t('services.cloud_drive_desc') }}</p>
          <FluidButton variant="outline" size="sm" href="https://pan.szystudio.cn" external>{{ t('services.visit') }}</FluidButton>
        </GlassCard>
        <GlassCard class="fade-in-up" padding="p-5">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <rect x="2" y="2" width="20" height="8" rx="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" />
                <circle cx="6" cy="6" r="1" fill="currentColor" />
                <circle cx="6" cy="18" r="1" fill="currentColor" />
              </svg>
            </div>
            <h3 class="font-bold text-neutral-800">{{ t('services.cloud') }}</h3>
          </div>
          <p class="text-sm text-neutral-600 mb-4">{{ t('services.cloud_desc') }}</p>
          <FluidButton variant="outline" size="sm" href="https://idc.szystudio.cn" external>{{ t('services.visit') }}</FluidButton>
        </GlassCard>
      </BentoGrid>
    </section>

    <section class="mb-16 md:mb-20">
      <h2 class="section-heading">{{ t('home.projects_title') }}</h2>
      <BentoGrid :cols="2" gap="gap-4 md:gap-5">
        <GlassCard class="fade-in-up" padding="p-5">
          <h3 class="font-bold text-neutral-800 mb-2">{{ t('projects.website') }}</h3>
          <p class="text-sm text-neutral-600 mb-3">{{ t('projects.website_desc') }}</p>
          <a :href="locale==='zh' ? 'https://github.com/SZYInnovationStudio/szystudio-web' : 'https://github.com/SZYInnovationStudio/szystudio-web'" target="_blank" rel="noopener" class="text-sm text-accent hover:text-accent-dark">GitHub →</a>
        </GlassCard>
        <GlassCard class="fade-in-up" padding="p-5">
          <h3 class="font-bold text-neutral-800 mb-2">{{ t('projects.550wos') }}</h3>
          <p class="text-sm text-neutral-600 mb-3">{{ t('projects.550wos_desc') }}</p>
          <a href="https://github.com/SZYInnovationStudio/550WOS" target="_blank" rel="noopener" class="text-sm text-accent hover:text-accent-dark">GitHub →</a>
        </GlassCard>
        <GlassCard class="fade-in-up" padding="p-5">
          <h3 class="font-bold text-neutral-800 mb-2">{{ t('projects.uptimeflare') }}</h3>
          <p class="text-sm text-neutral-600 mb-3">{{ t('projects.uptimeflare_desc') }}</p>
          <a href="https://github.com/SZYInnovationStudio/SZYSTUDIOUPTIMEFLARE" target="_blank" rel="noopener" class="text-sm text-accent hover:text-accent-dark">GitHub →</a>
        </GlassCard>
        <GlassCard class="fade-in-up" padding="p-5">
          <h3 class="font-bold text-neutral-800 mb-2">{{ t('projects.mcserver') }}</h3>
          <p class="text-sm text-neutral-600 mb-3">{{ t('projects.mcserver_desc') }}</p>
          <a href="https://github.com/szyinnovationstudio/MCServerBackupPanel" target="_blank" rel="noopener" class="text-sm text-accent hover:text-accent-dark">GitHub →</a>
        </GlassCard>
      </BentoGrid>
    </section>

    <section class="mb-16 md:mb-20">
      <h2 class="section-heading">{{ t('home.members_title') }}</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <GlassCard class="fade-in-up text-center" padding="p-4">
          <img src="https://szycdn.szyd.fun/shizhongyan/68afa7da36198.jpg" :alt="t('members.shizhongyan.name')" class="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover mx-auto mb-2 ring-2 ring-accent/15" loading="lazy" />
          <h4 class="font-bold text-neutral-800 text-sm">{{ t('members.shizhongyan.name') }}</h4>
          <p class="text-xs text-neutral-500 mt-0.5">{{ locale==='zh'?'创始人 & CEO':'Founder & CEO' }}</p>
        </GlassCard>
        <GlassCard class="fade-in-up text-center" padding="p-4">
          <img src="https://szycdn.szyd.fun/shizhongyan/68afa85d55b68.jpg" :alt="t('members.1424cc.name')" class="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover mx-auto mb-2 ring-2 ring-accent/15" loading="lazy" />
          <h4 class="font-bold text-neutral-800 text-sm">{{ t('members.1424cc.name') }}</h4>
          <p class="text-xs text-neutral-500 mt-0.5">{{ locale==='zh'?'发起人':'Co-founder' }}</p>
        </GlassCard>
        <GlassCard class="fade-in-up text-center" padding="p-4">
          <img src="https://szycdn.szyd.fun/shizhongyan/68afa85de355a.jpg" :alt="t('members.zhangzhaorui.name')" class="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover mx-auto mb-2 ring-2 ring-accent/15" loading="lazy" />
          <h4 class="font-bold text-neutral-800 text-sm">{{ t('members.zhangzhaorui.name') }}</h4>
          <p class="text-xs text-neutral-500 mt-0.5">{{ locale==='zh'?'MCN负责人 & CTO':'MCN Lead & CTO' }}</p>
        </GlassCard>
        <GlassCard class="fade-in-up text-center" padding="p-4">
          <img src="https://szycdn.szyd.fun/shizhongyan/68afa85daabba.jpg" :alt="t('members.fry.name')" class="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover mx-auto mb-2 ring-2 ring-accent/15" loading="lazy" />
          <h4 class="font-bold text-neutral-800 text-sm">{{ t('members.fry.name') }}</h4>
          <p class="text-xs text-neutral-500 mt-0.5">{{ locale==='zh'?'管理 & COO':'Manager & COO' }}</p>
        </GlassCard>
      </div>
      <div class="text-center">
        <FluidButton variant="outline" @click="toMembers">
          {{ t('home.members_more') }}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </FluidButton>
      </div>
    </section>

    <section class="mb-8">
      <h2 class="section-heading">{{ t('home.about_title') }}</h2>
      <GlassCard class="fade-in-up text-center max-w-2xl mx-auto" padding="p-6 md:p-8">
        <p class="text-neutral-700 leading-relaxed mb-5">{{ t('home.about_text') }}</p>
        <FluidButton variant="outline" @click="toAbout">
          {{ t('home.about_more') }}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </FluidButton>
      </GlassCard>
    </section>
  </div>
</template>

<style scoped>
.wave-decoration {
  background: repeating-linear-gradient(90deg, var(--accent-light) 0px, var(--accent-light) 2px, transparent 2px, transparent 8px);
  border-radius: 2px;
  mask-image: url("data:image/svg+xml,%3Csvg width='200' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 16 Q 25 0, 50 16 T 100 16 T 150 16 T 200 16' fill='none' stroke='black' stroke-width='2'/%3E%3C/svg%3E");
  mask-size: 200px 32px;
  mask-repeat: repeat-x;
}
</style>
