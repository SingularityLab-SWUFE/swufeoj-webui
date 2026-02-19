<template>
  <UContainer class="max-w-5xl">
    <div class="py-8">
      <UButton
        variant="ghost"
        icon="i-lucide-arrow-left"
        class="mb-4"
        @click="navigateTo(`/tasks/${taskId}/discuss`)"
      >
        {{ $t('taskDiscuss.backToDiscussions') }}
      </UButton>

      <USkeleton
        v-if="loading"
        class="h-screen"
      />

      <template v-else>
        <UCard class="mb-6">
          <div class="flex justify-between items-start mb-4">
            <h1 class="text-2xl font-bold">
              {{ topic.title }}
            </h1>
            <UBadge
              v-if="topic.solved"
              color="success"
            >
              {{ $t('taskDiscuss.solved') }}
            </UBadge>
          </div>

          <div class="flex items-center gap-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
            <UserHeader
              :username="topic.author.username"
              :avatar="topic.author.avatar"
              size="sm"
            />
            <span>•</span>
            <span>{{ topic.createdAt }}</span>
          </div>

          <div class="prose dark:prose-invert max-w-none">
            {{ topic.content }}
          </div>

          <div class="flex gap-2 mt-4 pt-4 border-t">
            <UButton
              variant="ghost"
              icon="i-lucide-thumbs-up"
            >
              {{ topic.upvotes }}
            </UButton>
            <UButton
              variant="ghost"
              icon="i-lucide-message-square"
            >
              {{ $t('taskDiscuss.reply') }}
            </UButton>
          </div>
        </UCard>

        <div class="space-y-4 mb-6">
          <h2 class="text-xl font-bold">
            {{ $t('taskDiscuss.repliesTitle', { n: replies.length }) }}
          </h2>
          <UCard
            v-for="reply in replies"
            :key="reply.id"
          >
            <div class="flex items-start gap-3">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <UserHeader
                    :username="reply.author.username"
                    :avatar="reply.author.avatar"
                    size="sm"
                  />
                  <span class="text-sm text-gray-600 dark:text-gray-400">{{ reply.createdAt }}</span>
                  <UBadge
                    v-if="reply.accepted"
                    color="success"
                  >
                    {{ $t('taskDiscuss.acceptedAnswer') }}
                  </UBadge>
                </div>
                <div class="prose dark:prose-invert max-w-none text-sm">
                  {{ reply.content }}
                </div>
                <div class="flex gap-2 mt-3">
                  <UButton
                    variant="ghost"
                    size="xs"
                    icon="i-lucide-thumbs-up"
                  >
                    {{ reply.upvotes }}
                  </UButton>
                  <UButton
                    variant="ghost"
                    size="xs"
                  >
                    {{ $t('taskDiscuss.reply') }}
                  </UButton>
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <UCard>
          <h3 class="font-bold mb-4">
            {{ $t('taskDiscuss.addReply') }}
          </h3>
          <UTextarea
            v-model="replyContent"
            :placeholder="$t('taskDiscuss.replyPlaceholder')"
            :rows="4"
            class="mb-4"
          />
          <UButton color="primary">
            {{ $t('taskDiscuss.postReply') }}
          </UButton>
        </UCard>
      </template>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const route = useRoute()
const taskId = route.params.id
const _topicId = route.params.topicId

const loading = ref(true)
const replyContent = ref('')

const topic = ref({
  title: 'How to optimize time complexity?',
  content: 'I am getting TLE on test case 5. I am using a nested loop approach which gives O(n²) complexity. Any hints on how to optimize this to O(n log n) or better?',
  author: { username: 'alice', avatar: '' },
  createdAt: '2024-12-27 10:30',
  upvotes: 8,
  solved: true
})

const replies = ref([
  {
    id: 1,
    content: 'Try using a hash map to store the values you have seen. This will reduce your lookup time from O(n) to O(1).',
    author: { username: 'bob', avatar: '' },
    createdAt: '2024-12-27 11:15',
    upvotes: 12,
    accepted: true
  },
  {
    id: 2,
    content: 'You can also sort the array first and use two pointers. This gives O(n log n) complexity.',
    author: { username: 'charlie', avatar: '' },
    createdAt: '2024-12-27 12:00',
    upvotes: 5,
    accepted: false
  }
])

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  loading.value = false
})

useSeoMeta({
  title: `${topic.value.title} - Discussion - SWUFE OJ`,
  description: topic.value.content
})
</script>
