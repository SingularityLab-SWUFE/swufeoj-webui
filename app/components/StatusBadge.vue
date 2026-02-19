<template>
  <UBadge
    :color="color"
    variant="subtle"
    v-bind="$attrs"
  >
    {{ displayText }}
  </UBadge>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = defineProps<{
  type: 'submission' | 'contest' | 'difficulty'
  label: string
}>()

type BadgeColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'

const colorMap: Record<string, Record<string, BadgeColor>> = {
  submission: {
    'Accepted': 'success',
    'Wrong Answer': 'error',
    'Time Limit Exceeded': 'warning',
    'Memory Limit Exceeded': 'warning',
    'Runtime Error': 'error',
    'Compilation Error': 'error',
    'Judging': 'info',
    'Queued': 'neutral'
  },
  contest: {
    Running: 'success',
    Upcoming: 'primary',
    Ended: 'neutral'
  },
  difficulty: {
    Easy: 'success',
    Medium: 'warning',
    Hard: 'error'
  }
}

const { t } = useI18n()

const color = computed<BadgeColor>(() => colorMap[props.type]?.[props.label] ?? 'neutral')
const displayText = computed(() => t(`status.${props.type}.${props.label}`, props.label))
</script>
