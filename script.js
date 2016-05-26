/*********************** CARD CONSTRUCTOR ***********************/
function cards() {
    var first_card = null;
    var second_card = null;
    this.canClick = true;
    this.card_flip_timer = null;
    var card_array = [
        'images/flashman.png',
        'images/bubbleman.png',
        'images/metalman.png',
        'images/airman.png',
        'images/heatman.png',
        'images/woodman.png',
        'images/quickman.png',
        'images/crashman.png',
        'images/megaman.png'
    ];

    this.reset_cards = function() {
        first_card = null;
        second_card = null;
    };


    this.randomize_cards = function() {
        var randomized_array = card_array.concat(card_array);
        var randomized_array_length = randomized_array.length;
        var images_copy = [];
        
        for (var i = 0; i < randomized_array_length; i++){
            var random_num = Math.floor((Math.random() * randomized_array.length));
            images_copy.push(randomized_array.splice(random_num, 1));
        }
        
        for (var j = 0; j < game.total_cards; j++){
            var card = $('<div>').addClass('card');
            var back = $('<div>').addClass('back').html('<img src=images/cardback2.jpg')
            var front = $('<div>').addClass('front').html('<img src="' + images_copy[j] + '"></div>');
            card.append(front);
            card.append(back);
            $('#game-area').append(card);
        }
    }
}


/*********************** GAME CONSTRUCTOR ***********************/
function game() {
    this.match_counter = 0;
    this.attempts = 0;
    this.accuracy = 0;
    this.games_played = 0;
    this.game_timer = null;
    this.total_cards = 18;
    this.total_possible_matches = this.total_cards / 2;

    /** INITIALIZE **/
    this.init = function() {
        cards.randomize_cards();
        this.display_stats();
    };

    /** DISPLAY STATS **/
    this.display_stats = function() {
        $('.games-played .value').html(games_played);
        $('.attempts .value').html(attempts);
        $('.accuracy .value').html(accuracy + "%");
    };

    /** RESET STATS **/
    this.reset = function() {
        cards.reset_cards();
        cards.canClick = true;
        cards.card_flip_timer = null;
        this.match_counter = 0;
        this.matches = 0;
        this.attempts = 0;
        this.accuracy = 0;
        this.game_timer = null;
        this.games_played++;
        display_stats();
        $('.card').removeClass('flipcard');
        $('.you-win').fadeOut('slow');
        $('.you-lose').fadeOut('slow');
    }

}


// ------------------------------ RANDOMIZE ---------------------------------- //
// function randomize_cards() {
//     while(card_array.length > 0) {
//         var card_random_number = random_num_generator(card_array.length);
//         var new_card_src = card_array[card_random_number];
//         card_array.splice(card_random_number, 1);
//         randomized_array.push(card_random_number);
//         var new_card = new this.cards();
//         card_array.push(new_card);
//         create_new_card(new_card_src);
//     }
// }
//
// function create_new_card(front_src){
//     var card_div = $("<div>",{
//         class: 'card'
//     });
//     var front_div = $("<div>", {
//         class: 'front'
//     });
//     var front_img = $("<div>", {
//         src: front_src,
//         class: 'frontimage'
//     });
//     front_div.append(front_img);
//     var back_div = $("<div>", {
//         class: 'back'
//     });
//     var back_img = $("<img>", {
//         src: 'images/cardback2.jpg',
//         class: ''
//     })
// }
//
// randomize_cards:function() {
//     while(this.cards.card_array.length > 0) {
//         var card_random_number = random_num_generator(this.cards.card_array.length);
//         var new_card_src = this.cards.card_array[card_random_number];
//         this.cards.card_array.splice(card_random_number, 1);
//         this.cards.randomized_array.push(card_random_number);
//         var new_card = new this.cards();
//         this.card_array.push(new_card);
//         new_card.create(new_card_src)
//     }
// }
//
//         this.card_div = $("<div>",{
//             class: 'card'
//         });
//
//
//         var back_img = $("<img>",{
//             src: 'images/cardback2.jpg',
//             class: 'frontimage'
//         });
//         back_div.append(back_img);
//         //put the front and back into the card container
//         this.card_div.append(front_div, back_div);
//         return this;
//     }
// },
//
// function random_num_generator(max) {
//     return Math.floor(Math.random() * max);
// }


// ----------------------------- GET ACCURACY ------------------------------- //
function get_accuracy() {
    accuracy = Math.round((matches/attempts) * 100);
    return accuracy;
}

// ----------------------------- RESET GAME -------------------------------- //
function reset() {

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
            reset_cards();
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
                reset_cards();
            }, 800);
        }
    }
}

// ------------------------ CREATE GAME FUNCTION ------------------------- //
// function create_game() {
//     $('#start-game-button').hide();
//     if ($('#nighttime').is(':checked')) {
//         $('body').css('background-image', 'url(images/background.jpg)');
//         $('.back img').attr('src', 'images/cardback.png');
//         $('.card1 img').attr('src', 'images/flashman2.png');
//         $('.card2 img').attr('src', 'images/bubbleman2.png');
//         $('.card3 img').attr('src', 'images/airman2.png');
//         $('.card4 img').attr('src', 'images/metalman2.png');
//         $('.card5 img').attr('src', 'images/heatman2.png');
//         $('.card6 img').attr('src', 'images/woodman2.png');
//         $('.card7 img').attr('src', 'images/quickman2.png');
//         $('.card8 img').attr('src', 'images/crashman2.png');
//         $('.card9 img').attr('src', 'images/megaman2.png');
//     }
//     else if ($('#timed').is(':checked')) {
//         set_game_time();
//     }
//     $('#game-area, #stats-container').show();
// }

// --------------------------- TIMER FUNCTION ------------------------------ //
function set_game_time() {
    game_timer = setTimeout(function() {
        $('#game_over').trigger('play');
        $('.you-lose').fadeIn('slow');

    }, 5000);
}

// --------------------------- SOUND FUNCTIONS ------------------------------ //
function play_music() {
    $('#start_music').trigger('play');
}
function victory_music() {
    $('#victory_music').trigger('play');
}

// --------------------------- SOUND FUNCTIONS ------------------------------ //

$(document).ready(function() {
    $('.you-win, .you-lose).hide();

    $('.close-modal').click(function(){
       // randomize_cards();
       create_game();
       reset();
    });

    display_stats();

    $(".card").click(function(){
        card_clicked(this);
    });
});