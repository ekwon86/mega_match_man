/********************************************** CARD CONSTRUCTOR **********************************************/
function card() {
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

    /** RESET CARDS **/
    this.reset_cards = function() {
        first_card = null;
        second_card = null;
    };

    /** CARD RANDOMIZER **/
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
            var back = $('<div>').addClass('back').html('<img src=images/cardback2.jpg');
            var front = $('<div>').addClass('front').html('<img src="' + images_copy[j] + '"></div>');
            card.append(front);
            card.append(back);
            $('#game-area').append(card);
        }
    };

    /** CARD CLICK **/

    this.card_clicked = function(current){
        console.log('test');
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
            if ($(first_card).find('.front img').attr('src') == $(second_card).find('.front img').attr('src')) {
                $('#2').trigger('play');
                reset_cards();
                game.attempts++;
                game.matches++;
                game.get_accuracy();
                game.display_stats();
                game.match_counter++;
                if (game.match_counter == game.total_possible_matches) {
                    $('#start_music').trigger('pause');
                    victory_music();
                    $('.you-win').fadeIn('slow');
                }
            }
            else {
                $('#14').trigger('play');
                game.attempts++;
                canClick = false;
                game.get_accuracy();
                game.display_stats();
                card.card_flip_timer = setTimeout(function() {
                    $(first_card).removeClass('flipcard');
                    $(second_card).removeClass('flipcard');
                    card.card_flip_timer = null;
                    canClick = true;
                    card.reset_cards();
                }, 800);
            }
        }
    }
}



/********************************************** GAME OBJECT **********************************************/
var game = {
    matches: 0,
    match_counter: 0,
    total_possible_matches: 9,
    attempts: 0,
    accuracy: 0,
    games_played: 0,
    game_timer: null,
    total_cards: 18,

    /** INITIALIZE **/
    init: function() {
        console.log('Game initialized');
        card.randomize_cards();
        this.display_stats();
    },

    /** DISPLAY STATS **/
    display_stats: function() {
        $('.games-played .value').html(this.games_played);
        $('.attempts .value').html(this.attempts);
        $('.accuracy .value').html(this.accuracy + "%");
    },

    /** RESET STATS **/
    reset: function() {
        card.reset_cards();
        card.canClick = true;
        card.card_flip_timer = null;
        this.matches = 0;
        this.attempts = 0;
        this.accuracy = 0;
        this.game_timer = null;
        this.games_played++;
        this.display_stats();
        $('.card').removeClass('flipcard');
        $('.you-win').fadeOut('slow');
        $('.you-lose').fadeOut('slow');
    },

    /** SET ACCURACY **/
    get_accuracy: function() {
        game.accuracy = Math.round((game.matches/game.attempts) * 100);
        return game.accuracy;
    }

};

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

// // --------------------------- TIMER FUNCTION ------------------------------ //
// function set_game_time() {
//     game_timer = setTimeout(function() {
//         $('#game_over').trigger('play');
//         $('.you-lose').fadeIn('slow');
//
//     }, 5000);
// }

// --------------------------- SOUND FUNCTIONS ------------------------------ //
function play_music() {
    $('#start_music').trigger('play');
}
function victory_music() {
    $('#victory_music').trigger('play');
}

// --------------------------- SOUND FUNCTIONS ------------------------------ //

$(document).ready(function() {
    $('.you-win, .you-lose').hide();

    game.init();

    $(".card").click(function(){
        card.card_clicked(this);
    });
    
});