<script>
import { ref, reactive } from 'vue'

const page = ref('welcome')
const form = reactive({ name: '', gender: '', age: '', languages: '', projectUrl: '' })
const applyCaptcha = reactive({ code: '', input: '' })
const loginCaptcha = reactive({ code: '', input: '' })
const submitting = ref(false)
const showLoginModal = ref(false)
const adminCredentials = reactive({ username: '', password: '' })
const loginError = ref('')
const loggingIn = ref(false)
const applications = ref([])
const appLoading = ref(false)
const appError = ref('')
</script>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import GlassCard from '@/components/ui/GlassCard.vue'

const { t, locale } = useI18n()

const API_BASE_URL = 'https://api.szystudio.cn/join/main.php'

const applyCanvasRef = ref(null)
const loginCanvasRef = ref(null)

function generateCaptchaCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

function drawCaptcha(canvas, code) {
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  canvas.width = 120
  canvas.height = 44
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#f8f9fa'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < 4; i++) {
    ctx.strokeStyle = `rgba(${Math.random()*150},${Math.random()*150},${Math.random()*150},0.3)`
    ctx.beginPath()
    ctx.moveTo(Math.random()*120, Math.random()*44)
    ctx.lineTo(Math.random()*120, Math.random()*44)
    ctx.stroke()
  }
  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = `rgba(${Math.random()*200},${Math.random()*200},${Math.random()*200},0.4)`
    ctx.beginPath()
    ctx.arc(Math.random()*120, Math.random()*44, 1, 0, Math.PI*2)
    ctx.fill()
  }
  ctx.font = 'bold 24px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  for (let i = 0; i < code.length; i++) {
    const x = 20 + i * 25 + Math.random() * 5
    const y = 22 + Math.random() * 8
    const angle = (Math.random() - 0.5) * 0.3
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle)
    ctx.fillStyle = `rgb(${Math.random()*100},${Math.random()*100},${Math.random()*200})`
    ctx.fillText(code.charAt(i), 0, 0)
    ctx.restore()
  }
}

function refreshApplyCaptcha() {
  applyCaptcha.code = generateCaptchaCode()
  nextTick(() => {
    if (applyCanvasRef.value) {
      drawCaptcha(applyCanvasRef.value, applyCaptcha.code)
    }
  })
  applyCaptcha.input = ''
}

function refreshLoginCaptcha() {
  loginCaptcha.code = generateCaptchaCode()
  nextTick(() => {
    if (loginCanvasRef.value) {
      drawCaptcha(loginCanvasRef.value, loginCaptcha.code)
    }
  })
  loginCaptcha.input = ''
}

onMounted(() => {
  nextTick(() => {
    refreshLoginCaptcha()
    if (page.value === 'form') refreshApplyCaptcha()
  })
})

watch(page, (val) => {
  if (val === 'form') refreshApplyCaptcha()
})

function goForm() {
  page.value = 'form'
}
function goWelcome() {
  page.value = 'welcome'
  Object.assign(form, { name: '', gender: '', age: '', languages: '', projectUrl: '' })
}
function goSuccess() {
  page.value = 'success'
}
function newApplication() {
  page.value = 'welcome'
  Object.assign(form, { name: '', gender: '', age: '', languages: '', projectUrl: '' })
  refreshApplyCaptcha()
}

async function handleSubmit() {
  if (applyCaptcha.input.trim().toUpperCase() !== applyCaptcha.code) {
    alert(t('join.captcha_error'))
    refreshApplyCaptcha()
    return
  }
  if (!form.name.trim() || !form.gender || !form.languages.trim()) {
    alert(t('join.fill_required'))
    return
  }
  const ageNum = parseInt(form.age)
  if (isNaN(ageNum) || ageNum < 10 || ageNum > 30) {
    alert(t('join.age_range'))
    return
  }
  submitting.value = true
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        name: form.name.trim(),
        gender: form.gender,
        age: ageNum,
        languages: form.languages.trim(),
        projectUrl: form.projectUrl.trim()
      })
    })
    const result = await response.json()
    if (result.success) {
      goSuccess()
    } else {
      alert('提交失败：' + (result.message || '未知错误'))
      refreshApplyCaptcha()
    }
  } catch (error) {
    console.error('提交错误:', error)
    alert(t('join.submit_failed'))
    refreshApplyCaptcha()
  } finally {
    submitting.value = false
  }
}

function openAdmin() {
  showLoginModal.value = true
  refreshLoginCaptcha()
  loginError.value = ''
  adminCredentials.username = ''
  adminCredentials.password = ''
}
function closeLogin() {
  showLoginModal.value = false
  loginError.value = ''
  adminCredentials.username = ''
  adminCredentials.password = ''
}

