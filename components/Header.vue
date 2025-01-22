<script setup lang="ts">
const { isUserLogged } = useUser()
</script>

<template>
  <div class="container mx-auto px-5 md:px-0 flex items-center">
    <img height="100px" width="100px" class="mr-auto" src="public/logo.webp">

    <nav class="flex gap-x-5 text-black text-xl">
      <NuxtLink to="/" class="ml-auto">
        Nabídka aut
      </NuxtLink>

      <NuxtLink v-if="isUserLogged" to="/admin">
        Admin
      </NuxtLink>
    </nav>
  </div>
</template>
