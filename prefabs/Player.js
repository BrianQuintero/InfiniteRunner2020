class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
    update(){
        if(keyLEFT.isDown && this.x >= 96){
            this.x -= 4;
        }
        else if(keyRIGHT.isDown && this.x <= 500){
            this.x += 4;
        }
        if(keyUP.isDown){
            this.y -= 4;
        }
        else if(keyDOWN.isDown){
            this.y += 4;
        }
    }
}