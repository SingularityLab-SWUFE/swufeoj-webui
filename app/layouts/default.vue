<script setup>
const { locale, setLocale } = useI18n()

const navLinks = [
  { labelKey: 'nav.tasks', to: '/tasks', icon: 'i-lucide-code' },
  { labelKey: 'nav.contests', to: '/contests', icon: 'i-lucide-trophy' },
  { labelKey: 'nav.submissions', to: '/submissions', icon: 'i-lucide-send' },
  { labelKey: 'nav.admin', to: '/admin', icon: 'i-lucide-shield' }
]

function toggleLocale() {
  const next = locale.value === 'zh-CN' ? 'en' : 'zh-CN'
  setLocale(next)
}

const localeLabel = computed(() => locale.value === 'zh-CN' ? 'EN' : '中')
</script>

<template>
  <div>
    <UHeader>
      <template #left>
        <NuxtLink
          to="/"
          class="flex items-center gap-2"
        >
          <AppLogo class="w-auto h-6 shrink-0" />
          <span class="font-bold text-lg hidden sm:inline">SWUFE OJ</span>
        </NuxtLink>

        <nav class="hidden md:flex items-center gap-1 ml-6">
          <UButton
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            :icon="link.icon"
            color="neutral"
            variant="ghost"
          >
            {{ $t(link.labelKey) }}
          </UButton>
        </nav>
      </template>

      <template #right>
        <UButton
          :label="localeLabel"
          icon="i-lucide-languages"
          color="neutral"
          variant="ghost"
          @click="toggleLocale"
        />
        <UColorModeButton />

        <UButton
          to="/profile"
          icon="i-lucide-user"
          color="neutral"
          variant="ghost"
        >
          {{ $t('nav.profile') }}
        </UButton>
        <UButton
          to="/login"
          icon="i-lucide-log-in"
          color="neutral"
          variant="ghost"
        >
          {{ $t('nav.login') }}
        </UButton>
      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>

    <USeparator icon="i-lucide-code-2" />

    <UFooter :ui="{ root: 'max-w-5xl mx-auto' }">
      <template #left>
        <div class="text-sm text-muted">
          <p>SWUFE OJ &copy; {{ new Date().getFullYear() }}</p>
          <p>{{ $t('footer.studio') }}</p>
        </div>
      </template>

      <template #right>
        <UButton
          to="/about"
          icon="i-lucide-info"
          aria-label="About"
          color="neutral"
          variant="ghost"
        />
        <UButton
          to="https://github.com/swufeoj"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </div>
</template>
