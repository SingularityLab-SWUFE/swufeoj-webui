<template>
  <UContainer class="max-w-5xl">
    <div class="py-8">
      <div class="flex justify-between items-center mb-6">
        <div>
          <UButton
            variant="ghost"
            icon="i-lucide-arrow-left"
            @click="navigateTo(`/tasks/${taskId}`)"
          >
            {{ $t('taskDiscuss.back') }}
          </UButton>
          <h1 class="text-3xl font-bold mt-2">
            {{ $t('taskDiscuss.title') }}
          </h1>
        </div>
        <UButton icon="i-lucide-plus">
          {{ $t('taskDiscuss.newTopic') }}
        </UButton>
      </div>

      <UCard>
        <USkeleton
          v-if="loading"
          class="h-64"
        />

        <template v-else>
          <div class="space-y-4">
            <div
              v-for="topic in topics"
              :key="topic.id"
              class="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
              @click="navigateTo(`/tasks/${taskId}/discuss/${topic.id}`)"
            >
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-lg font-bold">
                  {{ topic.title }}
                </h3>
                <UBadge
                  v-if="topic.solved"
                  color="success"
                >
                  {{ $t('taskDiscuss.solved') }}
                </UBadge>
              </div>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">
                {{ topic.preview }}
              </p>
              <div class="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                <UserHeader
                  :username="topic.author.username"
                  :avatar="topic.author.avatar"
                  size="xs"
                />
                <div class="flex items-center gap-1">
                  <UIcon name="i-lucide-message-square" />
                  <span>{{ $t('taskDiscuss.replies', { n: topic.replies }) }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <UIcon name="i-lucide-clock" />
                  <span>{{ topic.lastActivity }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-center mt-4">
            <UPagination
              v-model="page"
              :total="totalTopics"
              :per-page="perPage"
            />
          </div>
        </template>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const route = useRoute()
const taskId = route.params.id

const loading = ref(true)
const page = ref(1)
const perPage = ref(10)
const totalTopics = ref(30)

const topics = ref([
  {
    id: 1,
    title: 'How to optimize time complexity?',
    preview: 'I am getting TLE on test case 5. Any hints on how to optimize?',
    author: { username: 'alice', avatar: '' },
    replies: 5,
    solved: true,
    lastActivity: '2 hours ago'
  },
  {
    id: 2,
    title: 'Clarification on input format',
    preview: 'Can someone clarify if the input can contain negative numbers?',
    author: { username: 'bob', avatar: '' },
    replies: 3,
    solved: true,
    lastActivity: '5 hours ago'
  },
  {
    id: 3,
    title: 'Alternative solution using DP',
    preview: 'Here is my approach using dynamic programming instead of greedy...',
    author: { username: 'charlie', avatar: '' },
    replies: 12,
    solved: false,
    lastActivity: '1 day ago'
  }
])

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  loading.value = false
})

useSeoMeta({
  title: `Discussion - Task ${taskId} - SWUFE OJ`,
  description: `Discussion forum for task ${taskId}`
})
</script>
