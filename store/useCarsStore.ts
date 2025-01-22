export enum ManualTypeEnum {
  MANUAL = 'Manuální',
  AUTOMATIC = 'Automatická',
}

export enum CarBrandEnum {
  AUDI = 'Audi',
  BMW = 'BMW',
  SKODA = 'Škoda',
}

export interface CarType {
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
  const cars = ref<CarType[]>([
    {
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

  return {
    cars,
  }
})
