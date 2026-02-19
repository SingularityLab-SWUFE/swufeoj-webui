<template>
  <div class="flex gap-2">
    <UButton
      v-if="showView"
      size="xs"
      variant="ghost"
      icon="i-lucide-eye"
      @click="$emit('view')"
    />
    <UButton
      v-if="showEdit"
      size="xs"
      variant="ghost"
      icon="i-lucide-edit"
      @click="$emit('edit')"
    />
    <UButton
      v-if="showDelete"
      size="xs"
      variant="ghost"
      icon="i-lucide-trash-2"
      color="error"
      @click="$emit('delete')"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  showView?: boolean
  showEdit?: boolean
  showDelete?: boolean
}

withDefaults(defineProps<Props>(), {
  showView: true,
  showEdit: true,
  showDelete: true
})

defineEmits<{
  view: []
  edit: []
  delete: []
}>()
</script>
