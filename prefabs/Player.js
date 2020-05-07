class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene.anims.create({
            key: 'ballAnim',
            frames: this.scene.anims.generateFrameNames('golfball', {
                prefix: 'sprite',
                start:1,
                end: 10
            }),
            frameRate: 8,
            repeat: -1
        });
        //this.alienShip = this.scene.add.sprite(this.x, this.y, 'ufo');
        this.anims.play('ballAnim');
    }
    update(){
        if(keyLEFT.isDown && this.x >= 96){
            this.x -= 4;
        }
        else if(keyRIGHT.isDown && this.x <= 500){
            this.x += 4;
        }
        if(keyUP.isDown && this.y >= 100){
            this.y -= 4;
        }
        else if(keyDOWN.isDown && this.y <= 480){
            this.y += 4;
        }
    }
}