<script setup lang="ts">
import type { Car } from '~/store/useCarsStore'

const { car } = defineProps<{
  car: Car
}>()
</script>

<template>
  <div class="flex flex-col max-md:w-full w-fit gap-y-3 rounded-xl shadow-md p-5">
    <img src="public/skoda_logo.webp" class="rounded-lg max-md:w-full" height="200px" width="200px">

    <span class="text-xl font-semibold">{{ car.name }}</span>

    <div class="flex mt-3 flex-col gap-y-1">
      <CarParameter icon-name="mdi:car-shift-pattern" :value="car.transmissions" />

      <CarParameter icon-name="mdi:speedometer" :value="car.performance" />
    </div>

    <span class="text-lg text-red-500">
      Od: <span class="font-bold"> {{ car.pricePerDay }} Kč  </span> / den
    </span>

    <NuxtLink :to="`/detail/${car.id}`">
      <UButton is="span" block label="Detail" />
    </NuxtLink>
  </div>
</template>
