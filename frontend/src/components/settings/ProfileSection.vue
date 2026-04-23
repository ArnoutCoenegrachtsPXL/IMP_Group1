<script setup>
import { ref, reactive } from 'vue'
import { useUserPrefsStore } from '@/stores/userPrefs'

const emit = defineEmits(['saved'])
const prefs = useUserPrefsStore()

// Local copy — prevents live-edit until user hits "Update"
const form = reactive({ ...prefs.profile })
const avatarPreview = ref(prefs.profile.avatar || '')
const fileInput = ref(null)
const saving = ref(false)
const error  = ref('')

function triggerFileInput() { fileInput.value?.click() }

function onFileChange(e) {
  const file = e.target.files?.[0]
  if (!file) return
  if (file.size > 5 * 1024 * 1024) { error.value = 'Image must be under 5 MB'; return }
  const reader = new FileReader()
  reader.onload = ev => {
    avatarPreview.value = ev.target.result
    form.avatar = ev.target.result
    error.value = ''
  }
  reader.readAsDataURL(file)
}

function removeAvatar() {
  avatarPreview.value = ''
  form.avatar = ''
  if (fileInput.value) fileInput.value.value = ''
}

// Basic email validation
const emailValid = ref(true)
function validateEmail() { emailValid.value = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) }

async function save() {
  validateEmail()
  if (!emailValid.value) return
  saving.value = true
  await new Promise(r => setTimeout(r, 400)) // simulate async save
  prefs.saveProfile({ ...form })
  saving.value = false
  emit('saved', prefs.t.profileSaved)
}
</script>

