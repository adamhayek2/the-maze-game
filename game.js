
let Maze1Scene = new Phaser.Scene('Game');
console.log("hi")
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
    this.player = this.add.sprite(190,180,'player');
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
      this.scene.start('Game2');
    }
  }

  let Maze2Scene = new Phaser.Scene('Game2');

  Maze1Scene.preload = function(){
    this.load.image('background', 'assets/Christmas.png');
    this.load.image('player','assets/walking.png');
    this.load.image('bush','assets/bush.png');
    this.load.image('coin1','assets/coin1.jpg')  
  };

    Maze2Scene.create = function() {

    this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.player = this.add.sprite(135,135,'player');
    this.player.setDisplaySize(20,30)
    
    const bushSize = 35;
    // coordinates for bushes
    let bushes = [
      [100, 100],[100, 135],[100, 170],[100, 205],[100, 240],[100, 275],[100, 310],[100, 345],[100, 380],[100, 415],[100, 450],
      [100, 485],[100, 520],[100, 555],[100, 590],[100, 625],[135, 625],[170, 625],[205, 625],[240, 625],[275, 625],[310, 625],[345, 625],[380, 625],
      [415, 625],[450, 625],[485, 625],[520, 625],[555, 625],[590, 625],[625, 625],[660, 625],[695, 625],[730, 625],[765, 625],[800, 625],[835, 625],
      [870, 625],[905, 625],[940, 625],[975, 625],[975, 590],[975, 555],[975, 520],[975, 485],[975, 450],[975, 415],[975, 380],[975, 345],[975, 310],
      [975, 275],[975, 240],[975, 205],[975, 170],[975, 135],[975, 100],[940, 100],[905, 100],[870, 100],[835, 100],[800, 100],[765, 100],[730, 100],
      [695, 100],[660, 100],[625, 100],[590, 100],[555, 100],[520, 100],[485, 100],[450, 100],[415, 100],[380, 100],[345, 100],[310, 100],[275, 100],
      [240, 100],[205, 100],[170, 100],[135, 100],[170, 135],[450,135],[240,170],[310,170],[380,170],[415,170],[450,170],[520,170],[555,170],[590,170],
      [625,170],[660,170],[695,170],[730,170],[765,170],[800,170],[835,170],[870,170],[905,170],[905,205],[905,240],[905,415],[905,345],[905,380],
      [905,450],[905,520],[905,555],[940,555],[905,555],[870,520],[835,520],[800,520],[765,520],[765,555],[835,555],[800,485],[800,450],[765,450],
      [730,450],[695,450],[660,450],[695,485],[695,520],[660,520],[660,555],[590,555],[555,555],[590,520],[590,485],[555,485],[590,450],[590,415],
      [590,380],[660,415],[625,415],[660,380],[695,380],[730,380],[765,380],[800,380],[870,450],[870,345],[870,310],[835,310],[800,310],[765,310],
      [730,310],[730,275],[730,240],[765,240],[800,240],[835,240],[835,205],[660,345],[660,310],[660,275],[660,240],[590,240],[590,275],[590,310],
      [555,240],[520,240],[520,275],[520,310],[520,345],[520,380],[520,415],[485,415],[485,450],[485,485],[485,520],[450,520],[450,555],[415,555],
      [380,555],[380,590],[345,555],[345,520],[310,520],[275,520],[240,520],[240,555],[205,555],[170,555],[170,520],[170,450],[170,415],[170,380],
      [170,345],[170,310],[170,275],[170,205],[205,205],[240,205],[275,205],[310,205],[310,240],[310,275],[310,310],[310,345],[310,380],[275,380],
      [240,380],[240,345],[240,310],[240,275],[205,275],[205,450],[240,450],[275,450],[310,450],[345,450],[380,450],[380,415],[415,415],[380,380],
      [380,345],[380,310],[415,310],[450,310],[450,345],[450,275],[450,240],[415,240],[380,240],[380,205],
    ];
    // creating bush using the corrdinates, setting thier sizes then replacing the coordinate with a sprite.
    for (let i = 0; i < bushes.length; i++) {
      bush = this.add.sprite(bushes[i][0], bushes[i][1], 'bush');
      bush.setDisplaySize(bushSize,bushSize)
      bushes[i]=bush
    }

  }

let config = {
    type: Phaser.AUTO,
    width: 1080,
    height: 720,
    backgroundColor: 0x000000,
    scene: [Maze1Scene,Maze1WinScene, Maze2Scene ],
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      }
    }
  };
  

let game = new Phaser.Game(config);





  