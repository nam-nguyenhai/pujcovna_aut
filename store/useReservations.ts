export const useReservations = defineStore('reservations', () => {
  const reservations = ref([])

  async function addReservation(reservation) {
    reservations.value.push(reservation)
  }

  return { reservations, addReservation }
})
