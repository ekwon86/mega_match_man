var first_card = null;
var second_card = null;
var total_possible_matches = 2;
var match_counter = 0;

//reset cards to null
function resetCards() {
    first_card = null;
    second_card = null;
}

function card_clicked(current) {
    if (first_card == null) {
        first_card = current;
        $(first_card).find('.back').hide();
    } else {
        second_card = current;
        $(second_card).find('.back').hide();
        //check if the first card and the second card are the same face / picture
        //if they are, they match.  increment match_counter
        if (first_card.find('frontimage').attr('src') == second_card.find('frontimage').attr('src')) {
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
        
        }
    }
}


$(document).ready(function () {
    // $('.class').click(function(){
    //     card_clicked(this);
    // })
});