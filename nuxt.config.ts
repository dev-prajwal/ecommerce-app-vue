// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['vuetify/styles'],
  build: {
    transpile: ['vuetify'], 
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://dummyjson.com/products',
    },
  },
  plugins: ['~/plugins/axios.ts'],
});

