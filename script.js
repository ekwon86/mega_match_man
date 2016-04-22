//global variables
var first_card = null;
var second_card = null;
var total_possible_matches = $('.card').length / 2;
var match_counter = 0;
var canClick= true;

//reset cards to null
function resetCards() {
    first_card = null;
    second_card = null;
}
function madeMatch (second_card) {
    resetCards();
    if (match_counter == total_possible_matches) {
        alert('You won!');
    }

// ---- CARD FUNCITONS ---- //

//click card function
function card_clicked(current) {
    if (canClick === false || $(current).hasClass('flipcard')) {
        return;
        }
    }
    $(current).addClass('flipcard');

        if (first_card == null) {
            first_card = current;
        } else {
            second_card = current;

            //check if the first card and the second card are the same face / picture
            //if they are, they match.  increment match_counter
            if ($(first_card).find('frontimage').attr('src') == $(second_card).find('frontimage').attr('src')) {
                $(first_card , second_card).addClass('matchedcards');
                $('.matchedcards').off("click");
                match_counter++;
                resetCards();
            }
            //are all cards matched?
            //if yes, player won game
            // if not, continue playing game
                if (match_counter == total_possible_matches) {
                    alert('You won!');
                }
                    //reset variables, we are going to match new cards next
                    //if they are not matched
                    //wait a short amount of time, then flip both cards back to normal
                    //reset variables, we are going to match new cards next
                        else {
                            canClick = false;


                        }
                }
            }

//Keep doc ready here
$(document).ready(function () {
    $(".card").click (card_clicked);
});