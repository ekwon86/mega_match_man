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
        //check if the first card and the second card are the same face / picture
        //if they are, they match.  increment match_counter
        console.log($(first_card).find('.frontimage').attr('src'), $(second_card).find('.frontimage').attr('src'));
        if ($(first_card).find('.frontimage').attr('src') == $(second_card).find('.frontimage').attr('src')) {
            $(first_card , second_card).addClass('matchedcards');
            $('.matchedcards').off("click");
            //are all cards matched? if yes, player won game.if not, continue playing game
            resetCards();
            attempts++;
            console.log('total attempts equal to ' + attempts);
            matches++;
            console.log('total matches equal to ' + matches);
            match_counter++;
            if (match_counter == total_possible_matches) {
                alert('You won!');
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
            }, 1500);
        }
    }
}
        //reset variables, we are going to match new cards next
        //if they are not matched
        //wait a short amount of time, then flip both cards back to normal
        //reset variables, we are going to match new cards next

//Keep doc ready here
$(document).ready(function () {
    $(".card").click(function(){
        card_clicked(this);
    });
});