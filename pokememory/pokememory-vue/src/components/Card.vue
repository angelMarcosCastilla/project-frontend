<script setup lang="ts">
defineProps<{
  pokemon: any;
}>();
</script>
<template>
  <div class="flip-container">
    <div class="card">
      <div class="front bg-slate-900">
        <img
          src="/pokebola.png"
          class="w-[130px] aspect-square"
          alt="image pokebola"
        />
      </div>
      <div class="back bg-slate-700">
        <img :src="pokemon.img" alt="" />
      </div>
    </div>
  </div>
</template>

<style>
.flip-container {
  background-color: transparent;
  height: 150px;
  perspective: 1200px;
}
.card {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 1s;
  transform-style: preserve-3d;
}
.animaterotate .card {
  transform: rotateY(180deg);
}
.front,
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
}

.back {
  color: white;
  transform: rotateY(180deg);
}
</style>
