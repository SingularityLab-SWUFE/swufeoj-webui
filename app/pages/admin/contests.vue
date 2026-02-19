<template>
  <UContainer class="max-w-5xl">
    <div class="py-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">
          {{ $t('admin.manageContests') }}
        </h1>
        <UButton
          to="/contests/create"
          icon="i-lucide-plus"
        >
          {{ $t('admin.createContest') }}
        </UButton>
      </div>

      <UCard>
        <div class="flex gap-4 mb-4">
          <UInput
            v-model="search"
            :placeholder="$t('admin.searchContests')"
            icon="i-lucide-search"
            class="flex-1"
          />
          <USelect
            v-model="filterStatus"
            :options="statusOptions"
          />
        </div>

        <UTable
          :columns="columns"
          :data="contests"
          :loading="loading"
        >
          <template #title-cell="{ row }">
            <span class="font-medium">{{ row.original.title }}</span>
          </template>

          <template #status-cell="{ row }">
            <StatusBadge
              type="contest"
              :label="row.original.status"
            />
          </template>

          <template #actions-cell="{ row }">
            <ActionButtons
              @view="navigateTo(`/contests/${row.original.id}`)"
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
const filterStatus = ref('')
const page = ref(1)
const perPage = ref(10)
const totalItems = ref(30)

const statusOptions = computed(() => [
  { value: '', label: t('admin.allStatus') },
  { value: 'upcoming', label: t('status.contest.Upcoming') },
  { value: 'running', label: t('status.contest.Running') },
  { value: 'ended', label: t('status.contest.Ended') }
])

const columns = computed(() => [{
  accessorKey: 'id',
  header: t('admin.colId')
}, {
  accessorKey: 'title',
  header: t('admin.colTitle')
}, {
  accessorKey: 'status',
  header: t('admin.colStatus')
}, {
  accessorKey: 'startTime',
  header: t('admin.colStartTime')
}, {
  accessorKey: 'participants',
  header: t('admin.colParticipants')
}, {
  accessorKey: 'actions',
  header: t('admin.colActions')
}])

const contests = ref([
  { id: 1, title: 'Weekly Contest 123', status: 'Upcoming', startTime: '2024-12-30 10:00', participants: 0 },
  { id: 2, title: 'ML Competition 2024', status: 'Running', startTime: '2024-12-28 08:00', participants: 142 },
  { id: 3, title: 'Algorithm Challenge', status: 'Ended', startTime: '2024-12-20 14:00', participants: 287 }
])

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  loading.value = false
})

useSeoMeta({
  title: `${t('admin.manageContests')} - SWUFE OJ`
})
</script>
