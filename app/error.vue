<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()
</script>

<template>
  <UApp>
    <UMain>
      <UContainer>
        <div class="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <h1 class="text-6xl font-bold mb-4">
            {{ error.statusCode }}
          </h1>
          <p class="text-xl text-muted mb-8">
            {{ error.message }}
          </p>
          <UButton
            to="/"
            icon="i-lucide-home"
          >
            Back to Home
          </UButton>
        </div>
      </UContainer>
    </UMain>
  </UApp>
</template>
