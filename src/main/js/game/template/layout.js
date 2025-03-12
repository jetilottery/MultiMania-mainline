define({
    _BASE_APP: {
        children: [
            'background',
            'logo',
            'winUpTo',
            'winningNumbers',
            'playerNumbers',
        ],
    },

    /*
     * BACKGROUND
     */
    background: {
        type: 'container',
        children: ['backgroundBG','logoFlare','backgroundPattern','winUpToBackground','selectionBackgrounds'],
    },

    backgroundPattern: {
        type : 'sprite',
        landscape : {
            texture: "landscape_pattern",
        },
        portrait : {
            texture: "portrait_pattern"
        }
    },

    backgroundBG: {
        type : 'sprite',
        landscape : {
            texture: "landscape_background",
        },
        portrait : {
            texture: "portrait_background"
        }
    },

    movingBackground: {
        type: 'container'
    },

    winUpToBackground : {
        type:'sprite',
        landscape: {
            texture: 'winUpToBackground'
        },
        portrait:{
            texture: 'portrait_winUptoBackground'
        }
    },

    selectionBackgrounds: {
        type: 'sprite',
        landscape: {
            texture: 'selectionBackgrounds',
        },
        portrait: {
            texture: 'portrait_selectionBackgrounds',
        },
    },

    /*
     * LOGO
     */

    logo: {
        type: 'container',
        children: ['logoIn','logoOut'],
        landscape: {
            x: 302,
            y: 139,
        },
        portrait: {
            x: 405,
            y: 105,
            scale: 0.8083,
        },
    },
    logoIn: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            texture: 'landscape_gameLogo',
        },
        portrait: {
            texture: 'portrait_gameLogo',
        },
    },
    logoOut: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            texture: 'landscape_gameLogo',
        },
        portrait: {
            texture: 'portrait_gameLogo',
        },
    },

    logoFlare: {
        type: 'sprite',
        anchor:0.5,
        landscape: {
            x: 302,
            y: 139,
        },
        portrait: {
            x: 405,
            y: 105,
            scale: 0.8083,
        },
    },


    /*
     * WIN UP TO
     */
    winUpTo: {
        type: 'container',
        children: ['winUpToIn', 'winUpToOut'],
        landscape: {x: 302, y: 293},
        portrait: {x: 405, y: 240},
    },
    winUpToIn: {
        type: 'container',
        children: ['winUpToInText'],
    },
    winUpToInText: {
        type: 'text',
        style: 'winUpTo',
        string: 'winUpTo',
        anchor: 0.5,
        maxWidth: 400,
    },
    winUpToOut: {
        type: 'container',
        children: ['winUpToOutText'],
    },
    winUpToOutText: {
        type: 'text',
        style: 'winUpTo',
        string: 'winUpTo',
        anchor: 0.5,
        maxWidth: 400,
    },


    /*
     * WINNING NUMBERS
     */
    winningNumbers: {
        type: 'container',
        children: ['winningNumbersTitle',
            'winningNumber1',
            'winningNumber2',
            'winningNumber3',
            'winningNumber4',
            'winningNumber5',
            'winningNumber6'
        ],
        landscape: {x: 62, y: 324},
        portrait: {x: 12, y: 272},
    },
    winningNumbersTitle: {
        type: 'text',
        string: 'luckyNumbers',
        style: 'winningNumbersTitle',
        anchor: 0.5,
        maxWidth: 350,
        landscape: {x: 240, y: 34},
        portrait: {x: 393, y: 31},
    },
    winningNumber1: {
        type: 'container',
        landscape: {x: 94, y: 122, scale: 1},
        portrait: {x: 78, y: 109, scale: 0.857},
    },
    winningNumber2: {
        type: 'container',
        landscape: {x: 240, y: 122, scale: 1},
        portrait: {x: 204, y: 109, scale: 0.857},
    },
    winningNumber3: {
        type: 'container',
        landscape: {x: 386, y: 122, scale: 1},
        portrait: {x: 330, y: 109, scale: 0.857},
    },
    winningNumber4: {
        type: 'container',
        landscape: {x: 94, y: 251, scale: 1},
        portrait: {x: 456, y: 109, scale: 0.857},
    },
    winningNumber5: {
        type: 'container',
        landscape: {x: 240, y: 251, scale: 1},
        portrait: {x: 582, y: 109, scale: 0.857},
    },
    winningNumber6: {
        type: 'container',
        landscape: {x: 386, y: 251, scale: 1},
        portrait: {x: 708, y: 109, scale: 0.857},
    },
    /*
     * PLAYER NUMBERS
     */
    playerNumbers: {
        type: 'container',
        children: [
            'playerNumbersTitle',
            'playerNumber1',
            'playerNumber2',
            'playerNumber3',
            'playerNumber4',
            'playerNumber5',
            'playerNumber6',
            'playerNumber7',
            'playerNumber8',
            'playerNumber9',
            'playerNumber10',
            'playerNumber11',
            'playerNumber12',
            'playerNumber13',
            'playerNumber14',
            'playerNumber15',
            'playerNumber16',
            'playerNumber17',
            'playerNumber18',
            'playerNumber19',
            'playerNumber20',
            'animationContainer'
        ],
        landscape: {x: 606, y: 66},
        portrait: {x: 33, y: 465},
    },
    playerNumbersTitle: {
        type: 'text',
        string: 'yourNumbers',
        style: 'playerNumbersTitle',
        anchor: 0.5,
        maxWidth: 750,
        landscape: {x: 386, y: 34},
        portrait: {x: 372, y: 31},
    },
    playerNumber1: {
        type: 'container',
        landscape: {x: 94, y: 122, scale: 1},
        portrait: {x: 84, y: 114, scale: 0.943},
    },
    playerNumber2: {
        type: 'container',
        landscape: {x: 240, y: 122, scale: 1},
        portrait: {x: 228, y: 114, scale: 0.943},
    },
    playerNumber3: {
        type: 'container',
        landscape: {x: 386, y: 122, scale: 1},
        portrait: {x: 372, y: 114, scale: 0.943},
    },
    playerNumber4: {
        type: 'container',
        landscape: {x: 532, y: 122, scale: 1},
        portrait: {x: 516, y: 114, scale: 0.943},
    },
    playerNumber5: {
        type: 'container',
        landscape: {x: 678, y: 122, scale: 1},
        portrait: {x: 660, y: 114, scale: 0.943},
    },
    playerNumber6: {
        type: 'container',
        landscape: {x: 94, y: 251, scale: 1},
        portrait: {x: 84, y: 236, scale: 0.943},
    },
    playerNumber7: {
        type: 'container',
        landscape: {x: 240, y: 251, scale: 1},
        portrait: {x: 228, y: 237, scale: 0.943},
    },
    playerNumber8: {
        type: 'container',
        landscape: {x: 386, y: 251, scale: 1},
        portrait: {x: 372, y: 237, scale: 0.943},
    },
    playerNumber9: {
        type: 'container',
        landscape: {x: 532, y: 251, scale: 1},
        portrait: {x: 516, y: 237, scale: 0.943},
    },
    playerNumber10: {
        type: 'container',
        landscape: {x: 678, y: 251, scale: 1},
        portrait: {x: 660, y: 237, scale: 0.943},
    },
    playerNumber11: {
        type: 'container',
        landscape: {x: 94, y: 380, scale: 1},
        portrait: {x: 84, y: 360, scale: 0.943},
    },
    playerNumber12: {
        type: 'container',
        landscape: {x: 240, y: 380, scale: 1},
        portrait: {x: 228, y: 360, scale: 0.943},
    },
    playerNumber13: {
        type: 'container',
        landscape: {x: 386, y: 380, scale: 1},
        portrait: {x: 372, y: 360, scale: 0.943},
    },
    playerNumber14: {
        type: 'container',
        landscape: {x: 532, y: 380, scale: 1},
        portrait: {x: 516, y: 360, scale: 0.943},
    },
    playerNumber15: {
        type: 'container',
        landscape: {x: 678, y: 380, scale: 1},
        portrait: {x: 660, y: 360, scale: 0.943},
    },
    playerNumber16: {
        type: 'container',
        landscape: {x: 94, y: 509, scale: 1},
        portrait: {x: 84, y: 483, scale: 0.943},
    },
    playerNumber17: {
        type: 'container',
        landscape: {x: 240, y: 509, scale: 1},
        portrait: {x: 228, y: 483, scale: 0.943},
    },
    playerNumber18: {
        type: 'container',
        landscape: {x: 386, y: 509, scale: 1},
        portrait: {x: 372, y: 483, scale: 0.943},
    },
    playerNumber19: {
        type: 'container',
        landscape: {x: 532, y: 509, scale: 1},
        portrait: {x: 516, y: 483, scale: 0.943},
    },
    playerNumber20: {
        type: 'container',
        landscape: {x: 678, y: 509, scale: 1},
        portrait: {x: 660, y: 483, scale: 0.943},
    },

    animationContainer: {
        type:'container'
    },

    /*
     * How To Play
     */
    howToPlayPages: {
        type: 'container',
        children: ['howToPlayPage1']
    },
    howToPlayPage1: {
        type: 'text',
        string: 'page1',
        style: 'howToPlayText',
        fontSize: 30,
        wordWrap: true,
        anchor: 0.5,
        align: 'center',
        landscape: {x: 720, y: 415, wordWrapWidth: 1100},
        portrait: {x: 405, y: 550, wordWrapWidth: 560},
    },
});
