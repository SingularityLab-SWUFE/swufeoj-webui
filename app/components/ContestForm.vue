<template>
  <UCard>
    <form
      class="space-y-6"
      @submit.prevent="$emit('submit')"
    >
      <div>
        <label class="block text-sm font-medium mb-2">{{ $t('contestCreate.contestTitle') }}</label>
        <UInput
          :model-value="modelValue.title"
          :placeholder="$t('contestCreate.titlePlaceholder')"
          @update:model-value="update('title', $event)"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">{{ $t('contestCreate.description') }}</label>
        <UTextarea
          :model-value="modelValue.description"
          :placeholder="$t('contestCreate.descriptionPlaceholder')"
          :rows="4"
          @update:model-value="update('description', $event)"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">{{ $t('contestCreate.startTime') }}</label>
          <UInput
            :model-value="modelValue.startTime"
            type="datetime-local"
            @update:model-value="update('startTime', $event)"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">{{ $t('contestCreate.duration') }}</label>
          <UInput
            :model-value="modelValue.duration"
            type="number"
            :placeholder="$t('contestCreate.durationPlaceholder')"
            @update:model-value="update('duration', $event)"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">{{ $t('contestCreate.contestType') }}</label>
        <USelect
          :model-value="modelValue.type"
          :options="contestTypes"
          @update:model-value="update('type', $event)"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">{{ $t('contestCreate.tasks') }}</label>
        <div class="space-y-2">
          <div
            v-for="(task, index) in modelValue.tasks"
            :key="index"
            class="flex gap-2"
          >
            <UInput
              :model-value="task.id"
              :placeholder="$t('contestCreate.taskIdPlaceholder')"
              class="flex-1"
              @update:model-value="updateTask(index, 'id', $event)"
            />
            <UInput
              :model-value="task.points"
              type="number"
              :placeholder="$t('contestCreate.pointsPlaceholder')"
              class="w-32"
              @update:model-value="updateTask(index, 'points', $event)"
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
          :model-value="modelValue.rules"
          :placeholder="$t('contestCreate.rulesPlaceholder')"
          :rows="6"
          @update:model-value="update('rules', $event)"
        />
      </div>

      <div class="flex gap-2">
        <UButton
          type="submit"
          color="primary"
          :loading="loading"
        >
          {{ submitLabel }}
        </UButton>
        <slot name="cancel" />
      </div>
    </form>
  </UCard>
</template>

<script setup lang="ts">
interface ContestTask {
  id: string
  points: number
}

interface ContestFormData {
  title: string
  description: string
  startTime: string
  duration: number
  type: string
  tasks: ContestTask[]
  rules: string
}

const props = defineProps<{
  modelValue: ContestFormData
  submitLabel: string
  loading?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: ContestFormData]
  'submit': []
}>()

const update = (key: keyof ContestFormData, value: ContestFormData[keyof ContestFormData]) => {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}

const updateTask = (index: number, key: keyof ContestTask, value: ContestTask[keyof ContestTask]) => {
  const tasks = [...props.modelValue.tasks]
  tasks[index] = { ...tasks[index], [key]: value }
  emit('update:modelValue', { ...props.modelValue, tasks })
}

const addTask = () => {
  emit('update:modelValue', {
    ...props.modelValue,
    tasks: [...props.modelValue.tasks, { id: '', points: 100 }]
  })
}

const removeTask = (index: number) => {
  const tasks = [...props.modelValue.tasks]
  tasks.splice(index, 1)
  emit('update:modelValue', { ...props.modelValue, tasks })
}

const { t } = useI18n()

const contestTypes = computed(() => [
  { value: 'icpc', label: t('contestCreate.typeICPC') },
  { value: 'ioi', label: t('contestCreate.typeIOI') },
  { value: 'codeforces', label: t('contestCreate.typeCodeforces') },
  { value: 'kaggle', label: t('contestCreate.typeKaggle') }
])
</script>
