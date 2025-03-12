define({
    // IMPLEMENT: Map SFX to channels

    /* 
     * If audio assets are named nicely you can do:
     * {
     *  fileName: channelNumber
     * }
     * 
     * Otherwise use a nice name for the keys and include the filename and channel as an array:
     * {
     *  soundName: ['Ugly_sound_file_V2-final', channelNumber]
     * }
     */

    music: ['MusicLoop', 0, 0.8],
    winTerminator: ['MusicTermWin', 0, 0.8],
    loseTerminator: ['MusicTermLose', 0, 0.8],

    costDown: ['BetDown', 1, 0.8],
    costUp: ['BetUp', 2, 0.8],
    costMax: ['BetMax', 3, 0.8],

    click: ['Click', 5],
    buy: ['BuyButton',4],

    /*
     * Audio groups
     * A game can include multiple variations of each of these sounds. Ensure each variation starts
     * with the same name plus some kind of ordered suffix. Each time a sound group plays the next 
     * item in the group will be used.
     */

    playerNumber_1:  ['YourNumberSelect_1', 1],
    playerNumber_2:  ['YourNumberSelect_2', 2],
    playerNumber_3:  ['YourNumberSelect_3', 3],
    playerNumber_4:  ['YourNumberSelect_4', 4],
    playerNumber_5:  ['YourNumberSelect_5', 5],
    playerNumber_6:  ['YourNumberSelect_6', 6],
    playerNumber_7:  ['YourNumberSelect_1', 7],
    playerNumber_8:  ['YourNumberSelect_2', 8],
    playerNumber_9:  ['YourNumberSelect_3', 9],
    playerNumber_10: ['YourNumberSelect_4', 10],
    playerNumber_11: ['YourNumberSelect_5', 11],
    playerNumber_12: ['YourNumberSelect_6', 12],

    match_1:  ['WinningNumberSelect_1', 1],
    match_2:  ['WinningNumberSelect_2', 2],
    match_3:  ['WinningNumberSelect_3', 3],
    match_4:  ['WinningNumberSelect_1', 4],
    match_5:  ['WinningNumberSelect_2', 5],
    match_6:  ['WinningNumberSelect_3', 6],
    match_7:  ['WinningNumberSelect_1', 7],
    match_8:  ['WinningNumberSelect_2', 8],
    match_9:  ['WinningNumberSelect_3', 9],
    match_10: ['WinningNumberSelect_1', 10],
    match_11: ['WinningNumberSelect_2', 11],
    match_12: ['WinningNumberSelect_3', 12],

    winningNumber_1:  ['LuckyNumberSelect_1', 1],
    winningNumber_2:  ['LuckyNumberSelect_2', 2],
    winningNumber_3:  ['LuckyNumberSelect_1', 3],
    winningNumber_4:  ['LuckyNumberSelect_2', 4],
    winningNumber_5:  ['LuckyNumberSelect_1', 5],
    winningNumber_6:  ['LuckyNumberSelect_2', 6],
    winningNumber_7:  ['LuckyNumberSelect_1', 7],
    winningNumber_8:  ['LuckyNumberSelect_2', 8],
    winningNumber_9:  ['LuckyNumberSelect_1', 9],
    winningNumber_10: ['LuckyNumberSelect_2', 10],
    winningNumber_11: ['LuckyNumberSelect_1', 11],
    winningNumber_12: ['LuckyNumberSelect_2', 12],

    instantWin_1:  ['Bonus', 1],
    instantWin_2:  ['Bonus', 2],
    instantWin_3:  ['Bonus', 3],
    instantWin_4:  ['Bonus', 4],
    instantWin_5:  ['Bonus', 5],
    instantWin_6:  ['Bonus', 6],
    instantWin_7:  ['Bonus', 7],
    instantWin_8:  ['Bonus', 8],
    instantWin_9:  ['Bonus', 9],
    instantWin_10: ['Bonus', 10],
    instantWin_11: ['Bonus', 11],
    instantWin_12: ['Bonus', 12],

    /*
     * Optional audio
     * The following audio is optional and will be ignored if not included
     */

    //  buy: ['BuyButton', 4],
    //  revealAll: ['RevealAllButton', 4],
});
