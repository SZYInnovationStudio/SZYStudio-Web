<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import MemberAccordion from '@/components/specific/MemberAccordion.vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { t, locale } = useI18n()
const router = useRouter()
const { animate } = useScrollAnimation({ stagger: 80 })

const activeFilter = ref('all')
const pageRef = ref(null)

const filters = [
  { key: 'all', zh: '全部成员', en: 'All Members' },
  { key: 'founder', zh: '创始人', en: 'Founders' },
  { key: 'management', zh: '管理团队', en: 'Management' },
  { key: 'developer', zh: '开发团队', en: 'Developers' },
  { key: 'designer', zh: '设计团队', en: 'Designers' }
]

const members = [
  { id: 'shizhongyan', avatar: 'https://szycdn.szyd.fun/shizhongyan/68afa7da36198.jpg', name: 'ShiZhongyan🍭', roleBg: { zh: '创始人', en: 'Founder' }, title: { zh: '工作室创始人 & 全栈开发 & CEO', en: 'Founder & Full-stack Dev & CEO' }, desc: { zh: '热爱编程和技术创新，负责工作室整体规划和项目开发。', en: 'Passionate about programming and tech innovation.' }, web: 'https://www.szyd.fun', email: 'shizhongyan@szystudio.cn', gh: 'https://github.com/shizhongyangh', cat: ['founder', 'management', 'developer'] },
  { id: '1424cc', avatar: 'https://szycdn.szyd.fun/shizhongyan/68afa85d55b68.jpg', name: '1424cc', roleBg: { zh: '发起人', en: 'Co-founder' }, title: { zh: '工作室发起人 & 后端开发', en: 'Co-founder & Backend Developer' }, desc: { zh: '擅长服务器管理和后端开发，确保服务稳定运行。', en: 'Skilled in server management and backend development.' }, web: null, email: 'cuichen@szystudio.cn', gh: null, cat: ['founder', 'designer'] },
  { id: 'wuzheyu', avatar: 'https://szycdn.szyd.fun/shizhongyan/68b3ceafb31cd.jpg', name: 'WuZheyu', roleBg: { zh: '发起人', en: 'Co-founder' }, title: { zh: '工作室发起人 & 技术支持', en: 'Co-founder & Technical Support' }, desc: { zh: '擅长多种编程语言，为工作室提供技术支持。', en: 'Proficient in multiple programming languages.' }, web: null, email: 'wuzheyu@szystudio.cn', gh: null, cat: ['founder', 'designer'] },
  { id: 'zhangzhaorui', avatar: 'https://szycdn.szyd.fun/shizhongyan/68afa85de355a.jpg', name: 'ZHANGZHAORUI', roleBg: { zh: 'MCN负责人 & CTO', en: 'MCN Lead & CTO' }, title: { zh: 'MCN负责人 & 社区管理', en: 'MCN Lead & Community Manager' }, desc: { zh: '负责社区运营和内容创作，活跃社区氛围。', en: 'Responsible for community operations.' }, web: 'https://www.zzrbk.xyz', email: 'zhangzhaorui@szystudio.cn', gh: 'https://github.com/beibing173', cat: ['management', 'developer'] },
  { id: 'fry', avatar: 'https://szycdn.szyd.fun/shizhongyan/68afa85daabba.jpg', name: 'Fry酥条', roleBg: { zh: '工作室管理', en: 'Studio Manager' }, title: { zh: '工作室管理 & 系统运维 & COO', en: 'Studio Manager & DevOps & COO' }, desc: { zh: '负责服务器维护和系统安全，保障服务稳定。', en: 'Responsible for server maintenance and system security.' }, web: 'https://www.fryfries13.cn', email: 'fryfries13@szystudio.cn', gh: 'https://github.com/fryfries13', cat: ['management', 'developer'] }
]

const filtered = computed(() =>
  activeFilter.value === 'all' ? members : members.filter(m => m.cat.includes(activeFilter.value))
)

function goBack() { router.push(locale.value === 'zh' ? '/' : '/en') }

onMounted(() => {
  if (pageRef.value) animate(pageRef.value)
})

watch(activeFilter, async () => {
  await nextTick()
  if (pageRef.value) animate(pageRef.value)
})
</script>

<template>
  <div ref="pageRef" class="max-w-3xl mx-auto px-4 pt-24 pb-16">
    <button @click="goBack" class="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-dark mb-6">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
      {{ t('members.back') }}
    </button>
    <h1 class="section-heading mb-5">{{ t('members.title') }}</h1>

    <div class="flex flex-wrap gap-2 mb-8">
      <button v-for="f in filters" :key="f.key" class="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
        :class="activeFilter===f.key ? 'bg-accent text-white shadow-md' : 'bg-white/60 text-neutral-600 hover:bg-accent-soft'" @click="activeFilter=f.key">
        {{ locale==='zh' ? f.zh : f.en }}
      </button>
    </div>

    <div class="space-y-3">
      <div v-for="m in filtered" :key="m.id" class="fade-in-up">
        <MemberAccordion
          :member="{ avatar: m.avatar, name: m.name, roleBadge: m.roleBg[locale]||m.roleBg.zh, title: m.title[locale]||m.title.zh, description: m.desc[locale]||m.desc.zh, website: m.web, email: m.email, github: m.gh }" />
      </div>
    </div>

    <div v-if="filtered.length===0" class="text-center py-16 text-neutral-400">
      {{ locale==='zh' ? '该分类暂无成员' : 'No members in this category' }}
    </div>
  </div>
</template>
