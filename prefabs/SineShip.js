class SineShip extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y, texture, frame,){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //store pointValue
        this.baseY = y;
    }

    create(){
        this.scene.anims.create({
            key: 'ufoAnim',
            frames: this.scene.anims.generateFrameNames('ufo', {
                prefix: 'sprite',
                end: 10
            }),
            frameRate: 8,
            repeat: -1
        });
        this.alienShip = this.scene.add.sprite(this.x, this.y, this.texture);
        this.alienShip.play('ufoAnim');
    }
    update(){
        this.x -= 1;
        /*this.x -= 4;
        this.y = this.baseY + (100 * Math.sin(this.x/50));*/
        //wrap around
        if(this.x <= 0-this.width){
            this.destroy();
        }
    }
    reset(){
        this.x = game.config.width;
    }
}