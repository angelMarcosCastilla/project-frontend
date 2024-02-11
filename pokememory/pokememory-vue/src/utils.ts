export const getPokemon = async (
  pokemonId: number
): Promise<{ name: string; img: string }> => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then((res) => res.json())
    .then((pokemon) => {
      return {
        name: pokemon.name,
        img: pokemon.sprites.front_default,
      };
    });
};

export const sortedPokemons = (pokemons: any) => {
  return pokemons.toSorted(() => Math.random() - 0.5)
}