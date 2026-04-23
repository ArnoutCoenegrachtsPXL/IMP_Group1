<script setup>
    import SideBar from '../components/SideBar.vue'
    import TopBar from '@/components/TopBar.vue';
    import { ref, onMounted } from 'vue'
    import EnergyLineChart from '@/components/EnergyLineChart.vue'

    // Green Energy Mix data
    const greenStats = ref({
        community: { percentage: 68.5, solar: 45.2, wind: 15.3, hydro: 8.0, totalGreen: 34250, total: 50000 },
        user: { percentage: 72.3, greenKWh: 425.5, totalKWh: 612.8, rank: 42, totalUsers: 247, badge: "Green Leader", badgeIcon: "⭐" }
    })

    // Function to load data from API
    const loadGreenEnergyData = async () => {
        try {
            const response = await fetch('/api/GreenEnergy/stats')
            if (response.ok) {
                const data = await response.json()
                updateGreenUI(data)
                updatePersonalUI(data)  // ← NEW for Issue #27
            } else {
                updateGreenUI(greenStats.value)
                updatePersonalUI(greenStats.value)  // ← NEW for Issue #27
            }
        } catch (error) {
            updateGreenUI(greenStats.value)
            updatePersonalUI(greenStats.value)  // ← NEW for Issue #27
        }
    }

    // Function to update the UI (Issue #29)
    const updateGreenUI = (data) => {
        const communityEl = document.getElementById('communityPercentage')
        if (communityEl) communityEl.textContent = data.community.percentage + '%'
        
        const communityBar = document.getElementById('communityBar')
        if (communityBar) communityBar.style.width = data.community.percentage + '%'
        
        const solarEl = document.getElementById('solarPercent')
        if (solarEl) solarEl.textContent = data.community.solar + '%'
        
        const windEl = document.getElementById('windPercent')
        if (windEl) windEl.textContent = data.community.wind + '%'
        
        const hydroEl = document.getElementById('hydroPercent')
        if (hydroEl) hydroEl.textContent = data.community.hydro + '%'
        
        const communityTotal = document.getElementById('communityTotal')
        if (communityTotal) communityTotal.textContent = `Total: ${data.community.totalGreen.toLocaleString()} kWh green out of ${data.community.total.toLocaleString()} kWh`
        
        const userPercent = document.getElementById('userPercentage')
        if (userPercent) userPercent.textContent = data.user.percentage + '%'
        
        const userBar = document.getElementById('userBar')
        if (userBar) userBar.style.width = data.user.percentage + '%'
        
        const userGreen = document.getElementById('userGreenKWh')
        if (userGreen) userGreen.textContent = data.user.greenKWh + ' kWh'
        
        const userTotal = document.getElementById('userTotalKWh')
        if (userTotal) userTotal.textContent = data.user.totalKWh + ' kWh'
        
        const userRank = document.getElementById('userRank')
        if (userRank) userRank.textContent = '#' + data.user.rank
        
        const totalUsers = document.getElementById('totalUsers')
        if (totalUsers) totalUsers.textContent = `out of ${data.user.totalUsers} users`
        
        const badgeIcon = document.getElementById('userBadgeIcon')
        if (badgeIcon) badgeIcon.textContent = data.user.badgeIcon
        
        const badgeText = document.getElementById('userBadgeText')
        if (badgeText) badgeText.textContent = data.user.badge
        
        const difference = data.user.percentage - data.community.percentage
        let messageColor, icon, messageText, subtext
        
        if (difference >= 10) {
            messageColor = 'bg-green-100 dark:bg-green-900/30'
            icon = '🏆'
            messageText = `Incredible! You're leading the community by ${difference.toFixed(1)}%!`
            subtext = `You're in the top 10% of all users!`
        } else if (difference >= 5) {
            messageColor = 'bg-emerald-100 dark:bg-emerald-900/30'
            icon = '📈'
            messageText = `Great job! You're ${difference.toFixed(1)}% above community average!`
            subtext = `Keep up the excellent work!`
        } else if (difference >= -5) {
            messageColor = 'bg-blue-100 dark:bg-blue-900/30'
            icon = '🌱'
            messageText = `You're keeping pace with the community!`
            subtext = `${Math.abs(difference).toFixed(1)}% from community average`
        } else {
            messageColor = 'bg-yellow-100 dark:bg-yellow-900/30'
            icon = '📉'
            messageText = `Room for improvement! You're ${Math.abs(difference).toFixed(1)}% below average.`
            subtext = `Check the tips below to increase your green score!`
        }
        
        const messageDiv = document.getElementById('comparisonMessage')
        if (messageDiv) messageDiv.className = `mt-4 p-4 rounded-lg ${messageColor}`
        
        const comparisonIcon = document.getElementById('comparisonIcon')
        if (comparisonIcon) comparisonIcon.textContent = icon
        
        const comparisonText = document.getElementById('comparisonText')
        if (comparisonText) comparisonText.textContent = messageText
        
        const comparisonSubtext = document.getElementById('comparisonSubtext')
        if (comparisonSubtext) comparisonSubtext.textContent = subtext
        
        const userCard = document.getElementById('userStatsCard')
        if (userCard) {
            if (difference >= 5) {
                userCard.className = 'rounded-lg p-4 bg-green-50 dark:bg-green-900/20 border border-green-200'
            } else if (difference >= -5) {
                userCard.className = 'rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200'
            } else {
                userCard.className = 'rounded-lg p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200'
            }
        }
    }

    // NEW: Update Personal Green Energy (Issue #27)
    const updatePersonalUI = (data) => {
        const personalPercent = document.getElementById('personalPercentage')
        if (personalPercent) personalPercent.textContent = data.user.percentage + '%'
        
        const personalBar = document.getElementById('personalBar')
        if (personalBar) personalBar.style.width = data.user.percentage + '%'
        
        const personalGreen = document.getElementById('personalGreenKWh')
        if (personalGreen) personalGreen.textContent = data.user.greenKWh + ' kWh'
        
        const personalTotal = document.getElementById('personalTotalKWh')
        if (personalTotal) personalTotal.textContent = data.user.totalKWh + ' kWh'
        
        const nonGreen = data.user.totalKWh - data.user.greenKWh
        const nonGreenEl = document.getElementById('nonGreenKWh')
        if (nonGreenEl) nonGreenEl.textContent = nonGreen.toFixed(1) + ' kWh'
        
        // Calculate breakdown based on community percentages
        const solarContribution = (data.user.greenKWh * data.community.solar / 100).toFixed(1)
        const windContribution = (data.user.greenKWh * data.community.wind / 100).toFixed(1)
        const hydroContribution = (data.user.greenKWh * data.community.hydro / 100).toFixed(1)
        
        const solarBreakdown = document.getElementById('personalSolar')
        if (solarBreakdown) solarBreakdown.textContent = solarContribution + ' kWh'
        
        const windBreakdown = document.getElementById('personalWind')
        if (windBreakdown) windBreakdown.textContent = windContribution + ' kWh'
        
        const hydroBreakdown = document.getElementById('personalHydro')
        if (hydroBreakdown) hydroBreakdown.textContent = hydroContribution + ' kWh'
    }

    // Function to show tip popups
    const showTip = (tipNumber) => {
        const tips = {
            1: "💡 Tip: Run appliances during peak solar hours (10 AM - 3 PM)",
            2: "💡 Tip: Join community solar programs",
            3: "💡 Tip: Schedule EV charging during high renewable generation",
            4: "💡 Tip: Track daily usage patterns"
        }
        const toast = document.createElement('div')
        toast.className = 'fixed bottom-24 right-6 bg-primary text-white px-4 py-3 rounded-lg shadow-lg z-50 max-w-md'
        toast.innerHTML = tips[tipNumber]
        document.body.appendChild(toast)
        setTimeout(() => toast.remove(), 4000)
    }

    // Load data when component mounts
    onMounted(() => {
        loadGreenEnergyData()
    })
