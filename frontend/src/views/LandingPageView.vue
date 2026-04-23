<template>
  <div class="bg-background text-on-surface min-h-screen">
    <!-- Top Navigation -->
    <nav class="fixed top-0 w-full z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm flex justify-between items-center px-6 h-16 font-['Inter'] antialiased">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-primary text-2xl">bolt</span>
        <span class="text-xl font-bold text-blue-700 dark:text-blue-400">EcoSave</span>
      </div>

      <div class="hidden md:flex items-center gap-8">
        <a href="#" class="text-blue-600 dark:text-blue-400 font-semibold transition-colors">Hub</a>
        <a href="#" class="text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 px-3 py-1 rounded transition-colors">Leaderboard</a>
        <a href="#" class="text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 px-3 py-1 rounded transition-colors">Learn</a>
        <a href="#" class="text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 px-3 py-1 rounded transition-colors">Profile</a>
      </div>

      <div class="flex items-center gap-4">
        <router-link 
          to="/login"
          class="px-6 py-2.5 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-all active:scale-95"
        >
          Sign In
        </router-link>
      </div>
    </nav>

    <main class="pt-16">
      <!-- Hero Section -->
      <section class="relative min-h-[819px] flex items-center overflow-hidden bg-primary">
        <div class="absolute inset-0 opacity-20">
          <img 
            class="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmfpoXIB1atDwRnn2oRtz2ATgQt6wCM_5MT7ReVo_hEFrpqhAht9FfsPVIn3sce-KBnS_BaVJOWPuubvmHy74thoddzSrhFYg7l6Jon9SlHG3v204J5nSJBsUT2wJRv8Wc7ijMEYBFiz4ONU_DtmMH1qkFzIIspQ7UPAE3A5MheifRlCQlteW1Tkl6f_Wdktip3a6QVH_gyo7TA-XOcLyKpYTzONmCntB8AyX9trUeCS8sDZFN65m70qXl_HKVE9B9GbtYlKlxjEb6"
          />
        </div>

        <div class="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div class="text-white">
            <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Empowering a <span class="text-secondary-container">Sustainable</span> Future
            </h1>
            <p class="text-xl text-blue-100 mb-8 max-w-lg leading-relaxed">
              Join thousands of community members dedicated to reducing their carbon footprint through smart energy education and real-time monitoring.
            </p>
            <div class="flex flex-wrap gap-4">
              <router-link 
                to="/register"
                class="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all active:scale-95"
              >
                Get Started
              </router-link>
              <button class="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
                Watch Vision
              </button>
            </div>
          </div>

          <!-- Community Impact -->
          <div class="hidden md:block">
            <div class="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl">
              <div class="flex items-center justify-between mb-6">
                <span class="text-white font-bold">Community Impact</span>
                <span class="bg-emerald-400 text-slate-900 text-xs font-bold px-2 py-1 rounded">LIVE</span>
              </div>
              <div class="space-y-4">
                <div class="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div class="w-[75%] h-full bg-secondary-container"></div>
                </div>
                <p class="text-blue-100 text-sm">75% of goal reached: 1.2M kWh saved this month</p>
                <div class="grid grid-cols-2 gap-4 pt-4">
                  <div class="bg-white/5 p-4 rounded-lg">
                    <span class="block text-2xl font-bold text-white">4.2k</span>
                    <span class="text-xs text-blue-200">Active Households</span>
                  </div>
                  <div class="bg-white/5 p-4 rounded-lg">
                    <span class="block text-2xl font-bold text-white">850t</span>
                    <span class="text-xs text-blue-200">CO2 Offset</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="py-24 bg-surface">
        <div class="container mx-auto px-6">
          <div class="max-w-3xl mb-16">
            <h2 class="text-3xl md:text-4xl font-extrabold text-on-surface mb-4">Smart Alerts &amp; Monitoring</h2>
            <p class="text-on-surface-variant text-lg">Intelligent systems that keep you informed about your energy usage and local grid health in real-time.</p>
          </div>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/30 hover:border-primary transition-all group">
              <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <span class="material-symbols-outlined">notification_important</span>
              </div>
              <h3 class="text-xl font-bold mb-3">Peak Load Alerts</h3>
              <p class="text-on-surface-variant leading-relaxed">Receive instant notifications during peak demand periods to help stabilize the community grid and save on costs.</p>
            </div>
            <div class="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/30 hover:border-primary transition-all group">
              <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <span class="material-symbols-outlined">monitoring</span>
              </div>
              <h3 class="text-xl font-bold mb-3">Usage Analytics</h3>
              <p class="text-on-surface-variant leading-relaxed">Detailed breakdowns of your energy consumption patterns with AI-driven suggestions for optimization.</p>
            </div>
            <div class="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/30 hover:border-primary transition-all group">
              <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <span class="material-symbols-outlined">energy_savings_leaf</span>
              </div>
              <h3 class="text-xl font-bold mb-3">Appliance Health</h3>
              <p class="text-on-surface-variant leading-relaxed">Identify inefficient appliances that are drawing phantom power or operating outside of normal efficiency ranges.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-24 bg-primary relative overflow-hidden">
        <div class="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <h2 class="text-4xl md:text-5xl font-extrabold text-white mb-8">Ready to Join the Green Movement?</h2>
          <p class="text-blue-100 text-xl mb-12 leading-relaxed">Join over 50,000 households already making a difference. Start your journey toward energy independence today.</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <input class="w-full sm:w-80 px-6 py-4 rounded-xl border-0 ring-2 ring-transparent focus:ring-secondary-container transition-all" placeholder="Enter your email" type="email"/>
            <button class="w-full sm:w-auto bg-secondary-container text-on-secondary-container px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all">Join the Community</button>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-surface-container-highest py-12 border-t border-outline-variant/30">
      <div class="container mx-auto px-6 grid md:grid-cols-4 gap-12">
        <div class="col-span-1 md:col-span-1">
          <div class="flex items-center gap-2 mb-6">
            <span class="material-symbols-outlined text-primary text-2xl">bolt</span>
            <span class="text-xl font-bold text-blue-700">EcoSave</span>
          </div>
          <p class="text-on-surface-variant text-sm leading-relaxed">Leading the community-driven transition to sustainable energy through education and smart technology.</p>
        </div>
        <div>
          <h4 class="font-bold mb-4">Resources</h4>
          <ul class="space-y-2 text-sm text-on-surface-variant">
            <li><a class="hover:text-primary transition-colors" href="#">Education Hub</a></li>
            <li><a class="hover:text-primary transition-colors" href="#">Savings Calculator</a></li>
            <li><a class="hover:text-primary transition-colors" href="#">Energy Glossary</a></li>
            <li><a class="hover:text-primary transition-colors" href="#">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4">Community</h4>
          <ul class="space-y-2 text-sm text-on-surface-variant">
            <li><a class="hover:text-primary transition-colors" href="#">Join Movement</a></li>
            <li><a class="hover:text-primary transition-colors" href="#">Local Events</a></li>
            <li><a class="hover:text-primary transition-colors" href="#">Leaderboards</a></li>
            <li><a class="hover:text-primary transition-colors" href="#">Ambassadors</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4">Support</h4>
          <ul class="space-y-2 text-sm text-on-surface-variant">
            <li><a class="hover:text-primary transition-colors" href="#">Help Center</a></li>
            <li><a class="hover:text-primary transition-colors" href="#">Chat Support</a></li>
            <li><a class="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
            <li><a class="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div class="container mx-auto px-6 mt-12 pt-8 border-t border-outline-variant/30 text-center text-xs text-on-surface-variant">
        © 2024 EcoSave Community Initiative. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup>

</script>