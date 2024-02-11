<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import ModalWinner from "./ModalWinner.vue";
import FormJugadores from "./FormJugadores.vue";
import Card from "./Card.vue";
import { usePokemons } from "../composables/usepokemons";
const pokemons = usePokemons();
const pokemonsFind = reactive<{ position: number; player: number }[]>([]);
const selectedPokemon = ref<number[]>([]);
const winner = ref<any>(null);
const playerTurn = ref<number>(1);
const playerName = ref<string[]>([]);

const changeturn = () => {
  const MAX_PLAYER = playerName.value.length;
  playerTurn.value = playerTurn.value === MAX_PLAYER ? 1 : playerTurn.value + 1;
};

const handleSelected = (indexSelected: number) => {
  if (
    selectedPokemon.value.length === 2 ||
    selectedPokemon.value.includes(indexSelected) ||
    hasFindPokemons(indexSelected)
  ) {
    return;
  }

  selectedPokemon.value = [...selectedPokemon.value, indexSelected];
};

watch(selectedPokemon, () => {
  if (selectedPokemon.value.length === 2) {
    setTimeout(() => {
      const [firstIndexSelected, secondIndexSelected] = selectedPokemon.value;

      if (
        pokemons.value[firstIndexSelected].name ===
        pokemons.value[secondIndexSelected].name
      ) {
        pokemonsFind.push(
          { player: playerTurn.value, position: firstIndexSelected },
          { player: playerTurn.value, position: secondIndexSelected }
        );
      } else {
        changeturn();
      }
      selectedPokemon.value = [];
    }, 800);
  }
});

watch(pokemonsFind, () => {
  if (pokemons.value.length === pokemonsFind.length) {
    const board: Record<
      string,
      {
        win: number;
        player: string;
      }
    > = {};

    pokemonsFind.forEach(({ player }) => {
      const name = playerName.value[player - 1];
      board[player] ??= { player: name, win: 0 };
      board[player] = { ...board[player], win: board[player].win + 1 };
    });
    winner.value = Object.values(board).sort((a, b): any => b.win - a.win)[0];
  }
});

const resetPlay = () => {
  location.reload();
};

const hasFindPokemons = (index: number): string | null => {
  const hasPokemon = pokemonsFind.find((pokemon) => pokemon.position === index);
  if (hasPokemon) return `animaterotate opacity-50`;
  return null;
};

watch(playerTurn, () => {
  const synthesis = window.speechSynthesis;

  const utterance = new SpeechSynthesisUtterance(
    `turno de   ${playerName.value[playerTurn.value - 1]}`
  );
  utterance.volume = 100;
  utterance.lang = "es-ES";

  // Hablar el texto
  synthesis.speak(utterance);
});

const onPlay = (e: any) => {
  const data = Object.fromEntries(new FormData(e.target));
  const playerList = Object.values(data).filter(Boolean);

  if (playerList.length < 2) {
    alert("Falta jugadores");
    return;
  }
  playerName.value = playerList as string[];
};
</script>

<template>
  <FormJugadores :onPlay="onPlay" v-if="playerName.length <= 1" />
  <div class="max-w-[1200px] w-4/5 mx-auto" v-if="playerName.length > 1">
    <div class="flex justify-center gap-x-6 py-2 mb-4">
      <span
        v-for="(player, index) in playerName"
        :class="[
          'border border-slate-200 px-3 py-2 ',
          playerTurn === index + 1 ? 'bg-slate-200 text-black' : '',
        ]"
        >{{ player }}</span
      >
    </div>
    <ul class="grid grid-cols-5 gap-4">
      <Card
        v-for="(pokemon, index) in pokemons"
        :pokemon="pokemon"
        :class="[
          selectedPokemon.includes(index) ? 'animaterotate' : '',
          hasFindPokemons(index),
        ]"
        @click="handleSelected(index)"
      />
    </ul>
  </div>
  <ModalWinner v-if="winner" :winner="winner" :new-play="resetPlay" />
</template>
