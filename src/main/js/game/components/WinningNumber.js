define((require) => {
    const PIXI = require('com/pixijs/pixi');
    const utils = require('skbJet/componentManchester/standardIW/layout/utils');

    const NumberCard = require('./NumberCard');

    class WinningNumber extends NumberCard {
        constructor() {
            super();

            var revealFrames = utils.findFrameSequence('luckyNumberCover');
            this.revealAnim.textures = revealFrames.map(PIXI.Texture.from);
            var overlayFrames = utils.findFrameSequence('luckyNumberIcon');
            this.overlayAnim.textures = overlayFrames.map(PIXI.Texture.from);
            var idleFrames = utils.findFrameSequence('luckyNumberIdle');
            if (idleFrames) {
                this.idleAnim.textures = idleFrames.map(PIXI.Texture.from);
            }

            this.reset();

            this.hoverState.texture = PIXI.Texture.from('yourNumberMouseOver');
        }

        static fromContainer(container) {
            const card = new WinningNumber();
            container.addChild(card);
            container.card = card;
            return card;
        }
    }

    return WinningNumber;
});
