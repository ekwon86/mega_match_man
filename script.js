$(document).ready(function() {
    var first_card_clicked = null;
    var second_card_clicked = null;
    var total_possible_matched = 2;
    var match_counter = 0;

    function card_clicked(current) {
        if (first_card_clicked == null) {
            //this is the first card that was clicked of a set
            first_card_clicked = current;
            //show the card face
            $('.back').click(function(){
                $(this).hide();
            });
            //done with this function
        } else {
            //this is the second card that was clicked of a set
            second_card_clicked = current;
            //show the card face
            //check if the first card and the second card are the same face / picture
            //if they are, they match.  increment match_counter
            //are all cards matched?
            //if yes, player won game
            //if not, continue playing game
            //reset variables, we are going to match new cards next
            //if they are not matched
            //wait a short amount of time, then flip both cards back to normal
            //reset variables, we are going to match new cards next
        }
    }
}