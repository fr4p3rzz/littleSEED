
var game;

var gameOptions = {
    levelWidth: window.innerWidth,
    levelheight: window.innerHeight,
    viewPortWidth: window.innerWidth,
    viewPortHeight: window.innerHeight,
}

/** Contains music between scenes  */
var gameMusic;

var activeProperties = [];
var treePropertiesStartingHeight = 65;
var treePropertiesStartingWidth = 20;
var propertiesSpacing = 20;

var stormyFeedback = "A storm is coming";
var rainyFeedback = "It's starting to gently rain";
var sunnyFeedback = "It's a beautiful day, full of opportunities";
var scorchingFeedback = "The sun is burning in the sky";

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //max and min are included
}

window.onload = function() {
    var config = {
        type: Phaser.CANVAS, 
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            /**  Here I change dimensions */
            width: gameOptions.viewPortWidth,
            height: gameOptions.viewPortHeight
        },
        fps: {
            target: 10,
            forceSetTimeOut: true
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        scene: [Resources, DefaultScene, GameHud],
        backgroundColor: 0x2b2b2b,
    };

    game = new Phaser.Game(config);
    window.focus();
};


