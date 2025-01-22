<script setup lang="ts">
import { format } from 'date-fns'
import { type Car, useCarsStore } from '~/store/useCarsStore'
import { useReservationsStore } from '~/store/useReservationsStore'

const reservationsStore = useReservationsStore()
const reservations = computed(() => reservationsStore.reservations.map(reservation => ({
  ...reservation,
  fromDate: format(reservation.fromDate, 'dd.MM.yyyy'),
  toDate: format(reservation.toDate, 'dd.MM.yyyy'),
})))
const reservationsCollumns = [
  { key: 'name', label: 'Jméno' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Telefon' },
  { key: 'fromDate', label: 'Od' },
  { key: 'toDate', label: 'Do' },
  { key: 'notes', label: 'Poznámky' },
  { key: 'carId', label: 'ID auto' },
]

// CARS
const carsStore = useCarsStore()
const cars = computed(() => carsStore.cars)
const carToEdit = ref<Car | undefined>(undefined)
const isCarFormModalOpened = ref(false)

const carsCollumns = [
  { key: 'name', label: 'Jméno' },
  { key: 'brand', label: 'Značka' },
  { key: 'pricePerDay', label: 'Cena za den' },
  { key: 'transmissions', label: 'Převodovka' },
  { key: 'numberOfSeats', label: 'Počet míst' },
  { key: 'age', label: 'Stáří' },
  { key: 'performance', label: 'Výkon' },
  { key: 'color', label: 'Barva' },
  { key: 'equipment', label: 'Výbava' },
  { key: 'actions', label: 'Akce' },
]

function handleEditCar(index: number) {
  carToEdit.value = cars.value[index]
  isCarFormModalOpened.value = true
}

function handeCreateCar() {
  carToEdit.value = undefined
  isCarFormModalOpened.value = true
}
</script>

<template>
  <div class="space-y-10">
    <div class="space-y-3">
      <h2 class="text-3xl font-semibold">
        Rezervace
      </h2>
      <UTable
        :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'Žádne rezervace' }"
        :columns="reservationsCollumns"
        :rows="reservations"
      />
    </div>

    <div class="space-y-3">
      <h2 class="text-3xl font-semibold flex w-full items-center">
        <span class="w-full">
          Auta
        </span>

        <UButton @click="handeCreateCar">
          Přidat nové auto
        </UButton>
      </h2>
      <UTable :columns="carsCollumns" :rows="cars">
        <template #actions-data="{ index }">
          <button @click="handleEditCar(index)">
            <Icon name="mdi:pencil" />
          </button>
        </template>
      </UTable>
    </div>

    <CarFormModal v-model="isCarFormModalOpened" :car="carToEdit" @add-car="carsStore.addCar" @edit-car="carsStore.editCar" />
  </div>
</template>
