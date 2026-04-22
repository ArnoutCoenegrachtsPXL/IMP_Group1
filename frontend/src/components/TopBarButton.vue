<script setup>
defineProps({
  symbol:      { type: String, required: true },
  description: { type: String, required: true },
  link:        { type: String, default: '#'   },
})
</script>

<template>
  <router-link
    :to="link"
    class="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high
           transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none
           flex items-center justify-center min-h-[44px] min-w-[44px]"
    :aria-label="description"
    :title="description"
  >
    <span class="material-symbols-outlined text-[22px]">{{ symbol }}</span>
  </router-link>
</template>
