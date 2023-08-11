// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  extends: [
    '@crtxio/bproto-contract-call',
    '@crtxio/bproto-domain-lookup',
    '@crtxio/database',
    '@crtxio/wallet',
    '@crtxio/notification',
    '@crtxio/search',
  ],
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  runtimeConfig: {
    public: {
      DB_PASSWORD: process.env.DB_PASSWORD,
      RPC_URL: process.env.RPC_URL,
    }
  }
})