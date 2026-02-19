<template>
  <div class="flex items-center gap-4">
    <UAvatar
      :src="avatar"
      :size="size"
    />
    <div>
      <div
        class="font-medium"
        :class="usernameClass"
      >
        {{ username }}
      </div>
      <div
        v-if="subtitle"
        class="text-sm text-gray-600 dark:text-gray-400"
      >
        {{ subtitle }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  username: string
  avatar?: string
  subtitle?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const usernameClass = computed(() => {
  switch (props.size) {
    case 'xl': return 'text-3xl font-bold'
    case 'lg': return 'text-2xl font-bold'
    default: return ''
  }
})
</script>
