<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const el = ref(null)
const offset = ref({ x: 0, y: 0 })
const enabled = ref(false)
let rafId = null
let targetX = 0
let targetY = 0

onMounted(() => {
  const mql = window.matchMedia('(hover: hover)')
  enabled.value = mql.matches

  if (!enabled.value || !el.value) return

  const handleMouse = (e) => {
    const rect = el.value.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    targetX = (e.clientX - centerX) * 0.25
    targetY = (e.clientY - centerY) * 0.25
  }

  const handleLeave = () => {
    targetX = 0
    targetY = 0
  }

  const animate = () => {
    offset.value.x += (targetX - offset.value.x) * 0.2
    offset.value.y += (targetY - offset.value.y) * 0.2
    rafId = requestAnimationFrame(animate)
  }

  el.value.addEventListener('mousemove', handleMouse)
  el.value.addEventListener('mouseleave', handleLeave)
  rafId = requestAnimationFrame(animate)

  onBeforeUnmount(() => {
    el.value?.removeEventListener('mousemove', handleMouse)
    el.value?.removeEventListener('mouseleave', handleLeave)
    cancelAnimationFrame(rafId)
  })
})
</script>

<template>
  <div
    ref="el"
    class="magnetic-wrap inline-block"
    :style="enabled ? { transform: `translate(${offset.x}px, ${offset.y}px)` } : {}"
  >
    <slot />
  </div>
</template>

<style scoped>
.magnetic-wrap {
  transition: transform 0.15s ease-out;
}
</style>
