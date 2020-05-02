//[Game Name], a project by: Jeven Zarate McCoy, Giovanni Lua-Trejo, Brian Quintero
//Date Completed: 
//We decided to get creative with the idea of playing Golf somewhere on the moon
let config ={
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade:{
            debug: false,
            gravity:{
                x:0,
                y:0
            }
        }
    },
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);
let keyRIGHT, keyLEFT, keyUP, keyDOWN, keyR;