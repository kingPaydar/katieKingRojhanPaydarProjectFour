// create namespacing
const pokedexApp = {};

// create array to hold individual button presses
pokedexApp.digits = [];

// create variable to hold pokemon ID selected by user
pokedexApp.pokemonId = 0;

// set audio to false on page load
pokedexApp.audioClicked = false; 

// turn audio on and off with button click
pokedexApp.volumeToggle = function() {
    $('#volumeToggle').on('click', function () {
    pokedexApp.themeMusic = document.getElementById('themeMusic');
    if (pokedexApp.audioClicked === false) {
        pokedexApp.themeMusic.play();
    } else {
        pokedexApp.themeMusic.muted = !pokedexApp.themeMusic.muted;
    }

    // set audio volume
    pokedexApp.themeMusic.volume = 0.3;
    pokedexApp.themeMusic.paused = false;

    // change audio to "on"
    pokedexApp.audioClicked = true;

    // change favicon to indicate audio status
    $('i')
        .toggleClass('fa-volume-up')
        .toggleClass('fa-volume-mute');
})}

// pikachu audio plays when user clicks on names in footer

const pikachu = document.getElementById('pikachu');

$(document).ready(function () {
    $('.pikachu').click(function () {
        pikachu.play();
        return false;
    });
});


// add number to digits array on button click
pokedexApp.numberClick = function () {

    $(".btn0").on("click", function () {
        pokedexApp.pushNumber("0");
    });

    $(".btn1").on("click", function () {
        pokedexApp.pushNumber("1");
    });

    $(".btn2").on("click", function () {
        pokedexApp.pushNumber("2");
    });

    $(".btn3").on("click", function () {
        pokedexApp.pushNumber("3");
    });

    $(".btn4").on("click", function () {
        pokedexApp.pushNumber("4");
    });

    $(".btn5").on("click", function () {
        pokedexApp.pushNumber("5");
    });

    $(".btn6").on("click", function () {
        pokedexApp.pushNumber("6");
    });

    $(".btn7").on("click", function () {
        pokedexApp.pushNumber("7");
    });

    $(".btn8").on("click", function () {
        pokedexApp.pushNumber("8");
    });

    $(".btn9").on("click", function () {
        pokedexApp.pushNumber("9");
    });
}

// function to check length of digits array and adjust for new number pad input
pokedexApp.pushNumber = function (number) {

    // remove first digit if length already 3
    if (pokedexApp.digits.length === 3) {
        pokedexApp.digits.shift();
    };

    // add number to pokedexApp.digits
    pokedexApp.digits.push(number);

    // move values in the pokedexApp.digits divs to the left
    $('.digitLeft').text($('.digitCenter').text());
    $('.digitCenter').text($('.digitRight').text());
    $('.digitRight').text(number);
};

// pokemonRequest takes the id and adds it to the end point
pokedexApp.pokemonRequest = (id) => {
    return `https://pokeapi.co/api/v2/pokemon/${id}/`;
};

// clear digits display and digits array on reset click
pokedexApp.resetClick = function () {
    $(".reset").on("click", function(event) {
        pokedexApp.digits = [];
        console.log(pokedexApp.digits);
        $('.digitsDisplay div').html('');
    });
}

// sent request to API on enter click
pokedexApp.enterClick = function () {

    $(".enter").on("click", function (event) {

        // on subsequent click of enter button, clear out returned  pokemon array
        pokedexApp.pokemonStats = [];

        // build pokeUrl from pokemonRequest function
        pokedexApp.pokemonId = pokedexApp.digits.join("");
        pokedexApp.pokeUrl = pokedexApp.pokemonRequest(pokedexApp.pokemonId);

        // set the result of the ajax request to pokedexApp
        pokedexApp.request = $.ajax({
            url: pokedexApp.pokeUrl,
            method: "GET",
            dataType: "JSON",
        });

        // destructure resulting info from API into object
        pokedexApp.request
            .then(({ name, weight, height, types, id, sprites }) => {
                pokedexApp.pokemonStats.push({
                    name: name,
                    weight: weight,
                    height: height,
                    types: types,
                    id: id,
                    sprites: sprites,
                });

                // add name, height, weight of selected pokemon to info display
                $('.pokedexInfo').html (`
                    <p>Name: ${pokedexApp.pokemonStats[0].name}</p>
                    <p>Height: ${pokedexApp.pokemonStats[0].height}m</p>
                    <p>Weight: ${pokedexApp.pokemonStats[0].weight}kg</p>
                `)
                
                // renders pokemon image to the site
                $('.pokemonImage').html(`
                <img src="${pokedexApp.pokemonStats[0].sprites.front_default}">
                `)
                
                // stores pokemon type array
                pokedexApp.pokemonTypes = pokedexApp.pokemonStats[0].types

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

            .fail((error) => {

                // handles error if Pokemon ID number is too high
                if (pokedexApp.pokemonId > 807) {
                    Swal.fire({
                        title: "Hey Pokémon Trainer!",
                        text: "That Pokemon doesn't exist.\nPlease enter a number between 1 and 807.",
                    })

                // handles error if 0 present befoe pokemon ID number
                } else if ((pokedexApp.digits[0] == 0) || (pokedexApp.digits[0] == 0 && pokedexApp.digits[1] == 0)) {
                    Swal.fire({
                        title: "Hey Pokémon Trainer!",
                        text: 'It looks like you entered "0" before your number.\nPlease try again with a number that does not start with "0".',
                    })
                }
            })
    }
    )
}; 

//  alert when instructions clicked
pokedexApp.instructionsClick = function () {
    $('.instructions').on('click', function (event) {
        Swal.fire({
            title: `Welcome to your Pokedex!`,
            text: `To view a Pokemon's information, use the number pad to input its ID number and then click "enter." Scroll where the Pokemon's information appears to view the entirety of your selected Pokemons stats. You can also press "clear" to reset your selection. Note: You must input a number between 1 – 807, and your number cannot start with 0.'`,
        })
    })
}

// enable scroll to top on enter click
pokedexApp.enableScroll = function () {
    $(".enter").click(function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("section").offset().top
        }, 500);
    });
}

// init function
pokedexApp.init = function () {
    pokedexApp.volumeToggle();
    pokedexApp.numberClick();
    pokedexApp.pushNumber();
    pokedexApp.pokemonRequest();
    pokedexApp.resetClick();
    pokedexApp.enterClick();
    pokedexApp.instructionsClick();
    pokedexApp.enableScroll();
}

// run when document ready
$(document).ready(function () {
    pokedexApp.init();
});