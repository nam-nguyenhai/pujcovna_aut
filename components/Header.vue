<script setup lang="ts">
const user = useSupabaseUser()


const supabase = useSupabaseClient()

async function signOut() {
  await supabase.auth.signOut()

  return navigateTo('/')
}
</script>

<template>
  <div class="container mx-auto px-5 md:px-0 flex items-center">
    <NuxtLink to="/" class="w-fit">
      <img height="100px" width="100px" class="mr-auto" src="public/logo.webp">
    </NuxtLink>

    <nav class="flex ml-auto gap-x-5 text-black text-xl">
      <ClientOnly>
        <UButton is="span" to="/">
          Nabídka aut
        </UButton>

        <UButton v-if="user" to="/admin">
          Admin
        </UButton>

        <UButton v-else to="/login">
          Prihlásit se
        </UButton>

        <UButton v-if="user" @click="signOut">
          Odhlásit se
        </UButton>
      </ClientOnly>
    </nav>
  </div>
</template>
