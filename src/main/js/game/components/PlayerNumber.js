define(require => {
    const PIXI = require('com/pixijs/pixi');
    const utils = require('skbJet/componentManchester/standardIW/layout/utils');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const FittedText = require('skbJet/componentManchester/standardIW/components/fittedText');
    const textStyles = require('skbJet/componentManchester/standardIW/textStyles');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');

    require('com/gsap/TweenMax');
    require('com/gsap/easing/EasePack');

    const Tween = window.TweenMax;
    const NumberCard = require('./NumberCard');

    const TEXT_Y_POS = 56;
    const TEXT_PADDING = 10;
    const Y_OFFSET = -15;

    const multipliers = {
        'T': 2,
        'U': 5,
        'V': 10,
        'W': 20,
        'X': 50,
        'Y': 100,
        'Z': 200
    };

    const colorArray = {
        'T': '#ab47bc',
        'U': '#536dfe',
        'V': '#0bbcd4',
        'W': '#4daf4e',
        'x': '#feea3a',
        'Y': '#f8981d',
        'Z': '#f44336',
    };


    class PlayerNumber extends NumberCard {
        constructor() {
            super();

            // Set background and cover textures
            let revealFrames = utils.findFrameSequence('yourNumberCover');
            this.revealAnim.textures = revealFrames.map(PIXI.Texture.from);
            let overlayFrames = utils.findFrameSequence('yourNumberIcon');
            this.overlayAnim.textures = overlayFrames.map(PIXI.Texture.from);
            let idleFrames = utils.findFrameSequence('yourNumberIdle');

            if (idleFrames.length > 0) {
                this.idleAnim.textures = idleFrames.map(PIXI.Texture.from);
            }

            // Add IW symbol
            this.instantWinSymbol = new PIXI.Sprite();
            this.instantWinSymbol.anchor.set(0.5);
            this.instantWin = false;
            this.resultContainer.addChild(this.instantWinSymbol);

            // Add text for prize value
            this.valueText = new FittedText('XXXXXX');
            this.valueText.anchor.set(0.5);
            this.valueText.y = TEXT_Y_POS;
            this.valueText.style = textStyles.parse('prizeValueNoWin');
            this.valueText.maxWidth = this.WIDTH - TEXT_PADDING * 2;
            this.noWin.addChild(this.valueText);
            this.valueTextWin = new FittedText('XXXXXX');
            this.valueTextWin.anchor.set(0.5);
            this.valueTextWin.y = TEXT_Y_POS;
            this.valueTextWin.style = textStyles.parse('prizeValueWin');
            this.valueTextWin.maxWidth = this.WIDTH - TEXT_PADDING * 2;
            this.win.addChild(this.valueTextWin);
            this.valueTextInstantWin = new FittedText('XXXXXX');
            this.valueTextInstantWin.anchor.set(0.5);
            this.valueTextInstantWin.y = TEXT_Y_POS;
            this.valueTextInstantWin.style = textStyles.parse('prizeValueWin');
            this.valueTextInstantWin.maxWidth = this.WIDTH - TEXT_PADDING * 2;
            this.instantWinSymbol.addChild(this.valueTextInstantWin);
            this.hoverState.texture = PIXI.Texture.from('yourNumberMouseOver');
            this.tweens = [];


            // Offset everything to account for the value text at the bottom
            this.win.y = Y_OFFSET;
            this.noWin.y = Y_OFFSET;
            this.instantWinSymbol.y = Y_OFFSET;

            this.reset();




        }

        populate([number, value]) {
            this.number = number;
            this.value = value;
            this.valueText.text = SKBeInstant.formatCurrency(value).formattedAmount;

            if (Object.keys(multipliers).indexOf(number) > -1) {
                this.value = (value * multipliers[number]);
                Tween.to(this.backgroundEffect, 1, {pixi:{colorize:colorArray[number], colorizeAmount:1}});
                this.instantWinSymbol.texture = PIXI.Texture.fromFrame('multiplier'+multipliers[number]+'x');
                this.valueTextInstantWin.text = this.valueText.text;
                this.instantWinSymbol.visible = true;
                this.instantWin = true;
                this.resultContainer.scale.set(0);
            } else {
                this.valueTextWin.text = this.valueText.text;
                this.resultContainer.scale.set(1);
                super.populate(number);
            }
            console.log(number);

        }

        presentWin() {
            return new Promise(resolve => {
                if(!this.instantWin) {

                    let x = this.resultContainer.parent.parent.x;
                    let y = this.resultContainer.parent.parent.y;

                    displayList.animationContainer.addChild(this.resultContainer);
                    this.resultContainer.x = x;
                    this.resultContainer.y = y;

                    Tween.fromTo(
                        this.resultContainer.scale,
                        0.75,
                        {
                            x: 0.666,
                            y: 0.666,
                        },
                        {
                            x: 1,
                            y: 1,
                            ease: window.Elastic.easeOut.config(
                                gameConfig.matchAnimAmplitude,
                                gameConfig.matchAnimPeriod
                            ),
                            onComplete: () => {
                                this.background.parent.addChild(this.resultContainer);
                                this.resultContainer.x = 0;
                                this.resultContainer.y = 0;
                                resolve();
                            },
                        }
                    );
                } else {
                    this.backgroundEffect.textures = PIXI.Texture.EMPTY;

                    let backgroundEffectFrames = utils.findFrameSequence('MultiplierBGAnim');
                    this.backgroundEffect.textures = backgroundEffectFrames.map(PIXI.Texture.from);
                    this.backgroundEffect.animationSpeed = 0.5;

                    this.tweens[0] = new Tween.to(this.resultContainer.scale,0.5,{
                        x:1.2,
                        y:1.2,
                        onComplete:()=>{
                            this.backgroundEffect.visible = true;
                            this.backgroundEffect.alpha = 0;

                            this.tweens[1] = new Tween.to(this.backgroundEffect,0.5,{
                                alpha: 1
                            });
                            this.backgroundEffect.gotoAndPlay(0);
                            this.tweens[2] = new Tween.to({},1,{
                                onComplete:resolve
                            });
                            this.tweens[3] = new Tween.fromTo(this.resultContainer.scale,0.5,{
                                x:1.2,
                                y:1.2,
                            },{
                                x:1,
                                y:1,
                                yoyo:true,
                                repeat:-1
                            });
                        }
                    });

                }

            });
        }

        reset() {
            super.reset();
            this.instantWin = false;
            this.instantWinSymbol.visible = false;
            this.valueText.text = '';
            this.valueTextWin.text = '';
            this.valueTextInstantWin.text = '';
            this.tweens.forEach((e)=>{
                e.kill();
            });
        }

        static fromContainer(container) {
            const card = new PlayerNumber();
            container.addChild(card);
            container.card = card;
            return card;
        }
    }

    return PlayerNumber;
});
