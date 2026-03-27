<script setup> 
    import { defineProps } from 'vue';
    import {useRoute} from 'vue-router'
    import {computed} from 'vue'

    const route = useRoute();

    const props = defineProps(['symbol', 'text', 'link'])

    const selected = computed(() => props.link === route.path)
</script>

<template>
    <router-link
        v-if="selected===false" 
        :to=link
        class="text-on-surface-variant/70 mx-4 py-3 px-6 hover:translate-x-1 flex items-center gap-3 transition-all" 
    >
        <span class="material-symbols-outlined">{{symbol}}</span>
        <span class="font-medium text-sm tracking-wide">{{text}}</span>
    </router-link>
    <a 
        v-else 
        class="bg-primary text-white rounded-md mx-4 py-3 px-6 shadow-sm flex items-center gap-3"
    >
        <span class="material-symbols-outlined">{{symbol}}</span>
        <span class="font-medium text-sm tracking-wide">{{text}}</span>
    </a>
</template>