define(require => {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

    const _state = {
        winning: [],
        player: [],
    };

    const _index = {
        winning: undefined,
        player: undefined
    };

    function reset() {
        _state.winning = [];
        _state.player = [];
        _index.winning = undefined;
        _index.player = undefined;
    }

    function finishPreFlight() {
        return _index.winning === 0 && _index.player === 0;
    }

    msgBus.subscribe('Game.WinningNumberStart', index => _index.winning = index);
    msgBus.subscribe('Game.PlayerNumberStart', index => _index.player = index);
    msgBus.subscribe('Game.WinningNumber', number => _state.winning.push(number));
    msgBus.subscribe('Game.PlayerNumber', number => _state.player.push(number));

    return {
        get winning() {
            return _state.winning;
        },
        get player() {
            return _state.player;
        },
        reset,
        finishPreFlight
    };
});
