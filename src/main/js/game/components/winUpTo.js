define(require => {
    const Timeline = require('com/gsap/TimelineLite');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const resources = require('skbJet/component/pixiResourceLoader/pixiResourceLoader');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const prizeData = require('skbJet/componentManchester/standardIW/prizeData');

    const PIXI = require('com/pixijs/pixi');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');

    require('com/gsap/plugins/PixiPlugin');

    const FADE_DURATION = 0.5;
    const MIN_SCALE = 0.5;
    const MAX_SCALE = 1.5;

    const phaseOne = {
        50: '2x',
        100: '5x',
        200: '10x',
        300: '20x',
        500: '50x',
        1000: '100x',
        2000: '200x'
    };

    let outValue = 0;
    let outValueMeter = 0;

    function update() {

        let next;

        if(meterData.ticketCosts.length > 1) {
            next = 'gameLogo' + phaseOne[meterData.ticketCost];
        } else {
            next = 'gameLogo' + phaseOne[meterData.ticketCosts[0]];
        }


        if(next !== displayList.logoIn.texture.textureCacheIds[0]) {
            if(displayList.logoOut.texture.textureCacheIds.length === 0) {
                displayList.logoOut.texture = PIXI.Texture.fromFrame(next);
            } else {
                displayList.logoOut.texture = displayList.logoIn.texture;
            }


            displayList.logoIn.texture = PIXI.Texture.fromFrame(next);
            // displayList.logoFlare.texture = PIXI.Texture.fromFrame(multi[meterData.ticketCostIndex]+'Starburst');
            if(displayList.logoFlare.backgroundFlareAnim === undefined) {
                // let backgroundFlareFrames = utils.findFrameSequence('StarburstAnim');
                let backgroundFlareAnim = new PIXI.extras.AnimatedSprite([PIXI.Texture.from('RotatingStarburst')]);
                let backgroundFlare = new PIXI.Sprite(PIXI.Texture.from('RotatingStarburst'));

                backgroundFlare.anchor.set(0.5);
                // backgroundFlareAnim.textures = backgroundFlareFrames.map(PIXI.Texture.from);
                backgroundFlareAnim.loop = true;
                backgroundFlareAnim.gotoAndPlay(0);
                backgroundFlareAnim.animationSpeed = 0.2;
                backgroundFlareAnim.y = -15;
                backgroundFlareAnim.anchor.set(0.5);

                displayList.logoFlare.backgroundFlareAnim = backgroundFlareAnim;
                displayList.logoFlare.addChild(backgroundFlare,backgroundFlareAnim);

                PIXI.ticker.shared.add((t)=>{
                    backgroundFlareAnim.rotation += 0.01/t;
                });

                const bounceTimeLine = new Timeline();


                bounceTimeLine.fromTo(backgroundFlareAnim.scale,2,{
                    x:1,
                    y:1,
                },{
                    x:0.5,
                    y:0.5,
                    repeat:-1,
                    yoyo:true
                });

            }


            const inValue = meterData.ticketCostIndex;
            const outScale = inValue > outValueMeter ? MAX_SCALE : MIN_SCALE;
            const inScale = inValue > outValueMeter ? MIN_SCALE : MAX_SCALE;

            const updateTimeline = new Timeline();

            outValueMeter = inValue;

            updateTimeline.fromTo(
                displayList.logoIn,
                FADE_DURATION,
                {
                    pixi: {scaleX: inScale, scaleY: inScale},
                    alpha: 0,
                },
                {
                    pixi: {scaleX: 1, scaleY: 1},
                    alpha: 1,
                },
                0
            );

            updateTimeline.fromTo(
                displayList.logoOut,
                FADE_DURATION,
                {
                    pixi: {scaleX: 1, scaleY: 1},
                    alpha: 1,
                },
                {
                    pixi: {scaleX: outScale, scaleY: outScale},
                    alpha: 0,
                },
                0
            );
        }
    }

    function setWinUpTo() {
        const inValue = prizeData.prizeStructure[0];
        const inFormatted = SKBeInstant.formatCurrency(inValue).formattedAmount;
        const inString = resources.i18n.Game.winUpTo.replace('{0}', inFormatted);

        const outFormatted = SKBeInstant.formatCurrency(outValue).formattedAmount;
        const outString = resources.i18n.Game.winUpTo.replace('{0}', outFormatted);

        displayList.winUpToInText.text = inString;
        displayList.winUpToOutText.text = outString;

        // If outValue is 0 winUpTo is not yet set, so display the in value and skip the timeline
        if (outValue === 0 || outValue === inValue) {
            outValue = inValue;
            displayList.winUpToOut.alpha = 0;
            return;
        }

        const updateTimeline = new Timeline();
        const outScale = inValue > outValue ? MAX_SCALE : MIN_SCALE;
        const inScale = inValue > outValue ? MIN_SCALE : MAX_SCALE;

        // update outValue for next time
        outValue = inValue;

        updateTimeline.fromTo(
            displayList.winUpToIn,
            FADE_DURATION,
            {
                pixi: {scaleX: inScale, scaleY: inScale},
                alpha: 0,
            },
            {
                pixi: {scaleX: 1, scaleY: 1},
                alpha: 1,
            },
            0
        );

        updateTimeline.fromTo(
            displayList.winUpToOut,
            FADE_DURATION,
            {
                pixi: {scaleX: 1, scaleY: 1},
                alpha: 1,
            },
            {
                pixi: {scaleX: outScale, scaleY: outScale},
                alpha: 0,
            },
            0
        );
    }

    msgBus.subscribe('PrizeData.PrizeStructure', setWinUpTo);
    msgBus.subscribe('MeterData.TicketCost', update);

    return {
        reset: setWinUpTo,
    };
});