</script>

<template>
    <!-- Dashboard Hero Section -->
    <div class="mb-8">
        <h1 class="text-3xl font-extrabold tracking-tight text-on-surface mb-1">Energy Hub</h1>
        <p class="text-on-surface-variant">Live system overview for your sustainable home.</p>
    </div>
    <!-- Bento Grid Dashboard -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
        <!-- Real-time Energy Chart (Large Card) -->
        <div class="md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm overflow-hidden relative">
            <div class="flex justify-between items-start mb-6">
                <div>
                    <h2 class="text-lg font-bold text-on-surface">Production vs Consumption</h2>
                    <p class="text-sm text-on-surface-variant">Last 24 hours (kW)</p>
                </div>
                <div class="flex gap-2">
                    <span class="inline-flex items-center gap-1 text-xs font-medium text-primary px-2 py-1 bg-primary-fixed rounded-full">
                        <span class="w-2 h-2 rounded-full bg-primary"></span> Solar
                    </span>
                    <span class="inline-flex items-center gap-1 text-xs font-medium text-secondary px-2 py-1 bg-secondary-fixed rounded-full">
                        <span class="w-2 h-2 rounded-full bg-secondary"></span> Usage
                    </span>
                </div>
            </div>
            <div class="h-64 flex items-end justify-between gap-1 mt-4">
                <div class="w-full h-full flex items-end gap-1">
                    <div class="flex-1 bg-primary/20 rounded-t h-[40%]"></div>
                    <div class="flex-1 bg-primary/30 rounded-t h-[55%]"></div>
                    <div class="flex-1 bg-primary/40 rounded-t h-[70%]"></div>
                    <div class="flex-1 bg-primary/60 rounded-t h-[85%]"></div>
                    <div class="flex-1 bg-primary rounded-t h-[95%]"></div>
                    <div class="flex-1 bg-primary/80 rounded-t h-[80%]"></div>
                    <div class="flex-1 bg-primary/50 rounded-t h-[60%]"></div>
                    <div class="flex-1 bg-secondary/40 rounded-t h-[45%]"></div>
                    <div class="flex-1 bg-secondary/60 rounded-t h-[50%]"></div>
                    <div class="flex-1 bg-secondary rounded-t h-[65%]"></div>
                    <div class="flex-1 bg-secondary/70 rounded-t h-[55%]"></div>
                    <div class="flex-1 bg-secondary/30 rounded-t h-[40%]"></div>
                </div>
            </div>
            <div class="mt-4 pt-4 border-t border-surface-container-high flex justify-around">
                <div class="text-center">
                    <p class="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Total Generated</p>
                    <p class="text-xl font-bold text-primary">24.8 kWh</p>
                </div>
                <div class="text-center">
                    <p class="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Total Consumed</p>
                    <p class="text-xl font-bold text-secondary">18.2 kWh</p>
                </div>
            </div>
        </div>

        <!-- Battery Level (Small Vertical Card) -->
        <div class="md:col-span-4 bg-primary text-on-primary rounded-xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div class="absolute top-0 right-0 p-8 opacity-10">
                <span class="material-symbols-outlined text-9xl">battery_charging_full</span>
            </div>
            <div class="z-10">
                <h2 class="text-lg font-bold mb-1 opacity-90">Battery Storage</h2>
                <p class="text-sm opacity-75">Tesla Powerwall 2</p>
            </div>
            <div class="z-10 mt-8 mb-4">
                <div class="flex items-end gap-2">
                    <span class="text-6xl font-black">82</span>
                    <span class="text-2xl font-bold pb-1">%</span>
                </div>
                <p class="text-sm mt-2 font-medium bg-on-primary/20 inline-block px-3 py-1 rounded-full text-white">
                    Discharging • 2.1 kW
                </p>
            </div>
            <div class="z-10 mt-auto">
                <div class="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                    <div class="bg-white h-full w-[82%]"></div>
                </div>
                <div class="flex justify-between mt-2 text-xs font-medium">
                    <span>Empty</span>
                    <span>Estimated 14h left</span>
                </div>
            </div>
        </div>

        <!-- Sustainability Score (Asymmetric Card) -->
        <div class="md:col-span-5 bg-surface-container-high border border-outline-variant rounded-xl p-6 shadow-sm">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-bold text-on-surface">Sustainability Score</h2>
                <span class="material-symbols-outlined text-tertiary">workspace_premium</span>
            </div>
            <div class="flex items-center gap-6">
                <div class="relative flex items-center justify-center">
                    <svg class="w-24 h-24 transform -rotate-90">
                        <circle class="text-surface-container-highest" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" stroke-width="8"></circle>
                        <circle class="text-primary" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" stroke-dasharray="251.2" stroke-dashoffset="25.12" stroke-width="8"></circle>
                    </svg>
                    <span class="absolute text-2xl font-bold text-on-surface">90</span>
                </div>
                <div>
                    <p class="text-sm text-on-surface-variant leading-relaxed">You are in the <span class="text-primary font-bold">top 5%</span> of EcoSave users in your region this month. Keep it up!</p>
                    <button class="mt-3 text-sm font-bold text-primary flex items-center gap-1 hover:underline">
                        View Report <span class="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Solar Forecast (Modern List/Grid) -->
        <div class="md:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
            <h2 class="text-lg font-bold text-on-surface mb-4">Solar Forecast</h2>
            <div class="grid grid-cols-4 gap-4">
                <div class="text-center p-3 rounded-lg bg-surface-container-low transition-colors hover:bg-surface-container-high">
                    <p class="text-xs text-on-surface-variant mb-1">09:00</p>
                    <span class="material-symbols-outlined text-tertiary-fixed-dim block mb-1">wb_sunny</span>
                    <p class="text-sm font-bold">1.2 kW</p>
                </div>
                <div class="text-center p-3 rounded-lg bg-primary-container text-on-primary-container shadow-sm">
                    <p class="text-xs opacity-80 mb-1">12:00</p>
                    <span class="material-symbols-outlined block mb-1">light_mode</span>
                    <p class="text-sm font-black">4.8 kW</p>
                </div>
                <div class="text-center p-3 rounded-lg bg-surface-container-low transition-colors hover:bg-surface-container-high">
                    <p class="text-xs text-on-surface-variant mb-1">15:00</p>
                    <span class="material-symbols-outlined text-outline block mb-1">cloud</span>
                    <p class="text-sm font-bold">2.4 kW</p>
                </div>
                <div class="text-center p-3 rounded-lg bg-surface-container-low transition-colors hover:bg-surface-container-high">
                    <p class="text-xs text-on-surface-variant mb-1">18:00</p>
                    <span class="material-symbols-outlined text-outline block mb-1">wb_twilight</span>
                    <p class="text-sm font-bold">0.5 kW</p>
                </div>
            </div>
        </div>

        <!-- CO2 Saved (Impact Card) -->
        <div class="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-secondary-container text-on-secondary-container rounded-xl p-6 shadow-sm flex items-center gap-4">
                <div class="p-3 bg-white/30 rounded-lg">
                    <span class="material-symbols-outlined text-3xl">eco</span>
                </div>
                <div>
                    <p class="text-xs font-bold uppercase tracking-wider opacity-80">CO2 Offset</p>
                    <p class="text-2xl font-black">1.4 tons</p>
                    <p class="text-xs">Equivalent to 64 trees planted</p>
                </div>
            </div>
            <div class="bg-surface-container-highest border border-outline-variant rounded-xl p-6 shadow-sm flex items-center gap-4">
                <div class="p-3 bg-surface-container-low rounded-lg">
                    <span class="material-symbols-outlined text-3xl text-secondary">payments</span>
                </div>
                <div>
                    <p class="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Estimated Savings</p>
                    <p class="text-2xl font-black text-on-surface">$342.50</p>
                    <p class="text-xs text-on-surface-variant">Since Jan 2024</p>
                </div>
            </div>
            <div class="bg-surface-container-highest border border-outline-variant rounded-xl p-6 shadow-sm flex items-center gap-4">
                <div class="p-3 bg-surface-container-low rounded-lg">
                    <span class="material-symbols-outlined text-3xl text-tertiary">electric_car</span>
                </div>
                <div>
                    <p class="text-xs font-bold uppercase tracking-wider text-on-surface-variant">EV Charging</p>
                    <p class="text-2xl font-black text-on-surface">Scheduled</p>
                    <p class="text-xs text-on-surface-variant">Next: 02:00 AM (Off-peak)</p>
                </div>
            </div>
        </div>

        <!-- ROW WITH TWO CARDS: Green Energy Mix (Issue #29) + My Green Energy (Issue #27) -->
        <div class="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            
            <!-- GREEN ENERGY MIX - ISSUE #29 -->
            <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 shadow-lg">
                <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
                    <div>
                        <h2 class="text-2xl font-bold flex items-center gap-2">
                            <span class="text-3xl">🌿</span>
                            Green Energy Mix
                        </h2>
                        <p class="text-on-surface-variant text-sm mt-1">Community vs Your green energy</p>
                    </div>
                    <div class="text-right bg-white/50 dark:bg-black/20 rounded-lg px-4 py-2">
                        <div class="text-xs text-on-surface-variant">Your Rank</div>
                        <div class="text-2xl font-bold text-primary" id="userRank">#42</div>
                        <div class="text-xs text-on-surface-variant" id="totalUsers">out of 247 users</div>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div class="bg-white/50 dark:bg-black/20 rounded-lg p-4">
                        <div class="flex justify-between items-center mb-2">
                            <span class="font-semibold">🌍 Community Average</span>
                            <span class="text-2xl font-bold text-primary" id="communityPercentage">68.5%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-4 mb-3">
                            <div class="bg-primary h-4 rounded-full transition-all" id="communityBar" style="width: 68.5%"></div>
                        </div>
                        <div class="grid grid-cols-3 gap-2 text-center text-sm mt-3">
                            <div><div class="text-yellow-600">☀️ Solar</div><div class="font-semibold" id="solarPercent">45.2%</div></div>
                            <div><div class="text-blue-600">💨 Wind</div><div class="font-semibold" id="windPercent">15.3%</div></div>
                            <div><div class="text-cyan-600">💧 Hydro</div><div class="font-semibold" id="hydroPercent">8.0%</div></div>
                        </div>
                        <div class="text-xs text-gray-500 mt-3" id="communityTotal">Total: 34,250 kWh green out of 50,000 kWh</div>
                    </div>

                    <div class="rounded-lg p-4" id="userStatsCard">
                        <div class="flex justify-between items-center mb-2">
                            <span class="font-semibold">👤 Your Green Usage</span>
                            <span class="text-2xl font-bold text-primary" id="userPercentage">72.3%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-4 mb-3">
                            <div class="bg-primary h-4 rounded-full transition-all" id="userBar" style="width: 72.3%"></div>
                        </div>
                        <div class="flex justify-between text-sm mb-2">
                            <span>Green Energy Used</span>
                            <span class="font-semibold" id="userGreenKWh">425.5 kWh</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span>Total Energy Used</span>
                            <span class="font-semibold" id="userTotalKWh">612.8 kWh</span>
                        </div>
                        <div class="mt-3 pt-2 border-t">
                            <div class="flex items-center gap-2">
                                <span class="text-2xl" id="userBadgeIcon">⭐</span>
                                <span class="text-sm font-medium" id="userBadgeText">Green Leader</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-4 p-4 rounded-lg" id="comparisonMessage">
                    <div class="flex items-center gap-3">
                        <span class="text-3xl" id="comparisonIcon">📈</span>
                        <div>
                            <p class="font-semibold" id="comparisonText">Great job! You're 3.8% above community average!</p>
                            <p class="text-sm text-gray-600 dark:text-gray-400" id="comparisonSubtext">You're doing better than 65% of your community</p>
                        </div>
                    </div>
                </div>

                <div class="mt-6">
                    <h3 class="font-semibold mb-3 flex items-center gap-2"><span>💡</span> Tips to Improve</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div class="flex items-start gap-2 text-sm p-2 hover:bg-white/30 rounded-lg transition-colors cursor-pointer" @click="showTip(1)"><span class="text-green-600">💡</span><span>Run appliances during peak solar hours</span></div>
                        <div class="flex items-start gap-2 text-sm p-2 hover:bg-white/30 rounded-lg transition-colors cursor-pointer" @click="showTip(2)"><span class="text-green-600">💡</span><span>Join community solar programs</span></div>
                        <div class="flex items-start gap-2 text-sm p-2 hover:bg-white/30 rounded-lg transition-colors cursor-pointer" @click="showTip(3)"><span class="text-green-600">💡</span><span>Schedule EV charging during high renewable generation</span></div>
                        <div class="flex items-start gap-2 text-sm p-2 hover:bg-white/30 rounded-lg transition-colors cursor-pointer" @click="showTip(4)"><span class="text-green-600">💡</span><span>Track daily usage patterns</span></div>
                    </div>
                </div>
            </div>

            <!-- ISSUE #27: MY GREEN ENERGY (Personal breakdown) -->
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 shadow-lg">
                <div class="flex items-center gap-2 mb-4">
                    <span class="text-3xl">🔋</span>
                    <h2 class="text-2xl font-bold">My Green Energy</h2>
                </div>
                <p class="text-on-surface-variant text-sm mb-4">Your personal renewable energy breakdown</p>

                <!-- Main percentage -->
                <div class="text-center mb-4">
                    <div class="text-5xl font-black text-primary" id="personalPercentage">72.3%</div>
                    <div class="text-sm text-on-surface-variant">Green Energy</div>
                    <div class="w-full bg-gray-200 rounded-full h-3 mt-2">
                        <div class="bg-primary h-3 rounded-full transition-all" id="personalBar" style="width: 72.3%"></div>
                    </div>
                </div>

                <!-- Energy breakdown -->
                <div class="space-y-3 mb-4">
                    <div class="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                        <span><span class="text-yellow-600">☀️</span> Solar</span>
                        <span class="font-semibold" id="personalSolar">210.0 kWh</span>
                    </div>
                    <div class="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                        <span><span class="text-blue-600">💨</span> Wind</span>
                        <span class="font-semibold" id="personalWind">71.0 kWh</span>
                    </div>
                    <div class="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                        <span><span class="text-cyan-600">💧</span> Hydro</span>
                        <span class="font-semibold" id="personalHydro">37.0 kWh</span>
                    </div>
                    <div class="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                        <span><span class="text-gray-500">🔥</span> Non-green</span>
                        <span class="font-semibold" id="nonGreenKWh">187.3 kWh</span>
                    </div>
                </div>

                <!-- Totals -->
                <div class="border-t pt-3 mt-2">
                    <div class="flex justify-between text-sm">
                        <span>Total Green:</span>
                        <span class="font-bold text-green-600" id="personalGreenKWh">425.5 kWh</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span>Total Energy:</span>
                        <span class="font-bold" id="personalTotalKWh">612.8 kWh</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
            <!-- CHARTS SECTION: MY ENERGY TREND (#28) + COMMUNITY TREND (#30) -->
        <div class="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            
            <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-lg">
                <div class="flex items-center gap-2 mb-4">
                    <span class="text-2xl">📈</span>
                    <h2 class="text-xl font-bold">My Energy Trend</h2>
                </div>
                <EnergyLineChart 
                    :labels="['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
                    :values="[85.2, 72.5, 98.2, 64.8, 55.3, 48.7, 42.1]"
                    :total="612.8"
                    peakDay="Wednesday"
                    :peakValue="98.2"
                />
            </div>

            <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-lg">
                <div class="flex items-center gap-2 mb-4">
                    <span class="text-2xl">📊</span>
                    <h2 class="text-xl font-bold">Community Energy Trend</h2>
                </div>
                <EnergyLineChart 
                    :labels="['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
                    :values="[8450, 8200, 8900, 7800, 7500, 7100, 6900]"
                    :total="50000"
                    peakDay="Wednesday"
                    :peakValue="8900"
                />
            </div>
        </div>
</template>
