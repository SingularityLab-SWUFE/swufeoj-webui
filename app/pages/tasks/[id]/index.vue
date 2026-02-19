<template>
  <UContainer class="max-w-5xl">
    <div class="py-8">
      <UButton
        to="/tasks"
        icon="i-lucide-arrow-left"
        variant="ghost"
        class="mb-4"
      >
        {{ $t('taskDetail.back') }}
      </UButton>

      <template v-if="loading">
        <div class="text-center py-8">
          <UIcon
            name="i-lucide-loader-2"
            class="animate-spin text-4xl"
          />
        </div>
      </template>

      <template v-else-if="task">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div class="lg:col-span-3">
            <UCard>
              <template #header>
                <div class="flex items-center gap-3">
                  <h1 class="text-2xl font-bold">
                    {{ task.title }}
                  </h1>
                  <StatusBadge
                    type="difficulty"
                    :label="task.difficulty"
                  />
                </div>
              </template>

              <div class="space-y-6">
                <section>
                  <h3 class="text-lg font-semibold mb-2">
                    {{ $t('taskDetail.description') }}
                  </h3>
                  <p class="text-muted">
                    {{ task.description }}
                  </p>
                </section>

                <section>
                  <h3 class="text-lg font-semibold mb-2">
                    {{ $t('taskDetail.inputFormat') }}
                  </h3>
                  <p class="text-muted">
                    {{ task.inputFormat }}
                  </p>
                </section>

                <section>
                  <h3 class="text-lg font-semibold mb-2">
                    {{ $t('taskDetail.outputFormat') }}
                  </h3>
                  <p class="text-muted">
                    {{ task.outputFormat }}
                  </p>
                </section>

                <section>
                  <h3 class="text-lg font-semibold mb-2">
                    {{ $t('taskDetail.examples') }}
                  </h3>
                  <div
                    v-for="(example, index) in task.examples"
                    :key="index"
                    class="mb-4"
                  >
                    <p class="text-sm font-medium mb-1">
                      {{ $t('taskDetail.example', { n: index + 1 }) }}
                    </p>
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <p class="text-xs text-muted mb-1">
                          {{ $t('taskDetail.input') }}
                        </p>
                        <pre class="bg-elevated p-3 rounded-md text-sm font-mono">{{ example.input }}</pre>
                      </div>
                      <div>
                        <p class="text-xs text-muted mb-1">
                          {{ $t('taskDetail.output') }}
                        </p>
                        <pre class="bg-elevated p-3 rounded-md text-sm font-mono">{{ example.output }}</pre>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 class="text-lg font-semibold mb-2">
                    {{ $t('taskDetail.constraints') }}
                  </h3>
                  <ul class="list-disc list-inside space-y-1 text-muted">
                    <li
                      v-for="(constraint, index) in task.constraints"
                      :key="index"
                    >
                      <code class="text-sm">{{ constraint }}</code>
                    </li>
                  </ul>
                </section>
              </div>
            </UCard>
          </div>

          <div class="lg:col-span-2">
            <div class="lg:sticky lg:top-20">
              <UCard>
                <template #header>
                  <h2 class="text-xl font-bold">
                    {{ $t('taskDetail.submitSolution') }}
                  </h2>
                </template>

                <UForm
                  :state="submission"
                  @submit="handleSubmit"
                >
                  <UFormField
                    :label="$t('taskDetail.language')"
                    name="language"
                    required
                  >
                    <USelect
                      v-model="submission.language"
                      :options="languages"
                      :placeholder="$t('taskDetail.languagePlaceholder')"
                    />
                  </UFormField>

                  <UFormField
                    :label="$t('taskDetail.code')"
                    name="code"
                    required
                    class="mt-4"
                  >
                    <UTextarea
                      v-model="submission.code"
                      :rows="15"
                      :placeholder="$t('taskDetail.codePlaceholder')"
                      class="font-mono"
                    />
                  </UFormField>

                  <div class="mt-4 flex justify-end">
                    <UButton
                      type="submit"
                      :loading="submitting"
                    >
                      {{ $t('taskDetail.submit') }}
                    </UButton>
                  </div>
                </UForm>
              </UCard>
            </div>
          </div>
        </div>
      </template>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const route = useRoute()
const loading = ref(true)
const submitting = ref(false)

const task = ref({
  id: route.params.id,
  title: 'Two Sum',
  difficulty: 'Easy',
  description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
  inputFormat: 'An array of integers and a target integer',
  outputFormat: 'An array of two indices',
  examples: [
    { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
    { input: 'nums = [3,2,4], target = 6', output: '[1,2]' }
  ],
  constraints: [
    '2 <= nums.length <= 10^4',
    '-10^9 <= nums[i] <= 10^9',
    '-10^9 <= target <= 10^9',
    'Only one valid answer exists'
  ]
})

const submission = ref({
  language: 'python',
  code: ''
})

const languages = [
  { label: 'Python', value: 'python' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'C++', value: 'cpp' },
  { label: 'Java', value: 'java' },
  { label: 'Go', value: 'go' }
]

const handleSubmit = async () => {
  submitting.value = true

  try {
    console.log('Submission payload:', submission.value)
    await new Promise(resolve => setTimeout(resolve, 1000))

    const submissionId = Math.floor(Math.random() * 10000)
    navigateTo(`/submissions/${submissionId}`)
  } catch (error) {
    console.error('Submission failed:', error)
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  loading.value = false
})

useSeoMeta({
  title: `${task.value.title} - SWUFE OJ`,
  description: task.value.description
})
</script>
