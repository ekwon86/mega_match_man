/********************************************** GAME OBJECT **********************************************/
var game = {
    canClick: true,
    card_flip_timer: null,
    first_card: null,
    second_card: null,
    matches: 0,
    match_counter: 0,
    total_possible_matches: 9,
    attempts: 0,
    accuracy: 0,
    games_played: 0,
    total_cards: 18,
    card_array: [
        'images/flashman2.png',
        'images/bubbleman2.png',
        'images/metalman2.png',
        'images/airman2.png',
        'images/heatman2.png',
        'images/woodman2.png',
        'images/quickman2.png',
        'images/crashman2.png',
        'images/megaman2.png'
    ],
    card_array2: [
        'images/flashman.png',
        'images/bubbleman.png',
        'images/metalman.png',
        'images/airman.png',
        'images/heatman.png',
        'images/woodman.png',
        'images/quickman.png',
        'images/crashman.png',
        'images/megaman.png'
    ],
    
    /************ INITIALIZE ************/
    init: function () {
        console.log('Game initialized');
        this.randomize_cards();
        this.display_stats();
    },

    /************ DISPLAY STATS ************/
    display_stats: function () {
        $('.games-played .value').html(this.games_played);
        $('.attempts .value').html(this.attempts);
        $('.accuracy .value').html(this.accuracy + "%");
    },

    /************ CARD RANDOMIZER ************/
    randomize_cards_day: function () {
        var self = this;
        var randomized_array = this.card_array.concat(this.card_array);
        var randomized_array_length = randomized_array.length;
        var images_copy = [];

        for (var i = 0; i < randomized_array_length; i++) {
            var random_num = Math.floor((Math.random() * randomized_array.length));
            images_copy.push(randomized_array.splice(random_num, 1));
        }

        for (var j = 0; j < this.total_cards; j++) {
            var card = $('<div>').addClass('card');
            card.click(function() {
                self.card_clicked(this);
            });
            var back = $('<div>').addClass('back').html('<img src="images/cardback.png">');
            var front = $('<div>').addClass('front').html('<img src="' + images_copy[j] + '">');
            $(card).append(front);
            $(card).append(back);
            $('#game-area').append(card);
        }
    },
    randomize_cards_night: function () {
        var self = this;
        var randomized_array = this.card_array2.concat(this.card_array2);
        var randomized_array_length = randomized_array.length;
        var images_copy = [];

        for (var i = 0; i < randomized_array_length; i++) {
            var random_num = Math.floor((Math.random() * randomized_array.length));
            images_copy.push(randomized_array.splice(random_num, 1));
        }

        for (var j = 0; j < this.total_cards; j++) {
            var card = $('<div>').addClass('card');
            card.click(function() {
                self.card_clicked(this);
            });
            var back = $('<div>').addClass('back').html('<img src="images/cardback2.jpg">');
            var front = $('<div>').addClass('front').html('<img src="' + images_copy[j] + '">');
            $(card).append(front);
            $(card).append(back);
            $('#game-area').append(card);
        }
    },

    /************* RESET CARDS ************/
    reset_cards: function () {
        this.first_card = null;
        this.second_card = null;
    },

    /************ RESET ************/
    reset: function () {
        $('.card').remove();
        this.randomize_cards();
        this.canClick = true;
        this.match_counter = 0;
        this.card_flip_timer = null;
        this.matches = 0;
        this.attempts = 0;
        this.accuracy = 0;
        this.games_played++;
        this.display_stats();
        // $('.card').removeClass('flipcard');
        $('.you-win').fadeOut('slow');
        $('.you-lose').fadeOut('slow');
    },

    /************ SET ACCURACY ************/
    get_accuracy: function () {
        this.accuracy = Math.round((this.matches / this.attempts) * 100);
        return this.accuracy;
    },

    /************ UNFLIP CARDS ************/
    unflip_cards: function() {
        this.canClick = true;
        this.card_flip_timer = setTimeout(function() {
            game.card_flip_timer = null;
            $(game.first_card).removeClass('flipcard');
            $(game.second_card).removeClass('flipcard');
            game.first_card = null;
            game.second_card = null;
        }, 950);
    },

    /************ CARDS CLICKED ************/
    card_clicked: function (current) {
        $('#19').trigger('play');
        if (this.canClick === false || $(current).hasClass('flipcard')) {
            return;
        }
        $(current).addClass('flipcard');

        if (this.first_card == null) {
            this.first_card = current;
        }

        else {
            this.second_card = current;
            if ($(this.first_card).find('.front img').attr('src') == $(this.second_card).find('.front img').attr('src')) {
                $('#2').trigger('play');
                this.reset_cards();
                this.attempts++;
                this.matches++;
                this.get_accuracy();
                this.display_stats();
                this.match_counter++;
                if (this.match_counter == this.total_possible_matches) {
                    $('#start_music').trigger('pause');
                    this.victory_music();
                    $('.you-win').fadeIn('slow');
                }
            }
            else {
                $('#5').trigger('play');
                this.attempts++;
                game.canClick = false;
                this.get_accuracy();
                this.display_stats();
                this.unflip_cards();
            }
        }
    },
    /************ PLAY MUSIC ************/
    play_music: function() {
        $('#start_music').trigger('play');
    },

    victory_music: function() {
        $('#victory_music').trigger('play');
    },
    
    /************ CREATE GAME ************/
    create_game: function() {
        $('#start-game-button').hide();
        $('#game-area, #stats-container').show();
        if ($('#daytime').is(':checked')){
            this.randomize_cards_day();
        }
        else if ($('#nighttime').is(':checked')) {
            $('body').css('background-image', 'url(images/background.jpg)');
            this.randomize_cards_night();
        }
    }
};


// // --------------------------- TIMER FUNCTION ------------------------------ //
// function set_game_time() {
//     game_timer = setTimeout(function() {
//         $('#game_over').trigger('play');
//         $('.you-lose').fadeIn('slow');
//
//     }, 5000);
// }
//

$(document).ready(function() {
    $('.you-win, .you-lose, #game-area, #stats-container').hide();

    $('#close-modal').on('click', function() {
       game.create_game();
    });

    $("#reset").on('click', function() {
        game.reset();
    });

    $("#play").on('click', function() {
        game.play_music();
    });

    $('.card').on('click', function() {
        game.card_clicked(this);
    });

});