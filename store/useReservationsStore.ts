export interface Reservation {
  name: string
  email: string
  phone: string
  fromDate: Date
  toDate: Date
  notes: string
  carId: number
}

export const useReservationsStore = defineStore('reservations', () => {
  const reservations = ref<Reservation[]>([])

  async function addReservation(reservation: Reservation) {
    reservations.value.push(reservation)
  }

  return { reservations, addReservation }
})
