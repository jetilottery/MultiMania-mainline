define(require => {

    const ColorSwapper = require('game/components/classes/ColorSwapper');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');
    const PIXI = require('com/pixijs/pixi');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const utils = require('skbJet/componentManchester/standardIW/layout/utils');

    let colorSwapObjects = [];

    let plaqueFrameArray = [];
    let overlayFrameArray = [];

    function init() {
        colorSwapObjects = [
            displayList.playerNumber1.card.overlayAnim,
            displayList.playerNumber2.card.overlayAnim,
            displayList.playerNumber3.card.overlayAnim,
            displayList.playerNumber4.card.overlayAnim,
            displayList.playerNumber5.card.overlayAnim,
            displayList.playerNumber6.card.overlayAnim,
            displayList.playerNumber7.card.overlayAnim,
            displayList.playerNumber8.card.overlayAnim,
            displayList.playerNumber9.card.overlayAnim,
            displayList.playerNumber10.card.overlayAnim,
            displayList.playerNumber11.card.overlayAnim,
            displayList.playerNumber12.card.overlayAnim,
            displayList.playerNumber13.card.overlayAnim,
            displayList.playerNumber14.card.overlayAnim,
            displayList.playerNumber15.card.overlayAnim,
            displayList.playerNumber16.card.overlayAnim,
            displayList.playerNumber17.card.overlayAnim,
            displayList.playerNumber18.card.overlayAnim,
            displayList.playerNumber19.card.overlayAnim,
            displayList.playerNumber20.card.overlayAnim,
            displayList.winningNumber1.card.overlayAnim,
            displayList.winningNumber2.card.overlayAnim,
            displayList.winningNumber3.card.overlayAnim,
            displayList.winningNumber4.card.overlayAnim,
            displayList.winningNumber5.card.overlayAnim,
            displayList.winningNumber6.card.overlayAnim,
            displayList.playerNumber1.card.idleAnim,
            displayList.playerNumber2.card.idleAnim,
            displayList.playerNumber3.card.idleAnim,
            displayList.playerNumber4.card.idleAnim,
            displayList.playerNumber5.card.idleAnim,
            displayList.playerNumber6.card.idleAnim,
            displayList.playerNumber7.card.idleAnim,
            displayList.playerNumber8.card.idleAnim,
            displayList.playerNumber9.card.idleAnim,
            displayList.playerNumber10.card.idleAnim,
            displayList.playerNumber11.card.idleAnim,
            displayList.playerNumber12.card.idleAnim,
            displayList.playerNumber13.card.idleAnim,
            displayList.playerNumber14.card.idleAnim,
            displayList.playerNumber15.card.idleAnim,
            displayList.playerNumber16.card.idleAnim,
            displayList.playerNumber17.card.idleAnim,
            displayList.playerNumber18.card.idleAnim,
            displayList.playerNumber19.card.idleAnim,
            displayList.playerNumber20.card.idleAnim,
            displayList.winningNumber1.card.idleAnim,
            displayList.winningNumber2.card.idleAnim,
            displayList.winningNumber3.card.idleAnim,
            displayList.winningNumber4.card.idleAnim,
            displayList.winningNumber5.card.idleAnim,
            displayList.winningNumber6.card.idleAnim,
            displayList.playerNumber1.card.resultContainer.backgroundEffect,
            displayList.playerNumber2.card.resultContainer.backgroundEffect,
            displayList.playerNumber3.card.resultContainer.backgroundEffect,
            displayList.playerNumber4.card.resultContainer.backgroundEffect,
            displayList.playerNumber5.card.resultContainer.backgroundEffect,
            displayList.playerNumber6.card.resultContainer.backgroundEffect,
            displayList.playerNumber7.card.resultContainer.backgroundEffect,
            displayList.playerNumber8.card.resultContainer.backgroundEffect,
            displayList.playerNumber9.card.resultContainer.backgroundEffect,
            displayList.playerNumber10.card.resultContainer.backgroundEffect,
            displayList.playerNumber11.card.resultContainer.backgroundEffect,
            displayList.playerNumber12.card.resultContainer.backgroundEffect,
            displayList.playerNumber13.card.resultContainer.backgroundEffect,
            displayList.playerNumber14.card.resultContainer.backgroundEffect,
            displayList.playerNumber15.card.resultContainer.backgroundEffect,
            displayList.playerNumber16.card.resultContainer.backgroundEffect,
            displayList.playerNumber17.card.resultContainer.backgroundEffect,
            displayList.playerNumber18.card.resultContainer.backgroundEffect,
            displayList.playerNumber19.card.resultContainer.backgroundEffect,
            displayList.playerNumber20.card.resultContainer.backgroundEffect,
            displayList.winningNumber1.card.resultContainer.backgroundEffect,
            displayList.winningNumber2.card.resultContainer.backgroundEffect,
            displayList.winningNumber3.card.resultContainer.backgroundEffect,
            displayList.winningNumber4.card.resultContainer.backgroundEffect,
            displayList.winningNumber5.card.resultContainer.backgroundEffect,
            displayList.winningNumber6.card.resultContainer.backgroundEffect,
            displayList.backgroundPattern,
            displayList.winUpToBackground
        ];

        function addPricePointIndicators() {
            if(displayList.ticketCostIndicators !== void(0)) {
                if(displayList.ticketCostIndicators.children.length > -1) {
                    displayList.ticketCostIndicators.children.forEach(function (e,i) {
                        if (e._texture.textureCacheIds[0] === "pricePointIndicatorActive") {
                            displayList['ticketPoint'+[i-1]] = e;
                            colorSwapObjects.push(displayList['ticketPoint'+[i-1]]);
                        }
                    });
                }
            }
        } addPricePointIndicators();

        function addTicketSelectBar() {
            let overlayFrame = new PIXI.Sprite(PIXI.Texture.from(orientation.get() === orientation.LANDSCAPE ? 'TicketCostFrame_Landscape' : 'TicketCostFrame_Portrait'));
            displayList.ticketSelectBar.overlayFrame = overlayFrame;
            displayList.ticketSelectBar.addChild(overlayFrame);
            overlayFrame.anchor.set(0.5);
            colorSwapObjects.push(overlayFrame);
            overlayFrameArray.push(overlayFrame);
        } addTicketSelectBar();

        function addPlaqueFrame(target) {
            let plaqueFrame = new PIXI.Sprite(PIXI.Texture.from(orientation.get() === orientation.LANDSCAPE ? 'landscape_endOfGameMessageWinBackgroundFrame' : 'portrait_endOfGameMessageWinBackgroundFrame'));
            plaqueFrame.anchor.set(0.5);
            target.addChild(plaqueFrame);
            colorSwapObjects.push(plaqueFrame);
            plaqueFrameArray.push(plaqueFrame);
        }
        addPlaqueFrame(displayList.winPlaqueBG);
        addPlaqueFrame(displayList.losePlaqueBG);

        function addPlaqueEffects() {
            let starFrames = utils.findFrameSequence('WinPlaqueStars');
            let starAnim = new PIXI.extras.AnimatedSprite([PIXI.Texture.EMPTY]);
            starAnim.textures = starFrames.map(PIXI.Texture.from);
            let sheenFrames = utils.findFrameSequence('WinPlaqueGradientSweep');
            let sheenAnim = new PIXI.extras.AnimatedSprite([PIXI.Texture.EMPTY]);
            sheenAnim.textures = sheenFrames.map(PIXI.Texture.from);
            starAnim.anchor.set(0.5);
            starAnim.scale.set(2);
            starAnim.gotoAndPlay(0);
            starAnim.y = 40;
            starAnim.animationSpeed = 0.5;

            displayList.starAnim = starAnim;
            starAnim.name = 'starAnim';

            sheenAnim.anchor.set(0.5);
            sheenAnim.gotoAndPlay(0);

            if(orientation.get() === orientation.LANDSCAPE) {
                sheenAnim.y = -70;
            } else {
                sheenAnim.y = -10;
                sheenAnim.scale.set(0.7,0.6);
            }

            sheenAnim.animationSpeed = 0.5;

            sheenAnim.blendMode = PIXI.BLEND_MODES.SCREEN;

            displayList.winPlaqueBG.addChild(starAnim);
            displayList.winPlaqueBG.parent.addChildAt(sheenAnim,1);
            colorSwapObjects.push(starAnim);
        } addPlaqueEffects();


        console.log(displayList);


    }

    function updateColors() {

        const phaseOne = {
            50: 0,
            100:1,
            200:2,
            300:3,
            500:4,
            1000:5,
            2000:6
        };

        let target = undefined;

        if(meterData.ticketCosts.length > 1) {
            target = phaseOne[meterData.ticketCost];
        } else {
            target = phaseOne[meterData.ticketCosts[0]];
        }

        ColorSwapper.setDefault(colorSwapObjects,target);
    }

    function onOrientationChange() {
        overlayFrameArray.forEach(e=>{
            e.setTexture(PIXI.Texture.from(orientation.get() === orientation.LANDSCAPE ? 'TicketCostFrame_Landscape' : 'TicketCostFrame_Portrait'));
        });

        plaqueFrameArray.forEach(e=>{
            e.setTexture(PIXI.Texture.from(orientation.get() === orientation.LANDSCAPE ? 'landscape_endOfGameMessageWinBackgroundFrame' : 'portrait_endOfGameMessageWinBackgroundFrame'));
        });


    }

    msgBus.subscribe('MeterData.TicketCost', updateColors);
    msgBus.subscribe('UI.updateButtons',updateColors);
    msgBus.subscribe('GameSize.OrientationChange', onOrientationChange);


    return {
        init:init
    };
});