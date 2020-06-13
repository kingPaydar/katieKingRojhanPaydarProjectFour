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

// initialize text for digit divs
$('.digitLeft').text(0);
$('.digitCenter').text(0);
$('.digitRight').text(0);

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
    $(".btn4").on("click", function () {
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
        // remove first digit if length already 3
        if (digits.length === 3) {
            digits.shift();
        }
        // add number to digits
        digits.push(number);

        // move values in the digits divs to the left
        $('.digitLeft').text($('.digitCenter').text());
        $('.digitCenter').text($('.digitRight').text());
        $('.digitRight').text(number);
    };
    // pokemonRequest takes the id and adds it to the end point
    const pokemonRequest = (id) => {
        console.log(id);
        return `https://pokeapi.co/api/v2/pokemon/${id}/`;
    };

    // const pokemonName = (pokemonRequest) => {
    //     return `https://pokeapi.co/api/v2/pokemon/${}/`
    // }

    $(".reset").on("click", function(event) {
        digits = [];
        $('.digitsDisplay div').html('');
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
            .then(({ name, weight, height, types, id, sprites }) => {
                // console.log(name, weight, id, sprites);
                pokedexApp.pokemonStats.push({
                    name: name,
                    weight: weight,
                    height: height,
                    types: types,
                    id: id,
                    sprites: sprites,
                });
                // add name, height, weight of selected pokemon
                $('.pokedexInfo').html (`
                    <p>Name: ${pokedexApp.pokemonStats[0].name}</p>
                    <p>Height: ${pokedexApp.pokemonStats[0].height}</p>
                    <p>Weight: ${pokedexApp.pokemonStats[0].weight}</p>
                `)
                // stores pokemon type array
                pokedexApp.pokemonTypes = pokedexApp.pokemonStats[0].types
                // renders pokemon image to the site
                $('.pokemonImage').html(`
                <img src="${pokedexApp.pokemonStats[0].sprites.front_default}">
                `)
                // checks if pokemon has 2 types & adds to page
                if (pokedexApp.pokemonTypes.length === 2) {
                    $('.pokedexInfo').append(`
                    <p>Type: ${pokedexApp.pokemonStats[0].types[0].type.name}, ${pokedexApp.pokemonStats[0].types[1].type.name}</p>
                    `);
                // check if pokemon has 1 type & adds to page
                } else if (pokedexApp.pokemonTypes.length === 1) {
                    $('.pokedexInfo').append(`
                    <p>Type: ${pokedexApp.pokemonStats[0].types[0].type.name}</p>
                    `)

                }

            })
            // throws error message if API request unsuccessful
            .fail((error) => {
                console.log("didn't work", error);
            });

            // testing out the below "instructions" button !!!! *******
            $('.instructions').on('click', function(event){
                console.log('hello');
                $('.show').html(`
                    <p>Hello!</p>
                `)
            })

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