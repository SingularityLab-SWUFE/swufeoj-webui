<template>
  <UContainer class="max-w-5xl">
    <div class="py-8">
      <UButton
        to="/submissions"
        icon="i-lucide-arrow-left"
        variant="ghost"
        class="mb-4"
      >
        {{ $t('submissionDetail.back') }}
      </UButton>

      <div
        v-if="loading"
        class="space-y-4"
      >
        <USkeleton class="h-32" />
        <USkeleton class="h-64" />
      </div>

      <template v-else-if="submission">
        <div class="space-y-6">
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h1 class="text-2xl font-bold">
                  Submission #{{ submission.id }}
                </h1>
                <StatusBadge
                  type="submission"
                  :label="submission.status"
                />
              </div>
            </template>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p class="text-sm text-muted">
                  {{ $t('submissionDetail.task') }}
                </p>
                <NuxtLink
                  :to="`/tasks/${submission.taskId}`"
                  class="font-medium text-primary hover:underline"
                >
                  {{ submission.taskTitle }}
                </NuxtLink>
              </div>
              <div>
                <p class="text-sm text-muted">
                  {{ $t('submissionDetail.language') }}
                </p>
                <p class="font-medium">
                  {{ submission.language }}
                </p>
              </div>
              <div>
                <p class="text-sm text-muted">
                  {{ $t('submissionDetail.time') }}
                </p>
                <p class="font-medium">
                  {{ submission.executionTime }} ms
                </p>
              </div>
              <div>
                <p class="text-sm text-muted">
                  {{ $t('submissionDetail.memory') }}
                </p>
                <p class="font-medium">
                  {{ submission.memoryUsage }} MB
                </p>
              </div>
            </div>

            <div class="mt-4">
              <p class="text-sm text-muted">
                {{ $t('submissionDetail.submittedAt') }}
              </p>
              <p class="font-medium">
                {{ new Date(submission.submittedAt).toLocaleString() }}
              </p>
            </div>
          </UCard>

          <UCard v-if="submission.testResults">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-test-tubes" />
                <span class="font-semibold">{{ $t('submissionDetail.testResults') }}</span>
              </div>
            </template>

            <div class="space-y-2">
              <div
                v-for="(result, index) in submission.testResults"
                :key="index"
                class="border border-default rounded-lg p-4"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="font-medium">{{ $t('submissionDetail.testCase', { n: index + 1 }) }}</span>
                  <UBadge
                    :color="result.passed ? 'success' : 'error'"
                    variant="subtle"
                  >
                    {{ result.passed ? $t('submissionDetail.passed') : $t('submissionDetail.failed') }}
                  </UBadge>
                </div>

                <div
                  v-if="!result.passed"
                  class="text-sm space-y-2 mt-2"
                >
                  <div v-if="result.input">
                    <p class="text-muted">
                      {{ $t('submissionDetail.input') }}
                    </p>
                    <pre class="bg-elevated p-2 rounded-lg text-sm">{{ result.input }}</pre>
                  </div>
                  <div v-if="result.expectedOutput">
                    <p class="text-muted">
                      {{ $t('submissionDetail.expectedOutput') }}
                    </p>
                    <pre class="bg-elevated p-2 rounded-lg text-sm">{{ result.expectedOutput }}</pre>
                  </div>
                  <div v-if="result.actualOutput">
                    <p class="text-muted">
                      {{ $t('submissionDetail.actualOutput') }}
                    </p>
                    <pre class="bg-elevated p-2 rounded-lg text-sm">{{ result.actualOutput }}</pre>
                  </div>
                  <div v-if="result.error">
                    <p class="text-muted">
                      {{ $t('submissionDetail.error') }}
                    </p>
                    <pre class="bg-error/10 text-error p-2 rounded-lg text-sm">{{ result.error }}</pre>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-4 text-center">
              <p class="text-lg font-semibold">
                {{ $t('submissionDetail.passedCount', { passed: submission.testResults.filter(r => r.passed).length, total: submission.testResults.length }) }}
              </p>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-code" />
                <span class="font-semibold">{{ $t('submissionDetail.code') }}</span>
              </div>
            </template>

            <Shiki
              :lang="submission.language.toLowerCase()"
              :code="submission.code"
            />
          </UCard>
        </div>
      </template>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
interface TestResult {
  passed: boolean
  input?: string
  expectedOutput?: string
  actualOutput?: string
  error?: string
}

const route = useRoute()
const loading = ref(true)

const submission = ref({
  id: route.params.id,
  taskId: 1,
  taskTitle: 'Two Sum',
  status: 'Accepted',
  language: 'Python',
  executionTime: 42,
  memoryUsage: 14.2,
  submittedAt: new Date().toISOString(),
  testResults: [
    { passed: true },
    { passed: true },
    { passed: false, input: '[3,2,4]\n6', expectedOutput: '[1,2]', actualOutput: '[0,2]' },
    { passed: true }
  ] as TestResult[],
  code: `def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`
})

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  loading.value = false
})

useSeoMeta({
  title: `Submission #${submission.value.id} - SWUFE OJ`
})
</script>
