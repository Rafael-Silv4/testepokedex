

function convertPokemonToLi(pokemon) {
return `
        <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
                <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                alt="${pokemon.name}">
        </div>
        </li>
`
}

function loadPokemonItens(offset, limit) {
pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml;
document.querySelectorAll(".pokemons").forEach((pokemonElement) => {
        pokemonElement.addEventListener("click",()=> {
                const name = pokemonElement.getAttribute("data-name");
                const number = pokemonElement.getAttribute("data-number");
                        modalcontent.innerHTML = `
                        <h2>#${number} - ${name}</h2>`
                        pokemonModal.style.display = "flex"
                window.addEventListener("click",(event) => {
                        if(event.target === pokemonModal){
                                pokemonModal.display="none";
                        }
                })
        });
        });
});
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
offset += limit
const qtdRecordsWithNexPage = offset + limit

if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
} else {
        loadPokemonItens(offset, limit)
}
})



