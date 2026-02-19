<template>
  <UContainer class="max-w-5xl">
    <div class="py-8">
      <div
        v-if="loading"
        class="space-y-4"
      >
        <USkeleton class="h-32" />
        <USkeleton class="h-64" />
      </div>

      <template v-else>
        <div class="mb-6">
          <div class="flex items-center justify-between mb-3">
            <h1 class="text-2xl font-bold">
              {{ contest.title }}
            </h1>
            <div class="flex items-center gap-2">
              <UButton
                :to="`/contests/${contestId}/edit`"
                icon="i-lucide-pencil"
                variant="ghost"
                size="sm"
              />
              <StatusBadge
                type="contest"
                :label="contest.status"
              />
            </div>
          </div>
          <p class="text-sm text-muted mb-3">
            {{ contest.description }}
          </p>
          <div class="flex items-center gap-4 text-sm text-muted">
            <span class="flex items-center gap-1">
              <UIcon
                name="i-lucide-calendar"
                class="size-3.5"
              />
              {{ contest.startTime }}
            </span>
            <span class="flex items-center gap-1">
              <UIcon
                name="i-lucide-clock"
                class="size-3.5"
              />
              {{ contest.duration }}
            </span>
            <span class="flex items-center gap-1">
              <UIcon
                name="i-lucide-users"
                class="size-3.5"
              />
              {{ $t('home.participants', { count: contest.participants }) }}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div class="lg:col-span-3 space-y-6">
            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-list" />
                  <span class="font-semibold">{{ $t('contestDetail.tasks') }}</span>
                </div>
              </template>
              <div class="space-y-1">
                <div
                  v-for="task in contest.tasks"
                  :key="task.id"
                  class="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-elevated cursor-pointer"
                  @click="navigateTo(`/tasks/${task.id}`)"
                >
                  <div class="flex items-center gap-3">
                    <span class="text-muted text-sm w-6">{{ task.label }}</span>
                    <span class="font-medium">{{ task.title }}</span>
                  </div>
                  <div class="flex items-center gap-3 text-sm text-muted">
                    <span>{{ task.solved }}/{{ contest.participants }}</span>
                    <UBadge
                      variant="outline"
                      size="sm"
                    >
                      {{ task.points }}pts
                    </UBadge>
                  </div>
                </div>
              </div>
            </UCard>

            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-trophy" />
                  <span class="font-semibold">{{ $t('contestDetail.leaderboard') }}</span>
                </div>
              </template>
              <div class="space-y-1">
                <div
                  v-for="entry in leaderboard"
                  :key="entry.rank"
                  class="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-elevated cursor-pointer"
                  @click="navigateTo(`/users/${entry.userId}`)"
                >
                  <div class="flex items-center gap-3">
                    <span
                      class="text-sm font-mono w-6 text-center"
                      :class="entry.rank <= 3 ? 'text-primary font-bold' : 'text-muted'"
                    >{{ entry.rank }}</span>
                    <span class="font-medium">{{ entry.username }}</span>
                  </div>
                  <div class="flex items-center gap-4 text-sm text-muted">
                    <span class="font-mono">{{ entry.score }}</span>
                    <span class="font-mono text-xs">{{ entry.penalty }}</span>
                  </div>
                </div>
              </div>
            </UCard>
          </div>

          <div class="lg:col-span-2 space-y-6">
            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-bar-chart-3" />
                  <span class="font-semibold">{{ $t('contestDetail.statistics') }}</span>
                </div>
              </template>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-muted">{{ $t('contestDetail.participants') }}</span>
                  <span class="font-medium">{{ contest.participants }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted">{{ $t('contestDetail.taskCount') }}</span>
                  <span class="font-medium">{{ contest.tasks.length }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted">{{ $t('contestDetail.totalSubmissions') }}</span>
                  <span class="font-medium">{{ contest.totalSubmissions }}</span>
                </div>
              </div>
            </UCard>

            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-scroll-text" />
                  <span class="font-semibold">{{ $t('contestDetail.rules') }}</span>
                </div>
              </template>
              <ul class="space-y-2 text-sm text-muted">
                <li
                  v-for="(rule, i) in rules"
                  :key="i"
                >
                  {{ rule }}
                </li>
              </ul>
            </UCard>
          </div>
        </div>
      </template>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const contestId = route.params.id

const loading = ref(true)
const contest = ref({
  title: 'Weekly Contest 123',
  description: 'Practice your algorithm skills in this weekly contest',
  status: 'Running',
  startTime: '2024-12-28 10:00',
  duration: '2 hours',
  participants: 156,
  totalSubmissions: 423,
  tasks: [
    { id: 1, label: 'A', title: 'Two Sum', solved: 89, points: 100 },
    { id: 2, label: 'B', title: 'Binary Search', solved: 67, points: 150 },
    { id: 3, label: 'C', title: 'Dynamic Programming', solved: 23, points: 300 }
  ]
})

const leaderboard = ref([
  { rank: 1, userId: 1, username: 'alice', score: 550, penalty: '00:45:23' },
  { rank: 2, userId: 2, username: 'bob', score: 550, penalty: '01:12:45' },
  { rank: 3, userId: 3, username: 'charlie', score: 400, penalty: '00:58:12' },
  { rank: 4, userId: 4, username: 'david', score: 250, penalty: '01:23:56' },
  { rank: 5, userId: 5, username: 'eve', score: 100, penalty: '00:34:21' }
])

const rules = computed(() => [
  t('contestDetail.rule1'),
  t('contestDetail.rule2'),
  t('contestDetail.rule3'),
  t('contestDetail.rule4')
])

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  loading.value = false
})

useSeoMeta({
  title: `${contest.value.title} - SWUFE OJ`
})
</script>
