class GameHud extends Phaser.Scene {

    scoreText;
    //fullscreenButton;

    constructor() {
        super("HUD");
    }

    create() {
        this.scoreText = this.add.bitmapText(16, 16, "bitfont", "Score: 0");
        this.scoreText.setScrollFactor(0);

        /*
                this.fullscreenButton = this.add.sprite(1250, 35, 'full_screen_button', 0);
                this.fullscreenButton.setInteractive();
                this.fullscreenButton.on('pointerdown', () => {
                    if (!this.scale.isFullscreen) {
                        this.scale.startFullscreen();
                    } else {
                        this.scale.stopFullscreen();
                    }
                });
                this.fullscreenButton.setScrollFactor(0);
        		*/
    }

}