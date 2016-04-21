var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matched = 2;
var match_counter = 0;

function card_clicked(current) {
    if (first_card_clicked == null) {
        first_card_clicked = current;
    } else {
        second_card_clicked = current;
    }
}