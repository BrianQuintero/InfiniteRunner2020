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
        //this.load.image('asteroid', './assets/asteroid.png');
        //audio
        this.load.audio('coinGet', './assets/coinGet.wav');
        this.load.audio('loseGame', './assets/loseGame.wav');
        //Animation Atlas
        this.load.atlas('ufo','./assets/ufo.png', './assets/ufo.json');
        this.load.atlas('asteroid', './assets/asteroid.png', './assets/asteroid.json');
        this.load.atlas('star', './assets/star.png', './assets/star.json');
    }
    create(){
        //creation of background
        Play.level = 1;
        this.timer = 0;
        this.coins = 0;
        this.surface = this.add.tileSprite(0,0,640,480,'surface').setOrigin(0,0);
        this.anims.create({
            key: 'asteroidStill',
            frames: this.anims.generateFrameNames('asteroid', {
                prefix: 'sprite',
                end: 3
            }),
            frameRate: 8,
            repeat: -1
        });
        //player creation
        this.player = new Player(this, game.config.width/2,431,'ball');
        //obstacle creation
        this.obstacles = this.physics.add.group();
        //this.staticObstacle = new StaticObstacle(this, game.config.width/2,0,'asteroid');
        this.AlienShip = new SineShip(this, 0, 0, 'ufo');
        //text config
        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        //Creation of Score and Coin Text Boxes
        this.timeScore = this.add.text(100, 54, 'Score: 0', {backgroundColor: '#000000'});
        //this.scoreBox = this.add.text();
        //collision creation for collectible
        this.collectible = new Collectible(this, 1000, 0, 'star');
        //initial game conditions
        this.gameOver = false;
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

        this.coinCount = this.add.text(500, 54, 'Coins: 0', {backgroundColor: '#000000'});
    }
    update(){
        //tileset creation
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        if(this.gameOver){
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', {backgroundColor: '#000000'}).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to restart the game', {backgroundColor: '#000000'}).setOrigin(0.5);
        }
        //object updates for gamestate
        if(!this.gameOver){
            this.timer++;
            this.timeScore.text = 'Score: ' + this.timer;
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
    }
    collisionCollectable(){
        this.collectible.destroy();
        this.coins++;
        this.coinCount.text = 'Coins: ' + this.coins
        this.sound.play('coinGet');
    }
}