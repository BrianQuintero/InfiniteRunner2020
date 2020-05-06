class Collectible extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        //this.points = pointValue;
        this.scene.anims.create({
            key: 'starMove',
            frames: this.scene.anims.generateFrameNames('star', {
                prefix: 'sprite',
                start:1,
                end: 8
            }),
            frameRate: 8,
            repeat: -1
        });
        //this.alienShip = this.scene.add.sprite(this.x, this.y, 'ufo');
        this.anims.play('starMove');
    }
    update(){
        this.y += 5;
        if(this.y >= game.config.width){
            this.destroy();
        }
    }
}