// create namespacing
const pokedexApp = {};

// create array to hold individual button presses
pokedexApp.digits = [];

// create variable to hold pokemon ID selected by user
pokedexApp.pokemonId = 0;

// audio
let audioClicked = false; 

// init function
pokedexApp.init = function() {

    
}

$('#volumeToggle').on('click', function () {
    const themeMusic = document.getElementById('themeMusic');
    if (audioClicked === false) {
        themeMusic.play();
    } else {
        themeMusic.muted = !themeMusic.muted;
    }
    themeMusic.volume = 0.3;
    themeMusic.paused = false;

    audioClicked = true;

        $('i')
            .toggleClass('fa-volume-up')
            .toggleClass('fa-volume-mute');
})

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
        if (pokedexApp.digits.length === 3) {
            pokedexApp.digits.shift();
        }
        // add number to pokedexApp.digits
        pokedexApp.digits.push(number);

        // move values in the pokedexApp.digits divs to the left
        $('.digitLeft').text($('.digitCenter').text());
        $('.digitCenter').text($('.digitRight').text());
        $('.digitRight').text(number);
    };
    // pokemonRequest takes the id and adds it to the end point
    const pokemonRequest = (id) => {
        console.log(id);
        return `https://pokeapi.co/api/v2/pokemon/${id}/`;
    };


    $(".reset").on("click", function(event) {
        pokedexApp.digits = [];
        console.log(pokedexApp.digits);
        $('.digitsDisplay div').html('');
    });

    $(".enter").on("click", function (event) {
        // on next click on input clear out my returned pokemon array
        pokedexApp.pokemonStats = [];
        // build pokeUrl from pokemonRequest function
        pokedexApp.pokemonId = pokedexApp.digits.join("");
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
                // handles error if Pokemon ID number is too high
                if (pokedexApp.pokemonId > 807) {
                    $('.tooHighError')
                        .toggleClass('hidden')
                        .toggleClass('active')
                    Swal.fire({
                        title: "Hey Pokémon Trainer!",
                        text: "That Pokemon doesn't exist.\nPlease enter a number between 1 and 807.",
                    })
                    // alert("That Pokemon doesn't exist. Please enter a number between 1 and 807.")
                // handles error if 0 present befoe pokemon ID number
                } else if ((pokedexApp.digits[0] == 0) || (pokedexApp.digits[0] == 0 && pokedexApp.digits[1] == 0)) {
                    Swal.fire({
                        title: "Hey Pokémon Trainer!",
                        text: 'It looks like you entered "0" before your number.\n\nPlease try again with a number that does not start with "0".',
                    })
                }
            })
});
                // END OF ENTER BUTTON INPUT
            });
            $('.instructions').on('click', function (event) {
                Swal.fire({
                    title: `Welcome to your Pokedex!`,
                    text: `To view a Pokemon's information, use the number pad 
                            to input its ID number and then click "enter." Scroll where the Pokemon's 
                            information appears to view the entirety of your selected Pokemons stats. You can also press 
                            "clear" to reset your selection. Note: You must input a number 
                            between 1 – 807, and your number cannot start with 0.'`,
                })
        
                })


                // need to create swal alert --> ul --> li x 4 --> four imgs, four p tags? & four buttons
                // add mute icon inside our alert incase user no longer wants to hear audio **  
                // need to flex inside 
                // click event listener will be on four buttons (classes per button)
                // need to set up object of each town, title, image, p and audio file
                // set object (maybe use this for example this.(city) has audio property) 
                // next, the audio property will "play the audio file", or "show the image", etc

                


// https://stackoverflow.com/questions/6677035/jquery-scroll-to-element


function enableScroll(x) {
    $(".enter").click(function () {
    if (x.matches) { // If media query matches
            $([document.documentElement, document.body]).animate({
                scrollTop: $("section").offset().top
            }, 500);
            //// NEED TO FIGURE OUT HOW TO DISABLE SCROLL IN FULL SCREEN! 
        } else if (fullScreen.matches){
            $([document.documentElement, document.body]).animate({
                scrollTop: $(".pokedexTop").offset().top
            }, 0);
        }

    }); 
}

const fullScreen = window.matchMedia("(max-width: 1280px)")
const tablet = window.matchMedia("(max-width: 855px)")
enableScroll(tablet) // Call listener function at run time
tablet.addListener(enableScroll) // Attach listener function on state changes 


