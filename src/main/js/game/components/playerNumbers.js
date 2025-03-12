define(require => {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');
    const PlayerNumber = require('game/components/PlayerNumber');
    const numberState = require('game/state/numbers');
    const audio = require('skbJet/componentManchester/standardIW/audio');

    require('com/gsap/TweenLite');
    const Tween = window.TweenLite;

    let cards;
    let numbers;

    function init() {
        cards = [
            PlayerNumber.fromContainer(displayList.playerNumber1),
            PlayerNumber.fromContainer(displayList.playerNumber2),
            PlayerNumber.fromContainer(displayList.playerNumber3),
            PlayerNumber.fromContainer(displayList.playerNumber4),
            PlayerNumber.fromContainer(displayList.playerNumber5),
            PlayerNumber.fromContainer(displayList.playerNumber6),
            PlayerNumber.fromContainer(displayList.playerNumber7),
            PlayerNumber.fromContainer(displayList.playerNumber8),
            PlayerNumber.fromContainer(displayList.playerNumber9),
            PlayerNumber.fromContainer(displayList.playerNumber10),
            PlayerNumber.fromContainer(displayList.playerNumber11),
            PlayerNumber.fromContainer(displayList.playerNumber12),
            PlayerNumber.fromContainer(displayList.playerNumber13),
            PlayerNumber.fromContainer(displayList.playerNumber14),
            PlayerNumber.fromContainer(displayList.playerNumber15),
            PlayerNumber.fromContainer(displayList.playerNumber16),
            PlayerNumber.fromContainer(displayList.playerNumber17),
            PlayerNumber.fromContainer(displayList.playerNumber18),
            PlayerNumber.fromContainer(displayList.playerNumber19),
            PlayerNumber.fromContainer(displayList.playerNumber20),
        ];
        msgBus.publish('Game.PlayerNumberInit',cards);
    }

    function populate(data) {
        numbers = data;
    }

    function playAudio(soundName){
        var min = 1,
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

        // Return an array of promises for each card's lifecycle
        return cards.map(async card => {
            msgBus.publish('Game.ResetIdleTimer');
        // Enable the card and wait for it to be revealed (manually or automatically)
            await card.enable();
            // Play the Player Number reveal audio
            //audio.playSequential('playerNumber');
            playAudio('playerNumber');
            // Get the next Winning Number
            const nextData = numbers.shift();
            // Populate the card with the next Player Number, ready to be uncovered
            msgBus.publish('Game.PlayerNumberStart',numbers.length);
            msgBus.publish('Game.ResetIdleTimer');
            if(numberState.finishPreFlight()){
                displayList.autoPlayStartButton.enabled = false;
            }

            card.populate(nextData);
            // Wait for the uncover animation (if animated)
            await card.uncover();
            msgBus.publish('Game.PlayerNumber', nextData[0]);
            // If the revealed number matches a revealed Winning Number then mark the match
            if (!card.matched && numberState.winning.includes(nextData[0])) {
                card.match();
                playAudio('match');
                meterData.win += card.value;
                await card.presentWin();
            }
            // Or if the card is an instant win show that
            if (!card.matched && card.instantWin) {
                meterData.win += card.value;
                playAudio('instantWin');
                await card.presentWin();
            }
        });
    }

    function revealAll() {
        // Get all the cards yet to be revealed
        const unrevealed = cards.filter(number => !number.revealed);
        // Return an array of tweens that calls reveal on each card in turn
        return unrevealed.map(number => Tween.delayedCall(0, number.reveal, null, number));
    }

    function reset() {
        cards.forEach(number => number.reset());
    }

    function checkMatch(winningNumber) {
        const matchedCards = cards.filter(
            card => card.revealed && !card.matched && card.number === winningNumber
        );
        if (matchedCards.length > 0) {
            matchedCards.forEach(e => {
                e.match();
                e.presentWin();
                meterData.win += e.value;
                playAudio('match');
            });
        }
    }

    msgBus.subscribe('Game.WinningNumber', checkMatch);

    return {
        init,
        populate,
        enable,
        revealAll,
        reset,
    };
});
