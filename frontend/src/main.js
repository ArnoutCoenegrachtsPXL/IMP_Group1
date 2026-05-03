import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import ToggleSwitch from 'primevue/toggleswitch'

import Lara from '@primevue/themes/lara'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: Lara
  }
})

app.component('ToggleSwitch', ToggleSwitch)



/**
 * ToggleSwitch — global ARIA switch component
 * • WCAG 2.5.5: min 44×44px tap target
 * • WCAG 2.1.1: keyboard toggleable via Space / Enter
 * • WCAG 1.4.1: uses semantic role="switch" not just colour
 */
app.component('ToggleSwitch', {
  props: {
    modelValue: { type: Boolean, required: true },
    disabled:   { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  template: `
    <button
      role="switch"
      type="button"
      :aria-checked="String(modelValue)"
      :aria-disabled="disabled ? 'true' : undefined"
      class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent
             transition-colors duration-200 focus-visible:outline-none
             focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
             focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-50"
      style="min-height:44px;min-width:48px;align-items:center;justify-content:center;display:inline-flex;"
      :class="modelValue ? 'bg-primary' : 'bg-outline-variant/50'"
      :disabled="disabled"
      @click="!disabled && $emit('update:modelValue', !modelValue)"
      @keydown.space.prevent="!disabled && $emit('update:modelValue', !modelValue)"
      @keydown.enter.prevent="!disabled && $emit('update:modelValue', !modelValue)"
    >
      <span
        aria-hidden="true"
        class="pointer-events-none absolute inline-block h-5 w-5 transform rounded-full
               bg-white shadow-md transition-transform duration-200"
        :class="modelValue ? 'translate-x-[1.25rem]' : 'translate-x-[0.125rem]'"
      />
    </button>
  `,
})

app.mount('#app')
