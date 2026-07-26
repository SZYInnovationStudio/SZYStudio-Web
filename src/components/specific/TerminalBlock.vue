<script setup>
defineProps({
  title: {
    type: String,
    default: 'szy@studio ~'
  }
})
</script>

<template>
  <div class="terminal-block glass-card noise-texture overflow-hidden rounded-xl">
    <div class="flex items-center gap-2 px-4 py-3 bg-neutral-100/80 border-b border-neutral-200/50">
      <span class="w-3 h-3 rounded-full bg-red-400" />
      <span class="w-3 h-3 rounded-full bg-yellow-400" />
      <span class="w-3 h-3 rounded-full bg-green-400" />
      <span class="ml-3 text-xs text-neutral-500 font-mono">{{ title }}</span>
    </div>

    <div class="p-4 md:p-5 bg-neutral-900/90 text-green-400 font-mono text-sm leading-relaxed">
      <p class="animate-type-line-1 opacity-0" style="animation-delay: 0.3s">
        <span class="text-accent-light">$</span> ssh szy@innovation.studio
      </p>
      <p class="animate-type-line-2 opacity-0" style="animation-delay: 0.9s">
        <span class="text-green-300">Welcome to SZY Innovation Studio</span>
      </p>
      <p class="animate-type-line-3 opacity-0" style="animation-delay: 1.5s">
        <span class="text-accent-light">$</span> cat /etc/motto
      </p>
      <p class="animate-type-line-4 opacity-0" style="animation-delay: 2.1s">
        <span class="text-yellow-300">少年 · 技术 · 创新 · 开源</span>
      </p>
      <p class="animate-type-line-5 opacity-0" style="animation-delay: 2.7s">
        <span class="text-accent-light">$</span> <span class="text-green-400">uv run studio</span>
      </p>
      <p class="animate-type-line-6 opacity-0" style="animation-delay: 3.3s">
        <span class="text-neutral-400">Building the future, one line at a time...</span>
        <span class="inline-block w-2 h-4 bg-green-400 ml-0.5 align-middle animate-blink" />
      </p>
    </div>
  </div>
</template>

<style scoped>
.animate-type-line-1,
.animate-type-line-2,
.animate-type-line-3,
.animate-type-line-4,
.animate-type-line-5,
.animate-type-line-6 {
  animation: fadeInLine 0.4s ease-out forwards;
}

@keyframes fadeInLine {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.animate-blink {
  animation: blink 1s step-end infinite;
}
</style>
