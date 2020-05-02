class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        //sprite creation
        this.load.image('surface', './assets/moon.png');
        this.load.image('ball', './assets/ball.png');
        //this.load.image('obstacleTest', './assets/obstacleTest.png');
        this.load.image('collectibleTest', './assets/collectibleTest.png');
        this.load.image('asteroid', './assets/asteroid.png');
        //audio
        this.load.audio('coinGet', './assets/coinGet.wav');
        this.load.audio('loseGame', './assets/loseGame.wav');
    }
    create(){
        //creation of background
        Play.level = 1;
        this.timer = 0;
        this.surface = this.add.tileSprite(0,0,640,480,'surface').setOrigin(0,0);
        //player creation
        this.player = new Player(this, game.config.width/2,431,'ball');
        //obstacle creation
        this.obstacles = this.physics.add.group();
        this.staticObstacle = new StaticObstacle(this, game.config.width/2,0,'asteroid');

        //collision creation for collectible
        this.collectible = new Collectible(this, game.config.width/4, 0, 'collectibleTest');
        //initial game conditions
        this.level = 1;
        this.gameOver = false;
        //collision detection for obstacles and powerups
        this.physics.add.collider(this.player, this.obstacles, this.collisionObstacle, null, this);
        this.physics.add.collider(this.obstacles, this.player, this.collisionObstacle, null, this);
        this.physics.add.overlap(this.player, this.obstacles, this.collisionObstacle, null, this);
        this.physics.add.collider(this.player, this.collectible, this.collisionCollectable, null, this);
        this.physics.add.collider(this.collectible, this.player, this.collisionCollectable, null, this);
        this.physics.add.overlap(this.player, this.collectible, this.collisionCollectable, null, this);

        //keyboard controls
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }
    update(){
        //tileset creation
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        //object updates for gamestate
        if(!this.gameOver){
            this.timer++;
            /*if(this.staticObstacle.y >= game.config.height){
                this.staticObstacle.destroy();
            }*/
            if(this.timer % (300 / Play.level) == 0){
                var meteor = this.obstacles.create((Math.random() * (game.config.width - 0) + 0), 0, 'asteroid');
                meteor.setVelocityY(100 * Play.level);
                //this.staticObstacle = new StaticObstacle(this, (Math.random() * (game.config.width - 0) + 0), 0, 'asteroid');
            }
            if(this.timer % 1500 == 0){
                console.log("level up!");
                Play.level++;
            }
            //spawn collectible
            if(this.timer % 750 == 0){
                console.log("reached threshold");
                if((Math.random() * (1 + 3) + 1) >= 2){
                    console.log("lucky you!");
                    this.collectible = new Collectible(this, (Math.random() * (game.config.width - 0) + 0), 0, 'collectibleTest');
                }
            }
            //updates
            this.surface.tilePositionY -= 10;
            this.player.update();
            this.staticObstacle.update();
            this.collectible.update();
            this.physics.world.overlap(this.player, this.staticObstacle, this.collisionObstacle, null, this);
            this.physics.world.collide(this.player, this.staticObstacle, this.collisionObstacle, null, this);
            this.physics.world.overlap(this.player, this.collectible, this.collisionCollectable, null, this);
            this.physics.world.collide(this.player, this.collectible, this.collisionCollectable, null, this);
        }
        //collision hitbox creation for the obstacles
        //collision hitbox creation for the collectibles
    }
    collisionObstacle(player, staticObstacle){
        this.surface.tilePositionY = this.surface.tilePositionY;
        this.player.destroy();
        this.gameOver = true;
        this.sound.play('loseGame');
    }
    collisionCollectable(){
        this.collectible.destroy();
        this.sound.play('coinGet');
    }
}