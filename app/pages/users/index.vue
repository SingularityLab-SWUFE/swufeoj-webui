<template>
  <UContainer class="max-w-5xl">
    <div class="py-8">
      <h1 class="text-2xl font-bold mb-6">
        {{ $t('users.title') }}
      </h1>

      <UCard>
        <div class="flex gap-4 mb-4">
          <UInput
            v-model="search"
            :placeholder="$t('users.search')"
            icon="i-lucide-search"
            class="flex-1"
          />
        </div>

        <UTable
          :columns="columns"
          :data="users"
          :loading="loading"
          @select="(_e, row) => navigateTo(`/users/${row.original.id}`)"
        >
          <template #username-cell="{ row }">
            <span class="font-medium">{{ row.original.username }}</span>
          </template>

          <template #rank-cell="{ row }">
            <UBadge
              v-if="row.original.rank <= 3"
              :color="getRankColor(row.original.rank)"
            >
              {{ row.original.rank }}
            </UBadge>
            <span v-else>{{ row.original.rank }}</span>
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
const page = ref(1)
const perPage = ref(20)
const totalItems = ref(100)

const columns = computed(() => [{
  accessorKey: 'rank',
  header: t('users.colRank')
}, {
  accessorKey: 'username',
  header: t('users.colUsername')
}, {
  accessorKey: 'solved',
  header: t('users.colSolved')
}, {
  accessorKey: 'submissions',
  header: t('users.colSubmissions')
}, {
  accessorKey: 'joinDate',
  header: t('users.colJoined')
}])

const users = ref([
  { id: 1, rank: 1, username: 'alice', solved: 234, submissions: 567, joinDate: '2023-06-15' },
  { id: 2, rank: 2, username: 'bob', solved: 198, submissions: 423, joinDate: '2023-08-22' },
  { id: 3, rank: 3, username: 'charlie', solved: 176, submissions: 389, joinDate: '2023-09-10' },
  { id: 4, rank: 4, username: 'david', solved: 145, submissions: 312, joinDate: '2024-01-05' },
  { id: 5, rank: 5, username: 'eve', solved: 132, submissions: 278, joinDate: '2024-02-18' }
])

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  loading.value = false
})

useSeoMeta({ title: `${t('users.title')} - SWUFE OJ` })
</script>
