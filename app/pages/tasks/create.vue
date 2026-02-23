<template>
  <UContainer class="max-w-5xl">
    <div class="py-8">
      <UButton
        to="/tasks"
        icon="i-lucide-arrow-left"
        variant="ghost"
        class="mb-4"
      >
        {{ $t('taskCreate.back') }}
      </UButton>

      <h1 class="text-2xl font-bold mb-6">
        {{ $t('taskCreate.title') }}
      </h1>

      <UForm
        :state="form"
        class="space-y-8"
        @submit="handleCreate"
      >
        <UCard>
          <div class="space-y-4">
            <UFormField
              :label="$t('taskCreate.formTitle')"
              name="title"
              required
            >
              <UInput
                v-model="form.title"
                :placeholder="$t('taskCreate.titlePlaceholder')"
              />
            </UFormField>

            <UFormField
              :label="$t('taskCreate.description')"
              name="description"
              required
            >
              <UTextarea
                v-model="form.description"
                :rows="4"
                :placeholder="$t('taskCreate.descriptionPlaceholder')"
              />
            </UFormField>

            <UFormField
              :label="$t('taskCreate.difficulty')"
              name="difficulty"
              required
            >
              <USelect
                v-model="form.difficulty"
                :options="difficulties"
                :placeholder="$t('taskCreate.difficultyPlaceholder')"
              />
            </UFormField>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <h2 class="font-semibold">
              {{ $t('taskCreate.judger') }}
            </h2>
          </template>

          <UTabs
            v-model="form.judger"
            :items="judgerTabs"
            class="-mt-2"
          >
            <template #content="{ item }">
              <div class="space-y-4 pt-4">
                <template v-if="item.value === 'standard' || item.value === 'special'">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <UFormField
                      :label="$t('taskCreate.inputFormat')"
                      name="inputFormat"
                    >
                      <UTextarea
                        v-model="form.io.inputFormat"
                        :rows="3"
                        :placeholder="$t('taskCreate.inputFormatPlaceholder')"
                      />
                    </UFormField>
                    <UFormField
                      :label="$t('taskCreate.outputFormat')"
                      name="outputFormat"
                    >
                      <UTextarea
                        v-model="form.io.outputFormat"
                        :rows="3"
                        :placeholder="$t('taskCreate.outputFormatPlaceholder')"
                      />
                    </UFormField>
                  </div>

                  <UFormField
                    :label="$t('taskCreate.constraints')"
                    name="constraints"
                  >
                    <UTextarea
                      v-model="form.io.constraints"
                      :rows="3"
                      :placeholder="$t('taskCreate.constraintsPlaceholder')"
                      class="font-mono"
                    />
                  </UFormField>

                  <div>
                    <div class="flex items-center justify-between mb-3">
                      <h3 class="text-sm font-semibold">
                        {{ $t('taskCreate.testCases') }}
                      </h3>
                      <UButton
                        icon="i-lucide-plus"
                        size="xs"
                        variant="outline"
                        @click="addTestCase"
                      >
                        {{ $t('taskCreate.add') }}
                      </UButton>
                    </div>
                    <div class="space-y-3">
                      <div
                        v-for="(tc, i) in form.io.testCases"
                        :key="i"
                        class="rounded-lg border border-default p-4 space-y-3"
                      >
                        <div class="flex items-center justify-between">
                          <span class="text-sm font-medium text-muted">#{{ i + 1 }}</span>
                          <div class="flex items-center gap-3">
                            <UCheckbox
                              v-model="tc.isPublic"
                              :label="$t('taskCreate.public')"
                            />
                            <UButton
                              icon="i-lucide-trash-2"
                              size="xs"
                              color="error"
                              variant="ghost"
                              @click="removeTestCase(i)"
                            />
                          </div>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <UFormField :label="$t('taskCreate.input')">
                            <UTextarea
                              v-model="tc.input"
                              :rows="2"
                              :placeholder="$t('taskCreate.inputPlaceholder')"
                              class="font-mono"
                            />
                          </UFormField>
                          <UFormField :label="$t('taskCreate.expectedOutput')">
                            <UTextarea
                              v-model="tc.output"
                              :rows="2"
                              :placeholder="$t('taskCreate.outputPlaceholder')"
                              class="font-mono"
                            />
                          </UFormField>
                        </div>
                      </div>
                    </div>
                  </div>

                  <UFormField
                    v-if="item.value === 'special'"
                    :label="$t('taskCreate.checkerScript')"
                    name="checker"
                  >
                    <UTextarea
                      v-model="form.io.checkerScript"
                      :rows="8"
                      :placeholder="$t('taskCreate.checkerScriptPlaceholder')"
                      class="font-mono"
                    />
                  </UFormField>
                </template>

                <template v-if="item.value === 'script'">
                  <UFormField
                    :label="$t('taskCreate.submissionFormat')"
                    name="submissionFormat"
                  >
                    <USelect
                      v-model="form.script.submissionFormat"
                      :options="submissionFormats"
                      :placeholder="$t('taskCreate.submissionFormatPlaceholder')"
                    />
                  </UFormField>

                  <div>
                    <h3 class="text-sm font-semibold mb-3">
                      {{ $t('taskCreate.dataset') }}
                    </h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <UFormField :label="$t('taskCreate.trainingData')">
                        <UInput
                          v-model="form.script.datasetTrain"
                          :placeholder="$t('taskCreate.dataPathPlaceholder')"
                          icon="i-lucide-file-up"
                        />
                      </UFormField>
                      <UFormField :label="$t('taskCreate.testData')">
                        <UInput
                          v-model="form.script.datasetTest"
                          :placeholder="$t('taskCreate.dataPathPlaceholder')"
                          icon="i-lucide-file-up"
                        />
                      </UFormField>
                    </div>
                  </div>

                  <UFormField
                    :label="$t('taskCreate.evalScript')"
                    name="evalScript"
                  >
                    <UTextarea
                      v-model="form.script.evalScript"
                      :rows="10"
                      :placeholder="$t('taskCreate.evalScriptPlaceholder')"
                      class="font-mono"
                    />
                  </UFormField>

                  <div>
                    <h3 class="text-sm font-semibold mb-3">
                      {{ $t('taskCreate.metric') }}
                    </h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <UFormField :label="$t('taskCreate.metricName')">
                        <UInput
                          v-model="form.script.metricName"
                          :placeholder="$t('taskCreate.metricNamePlaceholder')"
                        />
                      </UFormField>
                      <UFormField :label="$t('taskCreate.metricDirection')">
                        <USelect
                          v-model="form.script.metricDirection"
                          :options="metricDirections"
                        />
                      </UFormField>
                    </div>
                  </div>
                </template>
              </div>
            </template>
          </UTabs>
        </UCard>

        <div class="flex justify-end">
          <UButton
            type="submit"
            :loading="creating"
          >
            {{ $t('taskCreate.submit') }}
          </UButton>
        </div>
      </UForm>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const creating = ref(false)

