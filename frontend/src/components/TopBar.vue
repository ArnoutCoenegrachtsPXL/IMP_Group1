<script setup>
    import TopBarButton from './TopBarButton.vue';
    import Logo from './Logo.vue';
    const symbols=['add', 'star', 'notifications']
    const descriptions=['Upload meter', '???', 'notifications']
    const links=['/upload','#','#']
</script>

<template>
    <header class="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md flex justify-between items-center px-6 py-4 w-full md:pl-80 border-b border-outline-variant/20">
        <Logo/>
        <div class="flex items-center gap-4">
            <div class="relative hidden sm:block">
                <span class="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/4 text-on-surface-variant">search</span>
                <input class="bg-surface-container-low border-none rounded-md py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 w-48 lg:w-64" placeholder="Search neighbors..." type="text"/>
            </div>
            <TopBarButton 
                v-for="(symbol, index) in symbols" 
                :symbol=symbol 
                :description="descriptions[index]" 
                :link="links[index]"
            />
            <div class="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border-2 border-primary-fixed">
                <img class="w-full h-full object-cover" data-alt="User profile with active streak status" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2NwZTRTcj3EG7iTu3J7ZZ6mmC5u6AI7_6FA41Ll75H0DIlVTyaZCULCFriCewwZmIJS0jWpOEh9dvy3yZUeut3E0NaKXxSpWPqK0hZTtg_x_G8FSzN6lcQnjShWFmVVmw72PHTp_tiHiWdfAVWNVsUr46v6ixCUyc7lClV8smH3sDlm4-Cb63SinRiPPPVTwIEYWhLV1Th5m-KxCHvR4XSGOR-cnGDTNJnyWWwkdzvO2lk7hUu_Dfv-w5sNUiiQdtIV7DIK71N3I"/>
            </div>
        </div>
    </header>
</template>