<template>
  <section class="card">
    <!-- Header -->
    <h2 class="text-base sm:text-lg font-bold text-on-surface mb-5 flex items-center gap-2">
      <span class="material-symbols-outlined text-primary text-[20px]">person</span>
      {{ prefs.t.profileTitle }}
    </h2>

    <!-- Avatar upload -->
    <div class="flex flex-col sm:flex-row gap-5 mb-7 pb-7 border-b border-outline-variant/20">
      <div class="shrink-0 flex flex-col items-center gap-3">
        <!-- Avatar preview -->
        <div
          class="relative w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-primary/15
                 bg-surface-container-high cursor-pointer group"
          @click="triggerFileInput"
          role="button"
          :aria-label="prefs.t.changePhoto"
          tabindex="0"
          @keydown.enter="triggerFileInput"
        >
          <img
            :src="avatarPreview || prefs.avatarUrl"
            :alt="form.displayName || prefs.t.profileAvatar"
            class="w-full h-full object-cover transition-opacity group-hover:opacity-75"
          />
          <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100
                      transition-opacity bg-black/30 rounded-2xl">
            <span class="material-symbols-outlined text-white text-[28px]">photo_camera</span>
          </div>
        </div>
        <input
          ref="fileInput"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          class="sr-only"
          @change="onFileChange"
          :aria-label="prefs.t.changePhoto"
        />
        <div class="flex gap-2">
          <button
            class="text-xs font-semibold px-3 py-1.5 rounded-xl bg-primary/10 text-primary
                   hover:bg-primary/20 transition-colors min-h-[36px]"
            @click="triggerFileInput"
          >{{ prefs.t.changePhoto }}</button>
          <button
            v-if="avatarPreview"
            class="text-xs font-semibold px-3 py-1.5 rounded-xl bg-error/10 text-error
                   hover:bg-error/20 transition-colors min-h-[36px]"
            @click="removeAvatar"
          >{{ prefs.t.removePhoto }}</button>
        </div>
        <p v-if="error" class="text-xs text-error text-center">{{ error }}</p>
        <p class="text-xs text-on-surface-variant/60 text-center">JPG, PNG, WebP · max 5 MB</p>
      </div>

      <!-- Display name + email preview -->
      <div class="flex-1 min-w-0 flex flex-col justify-center gap-1">
        <p class="font-bold text-lg text-on-surface truncate">{{ form.displayName || '—' }}</p>
        <p class="text-sm text-on-surface-variant truncate">{{ form.email || '—' }}</p>
        <p v-if="form.location" class="text-xs text-on-surface-variant/70 mt-1">
          <span class="material-symbols-outlined text-[13px]">location_on</span>
          {{ form.location }}
        </p>
      </div>
    </div>

    <!-- Form fields -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Display name -->
      <div class="space-y-1.5">
        <label class="block text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant"
               for="p-name">{{ prefs.t.displayName }}</label>
        <input
          id="p-name" type="text" v-model="form.displayName"
          class="w-full bg-surface-container border border-outline-variant/30 rounded-xl
                 px-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/40
                 focus:border-primary/50 transition-all min-h-[44px]"
          :placeholder="prefs.t.displayName"
          maxlength="60"
        />
      </div>

      <!-- Pronouns -->
      <div class="space-y-1.5">
        <label class="block text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant"
               for="p-pronouns">{{ prefs.t.pronouns }}</label>
        <input
          id="p-pronouns" type="text" v-model="form.pronouns"
          class="w-full bg-surface-container border border-outline-variant/30 rounded-xl
                 px-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/40 transition-all min-h-[44px]"
          placeholder="e.g. they/them"
          maxlength="30"
        />
      </div>

      <!-- Email -->
      <div class="sm:col-span-2 space-y-1.5">
        <label class="block text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant"
               for="p-email">{{ prefs.t.email }}</label>
        <input
          id="p-email" type="email" v-model="form.email"
          class="w-full bg-surface-container rounded-xl px-4 py-2.5 text-sm text-on-surface
                 focus:ring-2 transition-all min-h-[44px] border"
          :class="emailValid
            ? 'border-outline-variant/30 focus:ring-primary/40 focus:border-primary/50'
            : 'border-error focus:ring-error/40'"
          placeholder="you@example.com"
          autocomplete="email"
          @blur="validateEmail"
        />
        <p v-if="!emailValid" class="text-xs text-error" role="alert">
          Please enter a valid email address
        </p>
      </div>

      <!-- Phone -->
      <div class="space-y-1.5">
        <label class="block text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant"
               for="p-phone">{{ prefs.t.phone }}</label>
        <input
          id="p-phone" type="tel" v-model="form.phone"
          class="w-full bg-surface-container border border-outline-variant/30 rounded-xl
                 px-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/40 transition-all min-h-[44px]"
          placeholder="+27 00 000 0000"
          autocomplete="tel"
        />
      </div>

      <!-- Location -->
      <div class="space-y-1.5">
        <label class="block text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant"
               for="p-location">{{ prefs.t.location }}</label>
        <input
          id="p-location" type="text" v-model="form.location"
          class="w-full bg-surface-container border border-outline-variant/30 rounded-xl
                 px-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/40 transition-all min-h-[44px]"
          :placeholder="prefs.t.location"
          maxlength="80"
        />
      </div>

      <!-- Website -->
      <div class="space-y-1.5">
        <label class="block text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant"
               for="p-website">{{ prefs.t.website }}</label>
        <input
          id="p-website" type="url" v-model="form.website"
          class="w-full bg-surface-container border border-outline-variant/30 rounded-xl
                 px-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/40 transition-all min-h-[44px]"
          placeholder="https://example.com"
          autocomplete="url"
        />
      </div>

      <!-- Bio -->
      <div class="sm:col-span-2 space-y-1.5">
        <label class="block text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant"
               for="p-bio">{{ prefs.t.bio }}</label>
        <textarea
          id="p-bio" v-model="form.bio" rows="3"
          class="w-full bg-surface-container border border-outline-variant/30 rounded-xl
                 px-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/40 transition-all
                 resize-none"
          :placeholder="`${prefs.t.bio}…`"
          maxlength="200"
        />
        <p class="text-xs text-on-surface-variant/50 text-right">{{ form.bio?.length || 0 }}/200</p>
      </div>
    </div>

    <div class="mt-5 flex justify-end">
      <button
        class="solar-glow px-6 py-2.5 rounded-xl font-semibold text-sm min-h-[44px]
               hover:scale-105 active:scale-95 transition-transform disabled:opacity-60 disabled:scale-100
               flex items-center gap-2"
        :disabled="saving"
        @click="save"
      >
        <span v-if="saving" class="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
        {{ prefs.t.updateProfile }}
      </button>
    </div>
  </section>
</template>
