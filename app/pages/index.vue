<template>
  <UContainer class="max-w-5xl">
    <div class="py-8 space-y-6">
      <div
        v-if="loading"
        class="space-y-3"
      >
        <USkeleton class="h-32" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <USkeleton
            v-for="i in 2"
            :key="i"
            class="h-20"
          />
        </div>
      </div>
      <div
        v-else
        class="space-y-4"
      >
        <div
          v-if="featuredContest"
          class="relative rounded-xl border-2 border-primary/50 bg-primary/5 p-5 cursor-pointer hover:border-primary transition-colors"
          @click="navigateTo(`/contests/${featuredContest.id}`)"
        >
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <span class="relative flex size-2.5">
                <span class="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                <span class="relative inline-flex size-2.5 rounded-full bg-primary" />
              </span>
              <span class="text-sm font-medium text-primary">{{ $t('home.ongoing') }}</span>
            </div>
            <StatusBadge
              type="contest"
              :label="featuredContest.status"
            />
          </div>
          <h3 class="text-xl font-bold">
            {{ featuredContest.title }}
          </h3>
          <p class="text-sm text-muted mt-1">
            {{ featuredContest.description }}
          </p>
          <div class="flex items-center gap-4 text-sm text-muted mt-3">
            <span class="flex items-center gap-1">
              <UIcon
                name="i-lucide-clock"
                class="size-3.5"
              />
              {{ $t('home.remaining', { time: featuredContest.remaining }) }}
            </span>
            <span class="flex items-center gap-1">
              <UIcon
                name="i-lucide-users"
                class="size-3.5"
              />
              {{ $t('home.participants', { count: featuredContest.participants }) }}
            </span>
            <span class="flex items-center gap-1">
              <UIcon
                name="i-lucide-list"
                class="size-3.5"
              />
              {{ $t('home.taskCount', { count: featuredContest.tasks }) }}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-calendar" />
                  <span class="font-semibold">{{ $t('home.recentContests') }}</span>
                </div>
                <UButton
                  to="/contests"
                  variant="ghost"
                  color="neutral"
                  size="xs"
                  trailing-icon="i-lucide-arrow-right"
                >
                  {{ $t('common.viewAll') }}
                </UButton>
              </div>
            </template>
            <div
              v-if="platformContests.length === 0"
              class="text-center py-4 text-muted text-sm"
            >
              {{ $t('home.noContests') }}
            </div>
            <div
              v-else
              class="space-y-3"
            >
              <div
                v-for="contest in platformContests"
                :key="contest.id"
                class="p-3 rounded-lg border border-default hover:bg-elevated cursor-pointer"
                @click="navigateTo(`/contests/${contest.id}`)"
              >
                <div class="flex items-center justify-between">
                  <span class="font-medium">{{ contest.title }}</span>
                  <StatusBadge
                    type="contest"
                    :label="contest.status"
                    size="sm"
                  />
                </div>
                <div class="flex items-center justify-between mt-1.5">
                  <div class="flex items-center gap-3 text-sm text-muted">
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
                  </div>
                  <span
                    v-if="contest.countdown"
                    class="text-sm font-mono text-primary"
                  >{{ contest.countdown }}</span>
                </div>
              </div>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-globe" />
                <span class="font-semibold">{{ $t('home.externalContests') }}</span>
              </div>
            </template>
            <div class="space-y-3">
              <div
                v-for="contest in externalContests"
                :key="contest.id"
                class="p-3 rounded-lg border border-default hover:bg-elevated cursor-pointer"
              >
                <div class="flex items-center justify-between">
                  <span class="font-medium">{{ contest.title }}</span>
                  <div class="flex items-center gap-1.5 shrink-0 ml-2">
                    <UIcon
                      v-if="platformIcon(contest.platform)"
                      :name="platformIcon(contest.platform)!"
                      class="size-4"
                    />
                    <UBadge
                      v-else
                      variant="outline"
                      size="sm"
                    >
                      {{ contest.platform }}
                    </UBadge>
                  </div>
                </div>
                <div class="flex items-center justify-between mt-1.5">
                  <div class="flex items-center gap-1 text-sm text-muted">
                    <UIcon
                      name="i-lucide-calendar"
                      class="size-3.5"
                    />
                    {{ contest.startTime }}
                  </div>
                  <span class="text-sm font-mono text-primary">{{ contest.countdown }}</span>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-7 space-y-6">
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-code" />
                  <span class="font-semibold">{{ $t('home.tasks') }}</span>
                </div>
                <UButton
                  to="/tasks"
                  variant="ghost"
                  color="neutral"
                  size="xs"
                  trailing-icon="i-lucide-arrow-right"
                >
                  {{ $t('common.viewAll') }}
                </UButton>
              </div>
            </template>

            <div
              v-if="loading"
              class="space-y-2"
            >
              <USkeleton
                v-for="i in 5"
                :key="i"
                class="h-8"
              />
            </div>
            <div
              v-else-if="recentTasks.length === 0"
              class="text-center py-4 text-muted text-sm"
            >
              {{ $t('home.noTasks') }}
            </div>
            <div
              v-else
              class="space-y-1"
            >
              <div
                v-for="task in recentTasks"
                :key="task.id"
                class="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-elevated cursor-pointer"
                @click="navigateTo(`/tasks/${task.id}`)"
              >
                <div class="flex items-center gap-3 min-w-0">
                  <span class="text-muted text-sm shrink-0 w-8">#{{ task.id }}</span>
                  <UIcon
                    v-if="task.remote"
                    name="i-lucide-external-link"
                    class="size-3.5 text-muted shrink-0"
                  />
                  <span
                    class="font-medium truncate max-w-[15rem] md:max-w-[20rem]"
                    :title="task.title"
                  >{{ task.title }}</span>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                  <UBadge
                    variant="outline"
                    size="sm"
                  >
                    {{ $t(`tasks.type${task.type}`) }}
                  </UBadge>
                  <StatusBadge
                    type="difficulty"
                    :label="task.difficulty"
                    size="sm"
                  />
                </div>
              </div>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-message-square" />
                  <span class="font-semibold">{{ $t('home.discussions') }}</span>
                </div>
                <UButton
                  :to="discussionsPath"
                  variant="ghost"
                  color="neutral"
                  size="xs"
                  trailing-icon="i-lucide-arrow-right"
                >
                  {{ $t('common.viewAll') }}
                </UButton>
              </div>
            </template>

            <div
              v-if="loading"
              class="space-y-2"
            >
              <USkeleton
                v-for="i in 4"
                :key="i"
                class="h-8"
              />
            </div>
            <div
              v-else-if="recentTopics.length === 0"
              class="text-center py-4 text-muted text-sm"
            >
              {{ $t('home.noDiscussions') }}
            </div>
            <div
              v-else
              class="space-y-1"
            >
              <div
                v-for="topic in recentTopics"
                :key="topic.id"
                class="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-elevated cursor-pointer"
                @click="navigateTo(`/tasks/${topic.taskId}/discuss/${topic.id}`)"
              >
                <div class="min-w-0">
                  <div class="font-medium truncate">
                    {{ topic.title }}
                  </div>
                  <div class="text-xs text-muted mt-0.5">
                    {{ topic.author }} · {{ topic.time }}
                  </div>
                </div>
                <div class="flex items-center gap-1 text-sm text-muted shrink-0 ml-3">
                  <UIcon
                    name="i-lucide-message-circle"
                    class="size-3.5"
                  />
                  {{ topic.replies }}
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <div class="lg:col-span-5 space-y-6">
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-activity" />
                  <span class="font-semibold">{{ $t('home.recentActivity') }}</span>
                </div>
                <UButton
                  to="/submissions"
                  variant="ghost"
                  color="neutral"
                  size="xs"
                  trailing-icon="i-lucide-arrow-right"
                >
                  {{ $t('common.viewAll') }}
                </UButton>
              </div>
            </template>

            <div
              v-if="loading"
              class="space-y-2"
            >
              <USkeleton
                v-for="i in 4"
                :key="i"
                class="h-6"
              />
            </div>
            <div
              v-else-if="recentSubmissions.length === 0"
              class="text-center py-4 text-muted text-sm"
            >
              {{ $t('home.noActivity') }}
            </div>
            <div
              v-else
              class="divide-y divide-default"
            >
              <div
                v-for="sub in recentSubmissions"
                :key="sub.id"
                class="py-2 first:pt-0 last:pb-0"
              >
                <div class="grid grid-cols-[minmax(0,1fr)_auto] gap-x-2 gap-y-1">
                  <div class="flex items-center gap-2 min-w-0 text-sm">
                    <span class="font-medium shrink-0">{{ sub.user }}</span>
                    <NuxtLink
                      :to="`/tasks/${sub.taskId}`"
                      class="text-muted hover:text-primary truncate min-w-0"
                    >
                      {{ sub.task }}
                    </NuxtLink>
                  </div>
                  <span class="text-xs text-muted shrink-0">{{ sub.time }}</span>
                  <div class="flex items-center gap-2 min-w-0">
                    <StatusBadge
                      type="submission"
                      :label="sub.status"
                      size="sm"
                    />
                    <span
                      v-if="sub.metric"
                      class="text-xs text-muted truncate"
                    >{{ sub.metric }}</span>
                  </div>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const loading = ref(true)

