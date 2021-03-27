
var game;

var gameOptions = {
    levelWidth: window.innerWidth,
    levelheight: window.innerHeight,
    viewPortWidth: window.innerWidth,
    viewPortHeight: window.innerHeight,
}
/** contiene i key binding per i controlli del nostro gioco */
var cursors;
/** contiene la musica tra le scene  */
var gameMusic;

var activeProperties = [];
var treePropertiesStartingHeight = 65;
var treePropertiesStartingWidth = 20;
var propertiesSpacing = 20;

window.onload = function() {
    var config = {
        type: Phaser.CANVAS, 
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            /**  MODIFICO LE DIMENSIONI */
            width: gameOptions.viewPortWidth,
            height: gameOptions.viewPortHeight
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        scene: [Resources, DefaultScene, GameHud, PauseMenu],
        backgroundColor: 0x2b2b2b,
    };

    game = new Phaser.Game(config);
    window.focus();
};