async function handleLogin() {
  if (loginCaptcha.input.trim().toUpperCase() !== loginCaptcha.code) {
    loginError.value = t('join.captcha_error')
    refreshLoginCaptcha()
    return
  }
  loggingIn.value = true
  loginError.value = ''
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        action: 'admin_login',
        username: adminCredentials.username,
        password: adminCredentials.password,
        captcha: loginCaptcha.input.trim()
      })
    })
    const result = await response.json()
    if (result.success) {
      showLoginModal.value = false
      page.value = 'admin'
      await loadApplications()
    } else {
      loginError.value = result.message || t('join.captcha_error')
      refreshLoginCaptcha()
    }
  } catch (error) {
    console.error('登录错误:', error)
    loginError.value = t('join.login_failed')
  } finally {
    loggingIn.value = false
  }
}

async function loadApplications() {
  appLoading.value = true
  appError.value = ''
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ action: 'get_applications' })
    })
    const result = await response.json()
    if (result.success) {
      applications.value = result.data || []
    } else {
      appError.value = result.message || '获取数据失败'
    }
  } catch (error) {
    console.error('加载数据失败:', error)
    appError.value = error.message
  } finally {
    appLoading.value = false
  }
}

const totalApps = computed(() => applications.value.length)
const todayApps = computed(() => {
  const todayStr = new Date().toDateString()
  return applications.value.filter(app => new Date(app.submit_time).toDateString() === todayStr).length
})

function getGenderText(gender) {
  const map = { male: t('join.male'), female: t('join.female'), other: t('join.other') }
  return map[gender] || gender
}

function escapeHtml(unsafe) {
  if (!unsafe) return ''
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

async function deleteApplication(id) {
  if (!confirm(t('join.delete_confirm'))) return
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ action: 'delete_application', id })
    })
    const result = await response.json()
    if (result.success) {
      applications.value = applications.value.filter(a => a.id !== id)
    } else {
      alert('删除失败：' + (result.message || '未知错误'))
    }
  } catch (error) {
    console.error('删除失败:', error)
    alert(t('join.delete_failed'))
  }
}

function backToMainFromAdmin() {
  page.value = 'welcome'
}
</script>

