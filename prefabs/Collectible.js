class Collectible extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        //this.points = pointValue;
    }
    update(){
        this.y += 5;
        if(this.y >= game.config.width){
            this.destroy();
        }
    }
}