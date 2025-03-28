export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@vee-validate/nuxt',
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@nuxtjs/supabase',
  ],
  colorMode: {
    preference: 'light',
  },
  runtimeConfig: {
    public: {
      supabaseUrl: '',
      supabaseKey: '',
    },
  },

  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/',
      exclude: ['/detail/*']
    },
  },

  devtools: { enabled: true },
  compatibilityDate: '2025-01-21',
})
