<script setup>
    import SideBarItem from './SideBarItem.vue'
    import Logo from './Logo.vue'

    const options = ['Dashboard', 'Leaderboard', 'Upload Meter', 'Energy Lab', 'Community', 'Settings']
    const symbols = ['grid_view', 'leaderboard', 'add', 'science', 'group', 'settings']
    const links   = ['/dashboard', '/leaderboard', '/upload', '#', '#', '#']
</script>

<template>
    <aside class="h-screen w-72 fixed left-0 top-0 border-r border-outline-variant/20 bg-surface flex flex-col h-full py-8 gap-2 z-40 hidden md:flex">
        <Logo/>
        <div class="flex flex-col items-center mb-8 px-6">
            <div class="w-16 h-16 rounded-full bg-surface-container-high mb-3 flex items-center justify-center overflow-hidden">
                <img class="w-full h-full object-cover" data-alt="EcoPower User Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfmVuxN7riZahEcZ3uEoyYaRu9JXhalFTwXgadhcFsO8Xxou2dNcoqLOfZaIVbt8EnWTxlg3zRPYQ3Ta0F3ZGippGnsp1oxqgxsXlQAVirvN2at_uPKdde96ZedgOfNsdhJsvdG-OHe9C1A783qYo3cywkcasmg1YO50I7lV5oPQ7SctvfOUX2o0b0Bib32LcFYdZAHsglAza7pXs2Huj9NN_-orB0EAl-8zNBzrU9L8qcYNqy1pmq3ak2Y026EolUm5Z-VCZoJaU"/>
            </div>
            <p class="font-headline font-bold text-on-surface">Energy Hero</p>
            <p class="text-xs text-primary font-medium">7 Day Streak 🔥</p>
        </div>

        <nav class="flex-1 space-y-1">
            <SideBarItem v-for="(option, index) in options"
            :text="option"
            :symbol="symbols[index]"
            :link="links[index]"
            />
        </nav>
        <div class="px-8 mt-auto flex flex-col gap-4">
            <button class="solar-glow text-white py-3 px-4 rounded-md font-bold text-sm shadow-md active:scale-95 transition-transform">
                View Impact Report
            </button>
            <div class="flex flex-col gap-1 border-t border-outline-variant/10 pt-4">
                <a class="flex items-center gap-3 py-2 px-2 text-on-surface-variant/60 text-sm font-medium hover:text-primary transition-colors" href="#">
                    <span class="material-symbols-outlined text-sm">help</span> Support
                </a>
                <a class="flex items-center gap-3 py-2 px-2 text-on-surface-variant/60 text-sm font-medium hover:text-primary transition-colors" href="#">
                    <span class="material-symbols-outlined text-sm">logout</span> Logout
                </a>
            </div>
        </div>
    </aside>
</template>