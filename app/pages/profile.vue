<template>
  <UContainer class="max-w-5xl">
    <div class="py-8">
      <template v-if="loading">
        <div class="text-center py-8">
          <UIcon
            name="i-lucide-loader-2"
            class="animate-spin text-4xl"
          />
        </div>
      </template>

      <template v-else-if="profile">
        <div class="space-y-6">
          <UCard>
            <div class="flex items-center gap-6">
              <UAvatar
                :text="profile?.username?.[0]?.toUpperCase() || 'U'"
                size="xl"
              />
              <div class="flex-1">
                <h1 class="text-3xl font-bold">
                  {{ profile.username }}
                </h1>
                <p class="text-muted">
                  {{ profile.email }}
                </p>
                <p class="text-sm text-muted mt-1">
                  {{ $t('profile.joined', { date: new Date(profile.joinedAt).toLocaleDateString() }) }}
                </p>
              </div>
              <UButton
                icon="i-lucide-settings"
                variant="ghost"
                to="/settings"
              >
                {{ $t('profile.settings') }}
              </UButton>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-default">
              <div class="text-center">
                <p class="text-3xl font-bold text-primary">
                  {{ profile.stats.solved }}
                </p>
                <p class="text-sm text-muted">
                  {{ $t('profile.solved') }}
                </p>
              </div>
              <div class="text-center">
                <p class="text-3xl font-bold text-green-600">
                  {{ profile.stats.accepted }}
                </p>
                <p class="text-sm text-muted">
                  {{ $t('profile.accepted') }}
                </p>
              </div>
              <div class="text-center">
                <p class="text-3xl font-bold text-orange-600">
                  {{ profile.stats.submissions }}
                </p>
                <p class="text-sm text-muted">
                  {{ $t('profile.totalSubmissions') }}
                </p>
              </div>
              <div class="text-center">
                <p class="text-3xl font-bold text-blue-600">
                  {{ profile.stats.acceptanceRate }}%
                </p>
                <p class="text-sm text-muted">
                  {{ $t('profile.acceptanceRate') }}
                </p>
              </div>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-bold">
                  {{ $t('profile.submissionHistory') }}
                </h2>
                <UInput
                  v-model="searchQuery"
                  icon="i-lucide-search"
                  :placeholder="$t('profile.searchPlaceholder')"
                  class="w-64"
                />
              </div>
            </template>

            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-default">
                    <th class="text-left py-3 px-4">
                      {{ $t('profile.colTime') }}
                    </th>
                    <th class="text-left py-3 px-4">
                      {{ $t('profile.colTask') }}
                    </th>
                    <th class="text-left py-3 px-4">
                      {{ $t('profile.colLanguage') }}
                    </th>
                    <th class="text-left py-3 px-4">
                      {{ $t('profile.colStatus') }}
                    </th>
                    <th class="text-left py-3 px-4">
                      {{ $t('profile.colExecTime') }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="submission in filteredSubmissions"
                    :key="submission.id"
                    class="border-b border-default hover:bg-elevated cursor-pointer"
                    @click="navigateTo(`/submissions/${submission.id}`)"
                  >
                    <td class="py-3 px-4 text-sm">
                      {{ new Date(submission.submittedAt).toLocaleString() }}
                    </td>
                    <td class="py-3 px-4 font-medium">
                      {{ submission.taskTitle }}
                    </td>
                    <td class="py-3 px-4">
                      {{ submission.language }}
                    </td>
                    <td class="py-3 px-4">
                      <StatusBadge
                        type="submission"
                        :label="submission.status"
                      />
                    </td>
                    <td class="py-3 px-4">
                      {{ submission.executionTime }} ms
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="flex justify-center mt-6">
              <UButton variant="ghost">
                {{ $t('profile.loadMore') }}
              </UButton>
            </div>
          </UCard>
        </div>
      </template>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const loading = ref(true)
const searchQuery = ref('')

const profile = ref({
  username: 'JohnDoe',
  email: 'john.doe@example.com',
  joinedAt: '2024-01-15',
  stats: {
    solved: 47,
    accepted: 152,
    submissions: 189,
    acceptanceRate: 80.4
  }
})

const submissions = ref([
  { id: 1, taskTitle: 'Two Sum', language: 'Python', status: 'Accepted', executionTime: 42, submittedAt: '2024-12-25T10:30:00' },
  { id: 2, taskTitle: 'Binary Search', language: 'JavaScript', status: 'Accepted', executionTime: 35, submittedAt: '2024-12-24T15:20:00' },
  { id: 3, taskTitle: 'Merge Sort Implementation', language: 'C++', status: 'Wrong Answer', executionTime: 0, submittedAt: '2024-12-24T14:10:00' },
  { id: 4, taskTitle: 'Image Classification', language: 'Python', status: 'Time Limit Exceeded', executionTime: 2000, submittedAt: '2024-12-23T09:45:00' },
  { id: 5, taskTitle: 'Dynamic Programming Challenge', language: 'Java', status: 'Accepted', executionTime: 156, submittedAt: '2024-12-22T16:30:00' }
])

const filteredSubmissions = computed(() => {
  if (!searchQuery.value) return submissions.value
  const query = searchQuery.value.toLowerCase()
  return submissions.value.filter(s =>
    s.taskTitle.toLowerCase().includes(query)
    || s.language.toLowerCase().includes(query)
    || s.status.toLowerCase().includes(query)
  )
})

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  loading.value = false
})

useSeoMeta({
  title: `${profile.value.username} - SWUFE OJ`
})
</script>
