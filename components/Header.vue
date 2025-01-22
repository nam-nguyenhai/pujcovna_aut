<script setup lang="ts">
import { UButton } from '#components'
import { z } from 'zod'

const { isUserLogged, setUserLogged } = useUser()

// login modal
const isLoginModalOpened = ref(false)
const isLoading = ref(false)

const state = reactive({
  username: '',
  password: '',
})

const schema = z.object({
  username: z.string().nonempty('Pole je povinné'),
  password: z.string().nonempty('Pole je povinné'),
})

async function onSubmit() {
  isLoading.value = true

  setUserLogged()

  setTimeout(() => {
    isLoading.value = false
    isLoginModalOpened.value = false
  }, 2000)
}
</script>

<template>
  <div class="container mx-auto px-5 md:px-0 flex items-center">
    <img height="100px" width="100px" class="mr-auto" src="public/logo.webp">

    <nav class="flex gap-x-5 text-black text-xl">
      <ClientOnly>
        <NuxtLink to="/" class="ml-auto">
          <UButton is="span">
            Nabídka aut
          </UButton>
        </NuxtLink>

        <NuxtLink v-if="isUserLogged" to="/admin">
          <UButton is="span">
            Admin
          </UButton>
        </NuxtLink>

        <UButton v-else @click="isLoginModalOpened = true">
          Prihlásit se
        </UButton>
      </ClientOnly>
    </nav>
  </div>

  <UModal v-model="isLoginModalOpened">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Přihlášení do admin
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isLoginModalOpened = false" />
        </div>
      </template>

      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup required label="Účet" name="username">
          <UInput v-model="state.username" />
        </UFormGroup>

        <UFormGroup required label="Heslo" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <UButton type="submit" :loading="isLoading">
          Přihlásit se
        </UButton>
      </UForm>
    </UCard>
  </UModal>
</template>
