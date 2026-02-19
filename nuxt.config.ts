// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    'nuxt-shiki',
    '@nuxtjs/i18n'
  ],

  i18n: {
    locales: [
      { code: 'zh-CN', file: 'zh-CN.json', name: '中文' },
      { code: 'en', file: 'en.json', name: 'English' }
    ],
    defaultLocale: 'zh-CN',
    langDir: './locales',
    strategy: 'no_prefix'
  },

  shiki: {
    defaultTheme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    defaultLang: 'python'
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
