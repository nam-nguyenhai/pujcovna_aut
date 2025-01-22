<script setup lang="ts">
import { format } from 'date-fns'

const modelValue = defineModel<Date>('modelValue', { default: null })
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(modelValue, 'dd. MM. yyyy')" />

    <template #panel="{ close }">
      <DatePicker v-model="modelValue" is-required @close="close" />
    </template>
  </UPopover>
</template>
