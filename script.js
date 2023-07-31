const pokemonTypeColors = {
  bug: "#00DFA2",
  dragon: "#CD1818",
  electric: "#F2BE22",
  fairy: "#94DAFF",
  fighting: "#890F0D",
  fire: "#FF5403",
  flying: "#213363",
  grass: "#8EAC50",
  ground: "#6C3428",
  ghost: "#BDF2D5",
  ice: "#90AEFF",
  normal: "#FCC8D1",
  poison: "#982176",
  psychic: "#461959",
  rock: "#EAC696",
  water: "#0079FF",
};

const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
const pokemonCard = document.getElementById("card");
const generateButton = document.getElementById("btn");

let getPokemonData = () => {
  // Generate a random number between 1 and 150
  let randId = Math.floor(Math.random() * 150) + 1;
  // Combine the PokeApi Url with the random Id generated
  const finalApiUrl = apiUrl + randId;
  // Fetch the data using the final Api Url
  fetch(finalApiUrl)
    .then((response) => response.json())
    .then((data) => {
      generatePokemonCard(data);
    });
};

// Generate Pokemon Card
let generatePokemonCard = (data) => {
  // Get necessary data and assign it to variables
  console.log(data);
  const hp = data.stats[0].base_stat;
  // console.log(hp);
  const imgSrc = data.sprites.other.dream_world.front_default;
  console.log(imgSrc);
  const pokemonName = data.name[0].toUpperCase() + data.name.slice(1);
  // console.log(pokemonName);
  const statAttack = data.stats[1].base_stat;
  // console.log(statAttack);
  const statDefence = data.stats[2].base_stat;
  const statSpeed = data.stats[5].base_stat;
  const order = data.order;
  // console.log(`Order: ${order}`);
  const height = data.height;
  // console.log(`height: ${height}`);
  const weight = data.weight;
  // console.log(`weight: ${weight}`);
  const typeName = data.types[0].type.name;
  // console.log(typeName);

  // Set themeColor based on the pokemon Type
  const themeColor = pokemonTypeColors[typeName];
  console.log(themeColor);

  pokemonCard.innerHTML = `
    <p class="hp">
      <span>HP</span>
      ${hp}
    </p>
    <p class="order">
      <span>Order</span>
      ${order}
    </p>

    <img src=${imgSrc} alt=${pokemonName}/>
    <h2 class="poke-name">${pokemonName}</h2>
    <div class="types">

    </div>
    <div class="stats">
      <div class="top-row">
          <div class="attack stat">
              <h3>${statAttack}</h3>
              <p>Attack</p>
          </div>
          <div class="defence stat">
              <h3>${statDefence}</h3>
              <p>Defence</p>
          </div>
          <div class="speed stat">
            <h3>${statSpeed}</h3>
            <p>Speed</p>
          </div>
      </div>
      <div class="bottom-row">
          <div class="height stat">
              <h3>${height}</h3>
              <p>Height</p>
          </div>
          <div class="weight stat">
              <h3>${weight}</h3>
              <p>Weight</p>
          </div>
          
      </div>

    </div>
  `;
  appendTypes(data.types);
  cardStyles(themeColor);
};

let appendTypes = (types) => {
  types.forEach((item) => {
    let span = document.createElement("SPAN");
    span.textContent = item.type.name;

    document.querySelector(".types").appendChild(span);
  });
};

let cardStyles = (color) => {
  pokemonCard.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #fff 36%)`;
  pokemonCard.querySelectorAll(".types span").forEach((typeColor) => {
    typeColor.style.backgroundColor = color;
  });
};

generateButton.addEventListener("click", getPokemonData);
window.addEventListener("load", getPokemonData);
