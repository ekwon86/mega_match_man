var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matched = 2;
var match_counter = 0;

$(document).ready(function() {
    // $('.class').click(function(){
    //     card_clicked(this);
    // })
});

function card_clicked(current) {
    if (first_card_clicked == null) {
        first_card_clicked = current;
        $(first_card_clicked).find('.back').hide();
    } else {
        second_card_clicked = current;
        $(second_card_clicked).find('.back').hide();
        {
            //check if the first card and the second card are the same face / picture
            //if they are, they match.  increment match_counter
            function checkCards() {
                if ($(first_card_clicked).find('frontimage').attr('src') == $(second_card_clicked).find('frontimage').attr('src')) {
                    return match_counter += 1;
                }
            }
        }
    }
}
                console.log(match_counter);
        // //are all cards matched?
        // //if yes, player won game
        // // if not, continue playing game
        // if (match_counter >= 9) {
        //     alert('You won!');
        // } else {
        //
        //
        //
        //
        // //reset variables, we are going to match new cards next
        // //if they are not matched
        // //wait a short amount of time, then flip both cards back to normal
        // //reset variables, we are going to match new cards next
        //
