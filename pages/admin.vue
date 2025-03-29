<script setup lang="ts">
import { format } from 'date-fns'
import { notify } from 'notiwind'
import { useCarsStore, type Car } from '~/store/useCarsStore'
import { type Reservation } from '~/store/useReservationsStore'

const { data: reservations } = useAsyncData<Reservation[]>('reservations', async () => $fetch(`/api/reservations`))
const { data: cars, refresh } = useAsyncData<Car[]>('cars', async () => $fetch(`/api/cars`))

const reservationsComputed = computed(() => (reservations.value || []).map(reservation => ({
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
const carToEdit = ref<Car | undefined>(undefined)
const isCarFormModalOpened = ref(false)
const isLoading = ref(false)

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

function createNewCar() {
  carToEdit.value = undefined
  isCarFormModalOpened.value = true
}

function editCar(index: number) {
  carToEdit.value = cars.value?.[index]
  isCarFormModalOpened.value = true
}

async function handleEditCar(car: Car) {
  try {
    isLoading.value = true
    await $fetch(`/api/cars/${car.id}`, {
      method: 'put',
      body: {
        ...car,
        id: undefined,
      },
    })

    notify({
      group: 'notifications',
      title: 'Auto bylo úspěšně upraveno',
      type: 'success',
    })
    
    isCarFormModalOpened.value = false
    
    await refresh()
    carToEdit.value = undefined
  } catch (error: any) {
    notify({
      group: 'notifications',
      title: 'Něco se pokazilo',
      type: 'error',
    })

  } finally { 
    isLoading.value = false
  }
}

async function handleCreateCar(car: Car) {
  try {
    isLoading.value = true
    await $fetch('/api/cars', {
      method: 'POST',
      body: {
        ...car,
        id: undefined
      },
    })

    notify({
      group: 'notifications',
      title: 'Auto bylo úspěšně přidáno',
      type: 'success',
    })
    
    isCarFormModalOpened.value = false
    
    await refresh()
    carToEdit.value = undefined
  } catch (error: any) {
    notify({
      group: 'notifications',
      title: 'Něco se pokazilo',
      type: 'error',
    })
  } finally { 
    isLoading.value = false
  }
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
        :rows="reservationsComputed"
      />
    </div>

    <div class="space-y-3">
      <h2 class="text-3xl font-semibold flex w-full items-center">
        <span class="w-full">
          Auta
        </span>

        <UButton @click="createNewCar">
          Přidat nové auto
        </UButton>
      </h2>

      <UTable :columns="carsCollumns" :rows="cars || []">
        <template #actions-data="{ index }">
          <button @click="editCar(index)">
            <Icon name="mdi:pencil" />
          </button>
        </template>
      </UTable>
    </div>

    <CarFormModal :is-loading="isLoading" v-model="isCarFormModalOpened" :car="carToEdit" @add-car="handleCreateCar" @edit-car="handleEditCar" />
  </div>
</template>
