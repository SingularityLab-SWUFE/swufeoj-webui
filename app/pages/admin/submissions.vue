<template>
  <UContainer class="max-w-5xl">
    <div class="py-8">
      <h1 class="text-3xl font-bold mb-6">
        {{ $t('admin.manageSubmissions') }}
      </h1>

      <UCard>
        <div class="flex gap-4 mb-4">
          <UInput
            v-model="search"
            :placeholder="$t('admin.searchSubmissions')"
            icon="i-lucide-search"
            class="flex-1"
          />
          <USelect
            v-model="filterStatus"
            :options="statusOptions"
          />
          <USelect
            v-model="filterLanguage"
            :options="languageOptions"
          />
        </div>

        <UTable
          :columns="columns"
          :data="submissions"
          :loading="loading"
        >
          <template #task-cell="{ row }">
            <span class="font-medium">{{ row.original.task }}</span>
          </template>

          <template #status-cell="{ row }">
            <StatusBadge
              type="submission"
              :label="row.original.status"
            />
          </template>

          <template #actions-cell="{ row }">
            <ActionButtons
              @view="navigateTo(`/submissions/${row.original.id}`)"
              @edit="console.log('Rejudge', row.original.id)"
              @delete="console.log('Delete', row.original.id)"
            />
          </template>
        </UTable>

        <div class="flex justify-center mt-4">
          <UPagination
            v-model="page"
            :total="totalItems"
            :per-page="perPage"
          />
        </div>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()

const loading = ref(true)
const search = ref('')
const filterStatus = ref('')
const filterLanguage = ref('')
const page = ref(1)
const perPage = ref(20)
const totalItems = ref(200)

const statusOptions = computed(() => [
  { value: '', label: t('admin.allStatus') },
  { value: 'accepted', label: t('status.submission.Accepted') },
  { value: 'wrong_answer', label: t('status.submission.Wrong Answer') },
  { value: 'tle', label: t('status.submission.Time Limit Exceeded') },
  { value: 'mle', label: t('status.submission.Memory Limit Exceeded') },
  { value: 're', label: t('status.submission.Runtime Error') }
])

const languageOptions = computed(() => [
  { value: '', label: t('admin.allLanguages') },
  { value: 'cpp', label: 'C++' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'go', label: 'Go' }
])

const columns = computed(() => [{
  accessorKey: 'id',
  header: t('admin.colId')
}, {
  accessorKey: 'task',
  header: t('admin.colTask')
}, {
  accessorKey: 'user',
  header: t('admin.colUser')
}, {
  accessorKey: 'status',
  header: t('admin.colStatus')
}, {
  accessorKey: 'language',
  header: t('admin.colLanguage')
}, {
  accessorKey: 'submittedAt',
  header: t('admin.colSubmitted')
}, {
  accessorKey: 'actions',
  header: t('admin.colActions')
}])

const submissions = ref([
  { id: 1001, task: 'Two Sum', user: 'alice', status: 'Accepted', language: 'Python', submittedAt: '2 min ago' },
  { id: 1002, task: 'Binary Search', user: 'bob', status: 'Wrong Answer', language: 'C++', submittedAt: '5 min ago' },
  { id: 1003, task: 'Merge Sort', user: 'charlie', status: 'Time Limit Exceeded', language: 'Java', submittedAt: '12 min ago' },
  { id: 1004, task: 'Image Classification', user: 'david', status: 'Accepted', language: 'Python', submittedAt: '30 min ago' },
  { id: 1005, task: 'Dynamic Programming', user: 'eve', status: 'Runtime Error', language: 'Go', submittedAt: '1 hour ago' }
])

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  loading.value = false
})

useSeoMeta({
  title: `${t('admin.manageSubmissions')} - SWUFE OJ`
})
</script>
