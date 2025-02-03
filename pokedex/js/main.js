function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
                <ol class="types">
                ${pokemon.types
                  .map((type) => `<li class="type ${type}">${type}</li>`)
                  .join("")}
                </ol>

                <img src="${pokemon.photo}"
                alt="${pokemon.name}">
        </div>
        </li>
`;
}

const pokemonModal = document.getElementById("pokemonModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

// Função para abrir o modal
function openModal(pokemon) {
  modalContent.innerHTML = `
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.photo}" alt="${pokemon.name}">
    <p>Número: #${pokemon.number}</p>
  `;
  pokemonModal.style.display = "flex"; // Exibe o modal
}

// Fechar o modal ao clicar no botão de fechar
closeModal.addEventListener("click", () => {
  pokemonModal.style.display = "none";
});

// Fechar o modal ao clicar fora dele
window.addEventListener("click", (event) => {
  if (event.target === pokemonModal) {
    pokemonModal.style.display = "none";
  }
});

// Adicionando evento de clique nos Pokémon
document.getElementById("pokemonList").addEventListener("click", (event) => {
  const pokemonElement = event.target.closest(".pokemon"); // Captura o elemento da lista clicado

  if (pokemonElement) {
    const name = pokemonElement.querySelector(".name").textContent;
    const number = pokemonElement
      .querySelector(".number")
      .textContent.replace("#", "");
    const imgSrc = pokemonElement.querySelector("img").src;

    openModal({ name, number, photo: imgSrc });
  }
});

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
    document.querySelectorAll(".pokemons").forEach((pokemonElement) => {
      pokemonElement.addEventListener("click", () => {
        const name = pokemonElement.getAttribute("data-name");
        const number = pokemonElement.getAttribute("data-number");
        modalcontent.innerHTML = `
                        <h2>#${number} - ${name}</h2>`;
        pokemonModal.style.display = "flex";
        window.addEventListener("click", (event) => {
          if (event.target === pokemonModal) {
            pokemonModal.display = "none";
          }
        });
      });
    });
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
