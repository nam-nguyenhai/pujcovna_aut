<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { isAfter, isSameDay } from 'date-fns'
import { z } from 'zod'
import { useCarsStore } from '~/store/useCarsStore'
import { useReservations } from '~/store/useReservations'

const route = useRoute()
const id = computed(() => route.params.id)

const { getCarById } = useCarsStore()
const { addReservation } = useReservations()

const car = computed(() => getCarById(Number(id.value)))

const carParameters = computed(() => [
  {
    iconName: 'mdi:car-shift-pattern',
    value: car.value!.transmissions,
    description: 'Převodovka',
  },
  {
    iconName: 'mdi:speedometer',
    value: car.value!.performance,
    description: 'Výkon',
  },
  {
    iconName: 'mdi:seat',
    value: car.value!.numberOfSeats,
    description: 'Počet míst',
  },
  {
    iconName: 'mdi:key-chain-variant',
    value: car.value!.age,
    description: 'Stáří',
  },
  {
    iconName: 'mdi:car-hatchback',
    value: car.value!.color,
    description: 'Barva',
  },
])

if (!car.value) {
  throw createError({
    statusCode: 404,
    message: 'Car not found',
  })
}

// modal
const isModalOpen = ref(false)
const isLoading = ref(false)

const state = reactive({
  name: '',
  email: '',
  phone: '',
  fromDate: new Date(),
  toDate: new Date(),
  notes: '',
})

const schema = z.object({
  name: z.string().nonempty('Pole je povinné'),
  email: z.string().email('Neplatný email'),
  // eslint-disable-next-line regexp/prefer-d
  phone: z.string().regex(/^(\+420 ?)?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/, 'Neplatné telefonní číslo'),
  fromDate: z.coerce.date().refine(data => !(isAfter(data, state.toDate) && !isSameDay(data, state.toDate)), { message: 'Datum od je menší větší než datum do.' }),
  toDate: z.coerce.date(),
  notes: z.string(),
})

type Schema = z.output<typeof schema>

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true
  await addReservation({
    ...event.data,
    carId: car.value!.id,
  })

  setTimeout(() => {
    isLoading.value = false
    isModalOpen.value = false
  }, 2000)
}
</script>

<template>
  <div v-if="car" class="flex gap-y-5 flex-col">
    <img class="flex mx-auto rounded-full" src="public/skoda_logo.webp">

    <div class="mx-auto">
      <UButton class="rounded-lg uppercase w-[200px] h-[50px]" block @click="isModalOpen = true">
        Objednat Vůz
      </UButton>
    </div>

    <div class="flex flex-col md:flex-row mt-10 items-center">
      <div class="space-y-5">
        <h2 class="text-5xl font-bold">
          {{ car.name }}
        </h2>

        <div class="flex flex-wrap gap-4">
          <CarParameter
            v-for="(parameter, index) in carParameters"
            :key="index"
            class="gap-x-3"
            icon-classes="text-5xl"
            :icon-name="parameter.iconName"
            :value="parameter.value"
          >
            <template #value="{ value }">
              <div class="flex flex-col">
                {{ parameter.description }}:
                <span class="font-semibold">{{ value }}</span>
              </div>
            </template>
          </CarParameter>
        </div>
      </div>

      <div class="flex items-center md:ml-auto max-md:flex-col h-full">
        <Icon name="mdi:chevron-right" class="text-9xl max-md:hidden text-red-500" />
        <Icon name="mdi:chevron-down" class="text-9xl md:hidden text-red-500" />

        <span class="text-lg text-red-500 text-nowrap">
          od: <span class="font-bold"> {{ car.pricePerDay }} Kč  </span> / den
        </span>
      </div>
    </div>

    <hr class="my-5 border-t-2 border-gray-300">

    <div>
      <CarParameter class="gap-x-3" icon-classes="text-5xl" icon-name="mdi:cog" :value="car.equipment" />
    </div>
  </div>

  <UModal v-model="isModalOpen">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Rezervace
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isModalOpen = false" />
        </div>
      </template>

      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup required label="Meno a příjmení" name="name">
          <UInput v-model="state.name" />
        </UFormGroup>

        <UFormGroup required label="Email" name="email">
          <UInput v-model="state.email" type="email" />
        </UFormGroup>

        <UFormGroup required label="Telefon" name="phone">
          <UInput v-model="state.phone" />
        </UFormGroup>

        <UFormGroup required label="Datum od" name="fromDate">
          <DateInput v-model="state.fromDate" />
        </UFormGroup>

        <UFormGroup required label="Datum do" name="toDate">
          <DateInput v-model="state.toDate" />
        </UFormGroup>

        <UFormGroup label="Poznámky" name="notes">
          <UTextarea v-model="state.phone" />
        </UFormGroup>

        <UButton :loading="isLoading" type="submit">
          Rezervovat
        </UButton>
      </UForm>
    </UCard>
  </UModal>
</template>
