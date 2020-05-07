class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOverScene");
    }
    preload(){
        this.load.atlas('gameOverScreen', './assets/GameOver.png', './assets/GameOver.json');
    }
    create(){
        this.anims.create({
            key: 'gameOverAnim',
            frames: this.anims.generateFrameNames('gameOverScreen', {
                prefix: 'sprite',
                start:1,
                end: 10
            }),
            frameRate: 6,
            repeat: -1
        });
        //add sprite
        this.loseGame = this.add.sprite(0,0,'gameOverScreen').setOrigin(0,0);
        this.loseGame.play('gameOverAnim');
        this.add.text(10, 10, 'Survial Points: ' + Play.timer);
        this.add.text(10, 30, 'Star Points: ' + (Play.stars * 250));
        this.add.text(10, 50, 'Total Score: ' + (Play.timer + (Play.stars * 250)));
        //key implementations
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.start("playScene");
        }
    }
}