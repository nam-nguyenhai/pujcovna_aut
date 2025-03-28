<script setup lang="ts">
import CarCard from '~/components/CarCard.vue'

const { data: cars, error } = await useAsyncData('cars', async () => $fetch(`/api/cars`))

if(error.value) {
  throw createError({ statusCode: error.value.statusCode, statusMessage: error.value.statusMessage })
}
</script>

<template>
  <div class="flex max-md:justify-center max-[1500px]:flex-wrap items-center gap-5">
    <CarCard v-for="(car, index) in cars" :key="index" :car="car" />
  </div>
</template>
