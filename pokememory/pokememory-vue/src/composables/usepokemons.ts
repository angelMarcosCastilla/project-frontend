import { onMounted, ref, } from "vue";
import { getPokemon, sortedPokemons } from "../utils";

const MAX_EVEN = 10
const MAX_ID_POKEMON = 125

export const usePokemons = () => {
  const pokemonList = ref<{ name: string; img: string }[]>([]);

  onMounted(() => {
    const numbersRandon = Array.from({ length: MAX_EVEN }).map(() =>
      Math.ceil(Math.random() * MAX_ID_POKEMON)
    );

    const pokemonArrPromises = numbersRandon.map((idpokemon) =>
      getPokemon(idpokemon)
    );

    Promise.all(pokemonArrPromises).then((data) => {
      pokemonList.value = sortedPokemons([...data, ...data]);
    });
  });

  return pokemonList
};
