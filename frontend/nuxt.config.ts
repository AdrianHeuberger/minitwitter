import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/axios'],
  axios: {
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000',
  },
  devServer: {
    port: 4000,
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
    },
  },
#  typescript: {
    strict: true,
    typeCheck: true,
  },
});
