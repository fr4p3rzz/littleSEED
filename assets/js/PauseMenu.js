class PauseMenu extends Phaser.Scene {
    title;
    menuButton;
    resumeButton;
    fullscreenButton;
    cursors;

    constructor() {
        super("Pause");
    }

    create() {

        this.add.image(640, 360, 'pause_panel');
        this.title = this.add.image(640, 170, 'title').setScale(0.75);

        this.resumeButton = this.add.image(640, 300, 'resume_button');
        this.resumeButton.setInteractive();
        this.resumeButton.on('pointerdown', () => {
            this.scene.resume('DefaultScene');
            this.scene.stop('Pause');
        });

        this.menuButton = this.add.image(640, 420, 'play_again_button');
        this.menuButton.setInteractive();
        this.menuButton.on('pointerdown', () => {
            this.scene.stop('DefaultScene');
            this.scene.stop('Pause');
            this.scene.stop('HUD');
            this.scene.start("MainMenu");
        });

        this.fullscreenButton = this.add.sprite(640, 540, 'full_screen_button', 0);
        this.fullscreenButton.setInteractive();
        this.fullscreenButton.on('pointerdown', () => {
            if (!this.scale.isFullscreen) {
                this.scale.startFullscreen();
            } else {
                this.scale.stopFullscreen();
            }
        });

        this.cursors = {
            esc: this.input.keyboard.addKey('ESC'),
        }
    }

    update() {
        if (this.cursors.esc.isDown) {
            this.scene.stop("Pause");
            this.scene.resume("DefaultScene");
        }
    }







}