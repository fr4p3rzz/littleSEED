class Resources extends Phaser.Scene {

    constructor() {
        super("Resources");
    }

    preload() {
        /** posso precaricare gli asset in una scena e rimarranno accessibili alle altre */
        this.load.image('title', '/assets/images/title.png');
        this.load.image('pause_panel', '/assets/images/pause_panel.png');
        this.load.image('resume_button', '/assets/images/resume.png');
        this.load.image('start_button', '/assets/images/start_button.png');
        this.load.image('start_button_over', '/assets/images/start_button_over.png');
        this.load.image('bg', '/assets/images/big_bg.jpg');
        this.load.image('ground', '/assets/images/platform.png');
        this.load.image('star', '/assets/images/star.png');
        this.load.image('bomb', '/assets/images/bomb.png');
        this.load.image('play_again_button', '/assets/images/play_again.png');
        this.load.spritesheet('dude', '/assets/images/dude.png', {
            frameWidth: 32,
            frameHeight: 48
        });
        this.load.spritesheet('height_buttons', 'assets/images/height_buttons_spritesheet.png', {
            frameWidth: 200,
            frameHeight: 50
        });
        this.load.spritesheet('menu_buttons', 'assets/images/menu_buttons_spritesheet.png', {
            frameWidth: 200,
            frameHeight: 100
        });
        this.load.image('full_screen_button', 'assets/images/full_screen_button.png');

        this.load.bitmapFont("retro", "assets/fonts/retro_0.png", "assets/fonts/retro.fnt");
        this.load.bitmapFont("retro_red", "assets/fonts/retro_red.png", "assets/fonts/retro.fnt");

        this.load.image("particle", "assets/images/star_particle.png");
    }

    create() {
        console.log('Resources');
        this.scene.start("DefaultScene");
    }

}