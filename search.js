const APICALL = "https://pokeapi.co/api/v2/pokemon/"
const recherche = document.querySelector(".recherche-poke")
const affichage = document.querySelector(".liste-poke")
const inpRecherche = document.getElementById("recherche")
const loader = document.querySelector(".loader")

loader.style.display = "none"

// Création d'une fonction asynchrone
async function dataPokemon(pokemon) {
    affichage.innerHTML = ""
    try {
        const reponse = await fetch(`${APICALL}${pokemon}`)
        const data = await reponse.json()
        console.log(data)

        creationCarte(data)
      } catch (e) {
        loader.style.display = "none"
        affichage.innerHTML = `<h5>Erreur: Pokémon introuvable<h5>`
      }
}

// Affichage de la carte d'utilisateur
function creationCarte(pokemon) {
    const carteHTML = `
        <li class="picture"><img src="${pokemon.sprites.front_default}"></li>
        <li class="name"><h5>${pokemon.name.capitalize()}</h5></li>
        <li class="id">#${pokemon.id}</li>
    `

    affichage.innerHTML = carteHTML

    loader.style.display = "none"
}

// Formulaire pour entrer le nom
recherche.addEventListener('submit', (e) => {
    e.preventDefault()
    if (inpRecherche.value === "69420") {
        affichage.innerHTML = `<h5>GET RICKROLL'D<h5>
        <video src="mp4.mp4" autoplay loop></video>
        `
        inpRecherche.value = ""
        loader.style.display = "none"
        return
    }

    if(inpRecherche.value.length > 0) {
        dataPokemon(inpRecherche.value)
        inpRecherche.value = ""
        loader.style.display = "flex"
    }
})

// Met en majuscule la première lettre du Pokémon
Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});