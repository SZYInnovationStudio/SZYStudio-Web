<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

function localeLink(name) {
  return { name, params: { locale: locale.value === 'en' ? 'en' : undefined } }
}
</script>

<template>
  <footer class="bg-gray-50 border-t border-gray-200 pb-20 md:pb-10 mt-16">
    <div class="max-w-6xl mx-auto px-4 pt-10 pb-4 md:pb-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h5 class="text-accent font-bold text-lg mb-3">{{ t('footer.brand') }}</h5>
          <p class="text-neutral-600 mb-3">{{ t('footer.tagline') }}</p>
          <a
            href="https://www.trustssl.cc/ipv6.php?domain=www.szystudio.cn"
            title="本站已支持IPv6访问"
            target="_blank"
            rel="noopener"
          >
            <img src="https://static.coolcdn.cn/images/ipv6.svg" alt="IPv6" class="h-8" />
          </a>
        </div>

        <div>
          <h5 class="text-accent font-bold text-lg mb-3">{{ t('footer.services') }}</h5>
          <ul class="space-y-2">
            <li>
              <a href="https://img.szyd.fun" target="_blank" rel="noopener"
                 class="text-neutral-600 hover:text-accent transition-colors inline-flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                SZY图床
              </a>
            </li>
            <li>
              <a href="https://pan.szystudio.cn" target="_blank" rel="noopener"
                 class="text-neutral-600 hover:text-accent transition-colors inline-flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
                SZY云盘
              </a>
            </li>
            <li>
              <a href="https://idc.szyd.fun" target="_blank" rel="noopener"
                 class="text-neutral-600 hover:text-accent transition-colors inline-flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
                SZY云
              </a>
            </li>
            <li>
              <a href="https://download.szystudio.cn" target="_blank" rel="noopener"
                 class="text-neutral-600 hover:text-accent transition-colors">
                {{ t('footer.software_download') }}
              </a>
            </li>
            <li>
              <a href="https://shop.szystudio.cn" target="_blank" rel="noopener"
                 class="text-neutral-600 hover:text-accent transition-colors">
                {{ t('footer.official_shop') }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 class="text-accent font-bold text-lg mb-3">{{ t('footer.contact') }}</h5>
          <p class="text-neutral-600 mb-3">
            <a href="mailto:support@szystudio.cn"
               class="text-neutral-600 hover:text-accent transition-colors inline-flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              support@szystudio.cn
            </a>
          </p>
          <div class="flex items-center gap-3">
            <a href="https://www.szystudio.cn" class="social-icon" target="_blank" rel="noopener noreferrer" title="官网">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </a>
            <a href="mailto:support@szystudio.cn" class="social-icon" title="邮箱">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
            <a href="https://github.com/szyinnovationstudio/" class="social-icon" target="_blank" rel="noopener" title="GitHub">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <hr class="border-accent/10 mb-6" />

      <div class="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-neutral-500">
        <div class="flex items-center gap-4 flex-wrap justify-center">
          <span>{{ t('footer.copyright') }}</span>
          <router-link :to="localeLink('join')" class="text-accent hover:underline">
            {{ t('home.join_us') }}
          </router-link>
        </div>
        <div class="flex flex-col items-center md:items-end gap-1">
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener"
             class="text-neutral-500 hover:text-accent transition-colors">
            京ICP备2024098823号-4
          </a>
          <a href="https://beian.mps.gov.cn/#/query/webSearch?code=11011202101490"
             target="_blank" rel="noreferrer"
             class="text-neutral-500 hover:text-accent transition-colors inline-flex items-center gap-1">
            <img src="/beian.png" alt="公安备案" class="h-4 w-4 inline" />
            京公网安备11011202101490号
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.social-icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: linear-gradient(135deg, var(--accent), var(--accent-light));
  box-shadow: 0 2px 8px rgba(61, 90, 128, 0.1);
  transition: transform 0.2s ease, background 0.2s ease;
}

.social-icon:hover {
  background: var(--accent-dark);
  transform: translateY(-2px) scale(1.08);
}
</style>
