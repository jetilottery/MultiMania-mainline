define(require => {

    const PIXI = require('com/pixijs/pixi');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const resourceLib = require('skbJet/component/resourceLoader/resourceLib');

    function init() {
        let video = resourceLib.videos.vid_1;

        video.loop = true;
        video.muted = true;

        let background = new PIXI.Sprite(PIXI.Texture.from(video));

        displayList.videoBackground = background;
        displayList.background.addChildAt(background,0);
    }

    return{
        init:init
    };

});