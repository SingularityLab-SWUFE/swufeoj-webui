<template>
  <UContainer class="max-w-5xl">
    <div class="py-8">
      <UButton
        :to="`/tasks/${taskId}`"
        icon="i-lucide-arrow-left"
        variant="ghost"
        class="mb-4"
      >
        {{ $t('taskLeaderboard.back') }}
      </UButton>

      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">
          {{ $t('taskLeaderboard.title', { name: task.title }) }}
        </h1>
      </div>

      <UCard>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b">
                <th class="text-left py-3 px-4">
                  {{ $t('taskLeaderboard.rank') }}
                </th>
                <th class="text-left py-3 px-4">
                  {{ $t('taskLeaderboard.user') }}
                </th>
                <th class="text-left py-3 px-4">
                  {{ $t('taskLeaderboard.score') }}
                </th>
                <th class="text-left py-3 px-4">
                  {{ $t('taskLeaderboard.time') }}
                </th>
                <th class="text-left py-3 px-4">
                  {{ $t('taskLeaderboard.memory') }}
                </th>
                <th class="text-left py-3 px-4">
                  {{ $t('taskLeaderboard.language') }}
                </th>
                <th class="text-left py-3 px-4">
                  {{ $t('taskLeaderboard.submitted') }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="entry in leaderboard"
                :key="entry.rank"
                class="border-b hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                @click="navigateTo(`/users/${entry.userId}`)"
              >
                <td class="py-3 px-4">
                  <UBadge
                    v-if="entry.rank <= 3"
                    :color="getRankColor(entry.rank)"
                  >
                    {{ entry.rank }}
                  </UBadge>
                  <span v-else>{{ entry.rank }}</span>
                </td>
                <td class="py-3 px-4 font-medium">
                  {{ entry.username }}
                </td>
                <td class="py-3 px-4">
                  {{ entry.score }}
                </td>
                <td class="py-3 px-4">
                  {{ entry.time }} ms
                </td>
                <td class="py-3 px-4">
                  {{ entry.memory }} MB
                </td>
                <td class="py-3 px-4">
                  {{ entry.language }}
                </td>
                <td class="py-3 px-4 text-gray-600 dark:text-gray-400">
                  {{ entry.submittedAt }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex justify-center mt-4">
          <UPagination
            v-model="page"
            :total="totalItems"
            :per-page="perPage"
          />
        </div>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const route = useRoute()
const taskId = route.params.id

const page = ref(1)
const perPage = ref(20)
const totalItems = ref(50)

const task = ref({
  title: 'Two Sum'
})

const leaderboard = ref([
  { rank: 1, userId: 1, username: 'alice', score: 100, time: 12, memory: 3.2, language: 'C++', submittedAt: '2 hours ago' },
  { rank: 2, userId: 2, username: 'bob', score: 100, time: 24, memory: 5.1, language: 'Python', submittedAt: '3 hours ago' },
  { rank: 3, userId: 3, username: 'charlie', score: 100, time: 36, memory: 4.8, language: 'Java', submittedAt: '5 hours ago' },
  { rank: 4, userId: 4, username: 'david', score: 80, time: 48, memory: 6.3, language: 'Python', submittedAt: '1 day ago' },
  { rank: 5, userId: 5, username: 'eve', score: 60, time: 56, memory: 7.1, language: 'Go', submittedAt: '2 days ago' }
])

useSeoMeta({
  title: `Leaderboard - ${task.value.title} - SWUFE OJ`,
  description: `Leaderboard for ${task.value.title}`
})
</script>
