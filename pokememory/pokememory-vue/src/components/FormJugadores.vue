<script setup lang="ts">
defineProps<{
  onPlay: any;
}>();
</script>
<template>
  <form @submit.prevent="onPlay">
    <h2 class="text-center text-2xl my-6">Ingreso de jugadores</h2>
    <div class="max-w-[500px] mx-auto flex flex-col gap-y-4 py-6">
      <input
        type="text"
        placeholder="Jugador 1"
        name="jugador1"
        class="px-2 text-white border-white placeholder:text-gray-500 py-2 bg-transparent border"
      />
      <input
        type="text"
        placeholder="Jugador 2"
        name="jugador2"
        class="px-2 text-white border-white placeholder:text-gray-500 py-2 bg-transparent border"
      />
      <input
        type="text"
        placeholder="Jugador 3"
        name="jugador3"
        class="px-2 text-white border-white placeholder:text-gray-500 py-2 bg-transparent border"
      />
      <button class="bg-white text-black px-3 py-2 ">Empezar juego</button>
    </div>
  </form>
</template>
