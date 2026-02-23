<template>
  <UContainer class="max-w-5xl">
    <div class="py-8">
      <h1 class="text-3xl font-bold mb-6">
        {{ $t('contestCreate.title') }}
      </h1>

      <ContestForm
        v-model="form"
        :submit-label="$t('contestCreate.submit')"
        @submit="handleSubmit"
      >
        <template #cancel>
          <UButton
            variant="outline"
            @click="navigateTo('/contests')"
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

const form = ref({
  title: '',
  description: '',
  startTime: '',
  duration: 2,
  type: 'icpc',
  tasks: [{ id: '', points: 100 }],
  rules: ''
})

const handleSubmit = () => {
  console.log('Creating contest:', form.value)
  navigateTo('/contests')
}

useSeoMeta({
  title: `${t('contestCreate.title')} - SWUFE OJ`,
  description: 'Create a new contest on SWUFE Online Judge'
})
</script>
