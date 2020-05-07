//Bogey! A moon golf adventure!
//Date Completed: 5/7/2020
//Art: Jeven Zarate McCoy
//Sound: Giovanni Lua-Trejo
//Programming: Brian Quintero
//Special Thanks to Darcy Phipps and Ben Roisen for helping with making this game! 
//I looked at some examples from Nathan Altice's Paddle Parkour for help (bgm in particular)
let config ={
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Menu, Play, GameOver, Tutorial]
}
let game = new Phaser.Game(config);
let keyRIGHT, keyLEFT, keyUP, keyDOWN, keyR, keySPACE, keyC, keyT;