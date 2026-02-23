export function useTaskForm() {
  const { t } = useI18n()

  const difficulties = computed(() => [
    { label: t('status.difficulty.Easy'), value: 'easy' },
    { label: t('status.difficulty.Medium'), value: 'medium' },
    { label: t('status.difficulty.Hard'), value: 'hard' }
  ])

  const addTestCase = (testCases: { input: string, output: string, isPublic: boolean }[]) => {
    testCases.push({ input: '', output: '', isPublic: false })
  }

  const removeTestCase = (testCases: { input: string, output: string, isPublic: boolean }[], index: number) => {
    testCases.splice(index, 1)
  }

  return { difficulties, addTestCase, removeTestCase }
}
