let allPokemons = []
let tableauFin = []
const searchInp = document.querySelector('.recherche-poke input')
const listePoke = document.querySelector('.liste-poke')
const chargement = document.querySelector('.loader')

const types = {
    grass: '#78c850',
    ground: '#e2bf65',
    dragon: '#6f35fc',
    fire: '#f58271',
    electric: '#f7d02c',
    fairy: '#d685ad',
    poison: '#966da3',
    bug: '#b3f594',
    water: '#6390f0',
    normal: '#d8d5d8',
    psychic: '#f95587',
    dark: '#705746',
    flying: '#a98ff3',
    fighting: '#c25956',
    rock: '#b6a146',
    ghost: '#735797',
    ice: '#96d9d6',
    steel: '#89a1b0'
}

// On vient faire appel à l'API
function fetchPokemonBase() {
    // Je viens récupérer les 151 premiers pokémons
    fetch("https://pokeapi.co/api/v2/pokemon?limit=821")
    .then(reponse => reponse.json())
    .then((allPoke) => {
        console.log(allPoke)
        allPoke.results.forEach(pokemon => {
            fetchPokemonComplet(pokemon)
        })
    })
}
fetchPokemonBase()

function fetchPokemonComplet(pokemon) {
    let objPokemonFull = {}
    // On viendra stocker dans cet objet les données du pokémon : son nom, son image, son type.
    let url = pokemon.url
    let namePokemon = pokemon.name

    // Lorsque les données sont récupérées, on transforme la réponse du fetch dans un format JSON.
    fetch(url).then(reponse => reponse.json()).then((pokeData) => {
        console.log(pokeData)
        objPokemonFull.picture = pokeData.sprites.front_default
        objPokemonFull.id = pokeData.id
        objPokemonFull.type = pokeData.types[0].type.name
        
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${namePokemon}`)
        .then(reponse => reponse.json()) // On lit le corps de la réponse et on le transforme en JSON
        .then((pokeData) => {
            console.log(pokeData)
            objPokemonFull.name = pokeData.names[4].name
            allPokemons.push(objPokemonFull) // Une fois que notre objet Pokémon est complété, on rempli le tableau initialement vide qui va contenir tous nos pokémons

            if(allPokemons.length === 800) {
                tableauFin = allPokemons.sort((a,b) => {
                    return a.id - b.id
                })

                createCard(tableauFin)
                chargement.style.display = "none"
            }
        })
    })
}

// Création des cartes
function createCard(arr) {
    for(let i = 0; i < arr.length; i++) {
        const carte = document.createElement('li')
        let couleur = types[arr[i].type] // On vient chercher dans types, l'un des objets de notre tableau passé en paramètre et on y récupère le type.
        carte.style.background = couleur
        const textCarte = document.createElement('h5')
        textCarte.innerText = arr[i].name
        const idCarte = document.createElement('p')
        idCarte.innerText = `ID # ${arr[i].id}`
        const imgCarte = document.createElement('img')
        imgCarte.src = arr[i].picture

        carte.appendChild(imgCarte)
        carte.appendChild(textCarte)
        carte.appendChild(idCarte)

        listePoke.appendChild(carte)
    }
}