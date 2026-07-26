import { onBeforeUnmount } from 'vue'
import { ref } from 'vue'

let tickerFrame = 0
let tickerRunning = false
let tickerPending = []

function startTicker() {
  if (tickerRunning) return
  tickerRunning = true
  function tick() {
    tickerFrame++
    for (let i = tickerPending.length - 1; i >= 0; i--) {
      if (tickerFrame >= tickerPending[i].targetFrame) {
        tickerPending[i].el.classList.add('is-visible')
        tickerPending.splice(i, 1)
      }
    }
    if (tickerPending.length > 0) {
      requestAnimationFrame(tick)
    } else {
      tickerRunning = false
      tickerFrame = 0
    }
  }
  requestAnimationFrame(tick)
}

export function useScrollAnimation(options = {}) {
  const { stagger = 80, rootMargin = '0px 0px -20px 0px', threshold = 0.05 } = options
  const done = ref(false)

  let observer = null

  if (typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.fi) || 0
            const delayFrames = Math.round((idx * stagger) / 16.67)
            if (delayFrames > 0) {
              tickerPending.push({
                el: entry.target,
                targetFrame: tickerFrame + delayFrames
              })
              startTicker()
            } else {
              entry.target.classList.add('is-visible')
            }
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin }
    )
  }

  function animate(container) {
    if (!observer || !container) return
    const els = container.querySelectorAll('.fade-in-up')
    els.forEach((el, i) => {
      el.dataset.fi = String(i)
      observer.observe(el)
    })
    if (els.length > 0) done.value = true
  }

  onBeforeUnmount(() => observer?.disconnect())

  return { animate, done }
}
