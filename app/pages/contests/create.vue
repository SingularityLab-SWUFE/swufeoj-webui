<template>
  <UContainer class="max-w-5xl">
    <div class="py-8">
      <h1 class="text-3xl font-bold mb-6">
        {{ $t('contestCreate.title') }}
      </h1>

      <UCard>
        <form
          class="space-y-6"
          @submit.prevent="handleSubmit"
        >
          <div>
            <label class="block text-sm font-medium mb-2">{{ $t('contestCreate.contestTitle') }}</label>
            <UInput
              v-model="form.title"
              :placeholder="$t('contestCreate.titlePlaceholder')"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">{{ $t('contestCreate.description') }}</label>
            <UTextarea
              v-model="form.description"
              :placeholder="$t('contestCreate.descriptionPlaceholder')"
              :rows="4"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">{{ $t('contestCreate.startTime') }}</label>
              <UInput
                v-model="form.startTime"
                type="datetime-local"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">{{ $t('contestCreate.duration') }}</label>
              <UInput
                v-model="form.duration"
                type="number"
                :placeholder="$t('contestCreate.durationPlaceholder')"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">{{ $t('contestCreate.contestType') }}</label>
            <USelect
              v-model="form.type"
              :options="contestTypes"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">{{ $t('contestCreate.tasks') }}</label>
            <div class="space-y-2">
              <div
                v-for="(task, index) in form.tasks"
                :key="index"
                class="flex gap-2"
              >
                <UInput
                  v-model="task.id"
                  :placeholder="$t('contestCreate.taskIdPlaceholder')"
                  class="flex-1"
                />
                <UInput
                  v-model="task.points"
                  type="number"
                  :placeholder="$t('contestCreate.pointsPlaceholder')"
                  class="w-32"
                />
                <UButton
                  color="error"
                  icon="i-lucide-trash-2"
                  @click="removeTask(index)"
                />
              </div>
            </div>
            <UButton
              variant="outline"
              icon="i-lucide-plus"
              class="mt-2"
              @click="addTask"
            >
              {{ $t('contestCreate.addTask') }}
            </UButton>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">{{ $t('contestCreate.rules') }}</label>
            <UTextarea
              v-model="form.rules"
              :placeholder="$t('contestCreate.rulesPlaceholder')"
              :rows="6"
            />
          </div>

          <div class="flex gap-2">
            <UButton
              type="submit"
              color="primary"
            >
              {{ $t('contestCreate.submit') }}
            </UButton>
            <UButton
              variant="outline"
              @click="navigateTo('/contests')"
            >
              {{ $t('contestCreate.cancel') }}
            </UButton>
          </div>
        </form>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()

const form = ref({
  title: '',
  description: '',
  startTime: '',
  duration: 2,
  type: 'icpc',
  tasks: [{ id: '', points: 100 }],
  rules: ''
})

const contestTypes = computed(() => [
  { value: 'icpc', label: t('contestCreate.typeICPC') },
  { value: 'ioi', label: t('contestCreate.typeIOI') },
  { value: 'codeforces', label: t('contestCreate.typeCodeforces') },
  { value: 'kaggle', label: t('contestCreate.typeKaggle') }
])

const addTask = () => {
  form.value.tasks.push({ id: '', points: 100 })
}

const removeTask = (index: number) => {
  form.value.tasks.splice(index, 1)
}

const handleSubmit = () => {
  console.log('Creating contest:', form.value)
  navigateTo('/contests')
}

useSeoMeta({
  title: `${t('contestCreate.title')} - SWUFE OJ`,
  description: 'Create a new contest on SWUFE Online Judge'
})
</script>
