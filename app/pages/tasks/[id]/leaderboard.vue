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
        <UTable
          :columns="columns"
          :data="leaderboard"
          @select="(_e, row) => navigateTo(`/users/${row.original.userId}`)"
        >
          <template #rank-cell="{ row }">
            <UBadge
              v-if="row.original.rank <= 3"
              :color="getRankColor(row.original.rank)"
            >
              {{ row.original.rank }}
            </UBadge>
            <span v-else>{{ row.original.rank }}</span>
          </template>

          <template #time-cell="{ row }">
            {{ row.original.time }} ms
          </template>

          <template #memory-cell="{ row }">
            {{ row.original.memory }} MB
          </template>

          <template #submittedAt-cell="{ row }">
            <span class="text-muted">{{ row.original.submittedAt }}</span>
          </template>
        </UTable>

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
const { t } = useI18n()
const route = useRoute()
const taskId = route.params.id

const page = ref(1)
const perPage = ref(20)
const totalItems = ref(50)

const task = ref({
  title: 'Two Sum'
})

const columns = computed(() => [
  { accessorKey: 'rank', header: t('taskLeaderboard.rank') },
  { accessorKey: 'username', header: t('taskLeaderboard.user') },
  { accessorKey: 'score', header: t('taskLeaderboard.score') },
  { accessorKey: 'time', header: t('taskLeaderboard.time') },
  { accessorKey: 'memory', header: t('taskLeaderboard.memory') },
  { accessorKey: 'language', header: t('taskLeaderboard.language') },
  { accessorKey: 'submittedAt', header: t('taskLeaderboard.submitted') }
])

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
