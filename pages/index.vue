<script setup lang="ts">
import CarCard from '~/components/CarCard.vue'
import { useCarsStore } from '~/store/useCarsStore'

const carsStore = useCarsStore()

const { cars } = storeToRefs(carsStore)
</script>

<template>
  <div>
    <CarCard v-for="(car, index) in cars" :key="index" :car="car" />
  </div>
</template>
