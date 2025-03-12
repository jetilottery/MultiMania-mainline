define(require => {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    require('com/gsap/TweenLite');

    const Tween = window.TweenLite;
    let numbers = [];
    let idleTween;

    let delay = 5;


        idleTween = Tween.to({}, delay, {
            onComplete: promptIdle,
            paused: true,
        });


    function promptIdle() {
        // Check if there are any remaining unrevealed cards
        const unrevealed = numbers.filter(number => !number.revealed);
        if (unrevealed.length === 0) {
            return;
        }

        // Pick one at random to animate
        unrevealed[Math.floor(unrevealed.length * Math.random())].prompt();

        // Restart the idle timer tween
        idleTween.play(0);
    }

    function reset() {
        idleTween.play(0);
    }

    msgBus.subscribe('Game.PlayerNumberInit',cards => cards.forEach((e)=> numbers.push(e)));
    msgBus.subscribe('Game.WinningNumberInit',cards => cards.forEach((e)=> numbers.push(e)));
    msgBus.subscribe('Game.ResetIdleTimer',reset);

});