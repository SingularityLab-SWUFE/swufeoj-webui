<template>
  <UContainer class="max-w-5xl">
    <div class="py-8">
      <UButton
        :to="`/contests/${contestId}`"
        icon="i-lucide-arrow-left"
        variant="ghost"
        class="mb-4"
      >
        {{ $t('contestCreate.back') }}
      </UButton>

      <h1 class="text-3xl font-bold mb-6">
        {{ $t('contestCreate.editTitle') }}
      </h1>

      <ContestForm
        v-model="form"
        :submit-label="$t('contestCreate.save')"
        @submit="handleSubmit"
      >
        <template #cancel>
          <UButton
            variant="outline"
            @click="navigateTo(`/contests/${contestId}`)"
          >
            {{ $t('contestCreate.cancel') }}
          </UButton>
        </template>
      </ContestForm>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()
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

const handleSubmit = () => {
  console.log('Saving contest:', form.value)
  navigateTo(`/contests/${contestId}`)
}

useSeoMeta({
  title: `${t('contestCreate.editTitle')} - SWUFE OJ`,
  description: 'Edit contest on SWUFE Online Judge'
})
</script>
