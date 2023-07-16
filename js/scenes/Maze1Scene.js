
class Maze1Scene extends Phaser.Scene{
    constructor(){
        super({
            key:CST.SCENES.MAZE1
            
        })
        this.isPaused = false;
    }
    
    preload(){
        this.coincount = 0;
        this.monsterCount = 0;
        this.timer;
        this.timerText;
        this.timeInSeconds = 15;
        this.wallet_text;
        this.kill_text;

        this.load.image('background', 'assets/beach.jpg');
        this.load.image('player','assets/fisherman.png');
        this.load.image('bush','assets/parket_2.jpg'); 
        this.load.image('monster','assets/crab.png') 
        this.load.spritesheet('coin', 'assets/tile001.png', {
            frameWidth: 50,
            frameHeight: 50
        });
    }

    create(){


      this.input.keyboard.on('keydown-ESC', function(){
        if (this.isPaused) {
          this.isPaused = false;
        } else {
          this.isPaused = true;
        }
      },this);

      this.input.keyboard.on('keydown-R', function(){
        this.scene.start(CST.SCENES.MAZE1)
      },this);


        this.add.image(0,0,'background').setOrigin(0,0);
        this.player = this.physics.add.sprite(200,180,'player');
        this.player.setDisplaySize(25,30)
        this.add.text(180,40,"OBJECTIVES",{ fontFamily: 'Arial', fontSize: '20px', fill: 'black',underline:true })
        this.wallet_text = this.add.text(190, 90, this.coincount + "/5", { fontFamily: 'Arial', fontSize: '20px', fill: 'black' });
        this.kill_text = this.add.text(300,90,this.monsterCount +"/4",{ fontFamily: 'Arial', fontSize: '20px', fill: 'black' })
        this.add.text(400,90,"PRESS SPACE TO KILL CRABS",{ fontFamily: 'Arial', fontSize: '20px', fill: 'black' })
        this.add.text(900,10,"ESC: Pause/Play",{ fontFamily: 'Arial', fontSize: '20px', fill: 'black' })
        this.add.text(780,10,"R: Restart",{ fontFamily: 'Arial', fontSize: '20px', fill: 'black' })
        this.monster = this.physics.add.sprite(270,100,'monster').setDisplaySize(30,30);
        this.score_coin = this.physics.add.sprite(160, 100, 'coin');
        this.score_coin.play('round');
        this.add.text

        this.timerText = this.add.text(800, 90, 'Time: 15s', {
            fontSize: '25px',
            color: 'black'
          });

        // Start the timer
        this.timer = this.time.addEvent({
            delay: 1000, 
            callback: updateTimer,
            callbackScope: this,
            loop: true
        });

        function updateTimer(){
          if(!this.isPaused){
            this.timeInSeconds--;
            this.timerText.setText('Time: ' + this.timeInSeconds + 's');
          
            if (this.timeInSeconds <= 0) {
               this.scene.start(CST.SCENES.LOSE1);
            }}
          }
          function collectCoin(player,coin){
            coin.disableBody(true, true);
            this.coincount+=1;
            this.wallet_text.setText(this.coincount+"/5");
          }

          this.coin =[
            this.physics.add.sprite(360,260,'coin'),
            this.physics.add.sprite(240,420,'coin'),
            this.physics.add.sprite(400,420,'coin'),
            this.physics.add.sprite(600,540,'coin'),
            this.physics.add.sprite(800,180,'coin'),
            this.physics.add.sprite(840,380,'coin'),
            this.physics.add.sprite(680,420,'coin'),
            this.physics.add.sprite(560,260,'coin'),
          ] 

          this.monster = [
            this.physics.add.sprite(440,300,'monster').setDisplaySize(35,30),
            this.physics.add.sprite(240,380,'monster').setDisplaySize(35,30),
            this.physics.add.sprite(360,220,'monster').setDisplaySize(35,30),
            this.physics.add.sprite(680,300,'monster').setDisplaySize(35,30),
            this.physics.add.sprite(880,300,'monster').setDisplaySize(35,30),
          ]

          this.anims.create({
            key: 'round',
            frames: this.anims.generateFrameNumbers('coin',{start:0, end: 7}),
            frameRate: 10,
            repeat: -1
          });
        
          for(let i=0;i<this.coin.length;i++){
            this.coin[i].play('round');
          }
        
          for(let i=0;i<this.coin.length;i++){
            this.physics.add.overlap(this.player, this.coin[i], collectCoin, null, this);
          }

        this.bushSize = 40;
            // coordinates for bushes
        this.bushes = [
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
            for (let i = 0; i < this.bushes.length; i++) {
                this.bush = this.add.sprite(this.bushes[i][0], this.bushes[i][1], 'bush');
                this.bush.setDisplaySize(this.bushSize,this.bushSize)
                this.bushes[i]=this.bush
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
                this.bushes.forEach(bush => {
                  
                  const bushBounds = bush.getBounds();
                  if (Phaser.Geom.Intersects.RectangleToRectangle(playerNewBounds, bushBounds)) {
                    collided = true;
                    return false; // Stop the iteration if collision detected
                  }
                });
                return collided;
              };

        }

    update(){

      if (this.isPaused) {
        return;
      }
        this.speed = 3;

        this.monster.forEach(monster => {
          if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), monster.getBounds())) {
            let pressEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
            if (!monster.isDisabled && Phaser.Input.Keyboard.JustDown(pressEnter)) {
              monster.disableBody(true, true);
              this.monsterCount++;
              this.kill_text.setText(this.monsterCount+"/4");
              monster.isDisabled = true;
            } else if (!monster.isDisabled) {
              this.scene.start(CST.SCENES.LOSE1);
            }
          }
        });

        // checking if the player is pressing an arrow and also not colliding with barriers.
        if (this.cursors.up.isDown && !this.checkCollision(this.player.x, this.player.y - this.speed)) {
            this.player.y -= this.speed;
        } else if (this.cursors.down.isDown && !this.checkCollision(this.player.x, this.player.y + this.speed)) {
            this.player.y += this.speed;
        }
        if (this.cursors.left.isDown && !this.checkCollision(this.player.x - this.speed, this.player.y)) {
            this.player.x -= this.speed;
        } else if (this.cursors.right.isDown && !this.checkCollision(this.player.x + this.speed, this.player.y)) {
            this.player.x += this.speed;
        }
    
        if (this.player.x > 920) {
            // Game win 
            if(this.coincount>4 && this.monsterCount>3){
            this.scene.start(CST.SCENES.WIN1,[this.coincount,this.monsterCount]);
            }
            else{
            this.scene.start(CST.SCENES.LOSE1)
            }
        } 
    }
}