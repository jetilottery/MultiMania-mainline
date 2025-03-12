define((require) => {
    const prizeData = require('skbJet/componentManchester/standardIW/prizeData');

    const multipliers = [
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
    ];

    return function scenarioTransform(scenarioString) {
        // split the string into the two components, winning and player numbers
        const [winningString, playerString] = scenarioString.split('|');

        // winning numbers are just a comma seperated list of numbers
        const winningNumbers = winningString.split(',').map(int => parseInt(int, 10));

        // player numbers are a list of key:value pairs describing a number and its associated prize
        const playerPairs = playerString.split(',');
        const playerNumbers = playerPairs.map((pair) => {
            const [number, prize] = pair.split(':');
            return [
                multipliers.indexOf(number)>-1 === true ? number : parseInt(number, 10),
                prizeData.prizeTable[prize]
            ];
        });

        return {
            winningNumbers,
            playerNumbers,
        };
    };
});
