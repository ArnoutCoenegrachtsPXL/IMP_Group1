import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)

/**
 * ToggleSwitch — globally registered ARIA switch component.
 *
 * Usage: <ToggleSwitch v-model="someBoolean" />
 *
 * • Meets WCAG 2.5.5 minimum touch target (44×44px wrapper via min-h / min-w).
 * • Colour: uses --color-primary CSS variable so it responds to theme changes.
 * • Keyboard: Space/Enter toggles when focused (role="switch" + tabindex).
 */
app.component('ToggleSwitch', {
  props: { modelValue: Boolean },
  emits: ['update:modelValue'],
  template: `
    <button
      role="switch"
      type="button"
      :aria-checked="String(modelValue)"
      class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent
             transition-colors duration-200
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
             focus-visible:ring-offset-surface"
      :class="modelValue ? 'bg-primary' : 'bg-outline-variant/50'"
      style="min-height:44px;min-width:44px;align-items:center;justify-content:center;display:inline-flex;"
      @click="$emit('update:modelValue', !modelValue)"
      @keydown.space.prevent="$emit('update:modelValue', !modelValue)"
      @keydown.enter.prevent="$emit('update:modelValue', !modelValue)"
    >
      <span
        aria-hidden="true"
        class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white
               shadow-md ring-0 transition-transform duration-200"
        :class="modelValue ? 'translate-x-5' : 'translate-x-0'"
      />
    </button>
  `,
})

app.mount('#app')
