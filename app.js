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
pokedexApp.pokemonId = 0;
let digits = [];
$(document).ready(function () {
    // buttons for number pad
    $(".btn0").on("click", function () {
        pushNumber("0");
    });
    $(".btn1").on("click", function () {
        pushNumber("1");
    });
    $(".btn2").on("click", function () {
        pushNumber("2");
    });
    $(".btn3").on("click", function () {
        pushNumber("3");
    });
    $("btn4").on("click", function () {
        pushNumber("4");
    });
    $(".btn5").on("click", function () {
        pushNumber("5");
    });
    $(".btn6").on("click", function () {
        pushNumber("6");
    });
    $(".btn7").on("click", function () {
        pushNumber("7");
    });
    $(".btn8").on("click", function () {
        pushNumber("8");
    });
    $(".btn9").on("click", function () {
        pushNumber("9");
    });
    const pushNumber = function (number) {
        console.log(number);
        if (digits.length === 3) {
            digits.shift();
        }
        digits.push(number);
    };
    // pokemonRequest takes the id and adds it to the end point
    const pokemonRequest = (id) => {
        console.log(id);
        return `https://pokeapi.co/api/v2/pokemon/${id}/`;
    };

    // WE WILL WORK ON THIS SATURDAY --> WE NEED TO EXTRACT THE IMAGE FROM OUR API ONTO THE POKEDEX SCREEN! ********** 
    $('.pokemonImage').html(`
        <img src="${pokemonRequest.sprites}">
        `)

    $(".reset").on("click", function(event) {
        digits.pop();
        digits.pop();
        digits.pop();
    });

    $(".enter").on("click", function (event) {
        // on next click on input clear out my returned pokemon array
        pokedexApp.pokemonStats = [];
        // build pokeUrl from pokemonRequqest function
        pokedexApp.pokemonId = digits.join("");
        pokedexApp.pokeUrl = pokemonRequest(pokedexApp.pokemonId);
        console.log(pokedexApp);
        // set the result of the ajax request to pokedexApp
        pokedexApp.request = $.ajax({
            url: pokedexApp.pokeUrl,
            method: "GET",
            dataType: "JSON",
        });
        // THEN DO THIS
        pokedexApp.request
            .then(({ name, weight, id, sprites }) => {
                // console.log(name, weight, id, sprites);
                pokedexApp.pokemonStats.push({
                    name: name,
                    weight: weight,
                    id: id,
                    sprites: sprites,
                });
            })
            .fail((error) => {
                console.log("didn't work", error);
            });
        // END OF ENTER BUTTON INPUT
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