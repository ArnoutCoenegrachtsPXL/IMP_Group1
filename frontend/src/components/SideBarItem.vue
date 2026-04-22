<script setup>
import { defineProps, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const props = defineProps(['symbol', 'text', 'link'])
const selected = computed(() => props.link !== '#' && props.link === route.path)
</script>

<template>
  <router-link
    :to="props.link"
    class="mx-1 py-2.5 px-3 flex items-center gap-3 rounded-xl transition-all text-sm font-medium
           min-h-[44px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
    :class="selected
      ? 'bg-primary text-on-primary shadow-sm'
      : 'text-on-surface-variant hover:bg-surface-container-high hover:translate-x-0.5 hover:text-on-surface'"
    :aria-current="selected ? 'page' : undefined"
  >
    <span class="material-symbols-outlined text-[20px] shrink-0">{{ props.symbol }}</span>
    <span class="tracking-wide truncate">{{ props.text }}</span>
  </router-link>
</template>
