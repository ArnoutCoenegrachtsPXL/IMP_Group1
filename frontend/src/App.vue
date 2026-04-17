<script setup>
import { onMounted } from 'vue'
import { useUserPrefsStore } from '@/stores/userPrefs'
  import SideBar from '@/components/SideBar.vue'
  import ChatBot from '@/components/Chatbot.vue'
  import TopBar from '@/components/TopBar.vue';

  const prefs = useUserPrefsStore()
onMounted(() => prefs.applyAll())
</script>

<template>
  <TopBar/>
  <SideBar/>
  <main class="pt-24 pb-12 px-6 md:pl-80 max-w-8xl mx-auto">
    <router-view></router-view>
  </main>
   <!-- Global floating chatbot -->
  <ChatBot />
</template>

<style scoped>

</style>