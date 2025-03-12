define(require => {
    const PIXI = require('com/pixijs/pixi');
    const Pressable = require('skbJet/componentManchester/standardIW/components/pressable');
    const utils = require('skbJet/componentManchester/standardIW/layout/utils');
    const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    require('com/gsap/TweenLite');
    require('com/gsap/easing/EasePack');

    const Tween = window.TweenLite;

    const winFrameName = 'numberWin';
    const noWinFrameName = 'numberNoWin';

    class NumberCard extends Pressable {
        constructor() {
            super();

            this.WIDTH = 174;
            this.HEIGHT = 174;

            // Create all the empty sprites
            this.background = new PIXI.Sprite();
            this.win = new PIXI.Sprite();
            this.noWin = new PIXI.Sprite();
            this.backgroundEffect = new PIXI.extras.AnimatedSprite([PIXI.Texture.EMPTY]);
            this.revealAnim = new PIXI.extras.AnimatedSprite([PIXI.Texture.EMPTY]);
            this.revealAnim.loop = false;
            this.revealAnim.animationSpeed = 0.7;
            this.overlayAnim = new PIXI.extras.AnimatedSprite([PIXI.Texture.EMPTY]);
            this.overlayAnim.loop = false;
            this.overlayAnim.animationSpeed = 0.7;
            this.idleAnim = new PIXI.extras.AnimatedSprite([PIXI.Texture.EMPTY]);
            this.idleAnim.loop = false;
            this.idleAnim.animationSpeed = 0.5;
            this.idleAnim.visible = false;

            this.idleAnim.onComplete = () => {
                this.idleAnim.visible = false;
                this.revealAnim.visible = true;
            };

            let backgroundEffectFrames = utils.findFrameSequence('matchAnimation');
            this.backgroundEffect.textures = backgroundEffectFrames.map(PIXI.Texture.from);
            this.backgroundEffect.animationSpeed = 0.5;

            this.backgroundEffect.gotoAndPlay(0);
            // Center everything
            this.background.anchor.set(0.5);
            this.win.anchor.set(0.5);
            this.overlayAnim._anchor.set(0.5);
            this.noWin.anchor.set(0.5);
            this.revealAnim.anchor.set(0.5);
            this.idleAnim.anchor.set(0.5);
            this.backgroundEffect.anchor.set(0.5);

            this.hoverState = new PIXI.Sprite(PIXI.Texture.EMPTY);
            this.hoverState.visible = false;
            this.hoverState.anchor.set(0.5);
            this.revealAnim.addChild(this.hoverState);

            // Add all the result elements to a container
            this.resultContainer = new PIXI.Container();
            this.resultContainer.addChild( this.backgroundEffect, this.win, this.noWin);
            this.resultContainer.visible = false;
            this.resultContainer.name = 'resultContainer';
            this.resultContainer.backgroundEffect = this.backgroundEffect;

            this.addChild(this.background, this.resultContainer, this.revealAnim, this.overlayAnim, this.idleAnim);

            // State
            this.revealed = false;

            // Interactivity
            // this.hitArea = new PIXI.Rectangle(
            //     this.WIDTH / -2,
            //     this.HEIGHT / -2,
            //     this.WIDTH,
            //     this.HEIGHT
            // );
            this.on('press', () => {
                if (!autoPlay.enabled) {
                    this.reveal();
                    this.hoverState.visible = false;
                }
            });

            this.on('mouseover',() => {
                this.hoverState.visible = true;
            });

            this.on('mouseout',() => {
                this.hoverState.visible = false;
            });
        }

        enable() {
            return new Promise(resolve => {
                this.reveal = resolve;
                this.enabled = true;
            });
        }

        populate(number) {
            this.number = number;
            this.noWin.texture = PIXI.Texture.fromFrame(noWinFrameName + number);
            this.win.texture = PIXI.Texture.fromFrame(winFrameName + number);
            this.noWin.visible = true;
        }

        prompt() {
            if (!this.revealed && this.idleAnim.textures.length > 1) {
                this.overlayAnim.visible = false;
                this.idleAnim.visible = true;
                this.idleAnim.gotoAndPlay(0);
                this.idleAnim.onComplete = () => {
                    this.overlayAnim.visible = true;
                    this.idleAnim.visible = false;
                };
            }
        }

        disable() {
            this.enabled = false;
            this.reveal = undefined;
        }

        reset() {
            this.noWin.texture = PIXI.Texture.EMPTY;
            this.win.texture = PIXI.Texture.EMPTY;
            this.enabled = false;
            this.revealAnim.gotoAndStop(0);
            this.overlayAnim.gotoAndStop(0);
            this.overlayAnim.visible = true;
            this.revealAnim.visible = true;
            this.noWin.visible = false;
            this.win.visible = false;
            this.backgroundEffect.visible = false;
            this.resultContainer.visible = false;
            this.revealed = false;
            this.matched = false;
            this.number = undefined;
        }

        async uncover() {
            if (this.revealAnim.textures && this.revealAnim.textures.length > 1) {
                await new Promise(resolve => {
                    // bring to front in case the animation overlaps neighboring cards
                    this.revealAnim.parent.parent.setChildIndex(
                        this.revealAnim.parent,
                        this.revealAnim.parent.parent.children.length - 1
                    );

                    // Calculate the animation's duration in seconds
                    const duration = this.revealAnim.textures.length / this.revealAnim.animationSpeed / 60;
                    const halfDuration = duration / 2;
                    // Tween in the results over the 2nd half of the animation
                    this.resultContainer.visible = true;
                    Tween.fromTo(
                        this.resultContainer,
                        halfDuration,
                        {alpha: 0},
                        {
                            alpha: 1,
                            delay: halfDuration / 2,
                        }
                    );

                    // Wait for the animation to complete before resolving
                    if(!this.number === undefined) {
                        this.revealAnim.onComplete = () => {
                            this.revealAnim.visible = false;
                            this.revealed = true;
                            resolve();
                        };
                    } else {
                        this.revealAnim.onComplete = () => {
                            this.revealAnim.visible = false;
                            this.revealed = true;
                        };
                        Tween.to({},halfDuration,{
                            onComplete:resolve
                        });

                    }


                    this.overlayAnim.onComplete = () => {
                        this.overlayAnim.visible = false;
                    };

                    // Disable interactivity to prevent re-reveal, then switch to the animation
                    this.enabled = false;
                    this.revealAnim.gotoAndPlay(0);
                    this.overlayAnim.gotoAndPlay(0);
                });
            } else {
                // Otherwise just a swap to the resultsContainer
                this.resultContainer.visible = true;
                this.revealAnim.visible = false;
                this.revealed = true;
            }
        }

        match() {
            this.matched = true;
            this.win.visible = true;
            this.noWin.visible = false;

            this.backgroundEffect.visible = true;
        }

        presentWin() {
            return new Promise(resolve =>
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
                        onComplete: resolve,
                    }
                )
            );
        }
    }

    return NumberCard;
});
