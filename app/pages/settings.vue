<template>
  <UContainer class="max-w-5xl">
    <div class="py-8">
      <h1 class="text-2xl font-bold mb-6">
        {{ $t('settings.title') }}
      </h1>

      <UCard>
        <UTabs
          v-model="activeTab"
          :items="tabs"
          class="-mt-2"
        >
          <template #content="{ item }">
            <div
              v-if="item.value === 'profile'"
              class="pt-4 max-w-xl space-y-5"
            >
              <div>
                <label class="block text-sm font-medium mb-2">{{ $t('settings.avatar') }}</label>
                <div class="flex items-center gap-4">
                  <UAvatar
                    :src="settings.avatar"
                    size="xl"
                  />
                  <UButton
                    icon="i-lucide-upload"
                    variant="outline"
                  >
                    {{ $t('settings.uploadAvatar') }}
                  </UButton>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">{{ $t('settings.username') }}</label>
                <UInput
                  v-model="settings.username"
                  class="w-full"
                />
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">{{ $t('settings.email') }}</label>
                <UInput
                  v-model="settings.email"
                  type="email"
                  class="w-full"
                />
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">{{ $t('settings.bio') }}</label>
                <UTextarea
                  v-model="settings.bio"
                  :rows="4"
                  class="w-full"
                />
              </div>

              <div class="pt-2">
                <UButton color="primary">
                  {{ $t('settings.save') }}
                </UButton>
              </div>
            </div>

            <div
              v-else-if="item.value === 'preferences'"
              class="pt-4 max-w-xl space-y-5"
            >
              <div>
                <label class="block text-sm font-medium mb-2">{{ $t('settings.defaultLanguage') }}</label>
                <USelect
                  v-model="settings.defaultLanguage"
                  :options="languages"
                  class="w-full"
                />
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">{{ $t('settings.theme') }}</label>
                <USelect
                  v-model="settings.theme"
                  :options="themes"
                  class="w-full"
                />
              </div>

              <div>
                <label class="flex items-center gap-2">
                  <UCheckbox v-model="settings.emailNotifications" />
                  <span class="text-sm font-medium">{{ $t('settings.emailNotifications') }}</span>
                </label>
              </div>

              <div class="pt-2">
                <UButton color="primary">
                  {{ $t('settings.save') }}
                </UButton>
              </div>
            </div>

            <div
              v-else-if="item.value === 'security'"
              class="pt-4 max-w-xl space-y-5"
            >
              <div>
                <label class="block text-sm font-medium mb-2">{{ $t('settings.currentPassword') }}</label>
                <UInput
                  v-model="security.currentPassword"
                  type="password"
                  class="w-full"
                />
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">{{ $t('settings.newPassword') }}</label>
                <UInput
                  v-model="security.newPassword"
                  type="password"
                  class="w-full"
                />
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">{{ $t('settings.confirmNewPassword') }}</label>
                <UInput
                  v-model="security.confirmPassword"
                  type="password"
                  class="w-full"
                />
              </div>

              <div class="pt-2">
                <UButton color="primary">
                  {{ $t('settings.changePassword') }}
                </UButton>
              </div>
            </div>
          </template>
        </UTabs>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const activeTab = ref('profile')

const tabs = computed(() => [
  { value: 'profile', label: t('settings.tabProfile') },
  { value: 'preferences', label: t('settings.tabPreferences') },
  { value: 'security', label: t('settings.tabSecurity') }
])

const settings = ref({
  username: 'johndoe',
  email: 'john@example.com',
  avatar: '',
  bio: '',
  defaultLanguage: 'python',
  theme: 'system',
  emailNotifications: true
})

const security = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const languages = [
  { value: 'python', label: 'Python' },
  { value: 'cpp', label: 'C++' },
  { value: 'java', label: 'Java' },
  { value: 'javascript', label: 'JavaScript' }
]

const themes = computed(() => [
  { value: 'light', label: t('settings.themeLight') },
  { value: 'dark', label: t('settings.themeDark') },
  { value: 'system', label: t('settings.themeSystem') }
])

useSeoMeta({ title: `${t('settings.title')} - SWUFE OJ` })
</script>
