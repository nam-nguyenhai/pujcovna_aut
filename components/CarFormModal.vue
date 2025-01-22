<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'
import { type Car, CarBrandEnum, TransmissionsTypeEnum } from '~/store/useCarsStore'

const { car } = defineProps<{
  car: Car | undefined
}>()

const emit = defineEmits<{
  addCar: [event: Car]
  editCar: [event: Car]
}>()

const isModalOpen = defineModel('modelValue', { default: false })
const isLoading = ref(false)

const defaultState = {
  id: 0,
  name: '',
  brand: CarBrandEnum.AUDI,
  pricePerDay: '',
  transmissions: TransmissionsTypeEnum.MANUAL,
  numberOfSeats: '',
  age: '',
  color: '',
  equipment: '',
  performance: '',
}

const state = reactive({
  id: 0,
  name: '',
  brand: CarBrandEnum.AUDI,
  pricePerDay: '',
  transmissions: TransmissionsTypeEnum.MANUAL,
  numberOfSeats: '',
  age: '',
  color: '',
  equipment: '',
  performance: '',
})

const schema = z.object({
  id: z.number(),
  name: z.string().nonempty('Pole je povinné'),
  brand: z.nativeEnum(CarBrandEnum),
  pricePerDay: z.number({ message: 'Zadejte číslo' }),
  transmissions: z.nativeEnum(TransmissionsTypeEnum),
  numberOfSeats: z.number({ message: 'Zadejte číslo' }),
  age: z.string().nonempty('Pole je povinné'),
  color: z.string().nonempty('Pole je povinné'),
  equipment: z.string().nonempty('Pole je povinné'),
  performance: z.string().nonempty('Pole je povinné'),
})

type Schema = z.output<typeof schema>

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true

  if (car) {
    emit('editCar', event.data as Car)
  }
  else {
    emit('addCar', event.data as Car)
  }

  setTimeout(() => {
    isLoading.value = false
    isModalOpen.value = false

    Object.assign(state, defaultState)
  }, 2000)
}

watch(
  () => car,
  () => {
    Object.assign(state, car)
  },
  { deep: true },
)
</script>

<template>
  <UModal v-model="isModalOpen">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ car ? 'Upravit auto' : 'Přidat auto' }}
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isModalOpen = false" />
        </div>
      </template>

      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup required label="Meno" name="name">
          <UInput v-model="state.name" />
        </UFormGroup>

        <UFormGroup required label="Značka" name="brand">
          <USelect v-model="state.brand" :options="Object.values(CarBrandEnum)" />
        </UFormGroup>

        <UFormGroup required label="pricePerDay" name="pricePerDay">
          <UInput v-model="state.pricePerDay" type="number" />
        </UFormGroup>

        <UFormGroup required label="Převodovka" name="transmissions">
          <USelect v-model="state.transmissions" :options="Object.values(TransmissionsTypeEnum)" />
        </UFormGroup>

        <UFormGroup required label="Počet míst" name="numberOfSeats">
          <UInput v-model="state.numberOfSeats" type="number" />
        </UFormGroup>

        <UFormGroup required label="Stáří" name="age">
          <UInput v-model="state.age" />
        </UFormGroup>

        <UFormGroup required label="Výkon" name="performance">
          <UInput v-model="state.performance" />
        </UFormGroup>

        <UFormGroup required label="Barva" name="color">
          <UInput v-model="state.color" />
        </UFormGroup>

        <UFormGroup required label="Výbava" name="equipment">
          <UTextarea v-model="state.equipment" />
        </UFormGroup>

        <UButton :loading="isLoading" type="submit">
          Uložit
        </UButton>
      </UForm>
    </UCard>
  </UModal>
</template>
