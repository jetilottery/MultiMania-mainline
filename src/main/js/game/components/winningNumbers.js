define(require => {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const WinningNumber = require('game/components/WinningNumber');
    const numberState = require('game/state/numbers');

    require('com/gsap/TweenLite');
    const Tween = window.TweenLite;

    let cards;
    let numbers;
    let autoPlayInterval;

    function init() {

        cards = [
            WinningNumber.fromContainer(displayList.winningNumber1),
            WinningNumber.fromContainer(displayList.winningNumber2),
            WinningNumber.fromContainer(displayList.winningNumber3),
            WinningNumber.fromContainer(displayList.winningNumber4),
            WinningNumber.fromContainer(displayList.winningNumber5),
            WinningNumber.fromContainer(displayList.winningNumber6),
        ];
        msgBus.publish('Game.WinningNumberInit',cards);
    }

    function populate(data) {
        autoPlayInterval = 1;
        numbers = data;
    }

    function playAudio(soundName){
        var min = 6,
            max = 13;            

        for (min; min < max; min++) { 
            var sounds = [
                'playerNumber' + '_' + min, 
                'match' + '_' + min, 
                'instantWin'+ '_' + min,
                'winningNumber' + '_' + min
            ],
            playSound = soundName + '_' + min;

            if (!audio.isPlaying(playSound) &&
                !audio.isPlaying(sounds[0]) &&
                !audio.isPlaying(sounds[1]) &&
                !audio.isPlaying(sounds[2]) &&
                !audio.isPlaying(sounds[3])){
                    audio.play(playSound, 0);
                    break;
            }
        }
    }

    function enable() {
        msgBus.publish('Game.ResetIdleTimer');
        // Return an array of promises for each card's lifecycle
        return cards.map(async card => {
            // Enable the card and wait for it to be revealed (manually or automatically)
            await card.enable();

            // Restart the idle timer tween
            // Play the Winning Number reveal audio
            if (autoPlayInterval){
                playAudio('winningNumber');
            }            
            // Get the next Winning Number
            const nextNumber = numbers.shift();
            // Populate the card with the next Winning Number, ready to be uncovered
            msgBus.publish('Game.WinningNumberStart',numbers.length);
            msgBus.publish('Game.ResetIdleTimer');
            if(numberState.finishPreFlight()){
                displayList.autoPlayStartButton.enabled = false;
            }

            card.populate(nextNumber);
            // Wait for the uncover animation (if animated)
            await card.uncover();
            msgBus.publish('Game.WinningNumber', nextNumber);
            // If the revealed number matches a revealed Player Number then mark the match
            if (numberState.player.includes(card.number)) {
                card.match();
                await card.presentWin();
            }
        });
    }

    function revealAll(autoPlayWinningNumberInterval) {
        autoPlayInterval = autoPlayWinningNumberInterval;
        if (!autoPlayInterval){
            playAudio('winningNumber');    
        }

        // Get all the cards yet to be revealed
        const unrevealed = cards.filter(number => !number.revealed);
        // Return an array of tweens that calls reveal on each card in turn
        return unrevealed.map((number) => Tween.delayedCall(0, number.reveal, null, number));
    }

    function reset() {
        cards.forEach(number => number.reset());
    }

    function checkMatch(playerNumber) {
        const matchedCards = cards.filter(card => card.number === playerNumber);
        if (matchedCards.length > 0) {
            matchedCards.forEach(e => {
                e.match();
                e.presentWin();
            });
        }
    }

    msgBus.subscribe('Game.PlayerNumber', checkMatch);

    function finished() {
        return cards.length === 0;
    }


    return {
        init,
        populate,
        enable,
        revealAll,
        reset,
        finished,
    };
});