const platformIcons: Record<string, string> = {
  Codeforces: 'i-simple-icons-codeforces',
  LeetCode: 'i-simple-icons-leetcode'
}
function platformIcon(platform: string) {
  return platformIcons[platform] ?? null
}

const featuredContest = ref({
  id: 2,
  title: 'ML Competition: Image Classification',
  description: 'Build a model to classify images from the CIFAR-10 dataset. Submit your predictions and compete on the leaderboard.',
  status: 'Running',
  remaining: '2d 14h 32m',
  participants: 142,
  tasks: 3
})

const platformContests = ref([
  { id: 4, title: 'Code Golf Challenge', status: 'Running', startTime: '01/08 00:00', duration: '3 天', countdown: '' },
  { id: 1, title: 'Weekly Contest #2', status: 'Upcoming', startTime: '01/13 10:00', duration: '2 小时', countdown: '5 天 2 小时后' },
  { id: 3, title: 'Algorithm Challenge 2025', status: 'Upcoming', startTime: '01/20 14:00', duration: '3 小时', countdown: '12 天 6 小时后' }
])

const externalContests = ref([
  { id: 'cf-1', title: 'Codeforces Round #932', platform: 'Codeforces', startTime: '01/10 19:35', countdown: '1 天 5 小时后' },
  { id: 'atc-1', title: 'AtCoder Beginner Contest 385', platform: 'AtCoder', startTime: '01/11 21:00', countdown: '2 天 6 小时后' },
  { id: 'lc-1', title: 'LeetCode Weekly Contest 431', platform: 'LeetCode', startTime: '01/12 10:30', countdown: '3 天 20 小时后' }
])

