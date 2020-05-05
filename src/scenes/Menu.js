class Menu extends Phaser.Scene{
    constructor(){
        super("mainMenu");
    }
    create(){
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        this.add.text(20, 20, 'Press Space to begin');
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            console.log("key pressed");
            this.scene.start("playScene");
        }
    }
}