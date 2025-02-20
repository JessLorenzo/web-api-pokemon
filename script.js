const url = "https://pokeapi.co/api/v2/";

const colorForm = document.querySelector(".color");

colorForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const colorSelection = document.querySelector(".color__selection");
  await getPokemonSpecies(colorSelection.value);
});

async function getPokemonSpecies(userColorInput) {
  try {
    const response = await axios.get(`${url}pokemon-color/${userColorInput}`);
    const pokeSpecies = response.data.pokemon_species;
    console.log(pokeSpecies);
    const randomNumber = Math.floor(Math.random() * pokeSpecies.length);
    const randomPokemon = pokeSpecies[randomNumber];
    console.log(randomPokemon);
    const pokemonResponse = await axios.get(
      `${url}pokemon/${randomPokemon.name}`
    );
    console.log(pokemonResponse);
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
  pokemonContainer.classList.add("pokemon__container");

  const pokeImageElement = document.createElement("img");
  pokeImageElement.src = pokemonObject.image;
  pokeImageElement.classList.add("pokemon__image");
  pokemonContainer.appendChild(pokeImageElement);

  const pokeNameElement = document.createElement("p");
  pokeNameElement.textContent = pokemonObject.name;
  pokeNameElement.classList.add("pokemon__name");
  pokemonContainer.appendChild(pokeNameElement);

  speciesContainer.replaceChildren(pokemonContainer);
}
