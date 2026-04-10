<script setup>

</script>

<template>
    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
    <!-- Left Column: Upload Interaction -->
    <section class="lg:col-span-7 space-y-6">
    <!-- Manual Entry Section -->
    <div class="bg-white rounded border border-outline-variant p-8">
        <div class="flex items-center gap-3 mb-6">
            <span class="material-symbols-outlined text-primary">edit_note</span>
            <h3 class="font-headline font-bold text-lg">Submit a meter reading</h3>
        </div>
        <form class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label for="value" class="center block text-[12px] font-black uppercase tracking-widest text-on-surface-variant ml-1">Reading Value (kWh)</label>
            <input id="value" class="w-full h-12 bg-surface-container border border-outline-variant rounded px-4 focus:ring-1 focus:ring-primary focus:border-primary transition-all font-semibold text-sm" placeholder="00000.00" type="number"/>
            <div class="md:col-span-2">
                <!-- Dropzone -->
                <label class="relative group cursor-pointer">
                    <div class="w-full aspect-[4/3] rounded border-2 border-dashed border-outline-variant bg-surface-container/30 flex flex-col items-center justify-center p-12 transition-all hover:border-primary/50 hover:bg-surface-container">
                        <input type="file" id="MeterImage" accept="image/png, image/jpeg">
                        <div>
                            <div class="w-16 h-16 rounded bg-primary-container flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                                <span class="material-symbols-outlined text-on-primary-container text-3xl">add_a_photo</span>
                            </div>
                            <span class="text-base font-bold text-on-surface mb-1">Take Photo or Browse</span>
                            <p class="text-xs text-on-surface-variant text-center max-w-xs">Supported: JPG, PNG. Max: 5MB.</p>
                        </div>
                        
                    </div>
                </label>
            </div>
            <div class="flex gap-4 p-4 rounded bg-surface-container/50">
                <span class="material-symbols-outlined text-primary shrink-0">visibility</span>
                <div>
                    <h4 class="font-bold text-xs mb-1 uppercase tracking-wider">Clearly Visible</h4>
                    <p class="text-[11px] text-on-surface-variant leading-relaxed">Ensure all digits and decimals are within the frame and sharp.</p>
                </div>
            </div>
            <div class="flex gap-4 p-4 rounded bg-surface-container/50">
                <span class="material-symbols-outlined text-primary shrink-0">light_mode</span>
                <div>
                    <h4 class="font-bold text-xs mb-1 uppercase tracking-wider">Avoid Glare</h4>
                    <p class="text-[11px] text-on-surface-variant leading-relaxed">Turn off your flash if there's enough natural light to avoid reflections.</p>
                </div>
            </div>
            <div class="md:col-span-2">
                <button class="solar-glow w-full py-4 rounded text-white font-bold text-base shadow-sm active:scale-[0.99] transition-all flex items-center justify-center gap-2" type="submit">
                    Submit Reading
                    <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
            </div>
        </form>
    </div>
    
    </section>
    <!-- Right Column: History & Stats -->
    <section class="lg:col-span-5 space-y-6">
    <!-- Summary Card -->
    <div class="bg-primary-container/30 rounded border border-primary/10 p-8 relative overflow-hidden">
    <h3 class="font-headline font-bold text-lg mb-4 text-on-primary-container">Submission Progress</h3>
    <div class="space-y-4">
    <div class="flex justify-between items-end">
    <span class="text-xs font-semibold text-on-primary-container/70">Month Target: 4 Readings</span>
    <span class="text-2xl font-black text-primary">3/4</span>
    </div>
    <div class="w-full h-2 bg-white/50 rounded overflow-hidden">
    <div class="h-full solaris-glow rounded" style="width: 75%"></div>
    </div>
    <p class="text-[11px] text-on-primary-container/80 italic">1 more reading needed to verify your community green badge.</p>
    </div>
    </div>
    <!-- Recent Uploads Section -->
    <div class="space-y-4">
    <div class="flex justify-between items-center px-1">
    <h3 class="font-headline font-bold text-base">Recent History</h3>
    <button class="text-primary font-bold text-xs hover:underline uppercase tracking-wider">View All</button>
    </div>
    <!-- History List -->
    <div class="space-y-2">
    <!-- History Item 1 -->
    <div class="bg-white border border-outline-variant p-4 rounded flex items-center justify-between item-hover">
    <div class="flex items-center gap-4">
    <div class="w-10 h-10 rounded bg-surface-container flex items-center justify-center">
    <span class="material-symbols-outlined text-primary text-xl">bolt</span>
    </div>
    <div>
    <h4 class="font-bold text-sm">Electricity</h4>
    <p class="text-[11px] text-on-surface-variant">Oct 12, 2023 • 14,320 kWh</p>
    </div>
    </div>
    <div class="flex flex-col items-end gap-1">
    <span class="px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-black uppercase tracking-tighter rounded">Verified</span>
    <span class="text-[9px] text-on-surface-variant font-bold">2.4MB Photo</span>
    </div>
    </div>
    <!-- History Item 2 -->
    <div class="bg-white border border-outline-variant p-4 rounded flex items-center justify-between item-hover">
    <div class="flex items-center gap-4">
    <div class="w-10 h-10 rounded bg-surface-container flex items-center justify-center">
    <span class="material-symbols-outlined text-primary text-xl">water_drop</span>
    </div>
    <div>
    <h4 class="font-bold text-sm">Water</h4>
    <p class="text-[11px] text-on-surface-variant">Oct 05, 2023 • 842.1 m³</p>
    </div>
    </div>
    <div class="flex flex-col items-end gap-1">
    <span class="px-2 py-0.5 bg-surface-container-highest text-on-surface-variant text-[9px] font-black uppercase tracking-tighter rounded">Pending</span>
    <span class="text-[9px] text-on-surface-variant font-bold">Manual Entry</span>
    </div>
    </div>
    <!-- History Item 3 -->
    <div class="bg-white border border-outline-variant p-4 rounded flex items-center justify-between opacity-60">
    <div class="flex items-center gap-4">
    <div class="w-10 h-10 rounded bg-surface-container flex items-center justify-center">
    <span class="material-symbols-outlined text-primary text-xl">bolt</span>
    </div>
    <div>
    <h4 class="font-bold text-sm">Electricity</h4>
    <p class="text-[11px] text-on-surface-variant">Sep 12, 2023 • 14,115 kWh</p>
    </div>
    </div>
    <div class="flex flex-col items-end gap-1">
    <span class="px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-black uppercase tracking-tighter rounded">Verified</span>
    </div>
    </div>
    </div>
    </div>
    <!-- Educational Tip Card -->
    <div class="bg-white border-l-4 border-primary rounded p-5 shadow-sm">
    <div class="flex items-start gap-4">
    <span class="material-symbols-outlined text-primary text-2xl">lightbulb</span>
    <div>
    <h4 class="font-bold text-xs mb-1 uppercase tracking-wider text-on-surface">Pro Tip: Smart Meters</h4>
    <p class="text-[11px] text-on-surface-variant leading-relaxed">Most modern meters update via Bluetooth. Check if your meter model is compatible for automatic syncing in settings.</p>
    </div>
    </div>
    </div>
    </section>
    </div>
</template>

<style scoped>

    input[type="file"] {
        display : none;
    }

    .center {
        margin: auto 0 auto 4pt
    }

</style>