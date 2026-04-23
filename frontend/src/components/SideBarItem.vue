<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  symbol: String,
  text:   String,
  link:   String,
})

const route   = useRoute()
const active  = computed(() => props.link !== '#' && route.path === props.link)
const isHash  = computed(() => props.link === '#')
</script>

<template>
  <component
    :is="isHash ? 'a' : 'router-link'"
    :to="isHash ? undefined : link"
    :href="isHash ? '#' : undefined"
    class="flex items-center gap-3 mx-1 py-2.5 px-3 rounded-xl text-sm font-medium
           transition-all duration-150 min-h-[44px]
           focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
    :class="active
      ? 'bg-primary text-on-primary shadow-sm'
      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'"
    :aria-current="active ? 'page' : undefined"
  >
    <span class="material-symbols-outlined text-[20px] shrink-0">{{ symbol }}</span>
    <span class="truncate">{{ text }}</span>
  </component>
</template>
