class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        //sprite creation
        this.load.image('surface', './assets/moon.png');
        this.load.image('ball', './assets/ball.png');
        this.load.image('obstacleTest', './assets/obstacleTest.png');
        this.load.image('collectibleTest', './assets/collectibleTest.png');
        this.load.image('bannerUI', './assets/bannerUI.png');
        //this.load.image('asteroid', './assets/asteroid.png');
        //audio
        this.load.audio('collect', './assets/collect.wav');
        this.load.audio('loseGame', './assets/loseGame.wav');
        this.load.audio('bgm', './assets/BGM.wav');
        this.load.audio('hitGolf', './assets/Hit2.wav');
        //Animation Atlas
        this.load.atlas('ufo','./assets/ufo.png', './assets/ufo.json');
        this.load.atlas('asteroid', './assets/asteroid.png', './assets/asteroid.json');
        this.load.atlas('star', './assets/star.png', './assets/star.json');
        this.load.atlas('golfball', './assets/golfBall.png', './assets/golfBall.json');
        this.load.atlas('astroGolf', './assets/astroGolf.png','./assets/astroGolf.json');
    }
    create(){
        //creation of background
        Play.level = 1;
        this.timer = 0;
        this.coins = 0;
        this.surface = this.add.tileSprite(0,0,640,480,'surface').setOrigin(0,0);
        this.UI = this.add.sprite(0,0,'bannerUI').setOrigin(0,0);
        this.UI.depth = 10;
        this.ballHit = false;
        //asteroid animations
        this.anims.create({
            key: 'asteroidStill',
            frames: this.anims.generateFrameNames('asteroid', {
                prefix: 'sprite',
                end: 3
            }),
            frameRate: 8,
            repeat: -1
        });
        //astronaut animation
        this.anims.create({
            key: 'golferAnim',
            frames: this.anims.generateFrameNames('astroGolf', {
                prefix: 'sprite',
                end: 22
            }),
            frameRate: 8,
            repeat: -1
        });
        this.astroGolfer = this.add.sprite((game.config.width / 2) - 30, game.config.height - 50, 'astroGolf');
        this.astroGolfer.anims.play('golferAnim');
        //player creation
        this.player = new Player(this, 1000,1000,'golfball').setScale(0, 0);
        //obstacle creation
        this.obstacles = this.physics.add.group();
        //this.staticObstacle = new StaticObstacle(this, game.config.width/2,0,'asteroid');
        this.AlienShip = new SineShip(this, 0, 0, 'ufo');
        //bgm config
        this.bgm = this.sound.add('bgm', {
            mute: false,
            volume: 1,
            rate: 1,
            loop:true
        });
        //Creation of Score and Coin Text Boxes
        this.timeScore = this.add.text(100, 25, 'Score: 0', {backgroundColor: '#000000'});
        this.timeScore.depth = 11;
        //this.scoreBox = this.add.text();
        //collision creation for collectible
        this.collectible = new Collectible(this, 1000, 0, 'star');
        //initial game conditions
        this.gameOver = false;
        if(!this.gameOver){
            this.bgm.play();
        }
        //clock for starting
        this.clock = this.time.delayedCall(1978, () => {
            this.ballHit = true;
            this.player.x = game.config.width/2;
            this.player.y = 431;
            this.player.setScale(0.05, 0.05);
            this.player.setScale(0.1,0.1);
            this.player.setScale(0.2,0.2);
        },null, this);
        //collision detection for obstacles and powerups (yes, I know this is a mess)
        this.physics.add.collider(this.player, this.obstacles, this.collisionObstacle, null, this);
        this.physics.add.collider(this.obstacles, this.player, this.collisionObstacle, null, this);
        this.physics.add.overlap(this.player, this.obstacles, this.collisionObstacle, null, this);
        this.physics.add.collider(this.player, this.collectible, this.collisionCollectable, null, this);
        this.physics.add.collider(this.collectible, this.player, this.collisionCollectable, null, this);
        this.physics.add.overlap(this.player, this.collectible, this.collisionCollectable, null, this);
        this.physics.add.collider(this.player, this.AlienShip, this.collisionObstacle, null, this);
        this.physics.add.collider(this.AlienShip, this.player, this.collisionObstacle, null, this);
        this.physics.add.overlap(this.player, this.AlienShip, this.collisionObstacle, null, this);
        //keyboard controls
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.coinCount = this.add.text(500, 25, 'Stars: 0', {backgroundColor: '#000000'});
        this.coinCount.depth = 11;
    }
    update(){
        //tileset creation
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        //object updates for gamestate
        if(!this.gameOver && this.ballHit){
            this.timer++;
            this.timeScore.text = 'Score: ' + this.timer;
            this.astroGolfer.y += 4;
            if(this.astroGolfer.y >= game.config.height){
                this.astroGolfer.destroy();
            }
            //static obstacle creation
            if(this.timer % (150 / Play.level) == 0){
                //var meteor = this.obstacles.create((Math.random() * (450 - 60) + 60), 0, 'asteroid');
                this.meteor = this.physics.add.sprite((Math.random() * (450 - 60) + 60), 0, 'asteroid');
                this.meteor.anims.play('asteroidStill');
                this.physics.add.collider(this.player, this.meteor, this.collisionObstacle, null, this);
                this.physics.add.collider(this.meteor, this.player, this.collisionObstacle, null, this);
                this.physics.add.overlap(this.player, this.meteor, this.collisionObstacle, null, this);
                this.meteor.setVelocityY(100 * Play.level);
            }
            //alien obstacle creation
            if(Play.level >= 2 && this.timer % 900 == 0){
                this.AlienShip = new SineShip(this, game.config.width, (Math.random() * (game.config.height - 0) + 0), 'ufo');
                //this.alienSprite = this.physics.add.sprite(60, 60, 'ufo');
                //this.alienSprite.play('ufoStill');
                this.physics.add.collider(this.player, this.AlienShip, this.collisionObstacle, null, this);
                this.physics.add.collider(this.AlienShip, this.player, this.collisionObstacle, null, this);
                this.physics.add.overlap(this.player, this.AlienShip, this.collisionObstacle, null, this);
                //this.alienSprite.setVelocityX(250);
            }
            //Level increase over time
            if(this.timer % 1500 == 0){
                Play.level++;;
            }
            //spawn collectible
            if(this.timer % 737 == 0){
                if((Math.random() * (1 + 3) + 1) >= 2){
                    this.collectible = new Collectible(this, (Math.random() * (450 - 60) + 60), 0, 'star');
                }
            }
            //updates
            this.surface.tilePositionY -= 10 + Play.level;
            this.player.update();
            //this.staticObstacle.update();
            this.collectible.update();
            this.AlienShip.update();
            //physics collision for the player and the game's objects
            this.physics.world.overlap(this.player, this.staticObstacle, this.collisionObstacle, null, this);
            this.physics.world.collide(this.player, this.staticObstacle, this.collisionObstacle, null, this);
            this.physics.world.overlap(this.player, this.collectible, this.collisionCollectable, null, this);
            this.physics.world.collide(this.player, this.collectible, this.collisionCollectable, null, this);
        }
    }
    collisionObstacle(player, staticObstacle){
        this.surface.tilePositionY = this.surface.tilePositionY;
        this.player.destroy();
        this.gameOver = true;
        this.sound.play('loseGame');
        this.bgm.stop();
        this.scene.start("gameOverScene");
    }
    collisionCollectable(){
        this.collectible.destroy();
        this.coins++;
        this.coinCount.text = 'Stars: ' + this.coins
        this.sound.play('collect');
    }
}