<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import SideBar from '@/components/SideBar.vue'
import TopBar from '@/components/TopBar.vue'
import ChatBot from '@/components/Chatbot.vue'

const route = useRoute()

const isPublicRoute = computed(() => {
  const publicPaths = ['/', '/login', '/register', '/forgot-password', '/reset-password']
  return publicPaths.includes(route.path)
})
</script>

<template>
  <!-- Public pages: Landing, Login, Register, Forgot Password, Reset Password - Full screen, no sidebar -->
  <router-view v-if="isPublicRoute" />

  <!-- Protected pages: Show sidebar and topbar -->
  <div v-else class="flex h-screen overflow-hidden">
    <SideBar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <TopBar />
      <main class="flex-1 overflow-auto pt-6 pb-12 px-6 md:pl-80 max-w-8xl mx-auto">
        <router-view />
      </main>
    </div>
  </div>
    <ChatBot />
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from,  .fade-leave-to      { opacity: 0; }
</style>