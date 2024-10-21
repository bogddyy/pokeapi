document.addEventListener("DOMContentLoaded", fetchPokemonData);

async function fetchPokemonData() {
  const pokemonList = document.getElementById("pokemon-list");

  try {
    const totalPokemonCount = 1010; // Numărul total de pokemoni
    const randomIds = new Set();

    // Generare ID-uri aleatorii
    while (randomIds.size < 10) {
      const randomId = Math.floor(Math.random() * totalPokemonCount) + 1;
      randomIds.add(randomId);
    }

    // Fetch pentru fiecare pokemon cu un ID aleatoriu
    const pokemonPromises = [...randomIds].map((id) =>
      fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${id}`)
    );

    const pokemons = await Promise.all(pokemonPromises);

    // Creare carduri pentru fiecare pokemon
    pokemons.forEach((pokemon) => {
      const pokemonCard = createPokemonCard(pokemon);
      pokemonList.appendChild(pokemonCard);
    });
  } catch (error) {
    console.error("Error fetching pokemon data:", error);
  }
}

async function fetchPokemonDetails(url) {
  const response = await fetch(url);
  return await response.json();
}

function createPokemonCard(pokemon) {
  const card = document.createElement("div");
  card.classList.add("pokemon-card");

  const nameLabel = document.createElement("p");
  nameLabel.textContent = "Nume";

  const name = document.createElement("h2");
  name.textContent = capitalizeFirstLetter(pokemon.name);

  card.appendChild(nameLabel);
  card.appendChild(name);

  const info = document.createElement("div");
  info.classList.add("pokemon-info");

  function createLabeledCircle(value, label, className) {
    const container = document.createElement("div");
    container.style.textAlign = "center";

    const labelElement = document.createElement("p");
    labelElement.textContent = label;
    labelElement.style.margin = "0";

    const circle = document.createElement("div");
    circle.classList.add("circle", className);
    circle.textContent = value;

    container.appendChild(labelElement);
    container.appendChild(circle);

    return container;
  }

  const heightCircle = createLabeledCircle(
    pokemon.height,
    "Înălțime",
    "height-circle"
  );
  const weightCircle = createLabeledCircle(
    pokemon.weight,
    "Greutate",
    "weight-circle"
  );

  info.appendChild(heightCircle);
  info.appendChild(weightCircle);

  const abilitiesLabel = document.createElement("p");
  abilitiesLabel.textContent = "Abilități:";
  abilitiesLabel.style.fontWeight = "bold";

  const abilitiesList = document.createElement("ul");
  abilitiesList.classList.add("abilities");

  pokemon.abilities.forEach((ability) => {
    const abilityItem = document.createElement("li");
    abilityItem.textContent = capitalizeFirstLetter(ability.ability.name);
    abilitiesList.appendChild(abilityItem);
  });

  card.appendChild(info);
  card.appendChild(abilitiesLabel);
  card.appendChild(abilitiesList);

  return card;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
