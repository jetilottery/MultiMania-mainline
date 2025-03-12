define(require => {

    require('com/gsap/plugins/PixiPlugin');
    require('com/gsap/TweenLite');

    const Tween = window.TweenLite;

    require('com/gsap/easing/EasePack');

    const colorArray = {
        0: '#ab47bc',
        1: '#536dfe',
        2: '#0bbcd4',
        3: '#4daf4e',
        4: '#feea3a',
        5: '#f8981d',
        6: '#f44336',
    };

    class ColorSwapper {
        constructor() {}

        static setDefault(a,i) {
            a.forEach(function (e,/*index*/) {
                Tween.to(e, 1, {pixi:{colorize:colorArray[i], colorizeAmount:1}});
            });

        }
    }

    return ColorSwapper;

});