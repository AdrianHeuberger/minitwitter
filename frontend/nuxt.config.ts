// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
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

function defineNuxtConfig(arg0: { compatibilityDate: string; devtools: { enabled: boolean; }; ssr: boolean; modules: string[]; devServer: { port: number; }; runtimeConfig: { public: { apiBaseUrl: string; }; }; }) {
  throw new Error("Function not implemented.");
}
