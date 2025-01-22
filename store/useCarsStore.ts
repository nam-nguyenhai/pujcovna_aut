export enum ManualTypeEnum {
  MANUAL = 'Manuální',
  AUTOMATIC = 'Automatická',
}

export enum CarBrandEnum {
  AUDI = 'Audi',
  BMW = 'BMW',
  SKODA = 'Škoda',
}

export interface Car {
  id: number
  name: string
  brand: CarBrandEnum
  pricePerDay: number
  transmissions: ManualTypeEnum
  numberOfSeats: number
  age: string
  color: string
  equipment: string
  performance: string
}

export const useCarsStore = defineStore('cars', () => {
  const cars = ref<Car[]>([
    {
      id: 1,
      name: 'Škoda Fabia IV',
      brand: CarBrandEnum.SKODA,
      pricePerDay: 100,
      transmissions: ManualTypeEnum.MANUAL,
      numberOfSeats: 5,
      age: '2023 - 2024',
      color: 'černá',
      equipment: 'Klimatizace, vyhřívané sedadla, ALU kola, Infotainment, USB přípojka, Bluetooth, palubní počítač, ABS, ESC, centrální zamykání s dálkovým ovládáním, Start/Stop systém, senzor tlaku v pneu, ISOfixy',
      performance: '1.0 TSI 70 kW',
    },
    {
      id: 2,
      name: 'Škoda Fabia IV',
      brand: CarBrandEnum.SKODA,
      pricePerDay: 100,
      transmissions: ManualTypeEnum.MANUAL,
      numberOfSeats: 5,
      age: '2023 - 2024',
      color: 'černá',
      equipment: 'Klimatizace, vyhřívané sedadla, ALU kola, Infotainment, USB přípojka, Bluetooth, palubní počítač, ABS, ESC, centrální zamykání s dálkovým ovládáním, Start/Stop systém, senzor tlaku v pneu, ISOfixy',
      performance: '1.0 TSI 70 kW',
    },
    {
      id: 3,
      name: 'Škoda Fabia IV',
      brand: CarBrandEnum.SKODA,
      pricePerDay: 100,
      transmissions: ManualTypeEnum.MANUAL,
      numberOfSeats: 5,
      age: '2023 - 2024',
      color: 'černá',
      equipment: 'Klimatizace, vyhřívané sedadla, ALU kola, Infotainment, USB přípojka, Bluetooth, palubní počítač, ABS, ESC, centrální zamykání s dálkovým ovládáním, Start/Stop systém, senzor tlaku v pneu, ISOfixy',
      performance: '1.0 TSI 70 kW',
    },
    {
      id: 4,
      name: 'Škoda Fabia IV',
      brand: CarBrandEnum.SKODA,
      pricePerDay: 100,
      transmissions: ManualTypeEnum.MANUAL,
      numberOfSeats: 5,
      age: '2023 - 2024',
      color: 'černá',
      equipment: 'Klimatizace, vyhřívané sedadla, ALU kola, Infotainment, USB přípojka, Bluetooth, palubní počítač, ABS, ESC, centrální zamykání s dálkovým ovládáním, Start/Stop systém, senzor tlaku v pneu, ISOfixy',
      performance: '1.0 TSI 70 kW',
    },
    {
      id: 5,
      name: 'Škoda Fabia IV',
      brand: CarBrandEnum.SKODA,
      pricePerDay: 100,
      transmissions: ManualTypeEnum.MANUAL,
      numberOfSeats: 5,
      age: '2023 - 2024',
      color: 'černá',
      equipment: 'Klimatizace, vyhřívané sedadla, ALU kola, Infotainment, USB přípojka, Bluetooth, palubní počítač, ABS, ESC, centrální zamykání s dálkovým ovládáním, Start/Stop systém, senzor tlaku v pneu, ISOfixy',
      performance: '1.0 TSI 70 kW',
    },
    {
      id: 6,
      name: 'Škoda Fabia IV',
      brand: CarBrandEnum.SKODA,
      pricePerDay: 100,
      transmissions: ManualTypeEnum.MANUAL,
      numberOfSeats: 5,
      age: '2023 - 2024',
      color: 'černá',
      equipment: 'Klimatizace, vyhřívané sedadla, ALU kola, Infotainment, USB přípojka, Bluetooth, palubní počítač, ABS, ESC, centrální zamykání s dálkovým ovládáním, Start/Stop systém, senzor tlaku v pneu, ISOfixy',
      performance: '1.0 TSI 70 kW',
    },
  ])

  function getCarById(id: number) {
    return cars.value.find(car => car.id === id)
  }

  return {
    cars,
    getCarById,
  }
})
