<template>
  <UContainer>
    <UCard class="max-w-md mx-auto mt-20">
      <template #header>
        <h2 class="text-2xl font-bold">
          {{ $t('register.title') }}
        </h2>
      </template>

      <UForm
        :state="form"
        @submit="handleRegister"
      >
        <UFormField
          :label="$t('register.username')"
          name="username"
          required
        >
          <UInput
            v-model="form.username"
            :placeholder="$t('register.usernamePlaceholder')"
          />
        </UFormField>

        <UFormField
          :label="$t('register.email')"
          name="email"
          required
          class="mt-4"
        >
          <UInput
            v-model="form.email"
            type="email"
            :placeholder="$t('register.emailPlaceholder')"
          />
        </UFormField>

        <UFormField
          :label="$t('register.password')"
          name="password"
          required
          class="mt-4"
        >
          <UInput
            v-model="form.password"
            type="password"
            :placeholder="$t('register.passwordPlaceholder')"
          />
        </UFormField>

        <UFormField
          :label="$t('register.confirmPassword')"
          name="confirmPassword"
          required
          class="mt-4"
        >
          <UInput
            v-model="form.confirmPassword"
            type="password"
            :placeholder="$t('register.confirmPasswordPlaceholder')"
          />
        </UFormField>

        <UButton
          type="submit"
          class="mt-6 w-full"
          :loading="loading"
        >
          {{ $t('register.submit') }}
        </UButton>
      </UForm>

      <template #footer>
        <p class="text-sm text-center">
          {{ $t('register.hasAccount') }}
          <NuxtLink
            to="/login"
            class="text-primary hover:underline"
          >
            {{ $t('register.login') }}
          </NuxtLink>
        </p>
      </template>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const form = ref({ username: '', email: '', password: '', confirmPassword: '' })
const loading = ref(false)

const handleRegister = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    console.error('Passwords do not match')
    return
  }
  loading.value = true
  try {
    console.log('Register payload:', form.value)
    await new Promise(resolve => setTimeout(resolve, 1000))
    navigateTo('/login')
  } catch (error) {
    console.error('Registration failed:', error)
  } finally {
    loading.value = false
  }
}

useSeoMeta({ title: `${t('register.title')} - SWUFE OJ` })
</script>
