import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useMagnetic(targetRef, options = {}) {
  const { strength = 0.3, maxDistance = 30 } = options
  const offset = ref({ x: 0, y: 0 })
  const enabled = ref(false)

  let rafId = null
  let targetX = 0
  let targetY = 0

  onMounted(() => {
    const mql = window.matchMedia('(hover: hover)')
    enabled.value = mql.matches

    if (!enabled.value || !targetRef.value) return
    const el = targetRef.value

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      targetX = Math.max(-maxDistance, Math.min(maxDistance, (e.clientX - cx) * strength))
      targetY = Math.max(-maxDistance, Math.min(maxDistance, (e.clientY - cy) * strength))
    }

    const handleLeave = () => {
      targetX = 0
      targetY = 0
    }

    const animate = () => {
      offset.value = {
        x: offset.value.x + (targetX - offset.value.x) * 0.15,
        y: offset.value.y + (targetY - offset.value.y) * 0.15
      }
      rafId = requestAnimationFrame(animate)
    }

    el.addEventListener('mousemove', handleMove, { passive: true })
    el.addEventListener('mouseleave', handleLeave)
    rafId = requestAnimationFrame(animate)

    onBeforeUnmount(() => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
      cancelAnimationFrame(rafId)
    })
  })

  return { offset, enabled }
}
