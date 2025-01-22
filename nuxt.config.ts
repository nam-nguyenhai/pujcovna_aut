export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@vee-validate/nuxt',
    '@vueuse/nuxt',
    '@nuxt/ui',
  ],
  colorMode: {
    preference: 'light',
  },
  devtools: { enabled: true },
  compatibilityDate: '2025-01-21',
})
