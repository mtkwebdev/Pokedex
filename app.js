const baseURL = 'https://pokeapi.co/api/v2/pokemon'
let id = []
let pokemonID 
let pokemon = {}
let pokemonArr = []
const pokemonDiv = document.querySelector('.pokemonList');
const backBtn = document.querySelector('.backBtn');
const forwardBtn = document.querySelector('.forwardBtn');
const pokemonName = document.querySelector('.pokemonName')
const pokemonId = document.querySelector('.pokemonId')
const pokemonType = document.querySelector('.pokemonType')
const pokemonWeight = document.querySelector('.pokemonWeight')
const PokemonHeight = document.querySelector('.PokemonHeight')
const pokemonFront = document.querySelector('.pokemonFront')
const pokemonBack = document.querySelector('.pokemonBack')

function fetchPokemonData (number){
    fetch(baseURL+`/${number}/`).then(res => {return res.json()}).then(res => {
        const PokemonName = res.name;
        const uppercasePokemonNames = PokemonName.charAt(0).toUpperCase(0)
        const slicePokemonNames = PokemonName.slice(1)
        pokemon.name = uppercasePokemonNames+slicePokemonNames
        pokemon.height = res.height+'cm';
        pokemon.weight = res.weight+'kg';
        pokemon.id = res.id;
        pokemon.type1 = res.types[0].type.name;
        pokemon.spritesFront = res.sprites.front_default;
        pokemon.spritesBack = res.sprites.back_default;

        pokemonName.innerHTML = pokemon.name
        pokemonId.innerHTML = pokemon.id
        pokemonType.innerHTML = pokemon.type1
        pokemonWeight.innerHTML = pokemon.weight
        PokemonHeight.innerHTML = pokemon.height
        pokemonFront.src = pokemon.spritesFront
        pokemonBack.src = pokemon.spritesBack

        console.log(
            pokemon.id,
            pokemon.name,
            pokemon.type1, 
            pokemon.height,
            pokemon.weight,
            // res
             )
    })
}

function addPokemonDataToScreen(){
    fetch(baseURL+'?offset=0&limit=150').then(res=> res.json()).then(res => {
        const pokemonList = res.results
        for (let i = 0; i < pokemonList.length; i++){
            const rangeOfPokemonNames = pokemonList[i].name
            const uppercasePokemonNames = rangeOfPokemonNames.charAt(0).toUpperCase(0)
            const slicePokemonNames = rangeOfPokemonNames.slice(1)
            const listPokemonNames = uppercasePokemonNames+slicePokemonNames
            const rangeOfPokemonIDs = i+1
            const pokemonEl = document.createElement('div')
            pokemonEl.innerHTML = `<div class="pokemonItem">${rangeOfPokemonIDs}. ${listPokemonNames}</div>`
            pokemonDiv.appendChild(pokemonEl) 
        }
    })
}

function idDown(){
    pokemonID--;
}
function idUp(){
    pokemonID++;
}

pokemonDiv.addEventListener('click',(e)=>{
        let selectedTarget = e.target.innerText
        let findTargetNumber = selectedTarget.split('. ')[0]
        const transformTargetToNumber = parseInt(findTargetNumber)
        id.push(transformTargetToNumber)[0];
        pokemonID = id[0]
        id = []
        // console.log(typeof(transformTargetToNumber))
})

window.addEventListener('click',(e)=>{
    if (e.target.className === 'backBtn'){
        idDown()
    }
    if (e.target.className === 'forwardBtn'){
        idUp()
    }
        fetchPokemonData(pokemonID)
})
addPokemonDataToScreen()

