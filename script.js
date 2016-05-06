// want to eventually add health bar and functionality. when
// user guesses wrong mega man's health will go down. successive
// match will grant health to player and wrong guesses will
// decrement health.

// come up with way to insert game over song when player loses and
// victory song when player wins!


//global variables
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


//reset cards to null
function resetCards() {
    first_card = null;
    second_card = null;
}
//display_stats function
function display_stats() {
    $('.games-played .value').text(games_played);
    $('.attempts .value').text(attempts);
    $('.accuracy .value').text(accuracy + "%");
}
//accuracy function
function get_accuracy() {
    accuracy = Math.round((match_counter / attempts)) * 100;
}
//reset_stats function
function reset_stats() {
    attempts = 0;
    accuracy = 0;
    match_counter = 0;
    display_stats();
}
//reset game function
function reset() {
    games_played++;
    reset_stats();
    display_stats();
    $('.card').removeClass('flipcard');
    $('.you-win').fadeOut('slow');
}


// ---- CARD FUNCITONS ---- //

//click card function
function card_clicked(current) {
    if (canClick === false || $(current).hasClass('flipcard')) {
        return;
    }
    console.log("card_clicked called - current is : ", current);

    $(current).addClass('flipcard');

    if (first_card == null) {
        first_card = current;
    } else {
        second_card = current;
        console.log($(first_card).find('.frontimage').attr('src'), $(second_card).find('.frontimage').attr('src'));
        if ($(first_card).find('.frontimage').attr('src') == $(second_card).find('.frontimage').attr('src')) {
            // $(first_card , second_card).addClass('matchedcards');
            // $('.matchedcards').off("click");
            resetCards();
            attempts++;
            console.log('total attempts equal to ' + attempts);
            matches++;
            console.log('total matches equal to ' + matches);
            get_accuracy();
            display_stats();
            match_counter++;
            if (match_counter == total_possible_matches) {
                $('.you-win').fadeIn('slow');
        }
        } else {
            attempts++;
            console.log('total attempts equal to ' + attempts);
            canClick = false;
            card_flip_timer = setTimeout(function() {
                console.log('test - 1st card = ',first_card, "2nd card = ", second_card);
                $(first_card).removeClass('flipcard');
                $(second_card).removeClass('flipcard');
                card_flip_timer = null;
                canClick = true;
                resetCards();
                get_accuracy();
                display_stats();
            }, 750);
        }
    }
}

$(document).ready(function () {

    display_stats();
    $(".card").click(function(){
        card_clicked(this);
    });
    $('.reset').click(function() {
        reset();
    })
    $('.you-lose').hide();
    $('.you-win').hide();

});