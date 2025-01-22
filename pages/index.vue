<script setup lang="ts">
import CarCard from '~/components/CarCard.vue'
import { useCarsStore } from '~/store/useCarsStore'

const carsStore = useCarsStore()

const { cars } = storeToRefs(carsStore)
</script>

<template>
  <div class="flex max-md:justify-center-center max-[1500px]:flex-wrap items-center gap-5">
    <CarCard v-for="(car, index) in cars" :key="index" :car="car" />
  </div>
</template>
