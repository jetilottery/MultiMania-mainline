define(require => {

    const PIXI = require('com/pixijs/pixi');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');


    function init() {
        let background = displayList.winPlaqueBG.parent;
        let effect = displayList.starAnim;

        let mask = new PIXI.Graphics();

        mask.beginFill();

        if(orientation.get() === orientation.LANDSCAPE) {
            mask.drawRect(
                -604,
                -264,
                1208,
                530
            );
        } else {
            mask.drawRect(
                -390,
                -400,
                780,
                800
            );
        }


        mask.endFill();


        background.addChildAt(mask,2);

        effect.mask = mask;
    }

    return {
        init
    };
});