const form = ref({
  title: '',
  difficulty: 'easy',
  description: '',
  judger: 'standard',
  io: {
    inputFormat: '',
    outputFormat: '',
    constraints: '',
    testCases: [{ input: '', output: '', isPublic: true }] as { input: string, output: string, isPublic: boolean }[],
    checkerScript: ''
  },
  script: {
    submissionFormat: 'file',
    datasetTrain: '',
    datasetTest: '',
    evalScript: '',
    metricName: '',
    metricDirection: 'higher'
  }
})

const judgerTabs = computed(() => [
  { label: t('taskCreate.standardIO'), value: 'standard', icon: 'i-lucide-terminal' },
  { label: t('taskCreate.specialJudge'), value: 'special', icon: 'i-lucide-shield-check' },
  { label: t('taskCreate.script'), value: 'script', icon: 'i-lucide-file-code' }
])

const { difficulties, addTestCase: addTC, removeTestCase: removeTC } = useTaskForm()

const submissionFormats = computed(() => [
  { label: t('taskCreate.formatFile'), value: 'file' },
  { label: t('taskCreate.formatCode'), value: 'code' },
  { label: t('taskCreate.formatDocker'), value: 'docker' }
])

const metricDirections = computed(() => [
  { label: t('taskCreate.higherBetter'), value: 'higher' },
  { label: t('taskCreate.lowerBetter'), value: 'lower' }
])

const addTestCase = () => {
  addTC(form.value.io.testCases)
}

const removeTestCase = (index: number) => {
  removeTC(form.value.io.testCases, index)
}

const handleCreate = async () => {
  creating.value = true
  try {
    console.log('Create task payload:', form.value)
    await new Promise(resolve => setTimeout(resolve, 1000))
    navigateTo('/tasks')
  } catch (error) {
    console.error('Task creation failed:', error)
  } finally {
    creating.value = false
  }
}

useSeoMeta({
  title: `${t('taskCreate.title')} - SWUFE OJ`,
  description: 'Create a new task on SWUFE Online Judge'
})
</script>
