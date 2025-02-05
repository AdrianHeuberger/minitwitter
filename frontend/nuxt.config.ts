export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxtjs/tailwindcss'],
  devServer: {
    port: 4000,
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: 'http://localhost:3000',
    },
  },
})