<script setup>
defineProps({
  cols: {
    type: Number,
    default: 4
  },
  gap: {
    type: String,
    default: 'gap-4 md:gap-6'
  }
})
</script>

<template>
  <div
    class="bento-grid"
    :class="gap"
  >
    <slot />
  </div>
</template>

<style scoped>
.bento-grid {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .bento-grid {
    display: grid;
    grid-template-columns: repeat(v-bind('cols'), 1fr);
    grid-auto-rows: auto;
  }
}
</style>
