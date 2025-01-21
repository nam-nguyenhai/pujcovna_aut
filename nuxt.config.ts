export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@vee-validate/nuxt',
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2025-01-21'
})