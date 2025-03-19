import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@nuxtjs/tailwindcss'
  ],

  devServer: {
    port: 4000,
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:80'
    }
  },

  compatibilityDate: '2025-02-26',

  typescript: {
    strict: true,
    typeCheck: false // Disable type checking during build
  },

  nitro: {
    preset: 'node-server'
  },

  experimental: {
    payloadExtraction: false
  }
});