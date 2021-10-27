
// let range1 = 1;
// let range2 = 150;
// const rangeURL = `?limit=${range1}&offset=${range2}`

const baseURL = 'https://pokeapi.co/api/v2/pokemon'
let id = []
let pokemonID 
let pokemon = {}
let pokemonArr = []
const pokemonDiv = document.querySelector('.pokemonList');

const backBtn = document.querySelector('.backBtn');
const forwardBtn = document.querySelector('.forwardBtn');

function fetchPokemonData (number){
    fetch(baseURL+`/${number}/`).then(res => {return res.json()}).then(res => {
        pokemon.name = res.name;
        pokemon.height = res.height+'cm';
        pokemon.weight = res.weight+'kg';
        pokemon.id = res.id;
        pokemon.type1 = res.types[0].type.name;
        // pokemon.type2 = res.types[1].type.name;
        pokemon.spritesFront = res.sprites.front_default;
        pokemon.spritesBack = res.sprites.back_default;
        console.log(
            pokemon.id,
            pokemon.name,
            pokemon.type1, 
            // pokemon.type2,
            pokemon.height,
            pokemon.weight,
            res
             )
        // console.log(results)
        // console.log(res)
    })
}

function capitalise(word){
    word.charAt(0).toUpperCase()
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
    // console.log(pokemonID)
}
function idUp(){
    pokemonID++;
    // console.log(pokemonID)
}

pokemonDiv.addEventListener('click',(e)=>{
    // function handleSelectedNumbers (e){
        let selectedTarget = e.target.innerText
        let findTargetNumber = selectedTarget.split('. ')[0]
        const transformTargetToNumber = parseInt(findTargetNumber)
        id.push(transformTargetToNumber)[0];
        pokemonID = id[0]
        id = []
        console.log(typeof(transformTargetToNumber))
        // console.log(pokemonID)
        // }
    // console.log(pokemonID)
})

window.addEventListener('click',(e)=>{
    if (e.target.className === 'backBtn'){
        idDown()
    }
    if (e.target.className === 'forwardBtn'){
        idUp()
    }
        fetchPokemonData (pokemonID)
})
addPokemonDataToScreen()
