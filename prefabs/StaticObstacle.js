class StaticObstacle extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
    update(){
        this.y += (3 + Play.level);
        if(this.y >= game.config.height){
            this.destroy();
        }
    }
}