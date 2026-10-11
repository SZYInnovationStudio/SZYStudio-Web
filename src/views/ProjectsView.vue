<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import GlassCard from '@/components/ui/GlassCard.vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { locale } = useI18n()
const router = useRouter()
const { animate } = useScrollAnimation({ stagger: 80 })
const pageRef = ref(null)

const projects = [
  { id: 'szytools', name: 'SZY工具集', desc: '开源、强大的前端多功能工具集', gh: 'https://github.com/SZYInnovationStudio/SZYTools', web: null },
  { id: 'mcserver', name: 'MCServerBackupPanel', desc: '开源免费强大的 Minecraft 服务器备份管理系统', gh: 'https://github.com/szyinnovationstudio/MCServerBackupPanel', web: null },
  { id: 'courseshop', name: 'CourseShop', desc: '一个美观、强大、可直接部署运行的在线课程售卖系统', gh: 'https://github.com/szyinnovationstudio/CourseShop', web: 'https://courseshop.szystudio.cn' },
  { id: 'portbridge', name: 'PortBridge', desc: '一个由Go语言编写的，开箱即用的类frp工具', gh: 'https://github.com/szyinnovationstudio/PortBridge', web: null },
  { id: 'website', name: '工作室网站', desc: '这是我们工作室的官方网站，采用 Vue3 + Vite + Tailwind CSS 开发，完全开源。', gh: 'https://github.com/SZYInnovationStudio/szystudio-web', web: 'https://www.szystudio.cn' },
  { id: '550wos', name: '550WOS', desc: '根据 Windows12 网页版改编的在线操作系统', gh: 'https://github.com/SZYInnovationStudio/550WOS', web: null },
  { id: 'notiondrive', name: 'NotionDrive', desc: '由Notion驱动的云盘系统（GitHub暂不公开）', gh: 'https://github.com/szyinnovationstudio/notion-drive', web: 'https://notiondrive.szystudio.cn' },
  { id: 'nexus', name: 'Nexus', desc: 'NEXUS · Human-AI Team OS —— 让一个人，拥有一支可以瞬间形成的 AI 团队。零依赖纯静态的多 Agent 协作与交付引擎。', gh: 'https://github.com/SZYInnovationStudio/NEXUS', web: null },
  { id: 'loopai', name: 'LoopAI', desc: '循新 LoopAI · AI 资源流向决策引擎 —— 让每一件闲置，找到它最有价值的下一站。纯静态、零依赖、可离线运行的 AI 作品原型。', gh: 'https://github.com/SZYInnovationStudio/LoopAI', web: null },
  { id: 'ybtanswers', name: 'YBTAnswers', desc: 'C++ 在线评测系统「信息学奥赛一本通」(ybt.ssoier.cn) 的附属题库网站', gh: 'https://github.com/SZYInnovationStudio/YBTAnswers', web: 'https://ybt.szystudio.cn' },
  { id: 'mcqqmodule', name: 'MCQQModule', desc: '一个开箱即用的、快速的MCQQ机器人项目', gh: 'https://github.com/SZYInnovationStudio/mcqqmodule', web: null },
]

function goBack() { router.push(locale.value === 'zh' ? '/' : '/en') }

onMounted(() => {
  if (pageRef.value) animate(pageRef.value)
})
</script>

<template>
  <div ref="pageRef" class="max-w-5xl mx-auto px-4 pt-24 pb-16">
    <button @click="goBack" class="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-dark mb-6">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
      {{ locale === 'zh' ? '返回主页' : 'Back to Home' }}
    </button>
    <h1 class="section-heading mb-8">{{ locale === 'zh' ? '全部项目' : 'All Projects' }}</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
      <GlassCard v-for="p in projects" :key="p.id" class="fade-in-up" padding="p-5">
        <h3 class="font-bold text-neutral-800 mb-2">{{ p.name }}</h3>
        <p class="text-sm text-neutral-600 mb-3">{{ p.desc }}</p>
        <div class="flex flex-wrap items-center gap-4">
          <a v-if="p.gh" :href="p.gh" target="_blank" rel="noopener" class="text-sm text-accent hover:text-accent-dark">GitHub →</a>
          <a v-if="p.web" :href="p.web" target="_blank" rel="noopener" class="text-sm text-accent hover:text-accent-dark">{{ locale === 'zh' ? '网站 →' : 'Website →' }}</a>
        </div>
      </GlassCard>
    </div>
  </div>
</template>
