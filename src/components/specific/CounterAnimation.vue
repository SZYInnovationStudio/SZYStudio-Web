<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  to: { type: Number, required: true },
  duration: { type: Number, default: 2000 },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' }
})

const display = ref('0')
const elRef = ref(null)
let observer = null

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

function animate(startTime) {
  const elapsed = performance.now() - startTime
  const progress = Math.min(elapsed / props.duration, 1)
  const eased = easeOutExpo(progress)
  const val = Math.round(props.to * eased)
  const prevVal = Math.round(props.to * easeOutExpo(Math.max(0, (elapsed - 16) / props.duration)))
  if (val !== prevVal) {
    display.value = props.prefix + val.toLocaleString() + props.suffix
  }

  if (progress < 1) {
    requestAnimationFrame(() => animate(startTime))
  }
}

onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') return

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        requestAnimationFrame(() => animate(performance.now()))
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.5 })

  if (elRef.value) observer.observe(elRef.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <span ref="elRef" class="font-extrabold tracking-tight text-accent tabular-nums">{{ display }}</span>
</template>

<style scoped>
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
</style>
