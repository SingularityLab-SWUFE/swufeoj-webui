<template>
  <UContainer class="max-w-5xl">
    <div class="py-8">
      <h1 class="text-3xl font-bold mb-6">
        {{ $t('admin.dashboard') }}
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <UCard>
          <div class="flex items-center gap-4">
            <div class="p-3 bg-primary/10 rounded-lg">
              <UIcon
                name="i-lucide-file-text"
                class="text-2xl text-primary"
              />
            </div>
            <div>
              <div class="text-2xl font-bold">
                {{ stats.tasks }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ $t('admin.totalTasks') }}
              </div>
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center gap-4">
            <div class="p-3 bg-success/10 rounded-lg">
              <UIcon
                name="i-lucide-trophy"
                class="text-2xl text-success"
              />
            </div>
            <div>
              <div class="text-2xl font-bold">
                {{ stats.contests }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ $t('admin.totalContests') }}
              </div>
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center gap-4">
            <div class="p-3 bg-warning/10 rounded-lg">
              <UIcon
                name="i-lucide-users"
                class="text-2xl text-warning"
              />
            </div>
            <div>
              <div class="text-2xl font-bold">
                {{ stats.users }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ $t('admin.totalUsers') }}
              </div>
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center gap-4">
            <div class="p-3 bg-error/10 rounded-lg">
              <UIcon
                name="i-lucide-send"
                class="text-2xl text-error"
              />
            </div>
            <div>
              <div class="text-2xl font-bold">
                {{ stats.submissions }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ $t('admin.totalSubmissions') }}
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <UCard class="lg:col-span-2">
          <h2 class="text-xl font-bold mb-4">
            {{ $t('admin.quickActions') }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UButton
              to="/tasks/create"
              icon="i-lucide-plus"
              block
            >
              {{ $t('admin.createTask') }}
            </UButton>
            <UButton
              to="/contests/create"
              icon="i-lucide-plus"
              block
            >
              {{ $t('admin.createContest') }}
            </UButton>
            <UButton
              to="/admin/tasks"
              icon="i-lucide-file-text"
              variant="outline"
              block
            >
              {{ $t('admin.manageTasks') }}
            </UButton>
            <UButton
              to="/admin/contests"
              icon="i-lucide-trophy"
              variant="outline"
              block
            >
              {{ $t('admin.manageContests') }}
            </UButton>
            <UButton
              to="/admin/users"
              icon="i-lucide-users"
              variant="outline"
              block
            >
              {{ $t('admin.manageUsers') }}
            </UButton>
          </div>
        </UCard>

        <UCard>
          <h2 class="text-xl font-bold mb-4">
            {{ $t('admin.recentActivity') }}
          </h2>
          <div class="space-y-3 text-sm">
            <div
              v-for="activity in recentActivity"
              :key="activity.id"
              class="pb-3 border-b last:border-0"
            >
              <div class="font-medium">
                {{ activity.action }}
              </div>
              <div class="text-gray-600 dark:text-gray-400">
                {{ activity.time }}
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()

const stats = ref({
  tasks: 234,
  contests: 45,
  users: 1567,
  submissions: 8923
})

const recentActivity = ref([
  { id: 1, action: 'New user registered: alice123', time: '5 minutes ago' },
  { id: 2, action: 'Contest "Weekly 123" started', time: '1 hour ago' },
  { id: 3, action: 'Task "Two Sum" updated', time: '2 hours ago' },
  { id: 4, action: 'User bob reported a task', time: '3 hours ago' }
])

useSeoMeta({
  title: `${t('admin.dashboard')} - SWUFE OJ`
})
</script>
