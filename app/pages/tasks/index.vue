<template>
  <UContainer class="max-w-5xl">
    <div class="py-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">
          {{ $t('tasks.title') }}
        </h1>
        <UButton
          to="/tasks/create"
          icon="i-lucide-plus"
          size="sm"
        >
          {{ $t('tasks.create') }}
        </UButton>
      </div>

      <UCard>
        <div class="flex gap-4 mb-4">
          <UInput
            v-model="search"
            :placeholder="$t('tasks.search')"
            icon="i-lucide-search"
            class="flex-1"
          />
          <USelect
            v-model="filterDifficulty"
            :options="difficultyOptions"
          />
          <USelect
            v-model="filterType"
            :options="typeOptions"
          />
        </div>

        <UTable
          :columns="columns"
          :data="tasks"
          :loading="loading"
          @select="(_e, row) => navigateTo(`/tasks/${row.original.id}`)"
        >
          <template #title-cell="{ row }">
            <span class="font-medium">{{ row.original.title }}</span>
          </template>

          <template #difficulty-cell="{ row }">
            <StatusBadge
              type="difficulty"
              :label="row.original.difficulty"
            />
          </template>

          <template #type-cell="{ row }">
            <UBadge variant="subtle">
              {{ $t(`tasks.type${row.original.type}`) }}
            </UBadge>
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
const filterDifficulty = ref('')
const filterType = ref('')
const page = ref(1)
const perPage = ref(10)
const totalItems = ref(50)

const difficultyOptions = computed(() => [
  { value: '', label: t('tasks.allDifficulties') },
  { value: 'easy', label: t('status.difficulty.Easy') },
  { value: 'medium', label: t('status.difficulty.Medium') },
  { value: 'hard', label: t('status.difficulty.Hard') }
])

const typeOptions = computed(() => [
  { value: '', label: t('tasks.allTypes') },
  { value: 'algorithm', label: t('tasks.typeAlgorithm') },
  { value: 'ml', label: t('tasks.typeML') }
])

const columns = computed(() => [{
  accessorKey: 'id',
  header: 'ID'
}, {
  accessorKey: 'title',
  header: t('tasks.colTitle')
}, {
  accessorKey: 'difficulty',
  header: t('tasks.colDifficulty')
}, {
  accessorKey: 'type',
  header: t('tasks.colType')
}])

const tasks = ref([
  { id: 1, title: 'Two Sum', difficulty: 'Easy', acceptance: 49.5, type: 'Algorithm' },
  { id: 2, title: 'Binary Search', difficulty: 'Easy', acceptance: 54.2, type: 'Algorithm' },
  { id: 3, title: 'Merge Sort Implementation', difficulty: 'Medium', acceptance: 38.1, type: 'Algorithm' },
  { id: 4, title: 'Image Classification', difficulty: 'Medium', acceptance: 42.3, type: 'ML' },
  { id: 5, title: 'Dynamic Programming Challenge', difficulty: 'Hard', acceptance: 25.7, type: 'Algorithm' }
])

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  loading.value = false
})

useSeoMeta({
  title: `${t('tasks.title')} - SWUFE OJ`
})
</script>
