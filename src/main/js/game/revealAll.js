define(require => {
  const Timeline = require('com/gsap/TimelineLite');
  const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
  const displayList = require('skbJet/componentManchester/standardIW/displayList');
  const winningNumbers = require('game/components/winningNumbers');
  const playerNumbers = require('game/components/playerNumbers');

  let revealAllTimeline;

  function start() {
    const revealWinning = winningNumbers.revealAll(gameConfig.autoPlayWinningNumberInterval);
    const revealPlayer = playerNumbers.revealAll();

    displayList.winningNumbers.interactiveChildren = false;
    displayList.playerNumbers.interactiveChildren = false;



    // Combine the winningNumbers and playerNumbers reveals into one timeline
    revealAllTimeline = new Timeline({
      tweens: [
        new Timeline({ tweens: revealWinning, stagger: gameConfig.autoPlayWinningNumberInterval }),
        new Timeline({ tweens: revealPlayer, stagger: gameConfig.autoPlayPlayerNumberInterval }),
      ],
      align: 'sequence',
      stagger:
        revealWinning.length > 0 && revealPlayer.length > 0
          ? gameConfig.autoPlayPlayerNumberDelay
          : 0,
    });
    return revealAllTimeline;
  }

  function stop() {
    if (revealAllTimeline) {
      revealAllTimeline.kill();
      revealAllTimeline = undefined;

        displayList.winningNumbers.interactiveChildren = true;
        displayList.playerNumbers.interactiveChildren = true;
    }
  }

  return {
    start,
    stop,
  };
});
