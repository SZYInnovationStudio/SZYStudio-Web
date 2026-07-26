<script setup>
defineProps({
  padding: { type: String, default: 'p-6' },
  noise: { type: Boolean, default: true },
  hover: { type: Boolean, default: true }
})
</script>

<template>
  <div
    class="glass-card rounded-[18px] border border-white/20 shadow-glass transition-all duration-300 ease-expo-out"
    :class="[
      padding,
      { 'noise-texture': noise, 'hover:-translate-y-1 hover:shadow-glass-hover': hover }
    ]"
  >
    <slot />
  </div>
</template>
