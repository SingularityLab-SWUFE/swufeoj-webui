<template>
  <UContainer class="max-w-5xl">
    <div class="py-8">
      <h1 class="text-3xl font-bold mb-6">
        {{ $t('admin.manageUsers') }}
      </h1>

      <UCard>
        <div class="flex gap-4 mb-4">
          <UInput
            v-model="search"
            :placeholder="$t('admin.searchUsers')"
            icon="i-lucide-search"
            class="flex-1"
          />
          <USelect
            v-model="filterRole"
            :options="roleOptions"
          />
        </div>

        <UTable
          :columns="columns"
          :data="users"
          :loading="loading"
        >
          <template #username-cell="{ row }">
            <UserHeader
              :username="(row.original as User).username"
              :avatar="(row.original as User).avatar"
              size="xs"
            />
          </template>

          <template #role-cell="{ row }">
            <UBadge :color="getRoleColor((row.original as User).role)">
              {{ (row.original as User).role }}
            </UBadge>
          </template>

          <template #active-cell="{ row }">
            <UBadge :color="(row.original as User).active ? 'success' : 'neutral'">
              {{ (row.original as User).active ? $t('admin.active') : $t('admin.inactive') }}
            </UBadge>
          </template>

          <template #actions-cell="{ row }">
            <ActionButtons
              :show-delete="false"
              @view="navigateTo(`/users/${(row.original as User).id}`)"
              @edit="console.log('Edit', (row.original as User).id)"
            >
              <UButton
                size="xs"
                variant="ghost"
                icon="i-lucide-ban"
                :color="(row.original as User).active ? 'error' : 'success'"
              />
            </ActionButtons>
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
interface User {
  id: number
  username: string
  email: string
  role: string
  joinDate: string
  active: boolean
  avatar: string
}

const { t } = useI18n()

const loading = ref(true)
const search = ref('')
const filterRole = ref('')
const page = ref(1)
const perPage = ref(10)
const totalItems = ref(40)

const roleOptions = computed(() => [
  { value: '', label: t('admin.allRoles') },
  { value: 'admin', label: t('admin.roleAdmin') },
  { value: 'user', label: t('admin.roleUser') }
])

const columns = computed(() => [{
  accessorKey: 'id',
  header: t('admin.colId')
}, {
  accessorKey: 'username',
  header: t('admin.colUsername')
}, {
  accessorKey: 'email',
  header: t('admin.colEmail')
}, {
  accessorKey: 'role',
  header: t('admin.colRole')
}, {
  accessorKey: 'joinDate',
  header: t('admin.colJoined')
}, {
  accessorKey: 'active',
  header: t('admin.colStatus')
}, {
  accessorKey: 'actions',
  header: t('admin.colActions')
}])

const users = ref<User[]>([
  { id: 1, username: 'alice', email: 'alice@example.com', role: 'Admin', joinDate: '2024-01-15', active: true, avatar: '' },
  { id: 2, username: 'bob', email: 'bob@example.com', role: 'User', joinDate: '2024-02-20', active: true, avatar: '' },
  { id: 3, username: 'charlie', email: 'charlie@example.com', role: 'User', joinDate: '2024-03-10', active: true, avatar: '' },
  { id: 4, username: 'david', email: 'david@example.com', role: 'User', joinDate: '2024-04-05', active: false, avatar: '' }
])

const getRoleColor = (role: string) => {
  switch (role) {
    case 'Admin': return 'error'
    case 'User': return 'primary'
    default: return 'neutral'
  }
}

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  loading.value = false
})

useSeoMeta({
  title: `${t('admin.manageUsers')} - SWUFE OJ`
})
</script>
