<script setup lang="ts">
const { iconName, value } = defineProps<{
  iconName: string
  iconClasses?: string
  value: string | number
}>()
</script>

<template>
  <div class="items-center flex gap-x-1">
    <Icon :class="iconClasses" class="text-gray-500" :name="iconName" />

    <slot name="value" :value="value">
      <span> {{ value }}</span>
    </slot>
  </div>
</template>
