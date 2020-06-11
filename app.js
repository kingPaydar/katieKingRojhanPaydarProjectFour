// PSEUDOCODE

// user inputs pokemon index #

// gained access to API

// from there, we need to find which method we will use for the user to access data pool

// 

// pokemon index # used to pull iniformation from API and display inside pokedex viewport
// click events for number pad allowing user to input pokemon id #
// user sees number inputs in pokedex finder
// click "enter" submit button
// grabs pokemon information based on id # from number pad and finds pokemon with that id from API
// store specific items from API response into variables for use putting onto page
// displays: pokemon image, name, height, weight, type

const pokedexApp = {};
let pokemonId; 

let digits = [];  

// buttons for number pad 
$('.btn0').on('click', function () {
    pushNumber('0');
})

$('.btn1').on('click', function (){
    pushNumber('1');
})

$('.btn2').on('click', function () {
    pushNumber('2');
})

$('.btn3').on('click', function () {
    pushNumber('3');
})

$('btn4').on('click', function () {
    pushNumber('4');
})

$('.btn5').on('click', function () {
    pushNumber('5');
})

$('.btn6').on('click', function () {
    pushNumber('6');
})

$('.btn7').on('click', function () {
    pushNumber('7');
})

$('.btn8').on('click', function () {
    pushNumber('8');
})

$('.btn9').on('click', function () {
    pushNumber('9');
})

const pushNumber = function(number){
    if (digits.length === 3) {
        digits.shift();
    }
    digits.push(number);
}

// submit button concatenates array of string into single number

$('input').on('click', function(){
    pokemonId = digits.join('');
    // console.log(pokemonId); 
    return pokemonId; 
}); 


// might use later 
// $('.digitsDisplay').html(`
//     <p>1${digits.join()}</p>
//     <p>2${digits.join()}</p>
//     <p>3${digits.join()}</p>
//     `)

pokedexApp.url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;

pokedexApp.grabPokemon = $.ajax({
    url: pokedexApp.url,
    method: "GET",
    dataType: "JSON"
});

$(document).ready(function() {
    
    

    // console.log(pokedexApp.grabPokemon)

    pokedexApp.grabPokemon.then((result) => {
        console.log(result);
        pokedexApp.data = result;
     
    }).fail(() => {
        console.log("didn't work")

    });


    //           function listPokemon(pokemonNumber) {
    // return $.ajax({
    //     url: `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`,
    //     dataType: 'json',
    //     method: 'GET'
    // })



    




    // use variable to dive in for API data to access its images

    //       function listPokemon(pokemonNumber) {
    // return $.ajax({
    //     url: `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`,
    //     dataType: 'json',
    //     method: 'GET'
    // })

    // Darshana suggestion to go more in depth with our pseudocode

    // create a for loop to grab pokemon image



    // make placeholder for pokeImage and use template literals to pull in sprites???????????
    



});


