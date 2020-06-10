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

$(document).ready(function() {
    
    const pokedexApp = {};
    
    pokedexApp.url = `https://pokeapi.co/api/v2/pokemon/1/`;
    
    pokedexApp.grabPokemon = $.ajax({
        url: pokedexApp.url,
        method: "GET",
        dataType: "JSON"
    });

    console.log(pokedexApp.grabPokemon)

    pokedexApp.grabPokemon.then((result) => {
        console.log(result);
        pokedexApp.data = result;
    }, (fail) => {
        console.log("didn't work")
    })

    // use variable to dive in for API data to access its images

    //       function listPokemon(pokemonNumber) {
    // return $.ajax({
    //     url: `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`,
    //     dataType: 'json',
    //     method: 'GET'
    // })

    // Darshana suggestion to go more in depth with our pseudocode

    // create a for loop to grab pokemon image
}


    // make placeholder for pokeImage and use template literals to pull in sprites???????????
    

    $('div').html();

})