<template>
  <div>
  <div class="max-w-3xl mx-auto px-4 pt-20 md:pt-24 pb-8">
    <GlassCard padding="p-0" class="overflow-hidden">
      <div class="flex items-center justify-between px-5 py-3 bg-gray-100/60 border-b border-white/20">
        <div class="flex items-center gap-3">
          <div class="flex gap-2">
            <span class="w-3 h-3 rounded-full bg-red-400" />
            <span class="w-3 h-3 rounded-full bg-yellow-400" />
            <span class="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span class="text-sm font-medium text-neutral-500 ml-2">{{ t('join.title') }}</span>
        </div>
        <button
          @click="openAdmin"
          class="text-xs font-medium px-3 py-1.5 rounded-md bg-accent/10 text-accent hover:bg-accent hover:text-white transition-colors"
        >
          {{ t('join.admin') }}
        </button>
      </div>

      <div v-if="page === 'welcome'" class="p-6 md:p-12 text-center">
        <h1 class="text-[clamp(1.5rem,4vw,2.2rem)] font-bold tracking-tight text-neutral-800 mb-4">
          {{ t('join.title') }}
        </h1>
        <p class="text-neutral-500 max-w-md mx-auto mb-8 leading-relaxed">
          {{ t('join.desc') }}
        </p>
        <button
          @click="goForm"
          class="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent text-white font-semibold text-base
                 hover:bg-accent-dark shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5 active:scale-95"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          {{ t('join.apply_btn') }}
        </button>
      </div>

      <div v-if="page === 'form'" class="p-6 md:p-12">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-neutral-800 mb-2">{{ t('join.form_title') }}</h2>
          <p class="text-neutral-500">{{ t('join.form_subtitle') }}</p>
        </div>
        <form @submit.prevent="handleSubmit" class="max-w-lg mx-auto space-y-5">
          <div>
            <label class="block text-sm font-semibold text-neutral-700 mb-1.5">{{ t('join.name') }}</label>
            <input v-model="form.name" type="text" required maxlength="50"
              class="w-full px-4 py-2.5 bg-white/60 backdrop-blur-sm border border-white/40 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
                     text-neutral-800 placeholder:text-neutral-400 transition-shadow" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-neutral-700 mb-1.5">{{ t('join.gender') }}</label>
            <div class="flex gap-6">
              <label v-for="g in ['male','female','other']" :key="g" class="flex items-center gap-2 cursor-pointer">
                <input v-model="form.gender" type="radio" :value="g" required
                  class="w-4 h-4 accent-accent" />
                <span class="text-sm text-neutral-600">{{ t(`join.${g}`) }}</span>
              </label>
            </div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-neutral-700 mb-1.5">{{ t('join.age') }}</label>
            <input v-model="form.age" type="number" min="10" max="30" required
              class="w-full px-4 py-2.5 bg-white/60 backdrop-blur-sm border border-white/40 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
                     text-neutral-800 transition-shadow" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-neutral-700 mb-1.5">{{ t('join.languages') }}</label>
            <textarea v-model="form.languages" rows="3" required maxlength="500"
              :placeholder="t('join.languages_placeholder')"
              class="w-full px-4 py-2.5 bg-white/60 backdrop-blur-sm border border-white/40 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
                     text-neutral-800 placeholder:text-neutral-400 transition-shadow resize-none" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-neutral-700 mb-1.5">{{ t('join.project_url') }}</label>
            <input v-model="form.projectUrl" type="url" maxlength="255"
              :placeholder="t('join.project_url_placeholder')"
              class="w-full px-4 py-2.5 bg-white/60 backdrop-blur-sm border border-white/40 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
                     text-neutral-800 placeholder:text-neutral-400 transition-shadow" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-neutral-700 mb-1.5">{{ t('join.captcha') }}</label>
            <div class="flex gap-3 items-center">
              <input v-model="applyCaptcha.input" type="text" required maxlength="4" autocomplete="off"
                :placeholder="t('join.captcha_placeholder')"
                class="flex-1 min-w-0 px-3 py-2.5 bg-white/60 backdrop-blur-sm border border-white/40 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
                       text-neutral-800 uppercase placeholder:text-neutral-400 transition-shadow text-sm" />
              <canvas ref="applyCanvasRef" @click="refreshApplyCaptcha"
                class="w-[104px] h-10 border border-white/40 rounded-lg cursor-pointer shrink-0 bg-white/60" />
            </div>
          </div>
          <div class="flex flex-col gap-3 pt-2">
            <button type="submit" :disabled="submitting"
              class="w-full py-3 bg-accent text-white font-semibold rounded-lg
                     hover:bg-accent-dark disabled:opacity-60 transition-colors">
              {{ submitting ? t('join.submitting') : t('join.submit') }}
            </button>
            <button type="button" @click="goWelcome"
              class="w-full py-2.5 border border-white/40 text-neutral-600 font-medium rounded-lg
                     hover:bg-white/40 transition-colors">
              {{ t('join.back') }}
            </button>
          </div>
        </form>
      </div>

      <div v-if="page === 'success'" class="p-6 md:p-12 text-center">
        <div class="text-6xl text-green-500 mb-4">✓</div>
        <h2 class="text-2xl font-bold text-neutral-800 mb-3">{{ t('join.success_title') }}</h2>
        <p class="text-neutral-500 max-w-sm mx-auto mb-8">{{ t('join.success_msg') }}</p>
        <button
          @click="newApplication"
          class="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent text-white font-semibold
                 hover:bg-accent-dark shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5 active:scale-95"
        >
          {{ t('join.new_application') }}
        </button>
      </div>

      <div v-if="page === 'admin'" class="p-6 md:p-10">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-neutral-800 mb-1">{{ t('join.admin_title') }}</h2>
          <p class="text-neutral-500">{{ t('join.admin_subtitle') }}</p>
        </div>
        <div class="grid grid-cols-2 gap-4 mb-8">
          <div class="bg-accent/10 rounded-xl p-5 text-center hover:shadow-sm transition-shadow">
            <div class="text-3xl font-bold text-accent mb-1">{{ totalApps }}</div>
            <div class="text-sm text-neutral-500">{{ t('join.total') }}</div>
          </div>
          <div class="bg-accent/10 rounded-xl p-5 text-center hover:shadow-sm transition-shadow">
            <div class="text-3xl font-bold text-accent mb-1">{{ todayApps }}</div>
            <div class="text-sm text-neutral-500">{{ t('join.today') }}</div>
          </div>
        </div>
        <div v-if="appLoading" class="text-center py-8 text-neutral-500">{{ t('join.loading') }}</div>
        <div v-else-if="appError" class="text-center py-8">
          <p class="text-red-500 mb-3">{{ t('join.load_failed') }}</p>
          <button @click="openAdmin" class="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors">
            {{ t('join.relogin') }}
          </button>
        </div>
        <div v-else-if="applications.length === 0" class="text-center py-8 text-neutral-500">
          {{ t('join.no_data') }}
        </div>
        <div v-else class="overflow-x-auto rounded-xl border border-white/20 shadow-sm">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-accent/5">
                <th class="px-4 py-3 text-left font-semibold text-neutral-700">{{ t('join.table_name') }}</th>
                <th class="px-4 py-3 text-left font-semibold text-neutral-700">{{ t('join.table_gender') }}</th>
                <th class="px-4 py-3 text-left font-semibold text-neutral-700">{{ t('join.table_age') }}</th>
                <th class="px-4 py-3 text-left font-semibold text-neutral-700">{{ t('join.table_languages') }}</th>
                <th class="px-4 py-3 text-left font-semibold text-neutral-700">{{ t('join.table_project') }}</th>
                <th class="px-4 py-3 text-left font-semibold text-neutral-700">{{ t('join.table_time') }}</th>
                <th class="px-4 py-3 text-left font-semibold text-neutral-700">{{ t('join.table_action') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="app in applications" :key="app.id" class="border-t border-white/20 hover:bg-white/30 transition-colors">
                <td class="px-4 py-3 text-neutral-800">{{ escapeHtml(app.name) }}</td>
                <td class="px-4 py-3 text-neutral-600">{{ getGenderText(app.gender) }}</td>
                <td class="px-4 py-3 text-neutral-600">{{ app.age }}</td>
                <td class="px-4 py-3 text-neutral-600 max-w-[180px] truncate">{{ escapeHtml(app.languages) }}</td>
                <td class="px-4 py-3">
                  <a v-if="app.project_url" :href="app.project_url" target="_blank" rel="noopener noreferrer"
                     class="text-accent hover:underline">{{ t('join.view') }}</a>
                  <span v-else class="text-neutral-400">{{ t('join.none') }}</span>
                </td>
                <td class="px-4 py-3 text-neutral-500 text-xs whitespace-nowrap">
                  {{ new Date(app.submit_time).toLocaleString() }}
                </td>
                <td class="px-4 py-3">
                  <button @click="deleteApplication(app.id)"
                    class="px-3 py-1 text-xs bg-red-50 text-red-500 border border-red-200 rounded-lg
                           hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors">
                    {{ t('join.delete') }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button @click="backToMainFromAdmin"
          class="w-full mt-8 py-2.5 border border-white/40 text-neutral-600 font-medium rounded-lg
                 hover:bg-white/40 transition-colors">
          {{ t('join.back') }}
        </button>
      </div>
    </GlassCard>
  </div>

  <Teleport to="body">
    <div
      v-if="showLoginModal"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      @click.self="closeLogin"
    >
      <GlassCard padding="p-8" class="w-[90%] max-w-sm mx-auto">
        <h3 class="text-xl font-bold text-center text-neutral-800 mb-6">{{ t('join.login_title') }}</h3>
        <div v-if="loginError" class="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">
          {{ loginError }}
        </div>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-neutral-700 mb-1">{{ t('join.username') }}</label>
            <input v-model="adminCredentials.username" type="text" required autocomplete="username"
              class="w-full px-4 py-2.5 bg-white/60 border border-white/40 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
                     text-neutral-800 transition-shadow" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-neutral-700 mb-1">{{ t('join.password') }}</label>
            <input v-model="adminCredentials.password" type="password" required autocomplete="current-password"
              class="w-full px-4 py-2.5 bg-white/60 border border-white/40 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
                     text-neutral-800 transition-shadow" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-neutral-700 mb-1">{{ t('join.captcha') }}</label>
            <div class="flex gap-3 items-center">
              <input v-model="loginCaptcha.input" type="text" required maxlength="4" autocomplete="off"
                :placeholder="t('join.captcha_placeholder')"
                class="flex-1 min-w-0 px-3 py-2.5 bg-white/60 border border-white/40 rounded-lg uppercase
                       focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
                       text-neutral-800 placeholder:text-neutral-400 transition-shadow text-sm" />
              <canvas ref="loginCanvasRef" @click="refreshLoginCaptcha"
                class="w-[104px] h-10 border border-white/40 rounded-lg cursor-pointer shrink-0 bg-white/60" />
            </div>
          </div>
          <div class="flex flex-col gap-2.5 pt-1">
            <button type="submit" :disabled="loggingIn"
              class="w-full py-3 bg-accent text-white font-semibold rounded-lg
                     hover:bg-accent-dark disabled:opacity-60 transition-colors">
              {{ loggingIn ? t('join.logging_in') : t('join.login') }}
            </button>
            <button type="button" @click="closeLogin"
              class="w-full py-2.5 border border-white/40 text-neutral-600 font-medium rounded-lg
                     hover:bg-white/40 transition-colors">
              {{ t('join.cancel') }}
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  </Teleport>
  </div>
</template>
