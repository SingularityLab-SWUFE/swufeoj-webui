<template>
  <UContainer class="max-w-5xl">
    <div class="py-8">
      <USkeleton
        v-if="loading"
        class="h-96"
      />

      <template v-else>
        <UCard>
          <div class="mb-6">
            <UserHeader
              :username="user.username"
              :avatar="user.avatar"
              :subtitle="$t('profile.joined', { date: user.joinDate })"
              size="xl"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <UCard>
              <div class="text-center">
                <div class="text-3xl font-bold text-primary">
                  {{ user.solved }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  {{ $t('profile.solved') }}
                </div>
              </div>
            </UCard>
            <UCard>
              <div class="text-center">
                <div class="text-3xl font-bold text-primary">
                  {{ user.submissions }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  {{ $t('profile.totalSubmissions') }}
                </div>
              </div>
            </UCard>
            <UCard>
              <div class="text-center">
                <div class="text-3xl font-bold text-primary">
                  {{ user.rank }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  {{ $t('users.globalRank') }}
                </div>
              </div>
            </UCard>
          </div>

          <div>
            <h2 class="text-xl font-bold mb-4">
              {{ $t('users.recentSubmissions') }}
            </h2>
            <UTable
              :columns="submissionColumns"
              :data="user.recentSubmissions"
              @select="(_e, row) => navigateTo(`/submissions/${row.original.id}`)"
            >
              <template #status-cell="{ row }">
                <StatusBadge
                  type="submission"
                  :label="row.original.status"
                />
              </template>

              <template #time-cell="{ row }">
                <span class="text-gray-600 dark:text-gray-400">{{ row.original.time }}</span>
              </template>
            </UTable>
          </div>
        </UCard>
      </template>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const userId = route.params.id

const loading = ref(true)
const user = ref({
  username: 'user_' + userId,
  avatar: '',
  joinDate: '2024-01-15',
  solved: 42,
  submissions: 156,
  rank: 123,
  recentSubmissions: [
    { id: 1, task: 'Two Sum', status: 'Accepted', language: 'Python', time: '2 hours ago' },
    { id: 2, task: 'Binary Search', status: 'Accepted', language: 'C++', time: '5 hours ago' },
    { id: 3, task: 'Merge Sort', status: 'Wrong Answer', language: 'Java', time: '1 day ago' }
  ]
})

const submissionColumns = computed(() => [{
  accessorKey: 'task',
  header: t('profile.colTask')
}, {
  accessorKey: 'status',
  header: t('profile.colStatus')
}, {
  accessorKey: 'language',
  header: t('profile.colLanguage')
}, {
  accessorKey: 'time',
  header: t('profile.colTime')
}])

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  loading.value = false
})

useSeoMeta({
  title: `${user.value.username} - SWUFE OJ`,
  description: `View ${user.value.username}'s profile on SWUFE Online Judge`
})
</script>
