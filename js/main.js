
let game = new Phaser.Game({
    type: Phaser.AUTO,
    width:1080,
    height:720,
    scene:[
        MenuScene,Maze1Scene,Maze1WinScene,Maze1LostScene,Maze2Scene,Maze2LostScene,Maze2WinScene,Maze3Scene
    ],
    physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        }
      }
})

