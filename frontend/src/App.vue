<script setup>
import { ref, computed } from 'vue'
import SideBar from '@/components/SideBar.vue'
import ChatBot from '@/components/Chatbot.vue'
import TopBar from '@/components/TopBar.vue'
import { useUserPrefsStore } from '@/stores/userPrefs'

// Store init — applyAll() already ran inside the store constructor
const prefs = useUserPrefsStore()

// Mobile sidebar state
const mobileSidebarOpen = ref(false)
function toggleMobileSidebar() {
  mobileSidebarOpen.value = !mobileSidebarOpen.value
}

// Compute dynamic main padding that respects RTL direction
const mainClass = computed(() => {
  const isRtl = ['ar', 'he', 'fa', 'ur'].includes(prefs.language)
  return isRtl
    ? 'pt-16 sm:pt-20 pb-12 px-4 sm:px-6 md:pr-[calc(18rem+1.5rem)] md:pl-6 max-w-[1600px] mx-auto'
    : 'pt-16 sm:pt-20 pb-12 px-4 sm:px-6 md:pl-[calc(18rem+1.5rem)] max-w-[1600px] mx-auto'
})
</script>

<template>
  <!-- Mobile overlay backdrop -->
  <transition name="fade">
    <div
      v-if="mobileSidebarOpen"
      class="fixed inset-0 bg-black/40 z-30 md:hidden"
      aria-hidden="true"
      @click="mobileSidebarOpen = false"
    />
  </transition>

  <TopBar @toggle-sidebar="toggleMobileSidebar" />
  <SideBar :mobile-open="mobileSidebarOpen" @close="mobileSidebarOpen = false" />

  <!-- Main content — responsive, RTL-aware, sidebar-offset on md+ -->
  <main :class="mainClass">
    <router-view />
  </main>

  <ChatBot />
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from,  .fade-leave-to      { opacity: 0; }
</style>
