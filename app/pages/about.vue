<template>
  <UContainer>
    <div class="py-12 max-w-3xl mx-auto space-y-12">
      <div>
        <h1 class="text-4xl font-bold mb-4">
          {{ $t('about.headline') }}
        </h1>
        <p class="text-lg text-muted">
          {{ $t('about.description') }}
        </p>
      </div>

      <div class="space-y-6">
        <h2 class="text-2xl font-semibold">
          {{ $t('about.judgerTitle') }}
        </h2>
        <p class="text-muted">
          {{ $t('about.judgerDesc') }}
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <UCard
            v-for="judger in judgers"
            :key="judger.nameKey"
          >
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <UIcon
                  :name="judger.icon"
                  class="size-5 text-primary"
                />
                <span class="font-semibold">{{ judger.name }}</span>
              </div>
              <p class="text-sm text-muted">
                {{ $t(judger.descKey) }}
              </p>
            </div>
          </UCard>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-2xl font-semibold">
          {{ $t('about.scriptTitle') }}
        </h2>
        <p class="text-muted">
          {{ $t('about.scriptDesc') }}
        </p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div
            v-for="scenario in scenarios"
            :key="scenario.labelKey"
            class="border border-default rounded-lg p-3 text-center"
          >
            <div class="text-sm font-medium">
              {{ $t(scenario.labelKey) }}
            </div>
            <div class="text-xs text-muted mt-1">
              {{ scenario.metric }}
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-2xl font-semibold">
          {{ $t('about.metricTitle') }}
        </h2>
        <p class="text-muted">
          {{ $t('about.metricDesc') }}
        </p>
      </div>

      <div class="space-y-4">
        <h2 class="text-2xl font-semibold">
          {{ $t('about.contestTitle') }}
        </h2>
        <p class="text-muted">
          {{ $t('about.contestDesc') }}
        </p>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()

const judgers = [
  { name: 'StandardIO', nameKey: 'standardio', icon: 'i-lucide-terminal', descKey: 'about.judgerStandardIO' },
  { name: 'SpecialJudge', nameKey: 'specialjudge', icon: 'i-lucide-check-check', descKey: 'about.judgerSpecialJudge' },
  { name: 'ScriptJudger', nameKey: 'scriptjudger', icon: 'i-lucide-scroll', descKey: 'about.judgerScriptJudger' }
]

const scenarios = [
  { labelKey: 'about.scenarioML', metric: 'accuracy / F1' },
  { labelKey: 'about.scenarioBench', metric: 'QPS / p99' },
  { labelKey: 'about.scenarioGolf', metric: 'code length' },
  { labelKey: 'about.scenarioCustom', metric: 'any metric' }
]

useSeoMeta({ title: `${t('about.headline')} - SWUFE OJ` })
</script>
