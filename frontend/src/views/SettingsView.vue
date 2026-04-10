<script setup>
 // here goes JavaScript code
</script>

<template>
    <!-- here goes html code-->
     <header class="mb-12">
    <h1 class="text-5xl font-extrabold tracking-tighter text-on-surface mb-2 font-headline">Account Settings</h1>
    <p class="text-on-surface-variant text-lg max-w-2xl">Manage your solar infrastructure preferences, security protocols, and personal data from one central terminal.</p>
    </header>
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
    <!-- Personal Info Section (Bento Box 1) -->
    <section class="md:col-span-8 bg-surface-container-lowest rounded-lg p-8 border border-outline-variant/15 relative overflow-hidden group">
    <div class="absolute top-0 right-0 p-8 opacity-10 pointer-events-none transition-transform group-hover:scale-110 duration-700">
    <span class="material-symbols-outlined text-9xl text-primary" data-icon="contact_page">contact_page</span>
    </div>
    <h3 class="text-2xl font-bold mb-8 flex items-center gap-2">
    <span class="material-symbols-outlined text-primary" data-icon="badge">badge</span>
                            Personal Information
                        </h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <div class="space-y-2">
    <label class="font-['Inter'] uppercase tracking-widest text-[10px] text-on-surface-variant block">Full Identity</label>
    <input class="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" type="text" value="Alexander Vance"/>
    </div>
    <div class="space-y-2">
    <label class="font-['Inter'] uppercase tracking-widest text-[10px] text-on-surface-variant block">Primary Relay (Email)</label>
    <input class="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" type="email" value="alexander.vance@solaris-tech.io"/>
    </div>
    <div class="sm:col-span-2 space-y-2">
    <label class="font-['Inter'] uppercase tracking-widest text-[10px] text-on-surface-variant block">Installation Hub</label>
    <input class="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" type="text" value="7200 Energy Way, Silicon Valley, CA 94025"/>
    </div>
    </div>
    <div class="mt-8 flex justify-end">
    <button class="px-6 py-2 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-lg font-bold hover:scale-105 transition-transform">
                                Update Profile
                            </button>
    </div>
    </section>
    <!-- Profile Card (Bento Box 2) -->
    <section class="md:col-span-4 bg-surface-container-low rounded-lg p-8 flex flex-col items-center justify-center text-center">
        <ProfilePicture :image="lh3.googleusercontent.com/aida-public/AB6AXuDhNAIhpLzVA3OxeJ7sE2JZ-iRw67pJTVUwKqfXn-c-xgWSPHO5CQpUVW7rkcB_42xSShSS8FVP3jJgmf011BP1-XkJFCAhue_vdNF3d8RI0DOOQb43vM7yUoeHJwp3h5yPpSxDb_EHOtH8954JySkT928c_SQHVUfTRiMRdt7xbrjzmuun_g0Szy3RVYVlAY3Y-sDVtwRXldpuSS7RGO-Ty5IdVAAXH7I7VH93s8OV5IJWvSkSD5IWOfkup4_Fl7cXF04wEwVZ-OUT"/>
        <button class="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg">
        <span class="material-symbols-outlined text-sm" data-icon="photo_camera">photo_camera</span>
        </button>
        <h4 class="text-xl font-bold">Alexander Vance</h4>
        <p class="text-sm text-primary font-medium">Gold Tier Member</p>
        <div class="mt-6 w-full space-y-3">
            <div class="bg-surface-container-lowest p-3 rounded-lg flex justify-between items-center">
                <span class="text-xs font-semibold text-on-surface-variant">NODE STATUS</span>
                <span class="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-bold">ACTIVE</span>
            </div>
            <div class="bg-surface-container-lowest p-3 rounded-lg flex justify-between items-center">
                <span class="text-xs font-semibold text-on-surface-variant">LAST SYNC</span>
                <span class="text-xs text-on-surface font-medium">2m ago</span>
            </div>
        </div>
    </section>
    <!-- Grid Preferences (Bento Box 3) -->
    <section class="md:col-span-12 bg-surface-container-high rounded-lg p-8">
    <h3 class="text-2xl font-bold mb-8 flex items-center gap-2">
    <span class="material-symbols-outlined text-secondary" data-icon="grid_view">grid_view</span>
                            Grid Preferences
                        </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <!-- Preference Toggle 1 -->
    <div class="bg-surface-container-lowest p-6 rounded-lg flex items-start gap-4 hover:shadow-xl hover:shadow-primary/5 transition-all">
    <div class="bg-primary/10 p-3 rounded-lg">
    <span class="material-symbols-outlined text-primary" data-icon="auto_mode">auto_mode</span>
    </div>
    <div class="flex-1">
    <div class="flex justify-between items-center mb-1">
    <h5 class="font-bold text-on-surface">Automatic Offsetting</h5>
    <button class="w-12 h-6 bg-primary rounded-full relative">
    <span class="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
    </button>
    </div>
    <p class="text-sm text-on-surface-variant">Automatically redirect surplus solar energy to the regional grid during peak demand windows to maximize credit generation.</p>
    </div>
    </div>
    <!-- Preference Toggle 2 -->
    <div class="bg-surface-container-lowest p-6 rounded-lg flex items-start gap-4 hover:shadow-xl hover:shadow-primary/5 transition-all">
    <div class="bg-secondary/10 p-3 rounded-lg">
    <span class="material-symbols-outlined text-secondary" data-icon="hub">hub</span>
    </div>
    <div class="flex-1">
    <div class="flex justify-between items-center mb-1">
    <h5 class="font-bold text-on-surface">Community Sharing</h5>
    <button class="w-12 h-6 bg-outline-variant/30 rounded-full relative">
    <span class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></span>
    </button>
    </div>
    <p class="text-sm text-on-surface-variant">Allow your energy metrics to be shared with local neighborhoods for collective efficiency analytics and rewards.</p>
    </div>
    </div>
    </div>
    </section>
    <!-- Security Section (Bento Box 4) -->
    <section class="md:col-span-12 bg-surface-container-lowest rounded-lg p-8 border border-outline-variant/15">
    <div class="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
    <div>
    <h3 class="text-2xl font-bold flex items-center gap-2">
    <span class="material-symbols-outlined text-primary" data-icon="security">security</span>
                                    Account Security
                                </h3>
    <p class="text-on-surface-variant text-sm mt-1">Protect your terminal access and grid authentication keys.</p>
    </div>
    <div class="flex gap-2">
    <button class="px-4 py-2 bg-surface-container-low text-on-surface font-semibold rounded-lg text-sm border border-outline-variant/15 hover:bg-surface-container-high transition-colors">
                                    View Access Logs
                                </button>
    </div>
    </div>
    <div class="space-y-4">
    <div class="flex items-center justify-between p-4 bg-surface rounded-lg group hover:bg-surface-container-low transition-colors">
    <div class="flex items-center gap-4">
    <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
    <span class="material-symbols-outlined text-primary" data-icon="lock_reset">lock_reset</span>
    </div>
    <div>
    <p class="font-bold">Encryption Protocol</p>
    <p class="text-xs text-on-surface-variant">Password last updated 45 days ago</p>
    </div>
    </div>
    <button class="text-primary font-bold text-sm">Change</button>
    </div>
    <div class="flex items-center justify-between p-4 bg-surface rounded-lg group hover:bg-surface-container-low transition-colors">
    <div class="flex items-center gap-4">
    <div class="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
    <span class="material-symbols-outlined text-secondary" data-icon="phonelink_lock">phonelink_lock</span>
    </div>
    <div>
    <p class="font-bold">Two-Factor Authentication</p>
    <p class="text-xs text-on-surface-variant">SMS and Authenticator App enabled</p>
    </div>
    </div>
    <span class="text-primary flex items-center gap-1 font-bold text-sm">
    <span class="material-symbols-outlined text-sm" data-icon="verified" style="font-variation-settings: 'FILL' 1;">verified</span>
                                    Verified
                                </span>
    </div>
    <div class="flex items-center justify-between p-4 bg-surface rounded-lg group hover:bg-surface-container-low transition-colors">
    <div class="flex items-center gap-4">
    <div class="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center">
    <span class="material-symbols-outlined text-error" data-icon="dangerous">dangerous</span>
    </div>
    <div>
    <p class="font-bold">Delete Account</p>
    <p class="text-xs text-on-surface-variant">Permanently deactivate and wipe node data</p>
    </div>
    </div>
    <button class="text-error font-bold text-sm">Initiate</button>
    </div>
    </div>
    </section>
    <!-- Data Export / Integration (Side Bento) -->
    <section class="md:col-span-12 bg-gradient-to-br from-primary-container to-primary rounded-lg p-8 text-white relative overflow-hidden">
    <div class="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
    <div class="relative z-10 flex flex-col md:flex-row items-center gap-8">
    <div class="flex-1">
    <h3 class="text-2xl font-bold mb-2">Solar Intelligence API</h3>
    <p class="text-primary-fixed opacity-80 mb-6">Integrate your energy production data into HomeKit, Google Home, or custom smart-grid controllers using our high-precision API.</p>
    <div class="flex flex-wrap gap-4">
    <button class="px-6 py-3 bg-tertiary-fixed text-on-tertiary-fixed font-bold rounded-lg hover:scale-105 transition-transform flex items-center gap-2">
    <span class="material-symbols-outlined" data-icon="key">key</span>
                                        Manage API Keys
                                    </button>
    <button class="px-6 py-3 bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold rounded-lg hover:bg-white/20 transition-colors">
                                        Documentation
                                    </button>
    </div>
    </div>
    <div class="hidden lg:block w-48 shrink-0">
    <div class="bg-white/5 rounded-lg p-4 border border-white/10 backdrop-blur-sm">
    <div class="space-y-2">
    <div class="h-2 w-3/4 bg-white/20 rounded-full"></div>
    <div class="h-2 w-full bg-white/20 rounded-full"></div>
    <div class="h-2 w-1/2 bg-white/20 rounded-full"></div>
    </div>
    <div class="mt-4 flex justify-between items-end">
    <div class="w-4 h-8 bg-white/40 rounded-sm"></div>
    <div class="w-4 h-12 bg-white/60 rounded-sm"></div>
    <div class="w-4 h-16 bg-white/80 rounded-sm"></div>
    <div class="w-4 h-10 bg-white/40 rounded-sm"></div>
    </div>
    </div>
    </div>
    </div>
    </section>
    </div>
    <footer class="mt-24 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
    <p class="text-on-surface-variant text-sm">© 2024 Solaris Tech Inc. All energy protocols verified.</p>
    <div class="flex gap-6">
    <a class="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
    <a class="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
    <a class="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors" href="#">Grid Compliance</a>
    </div>
    </footer>
</template>

<style scoped>
    /* here goes css code */
</style>