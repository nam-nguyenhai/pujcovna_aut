<script setup lang="ts">
import type { CarType } from '~/store/useCarsStore'

const { car } = defineProps<{
  car: CarType
}>()
</script>

<template>
  <div class="flex flex-col w-fit gap-y-3 rounded-xl shadow-md p-5">
    <img src="public/skoda_logo.webp" class="rounded-lg" height="200px" width="200px">

    <span class="text-xl font-semibold">{{ car.name }}</span>

    <div class="flex mt-3 flex-col gap-y-1">
      <div class="space-x-2">
        <Icon name="mdi:car-shift-pattern" />

        <span> {{ car.transmissions }}</span>
      </div>

      <div class="space-x-2">
        <Icon name="mdi:speedometer" />

        <span> {{ car.performance }}</span>
      </div>
    </div>

    <span class="text-lg text-red-500">
      Od: <span class="font-bold"> {{ car.pricePerDay }} Kč  </span> / den
    </span>

    <UButton block label="Detail" />
  </div>
</template>
