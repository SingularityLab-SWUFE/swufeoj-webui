<template>
  <UContainer>
    <UCard class="max-w-md mx-auto mt-20">
      <template #header>
        <h2 class="text-2xl font-bold">
          {{ $t('login.title') }}
        </h2>
      </template>

      <UForm
        :state="form"
        @submit="handleLogin"
      >
        <UFormField
          :label="$t('login.email')"
          name="email"
          required
        >
          <UInput
            v-model="form.email"
            type="email"
            :placeholder="$t('login.emailPlaceholder')"
          />
        </UFormField>

        <UFormField
          :label="$t('login.password')"
          name="password"
          required
          class="mt-4"
        >
          <UInput
            v-model="form.password"
            type="password"
            :placeholder="$t('login.passwordPlaceholder')"
          />
        </UFormField>

        <UButton
          type="submit"
          class="mt-6 w-full"
          :loading="loading"
        >
          {{ $t('login.submit') }}
        </UButton>
      </UForm>

      <template #footer>
        <p class="text-sm text-center">
          {{ $t('login.noAccount') }}
          <NuxtLink
            to="/register"
            class="text-primary hover:underline"
          >
            {{ $t('login.register') }}
          </NuxtLink>
        </p>
      </template>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const form = ref({ email: '', password: '' })
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  try {
    console.log('Login payload:', form.value)
    await new Promise(resolve => setTimeout(resolve, 1000))
    navigateTo('/tasks')
  } catch (error) {
    console.error('Login failed:', error)
  } finally {
    loading.value = false
  }
}

useSeoMeta({ title: `${t('login.title')} - SWUFE OJ` })
</script>
