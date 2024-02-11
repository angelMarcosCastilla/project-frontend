<script setup lang="ts">
import CanvasConfetti from "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/+esm";
import { onMounted } from "vue";
const props = defineProps<{
  winner: any;
  newPlay: any;
}>();

onMounted(() => {
  CanvasConfetti();
  const synthesis = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(
    `El ganador fue ${props.winner?.player}`
  );
  utterance.volume = 100;
  utterance.lang = "es-ES";

  // Hablar el texto
  synthesis.speak(utterance);
});
</script>

<template>
  <div
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity"
    ></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          class="relative transform overflow-hidden rounded-lg bg-slate-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div class="bg-slate-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="">
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h2>JUGADOR {{ winner?.player }}</h2>
                <p>Pares: {{ winner?.win / 2 }}</p>
              </div>
              <button
                class="bg-slate-200 text-black rounded px-3 py-2 mt-4"
                @click="newPlay"
              >
                Jugar Otra vez
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
