<template>
  <UContainer class="max-w-5xl">
    <div class="py-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">
          {{ $t('admin.manageTasks') }}
        </h1>
        <UButton
          to="/tasks/create"
          icon="i-lucide-plus"
        >
          {{ $t('admin.createTask') }}
        </UButton>
      </div>

      <UCard>
        <div class="flex gap-4 mb-4">
          <UInput
            v-model="search"
            :placeholder="$t('admin.searchTasks')"
            icon="i-lucide-search"
            class="flex-1"
          />
          <USelect
            v-model="filterType"
            :options="typeOptions"
          />
          <USelect
            v-model="filterStatus"
            :options="statusOptions"
          />
        </div>

        <UTable
          :columns="columns"
          :data="tasks"
          :loading="loading"
        >
          <template #title-cell="{ row }">
            <span class="font-medium">{{ row.original.title }}</span>
          </template>

          <template #type-cell="{ row }">
            <UBadge variant="subtle">
              {{ row.original.type }}
            </UBadge>
          </template>

          <template #visible-cell="{ row }">
            <UBadge :color="row.original.visible ? 'success' : 'neutral'">
              {{ row.original.visible ? $t('admin.visible') : $t('admin.hidden') }}
            </UBadge>
          </template>

          <template #actions-cell="{ row }">
            <ActionButtons
              @view="navigateTo(`/tasks/${row.original.id}`)"
              @edit="console.log('Edit', row.original.id)"
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
const filterType = ref('')
const filterStatus = ref('')
const page = ref(1)
const perPage = ref(10)
const totalItems = ref(50)

const typeOptions = computed(() => [
  { value: '', label: t('admin.allTypes') },
  { value: 'algorithm', label: t('admin.typeAlgorithm') },
  { value: 'ml', label: t('admin.typeML') }
])

const statusOptions = computed(() => [
  { value: '', label: t('admin.allStatus') },
  { value: 'visible', label: t('admin.visible') },
  { value: 'hidden', label: t('admin.hidden') }
])

const columns = computed(() => [{
  accessorKey: 'id',
  header: t('admin.colId')
}, {
  accessorKey: 'title',
  header: t('admin.colTitle')
}, {
  accessorKey: 'type',
  header: t('admin.colType')
}, {
  accessorKey: 'visible',
  header: t('admin.colStatus')
}, {
  accessorKey: 'submissions',
  header: t('admin.colSubmissions')
}, {
  accessorKey: 'actions',
  header: t('admin.colActions')
}])

const tasks = ref([
  { id: 1, title: 'Two Sum', type: 'Algorithm', visible: true, submissions: 523 },
  { id: 2, title: 'Binary Search', type: 'Algorithm', visible: true, submissions: 412 },
  { id: 3, title: 'Image Classification', type: 'ML', visible: true, submissions: 234 },
  { id: 4, title: 'Graph Traversal', type: 'Algorithm', visible: false, submissions: 89 },
  { id: 5, title: 'Dynamic Programming', type: 'Algorithm', visible: true, submissions: 167 }
])

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  loading.value = false
})

useSeoMeta({
  title: `${t('admin.manageTasks')} - SWUFE OJ`
})
</script>
