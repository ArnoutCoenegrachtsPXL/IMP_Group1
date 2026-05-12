<script setup>
import { ref ,computed } from 'vue'
import { useRoute } from 'vue-router'

import SideBar from '@/components/SideBar.vue'
import TopBar from '@/components/TopBar.vue'
import ChatBot from '@/components/Chatbot.vue'
//1
import { useUserPrefsStore } from '@/stores/userPrefs'
//2
const route = useRoute()
//1
const prefs = useUserPrefsStore()

const isPublicRoute = computed(() => {
  const publicPaths = ['/', '/login', '/register', '/forgot-password', '/reset-password']
  return publicPaths.includes(route.path)
})
//1
const mobileSidebarOpen = ref(false)
//2
</script>

<template>
  <!-- Public pages: Landing, Login, Register, Forgot Password, Reset Password - Full screen, no sidebar -->
  <router-view v-if="isPublicRoute" />

  <!-- Protected pages: Show sidebar and topbar -->
  <div v-else class="flex h-screen overflow-hidden">
    <SideBar :mobile-open="mobileSidebarOpen" @close="mobileSidebarOpen = false" />
    <div class="flex-1 flex flex-col overflow-hidden">
      <TopBar  @toggle-sidebar="mobileSidebarOpen = !mobileSidebarOpen"/>
      <main class="flex-1 overflow-auto pt-6 pb-12 px-6 md:pl-80 max-w-8xl mx-auto">
        <router-view />
      </main>
    </div>
  </div>
    <ChatBot v-if="!isPublicRoute && prefs.features.chatbot" />
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from,  .fade-leave-to      { opacity: 0; }
</style>