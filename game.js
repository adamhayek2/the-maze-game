let gameScene = new Phaser.Scene('Game');

gameScene.preload = function(){
  this.load.image('player','Assets/walking.png');
  this.load.image('bush','Assets/bush.png');
};


let config = {
    type: Phaser.AUTO,
    width: 1080,
    height: 720,
    backgroundColor: 0x000000,
    scene: gameScene,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      }
    }
  };
  
  let game = new Phaser.Game(config);
  