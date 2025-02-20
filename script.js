const url = "https://pokeapi.co/api/v2/";

const colorForm = document.querySelector(".color");

colorForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const colorSelection = document.querySelector(".color__selection").value;
  await getPokemonSpecies(colorSelection);
});

async function getPokemonSpecies(userColorInput) {
  try {
    const response = await axios.get(`${url}pokemon-color/${userColorInput}`);
    const pokeSpecies = response.data.pokemon_species;
    const randomNumber = Math.floor(Math.random() * pokeSpecies.length);
    const randomPokemon = pokeSpecies[randomNumber];
    const pokemonResponse = await axios.get(
      `${url}pokemon/${randomPokemon.name}`
    );
    const pokemonImage = pokemonResponse.data.sprites.front_default;
    randomPokemon.image = pokemonImage;

    populateSpeciesContainer(randomPokemon);
  } catch (error) {
    console.error(error);
  }
}

function populateSpeciesContainer(pokemonObject) {
  const speciesContainer = document.querySelector(".pokemon");
  const pokemonContainer = document.createElement("div");

  const pokeNameElement = document.createElement("p");
  pokeNameElement.textContent = pokemonObject.name;
  pokemonContainer.appendChild(pokeNameElement);

  const pokeImageElement = document.createElement("img");
  pokeImageElement.src = pokemonObject.image;
  pokemonContainer.appendChild(pokeImageElement);

  speciesContainer.replaceChildren(pokemonContainer);
}
