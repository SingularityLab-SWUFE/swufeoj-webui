<template>
  <UContainer class="max-w-5xl">
    <div class="py-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">
          {{ $t('contests.title') }}
        </h1>
        <UButton
          to="/contests/create"
          icon="i-lucide-plus"
          size="sm"
        >
          {{ $t('contests.create') }}
        </UButton>
      </div>

      <div class="flex items-center gap-2 mb-4">
        <UButton
          v-for="s in statusOptions"
          :key="s.value"
          :variant="filter === s.value ? 'solid' : 'ghost'"
          :color="filter === s.value ? 'primary' : 'neutral'"
          size="xs"
          @click="filter = s.value"
        >
          {{ s.label }}
        </UButton>
      </div>

      <div
        v-if="loading"
        class="space-y-3"
      >
        <USkeleton
          v-for="i in 4"
          :key="i"
          class="h-20"
        />
      </div>
      <div
        v-else-if="filteredContests.length === 0"
        class="text-center py-12 text-muted text-sm"
      >
        {{ $t('contests.empty') }}
      </div>
      <div
        v-else
        class="space-y-3"
      >
        <div
          v-for="contest in filteredContests"
          :key="contest.id"
          class="p-4 rounded-lg border border-default hover:bg-elevated cursor-pointer transition-colors"
          @click="navigateTo(`/contests/${contest.id}`)"
        >
          <div class="flex items-center justify-between">
            <span class="font-semibold">{{ contest.title }}</span>
            <StatusBadge
              type="contest"
              :label="contest.status"
              size="sm"
            />
          </div>
          <p
            v-if="contest.description"
            class="text-sm text-muted mt-1 line-clamp-1"
          >
            {{ contest.description }}
          </p>
          <div class="flex items-center justify-between mt-2">
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
            <span
              v-if="contest.countdown"
              class="text-sm font-mono text-primary"
            >{{ contest.countdown }}</span>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const loading = ref(true)
const filter = ref('all')

const statusOptions = computed(() => [
  { value: 'all', label: t('contests.all') },
  { value: 'Running', label: t('status.contest.Running') },
  { value: 'Upcoming', label: t('status.contest.Upcoming') },
  { value: 'Ended', label: t('status.contest.Ended') }
])

const contests = ref([
  { id: 2, title: 'ML Competition: Image Classification', description: 'Build a model to classify images from the CIFAR-10 dataset.', status: 'Running', startTime: '01/05 08:00', duration: '7 天', participants: 142, countdown: '2d 14h' },
  { id: 4, title: 'Code Golf Challenge', description: 'Solve problems with the shortest code possible.', status: 'Running', startTime: '01/08 00:00', duration: '3 天', participants: 58, countdown: '' },
  { id: 1, title: 'Weekly Contest #2', description: 'Practice your algorithm skills in this weekly contest.', status: 'Upcoming', startTime: '01/13 10:00', duration: '2 小时', participants: 0, countdown: '5 天 2 小时后' },
  { id: 3, title: 'Algorithm Challenge 2025', description: 'Advanced algorithm tasks for experienced competitors.', status: 'Upcoming', startTime: '01/20 14:00', duration: '3 小时', participants: 0, countdown: '12 天 6 小时后' },
  { id: 5, title: 'Weekly Contest #1', description: '', status: 'Ended', startTime: '12/30 10:00', duration: '2 小时', participants: 87, countdown: '' },
  { id: 6, title: 'New Year Challenge 2025', description: 'Ring in the new year with algorithmic puzzles.', status: 'Ended', startTime: '01/01 00:00', duration: '24 小时', participants: 203, countdown: '' }
])

const filteredContests = computed(() =>
  filter.value === 'all' ? contests.value : contests.value.filter(c => c.status === filter.value)
)

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  loading.value = false
})

useSeoMeta({
  title: 'Contests - SWUFE OJ'
})
</script>
