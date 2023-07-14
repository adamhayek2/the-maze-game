
let Maze1Scene = new Phaser.Scene('Game');

Maze1Scene.preload = function(){
  this.load.image('background', 'assets/Christmas.png');
  this.load.image('player','assets/walking.png');
  this.load.image('bush','assets/bush.png');  
  this.load.spritesheet('coin', 'assets/tile001.png', {
    frameWidth: 50,
    frameHeight: 50
  });
};
let coin =[]
Maze1Scene.create = function(){
  this.add.image(0, 0, 'background').setOrigin(0, 0);
  // added player and set size
  this.player = this.physics.add.sprite(190,180,'player');
  this.player.setDisplaySize(20,30)
  
  
  
  coin =[
    this.physics.add.sprite(360,260,'coin'),
    this.physics.add.sprite(240,420,'coin'),
    this.physics.add.sprite(400,420,'coin'),
    this.physics.add.sprite(600,540,'coin'),
    this.physics.add.sprite(800,180,'coin'),
    this.physics.add.sprite(840,380,'coin'),
    this.physics.add.sprite(680,420,'coin'),
    this.physics.add.sprite(560,260,'coin'),
  ] 

  this.anims.create({
    key: 'round',
    frames: this.anims.generateFrameNumbers('coin',{start:0, end: 7}),
    frameRate: 10,
    repeat: -1
  });

  for(let i=0;i<coin.length;i++){
    coin[i].play('round');
  }
  

  for(let i=0;i<coin.length;i++){
    this.physics.add.overlap(this.player, coin[i], collectCoin, null, this);
  }



    const bushSize = 40;
    // coordinates for bushes
    let bushes = [
      [160, 140],[160, 180],[160, 220],[160, 260],[160, 300],[160, 340],[160, 380],[160, 420],[160, 460],[160, 500],[160, 540],
      [160, 580],[200, 580],[240, 580],[280, 580],[320, 580],[360, 580],[400, 580],[440, 580],[480, 580],[520, 580],[560, 580],[600, 580],[640, 580],
      [680, 580],[720, 580],[760, 580],[800, 580],[840, 580],[880, 580],[920, 140],[920, 180],[920, 220],[920, 260],[920, 300],[920, 340],[920, 380],
      [920, 420],[920, 460],[920, 500],[920, 580],[200, 140],[240, 140],[280, 140],[320, 140],[360, 140],[400, 140],[440, 140],[480, 140],[520, 140],
      [560, 140],[600, 140],[640, 140],[680, 140],[720, 140],[760, 140],[800, 140],[840, 140],[880, 140],[200, 220],[240, 220],[280, 220],[320, 220],
      [320, 260],[400, 260],[400, 300],[400, 340],[480, 220],[520, 220],[560, 220],[600, 220],[680, 220],[680, 260],[680, 340],[680, 380],[640, 380],
      [640, 420],[640, 460],[720, 220],[760, 220],[760, 180],[600, 260],[600, 300],[560, 300],[560, 340],[560, 380],[560, 460],[520, 460],[560, 540],
      [640, 500],[680, 500],[720, 500],[760, 500],[800, 500],[880, 500],[840, 420],[800, 420],[720, 460],[800, 380],[800, 340],[760, 300],[800, 300],
      [800, 220],[800, 460],[840, 220],[840, 340],[720, 380],[800, 540],[480, 260],[480, 340],[480, 380],[480, 420],[480, 460],[480, 500],[440, 500],
      [400, 500],[400, 460],[360, 460],[320, 540],[440, 540],[400, 380],[360, 380],[320, 380],[280, 380],[280, 420],[280, 460],[240, 460],[240, 500],
      [240, 540],[200, 380],[320, 300],[280, 300],[240, 300],[400, 220]
    ];
    // creating bush using the corrdinates, setting thier sizes then replacing the coordinate with a sprite.
    for (let i = 0; i < bushes.length; i++) {
      bush = this.add.sprite(bushes[i][0], bushes[i][1], 'bush');
      bush.setDisplaySize(bushSize,bushSize)
      bushes[i]=bush
    }
    // add player to the physics of the game
    this.physics.add.existing(this.player);

    // arrows controller
    this.cursors = this.input.keyboard.createCursorKeys();

    this.checkCollision = function(x, y) {
        const playerBounds = this.player.getBounds();
        const playerNewBounds = new Phaser.Geom.Rectangle(x - playerBounds.width / 2, y - playerBounds.height / 2, playerBounds.width, playerBounds.height);
    
        let collided = false;
        // check if any bush intersects with player updated boundaries
        bushes.forEach(bush => {
          
          const bushBounds = bush.getBounds();
          if (Phaser.Geom.Intersects.RectangleToRectangle(playerNewBounds, bushBounds)) {
            collided = true;
            return false; // Stop the iteration if collision detected
          }
        });
        return collided;
      };

    }
    function collectCoin(player,coin){
      coin.disableBody(true, true);
    }
Maze1Scene.update = function(){

    const speed = 3; // moves 3px in every direction
  
    // checking if the player is pressing an arrow and also not colliding with barriers.
    if (this.cursors.up.isDown && !this.checkCollision(this.player.x, this.player.y - speed)) {
      this.player.y -= speed;
    } else if (this.cursors.down.isDown && !this.checkCollision(this.player.x, this.player.y + speed)) {
      this.player.y += speed;
    }
    if (this.cursors.left.isDown && !this.checkCollision(this.player.x - speed, this.player.y)) {
      this.player.x -= speed;
    } else if (this.cursors.right.isDown && !this.checkCollision(this.player.x + speed, this.player.y)) {
      this.player.x += speed;
    }

    if (this.player.x > 900) {
        // Game win 
        this.scene.start('Win');
      }
    
  };


  let Maze1WinScene = new Phaser.Scene('Win');

  Maze1WinScene.create = function() {
    this.add.text(540, 360, 'You Win!', { fontSize: '64px', fill: '#ffffff' }).setOrigin(0.5);
  
    let enterText = this.add.text(540, 430, 'Press Enter to Continue', {
      fontSize: '24px',
      color: '#ffffff'
    });
    enterText.setOrigin(0.5);
  };

  Maze1WinScene.update = function(){

    let pressEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    if(pressEnter.isDown){
      this.scene.start('Game');
    }
  }


    








let config = {
    type: Phaser.AUTO,
    width: 1080,
    height: 720,
    backgroundColor: 0x000000,
    scene: [Maze1Scene,Maze1WinScene],
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      }
    }
  };
  

let game = new Phaser.Game(config);





  