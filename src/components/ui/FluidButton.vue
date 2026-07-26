<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'outline', 'ghost'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  to: { type: [String, Object], default: null },
  href: { type: String, default: null },
  external: { type: Boolean, default: false }
})

const isRouterLink = computed(() => !!props.to)
const isAnchor = computed(() => !!props.href)

const sizeClasses = {
  sm: 'px-4 py-2 text-sm min-h-[36px]',
  md: 'px-6 py-3 text-base min-h-[44px]',
  lg: 'px-8 py-4 text-lg min-h-[52px]'
}

const variantClasses = {
  primary: 'bg-accent text-white border-2 border-accent shadow-[0_2px_12px_rgba(61,90,128,0.25)] hover:bg-accent-dark hover:border-accent-dark hover:shadow-[0_6px_20px_rgba(61,90,128,0.35)]',
  outline: 'border-2 border-accent text-accent bg-white/60 hover:bg-accent hover:text-white',
  ghost: 'bg-transparent text-accent hover:bg-accent-soft/60 border-2 border-transparent'
}
</script>

<template>
  <component
    :is="isRouterLink ? 'router-link' : isAnchor ? 'a' : 'button'"
    :to="isRouterLink ? to : undefined"
    :href="isAnchor ? href : undefined"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    class="inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 ease-expo-out cursor-pointer select-none"
    :class="[sizeClasses[size], variantClasses[variant]]"
  >
    <slot />
  </component>
</template>
