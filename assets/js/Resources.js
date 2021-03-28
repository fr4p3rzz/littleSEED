class Resources extends Phaser.Scene {

    constructor() {
        super("Resources");
    }

    preload() {
        this.load.spritesheet('height_buttons', 'assets/images/height_buttons_spritesheet.png', {
            frameWidth: 200,
            frameHeight: 50
        });
        this.load.spritesheet('leaves_buttons', 'assets/images/leaves_buttons_spritesheet.png', {
            frameWidth: 200,
            frameHeight: 50
        });
        this.load.spritesheet('sun_energy_buttons', 'assets/images/sun_energy_buttons_spritesheet.png', {
            frameWidth: 200,
            frameHeight: 50
        });

        this.load.bitmapFont("retro", "assets/fonts/retro_0.png", "assets/fonts/retro.fnt");
        this.load.bitmapFont("retro_red", "assets/fonts/retro_red.png", "assets/fonts/retro.fnt");
        this.load.bitmapFont("retro_cyan", "assets/fonts/retro_cyan.png", "assets/fonts/retro.fnt");
        this.load.bitmapFont("retro_gold", "assets/fonts/retro_gold.png", "assets/fonts/retro.fnt");
    }

    create() {
        console.log('Resources');
        this.scene.start("DefaultScene");
    }

}