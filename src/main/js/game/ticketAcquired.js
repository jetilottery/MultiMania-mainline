define((require) => {
  const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
  const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
  const audio = require('skbJet/componentManchester/standardIW/audio');

  const winningNumbers = require('game/components/winningNumbers');
  const playerNumbers = require('game/components/playerNumbers');

  function ticketAcquired() {
    winningNumbers.populate(scenarioData.scenario.winningNumbers);
    playerNumbers.populate(scenarioData.scenario.playerNumbers);
    
    if (!audio.isPlaying('music')) {
      audio.fadeIn('music', 0.5, true);
    }

    gameFlow.next('START_REVEAL');
  }

  gameFlow.handle(ticketAcquired, 'TICKET_ACQUIRED');
});
