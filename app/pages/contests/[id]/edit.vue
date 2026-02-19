<template>
  <UContainer class="max-w-5xl">
    <div class="py-8">
      <UButton
        :to="`/contests/${contestId}`"
        icon="i-lucide-arrow-left"
        variant="ghost"
        class="mb-4"
      >
        Back to Contest
      </UButton>

      <h1 class="text-3xl font-bold mb-6">
        Edit Contest
      </h1>

      <UCard>
        <form
          class="space-y-6"
          @submit.prevent="handleSubmit"
        >
          <div>
            <label class="block text-sm font-medium mb-2">Contest Title</label>
            <UInput
              v-model="form.title"
              placeholder="Enter contest title"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Description</label>
            <UTextarea
              v-model="form.description"
              placeholder="Describe the contest"
              :rows="4"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Start Time</label>
              <UInput
                v-model="form.startTime"
                type="datetime-local"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Duration (hours)</label>
              <UInput
                v-model="form.duration"
                type="number"
                placeholder="2"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Contest Type</label>
            <USelect
              v-model="form.type"
              :options="contestTypes"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Tasks</label>
            <div class="space-y-2">
              <div
                v-for="(task, index) in form.tasks"
                :key="index"
                class="flex gap-2"
              >
                <UInput
                  v-model="task.id"
                  placeholder="Task ID"
                  class="flex-1"
                />
                <UInput
                  v-model="task.points"
                  type="number"
                  placeholder="Points"
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
              Add Task
            </UButton>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Rules</label>
            <UTextarea
              v-model="form.rules"
              placeholder="Contest rules"
              :rows="6"
            />
          </div>

          <div class="flex gap-2">
            <UButton
              type="submit"
              color="primary"
            >
              Save Changes
            </UButton>
            <UButton
              variant="outline"
              @click="navigateTo(`/contests/${contestId}`)"
            >
              Cancel
            </UButton>
          </div>
        </form>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const route = useRoute()
const contestId = route.params.id

const form = ref({
  title: 'Weekly Contest 123',
  description: 'Practice your algorithm skills in this weekly contest',
  startTime: '2024-12-28T10:00',
  duration: 2,
  type: 'icpc',
  tasks: [
    { id: '1', points: 100 },
    { id: '2', points: 150 },
    { id: '3', points: 300 }
  ],
  rules: 'Solve as many tasks as you can\nEarlier submissions get bonus points\nWrong submissions add time penalty\nCollaboration is not allowed'
})

const contestTypes = [
  { value: 'icpc', label: 'ICPC Style' },
  { value: 'ioi', label: 'IOI Style' },
  { value: 'codeforces', label: 'Codeforces Style' },
  { value: 'kaggle', label: 'Kaggle Style' }
]

const addTask = () => {
  form.value.tasks.push({ id: '', points: 100 })
}

const removeTask = (index: number) => {
  form.value.tasks.splice(index, 1)
}

const handleSubmit = () => {
  console.log('Saving contest:', form.value)
  navigateTo(`/contests/${contestId}`)
}

useSeoMeta({
  title: 'Edit Contest - SWUFE OJ',
  description: 'Edit contest on SWUFE Online Judge'
})
</script>
