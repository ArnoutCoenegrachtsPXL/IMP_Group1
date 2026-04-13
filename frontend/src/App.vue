<script setup>
  import SideBar from '@/components/SideBar.vue'
  import TopBar from '@/components/TopBar.vue';
</script>

<template>
  <TopBar/>
  <SideBar/>
  <main class="pt-24 pb-12 px-6 md:pl-80 max-w-8xl mx-auto">
    <router-view></router-view>
  </main>
</template>

<style scoped>

</style>
