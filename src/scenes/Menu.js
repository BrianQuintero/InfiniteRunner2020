class Menu extends Phaser.Scene{
    constructor(){
        super("mainMenu");
    }
    preload(){
        this.load.atlas('titleScreen', './assets/titleScreen.png', './assets/titleScreen.json');
    }
    create(){
        //title screen animation
        this.anims.create({
            key: 'titleScreenAnim',
            frames: this.anims.generateFrameNames('titleScreen', {
                prefix: 'sprite',
                start:1,
                end: 10
            }),
            frameRate: 6,
            repeat: -1
        });
        //add sprite
        this.title = this.add.sprite(0,0,'titleScreen').setOrigin(0,0);
        this.title.play('titleScreenAnim');
        this.add.text((game.config.width/2) - 175,(game.config.height/2) + 25,'First time? Press T for a tutorial!');

        //key implementations
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.start("playScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyT)){
            this.scene.start("tutorialScene");
        }
    }
}