class MainMenu extends Phaser.Scene {

    title;
    startButton;

    constructor() {
        super("MainMenu");
    }



    create() {
        console.log('main menu');

        this.showTitle();
    }

    showTitle() {
        this.title = this.add.sprite(640, 100, 'title');
        this.title.alpha = 0;
        this.tweens.add({
            targets: [this.title],
            alpha: 1,
            duration: 1000,
            callbackScope: this,
            onComplete: function() {
                this.showButtons();
            }
        });


    }

    showButtons() {
        //this.startButton = this.add.sprite(400, 800, 'start_button');
        this.startButton = this.add.sprite(640, 800, 'menu_buttons', 0);
        this.tweens.add({
            targets: [this.startButton],
            y: 300,
            duration: 1000,
        });
        this.startButton.setInteractive();
        this.startButton.on('pointerdown', () => {
            this.scene.start("DefaultScene");
        });
        this.startButton.on('pointerover', () => {
            //this.startButton.setTint(0x00ff00);
            //this.startButton.setTexture('start_button_over');
            this.startButton.setTexture('menu_buttons', 1);
        });
        this.startButton.on('pointerout', () => {
            //this.startButton.setTint(0xffffff);
            //this.startButton.setTexture('start_button');
            this.startButton.setTexture('menu_buttons', 0);
        });


        this.fullscreenButton = this.add.sprite(1250, 35, 'full_screen_button');
        this.fullscreenButton.setInteractive();
        this.fullscreenButton.on('pointerdown', () => {
            if (!this.scale.isFullscreen) {
                this.scale.startFullscreen();
            } else {
                this.scale.stopFullscreen();
            }
        });

    }

}