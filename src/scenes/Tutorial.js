class Tutorial extends Phaser.Scene{
    constructor(){
        super("tutorialScene");
    }
    preload(){
        this.load.atlas('ufo','./assets/ufo.png', './assets/ufo.json');
        this.load.atlas('asteroid', './assets/asteroid.png', './assets/asteroid.json');
        this.load.atlas('star', './assets/star.png', './assets/star.json');
        this.load.atlas('golfball', './assets/golfBall.png', './assets/golfBall.json');
        this.load.atlas('astroGolf', './assets/astroGolf.png','./assets/astroGolf.json');
    }
    create(){
        //sprite creation
        this.playerSprite = this.add.sprite(30,50,'golfball').setScale(0.2,0.2);
        this.asteroidSprite = this.add.sprite(30, 110, 'asteroid');
        this.ufoSprite = this.add.sprite(100, 110, 'ufo');
        this.starSprite = this.add.sprite(30, 160, 'star');
        //Tutorial Text
        this.add.text(75, 40, '<- This is you! Use the arrow keys to move around!');
        this.add.text(140, 105, '<- Avoid these!');
        this.add.text(60, 160, '<- Grab these for extra points at the end!');
        this.add.text(150, 350, 'Got it? Great! Press SPACE to start!');
        //animation code (asteroid)
        this.anims.create({
            key: 'asteroidStill',
            frames: this.anims.generateFrameNames('asteroid', {
                prefix: 'sprite',
                end: 3
            }),
            frameRate: 8,
            repeat: -1
        });
        //animation code(player)
        this.anims.create({
            key: 'ballAnim',
            frames: this.anims.generateFrameNames('golfball', {
                prefix: 'sprite',
                start:1,
                end: 10
            }),
            frameRate: 8,
            repeat: -1
        });
        //animation code(ship)
        this.anims.create({
            key: 'ufoAnim',
            frames: this.anims.generateFrameNames('ufo', {
                prefix: 'sprite',
                start:1,
                end: 10
            }),
            frameRate: 8,
            repeat: -1
        });
        //animation code(star)
        this.anims.create({
            key: 'starMove',
            frames: this.anims.generateFrameNames('star', {
                prefix: 'sprite',
                start:1,
                end: 8
            }),
            frameRate: 8,
            repeat: -1
        });
        //play all animations
        this.playerSprite.play('ballAnim');
        this.asteroidSprite.play('asteroidStill');
        this.ufoSprite.play('ufoAnim');
        this.starSprite.play('starMove');
        //Space bar to start the game!
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.start("playScene");
        }
    }
}