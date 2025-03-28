<script setup lang="ts">
import { z } from 'zod'


const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
    return navigateTo('/admin')
  }
}, { immediate: true })

const isLoading = ref(false)

const supabase = useSupabaseClient()

const errorMessage = ref()

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

    const { error } =  await supabase.auth.signInWithPassword({
      email: state.username,
      password: state.password,
    })

    if(error) {
      errorMessage.value = error.message 

      isLoading.value = false
      return
    }
    
    return navigateTo('/admin')
  }
</script>

<template>
    <div class="flex size-full justify-center items-center">
        <UCard class="w-96">
        <template #header>
            <div class="flex items-center justify-between">
                <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                    Přihlášení do admin
                </h3>
            </div>
        </template>

        <UAlert v-if="errorMessage" color="red" variant="solid" :title="errorMessage" class="mb-4" />

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
    </div>
</template>