<template>
  <UContainer class="max-w-5xl">
    <div class="py-8">
      <UButton
        :to="`/tasks/${taskId}`"
        icon="i-lucide-arrow-left"
        variant="ghost"
        class="mb-4"
      >
        {{ $t('taskEdit.back') }}
      </UButton>

      <UCard>
        <template #header>
          <h1 class="text-2xl font-bold">
            {{ $t('taskEdit.title') }}
          </h1>
        </template>

        <UForm
          :state="form"
          @submit="handleSave"
        >
          <UFormField
            :label="$t('taskEdit.formTitle')"
            name="title"
            required
          >
            <UInput
              v-model="form.title"
              :placeholder="$t('taskEdit.titlePlaceholder')"
            />
          </UFormField>

          <UFormField
            :label="$t('taskEdit.type')"
            name="type"
            required
            class="mt-4"
          >
            <USelect
              v-model="form.type"
              :options="taskTypes"
              :placeholder="$t('taskEdit.typePlaceholder')"
            />
          </UFormField>

          <UFormField
            :label="$t('taskEdit.difficulty')"
            name="difficulty"
            required
            class="mt-4"
          >
            <USelect
              v-model="form.difficulty"
              :options="difficulties"
              :placeholder="$t('taskEdit.difficultyPlaceholder')"
            />
          </UFormField>

          <UFormField
            :label="$t('taskEdit.description')"
            name="description"
            required
            class="mt-4"
          >
            <UTextarea
              v-model="form.description"
              :rows="6"
              :placeholder="$t('taskEdit.descriptionPlaceholder')"
            />
          </UFormField>

          <UFormField
            :label="$t('taskEdit.inputFormat')"
            name="inputFormat"
            required
            class="mt-4"
          >
            <UTextarea
              v-model="form.inputFormat"
              :rows="3"
              :placeholder="$t('taskEdit.inputFormatPlaceholder')"
            />
          </UFormField>

          <UFormField
            :label="$t('taskEdit.outputFormat')"
            name="outputFormat"
            required
            class="mt-4"
          >
            <UTextarea
              v-model="form.outputFormat"
              :rows="3"
              :placeholder="$t('taskEdit.outputFormatPlaceholder')"
            />
          </UFormField>

          <UFormField
            :label="$t('taskEdit.constraints')"
            name="constraints"
            class="mt-4"
          >
            <UTextarea
              v-model="form.constraints"
              :rows="4"
              :placeholder="$t('taskEdit.constraintsPlaceholder')"
            />
          </UFormField>

          <div class="mt-6">
            <h3 class="font-semibold mb-2">
              {{ $t('taskEdit.testCases') }}
            </h3>
            <div
              v-for="(testCase, index) in form.testCases"
              :key="index"
              class="border p-4 rounded mb-2"
            >
              <div class="flex justify-between items-center mb-2">
                <span class="font-medium">{{ $t('taskEdit.testCase', { n: index + 1 }) }}</span>
                <UButton
                  icon="i-lucide-x"
                  size="xs"
                  color="error"
                  variant="ghost"
                  @click="removeTestCase(index)"
                />
              </div>
              <UFormField
                :label="$t('taskEdit.input')"
                class="mb-2"
              >
                <UTextarea
                  v-model="testCase.input"
                  :rows="2"
                  :placeholder="$t('taskEdit.inputPlaceholder')"
                />
              </UFormField>
              <UFormField :label="$t('taskEdit.expectedOutput')">
                <UTextarea
                  v-model="testCase.output"
                  :rows="2"
                  :placeholder="$t('taskEdit.outputPlaceholder')"
                />
              </UFormField>
              <UCheckbox
                v-model="testCase.isPublic"
                :label="$t('taskEdit.publicTestCase')"
                class="mt-2"
              />
            </div>
            <UButton
              icon="i-lucide-plus"
              variant="outline"
              @click="addTestCase"
            >
              {{ $t('taskEdit.addTestCase') }}
            </UButton>
          </div>

          <UFormField
            :label="$t('taskEdit.judgeScript')"
            name="judgeScript"
            class="mt-6"
          >
            <UTextarea
              v-model="form.judgeScript"
              :rows="10"
              :placeholder="$t('taskEdit.judgeScriptPlaceholder')"
              class="font-mono"
            />
          </UFormField>

          <UButton
            type="submit"
            class="mt-6 w-full"
            :loading="saving"
          >
            {{ $t('taskEdit.save') }}
          </UButton>
        </UForm>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const taskId = route.params.id
const saving = ref(false)

const form = ref({
  title: 'Two Sum',
  type: 'algorithm',
  difficulty: 'easy',
  description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
  inputFormat: 'First line: n (length of array)\nSecond line: n space-separated integers\nThird line: target integer',
  outputFormat: 'Two space-separated indices',
  constraints: '2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9',
  testCases: [
    { input: '4\n2 7 11 15\n9', output: '0 1', isPublic: true },
    { input: '3\n3 2 4\n6', output: '1 2', isPublic: false }
  ],
  judgeScript: ''
})

const taskTypes = computed(() => [
  { label: t('taskEdit.typeAlgorithm'), value: 'algorithm' },
  { label: t('taskEdit.typeML'), value: 'ml' },
  { label: t('taskEdit.typeBackend'), value: 'backend' }
])

const { difficulties, addTestCase: addTC, removeTestCase: removeTC } = useTaskForm()

const addTestCase = () => {
  addTC(form.value.testCases)
}

const removeTestCase = (index: number) => {
  removeTC(form.value.testCases, index)
}

const handleSave = async () => {
  saving.value = true
  try {
    console.log('Save task payload:', form.value)
    await new Promise(resolve => setTimeout(resolve, 1000))
    navigateTo(`/tasks/${taskId}`)
  } catch (error) {
    console.error('Task save failed:', error)
  } finally {
    saving.value = false
  }
}

useSeoMeta({
  title: `${t('taskEdit.title')} - SWUFE OJ`,
  description: 'Edit task on SWUFE Online Judge'
})
</script>
