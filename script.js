//TODO: want to eventually add health bar and functionality. when
// user guesses wrong mega man's health will go down.
// successive match will grant health to player and wrong guesses will
// decrement health.

// come up with way to insert game over song when player loses and
// victory song when player wins!


// GLOBAL VARIABLES
var first_card = null;
var second_card = null;
var total_possible_matches = 9;
var match_counter = 0;
var canClick = true;
var card_flip_timer = null;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
var game_timer = null;


// ----------------------------- DISPLAY STATS ------------------------------- //
function display_stats() {
    $('.games-played .value').html(games_played);
    $('.attempts .value').html(attempts);
    $('.accuracy .value').html(accuracy + "%");
}

// ----------------------------- GET ACCURACY ------------------------------- //
function get_accuracy() {
    accuracy = Math.round((matches/attempts) * 100);
    return accuracy;
}

// ----------------------------- RESET CARDS TO NULL -------------------------- //
function resetCards() {
    first_card = null;
    second_card = null;
}

// ----------------------------- RESET GAME -------------------------------- //

function reset() {
    resetCards();
    canClick = true;
    card_flip_timer = null;
    match_counter = 0;
    matches = 0;
    attempts = 0;
    accuracy = 0;
    game_timer = null;
    games_played++;
    display_stats();
    $('.card').removeClass('flipcard');
    $('.you-win').fadeOut('slow');
    $('.you-lose').fadeOut('slow');
}

// --------------------------- CARD FUNCTIONS ------------------------------ //

function card_clicked(current) {

    $('#19').trigger('play');
    if (canClick === false || $(current).hasClass('flipcard')) {
        return;
    }
    $(current).addClass('flipcard');

    if (first_card == null) {
        first_card = current;
    }
    else {
        second_card = current;
        if ($(first_card).find('.frontimage').attr('src') == $(second_card).find('.frontimage').attr('src')) {
            $('#2').trigger('play');
            resetCards();
            attempts++;
            matches++;
            get_accuracy();
            display_stats();
            match_counter++;
            if (match_counter == total_possible_matches) {
                $('#start_music').trigger('pause');
                victory_music();
                $('.you-win').fadeIn('slow');
             }
        }
        else {
            $('#14').trigger('play');
            attempts++;
            canClick = false;
            get_accuracy();
            display_stats();
            card_flip_timer = setTimeout(function() {
                $(first_card).removeClass('flipcard');
                $(second_card).removeClass('flipcard');
                card_flip_timer = null;
                canClick = true;
                resetCards();
            }, 1000);
        }
    }
}

// --------------------------- TIMER FUNCTION ------------------------------ //
// function game_time() {
//     $('#game_over').trigger('play');
//     $('.you-lose').fadeIn('slow');
// }

// --------------------------- SOUND FUNCTIONS ------------------------------ //
function play_music() {
    $('#start_music').trigger('play');
}
function victory_music() {
    $('#victory_music').trigger('play');
}


$(document).ready(function() {
    $('#stats-container, #game-area').hide();

    display_stats();

    $('.you-lose').hide();
    $('.you-win').hide();

    $(".card").click(function(){
        card_clicked(this);
    });

    // game_timer = setTimeout(game_time, 3000);

});