const recentTasks = ref([
  { id: 1, title: 'Two Sum', difficulty: 'Easy', type: 'Algorithm', remote: false },
  { id: 2, title: 'Binary Search', difficulty: 'Easy', type: 'Algorithm', remote: false },
  { id: 3, title: 'Merge Sort Implementation', difficulty: 'Medium', type: 'Algorithm', remote: false },
  { id: 4, title: 'Image Classification', difficulty: 'Medium', type: 'ML', remote: false },
  { id: 5, title: 'Codeforces 1925C - Did We Get Everything Covered?', difficulty: 'Hard', type: 'Algorithm', remote: true }
])

const recentSubmissions = ref([
  { id: 1001, taskId: 1, task: 'Two Sum', user: 'alice', status: 'Accepted', metric: '5/5 AC', time: '2 分钟前' },
  { id: 1002, taskId: 2, task: 'Binary Search', user: 'bob', status: 'Wrong Answer', metric: '3/5 WA', time: '5 分钟前' },
  { id: 1003, taskId: 4, task: 'Image Classification', user: 'charlie', status: 'Accepted', metric: 'acc 0.94', time: '12 分钟前' },
  { id: 1004, taskId: 3, task: 'Merge Sort', user: 'david', status: 'Judging', metric: '', time: '13 分钟前' }
])

const recentTopics = ref([
  { id: 1, taskId: 1, title: 'Two Sum 有没有 O(n) 的解法？', author: 'alice', time: '3 小时前', replies: 5 },
  { id: 2, taskId: 4, title: '关于 ML 比赛的数据集格式说明', author: 'admin', time: '1 天前', replies: 12 },
  { id: 3, taskId: 3, title: 'ScriptJudger 自定义评测脚本示例', author: 'bob', time: '2 天前', replies: 8 },
  { id: 4, taskId: 2, title: 'Weekly Contest #1 赛后讨论', author: 'charlie', time: '3 天前', replies: 23 }
])

const discussionsPath = computed(() => {
  const firstTopic = recentTopics.value[0]
  return firstTopic ? `/tasks/${firstTopic.taskId}/discuss` : '/tasks'
})

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  loading.value = false
})

useSeoMeta({
  title: 'SWUFE OJ',
  description: 'SWUFE Online Judge - Judge Anything'
})
</script>
