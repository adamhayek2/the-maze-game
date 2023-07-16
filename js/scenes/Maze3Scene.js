class Maze3Scene extends Phaser.Scene{
    constructor(){
        super({
            key:CST.SCENES.MAZE3
        })
    }

    preload(){
        this.coincount = 0;
        this.monsterCount = 0;
        this.timer;
        this.timerText;
        this.timeInSeconds = 60;
        this.wallet_text;
        this.kill_text;
        this.load.image('background3', 'assets/halloween.png');
        this.load.image('monster3','assets/ghost.png')
        this.load.image('player3','assets/kid.png');
        this.load.image('bush3','assets/lava2.jpg');  
        this.load.spritesheet('coin', 'assets/tile001.png', {
            frameWidth: 50,
            frameHeight: 50
        });
    }

    create(){
        this.add.image(0,0,'background3').setOrigin(0,0);
        this.player = this.add.sprite(90,120,'player3');
        this.player.setDisplaySize(15,20)
        this.add.text(100,15,"OBJECTIVES",{ fontFamily: 'Arial', fontSize: '20px', fill: 'white',underline:true })
        this.add.text(400,40,"PRESS SPACE TO KILL GHOSTS",{ fontFamily: 'Arial', fontSize: '20px', fill: 'white' })
        this.wallet_text = this.add.text(80, 50, this.coincount+"/15", { fontFamily: 'Arial', fontSize: '20px', fill: 'white'});
        this.score_coin = this.physics.add.sprite(60, 60, 'coin');
        this.score_coin.play('round');
        this.kill_text = this.add.text(230,50,this.monsterCount +"/15",{ fontFamily: 'Arial', fontSize: '20px', fill: 'white' })
        this.monster = this.physics.add.sprite(200,60,'monster3').setDisplaySize(30,30);

        this.timerText = this.add.text(900, 50, 'Time: 60s', {
            fontSize: '24px',
            color: 'white'
          });
        
        this.timer = this.time.addEvent({
            delay: 1000, 
            callback: updateTimer,
            callbackScope: this,
            loop: true
          });
        
        function updateTimer(){
            this.timeInSeconds--;
            this.timerText.setText('Time: ' + this.timeInSeconds + 's');
          
            if (this.timeInSeconds <= 0) {
               this.scene.start(CST.SCENES.LOSE3);
            }
          }

        function collectCoin(player,coin){
            coin.disableBody(true, true);
            this.coincount+=1;
            this.wallet_text.setText(this.coincount+"/15");
          }

        this.coin =[
            this.physics.add.sprite(270,150,'coin'),
            this.physics.add.sprite(270,120,'coin'),
            this.physics.add.sprite(270,270,'coin'),
            this.physics.add.sprite(210,330,'coin'),
            this.physics.add.sprite(210,480,'coin'),
            this.physics.add.sprite(120,480,'coin'),
            this.physics.add.sprite(150,630,'coin'),
            this.physics.add.sprite(390,570,'coin'),
            this.physics.add.sprite(390,450,'coin'),
            this.physics.add.sprite(450,240,'coin'),
            this.physics.add.sprite(600,180,'coin'),
            this.physics.add.sprite(630,180,'coin'),
            this.physics.add.sprite(600,300,'coin'),
            this.physics.add.sprite(600,480,'coin'),
            this.physics.add.sprite(600,630,'coin'),
            this.physics.add.sprite(750,510,'coin'),
            this.physics.add.sprite(780,360,'coin'),
            this.physics.add.sprite(900,360,'coin'),
            this.physics.add.sprite(900,210,'coin'),
            this.physics.add.sprite(900,570,'coin'),
            this.physics.add.sprite(840,570,'coin'),
            this.physics.add.sprite(840,630,'coin'),
        ];

        this.monster = [
          this.physics.add.sprite(210,120,'monster3').setDisplaySize(25,30),
          this.physics.add.sprite(210,180,'monster3').setDisplaySize(25,30),
          this.physics.add.sprite(150,300,'monster3').setDisplaySize(25,30),
          this.physics.add.sprite(210,420,'monster3').setDisplaySize(25,30),
          this.physics.add.sprite(360,300,'monster3').setDisplaySize(25,30),
          this.physics.add.sprite(570,240,'monster3').setDisplaySize(25,30),
          this.physics.add.sprite(690,180,'monster3').setDisplaySize(25,30),
          this.physics.add.sprite(810,210,'monster3').setDisplaySize(25,30),
          this.physics.add.sprite(990,240,'monster3').setDisplaySize(25,30),
          this.physics.add.sprite(840,420,'monster3').setDisplaySize(25,30),
          this.physics.add.sprite(900,420,'monster3').setDisplaySize(25,30),
          this.physics.add.sprite(990,600,'monster3').setDisplaySize(25,30),
          this.physics.add.sprite(870,630,'monster3').setDisplaySize(25,30),
          this.physics.add.sprite(510,630,'monster3').setDisplaySize(25,30),
          this.physics.add.sprite(450,450,'monster3').setDisplaySize(25,30),
          this.physics.add.sprite(600,450,'monster3').setDisplaySize(25,30),
          this.physics.add.sprite(210,570,'monster3').setDisplaySize(25,30),
          this.physics.add.sprite(300,450,'monster3').setDisplaySize(25,30),
        
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

        
          this.bushSize = 30;

          this.bushes = [
            [90,90],[120,90],[150,90],[180,90],[210,90],[240,90],[270,90],[300, 90],[330,90],[360,90],[390,90],[420,90],[450,90],
        [480,90],[510,90],[540,90],[570, 90],[600, 90],[630,90],[660,90],[690,90],[720,90],[750,90],[780, 90],[810, 90],[840,90],
        [870,90],[900,90], [930,90],[960,90],[990,90],[1020,90],[1020,120], [1020,150], [1020,180], [1020,210], [1020,240],
        [1020,270], [1020,300], [1020,330],[1020,360], [1020,390], [1020,420], [1020,450], [1020,480], [1020,510], [1020,540],
        [1020,570], [1020,600],[300,120],[390,120],[450,120],[660,120],[810,120],[930,120],[120,150],[150,150],
        [180,150],[210,150],[240,150],[300,150],[360,150],[390,150],[450,150],[480,150],[510,150],[540,150],[600,150],[630,150],[660,150],
        [720,150],[750,150],[870,150],[930,150],[960,150],[240,180],[270,180],[300,180],[450,180],[750,180],[780,180],[810,180],[840,180],
        [870,180],[930,180],[960,180],[120,210],[150,210],[180,210],[240,210],[360,210],[390,210],[420,210],[450,210],[480,210],[510,210],
        [540,210],[600,210],[630,210],[660,210],[690,210],[750,210],[870,210],[180,240],[240,240],[300,240],[690,240],[750,240],[810,240],
        [870,240],[900,240],[930,240],[960,240],[90,270],[120,270],[180,270],[300,270],[330,270],[360,270],[420,270],[450,270],[480,270],
        [510,270],[540,270],[600,270],[630,270],[660,270],[690,270],[750,270],[810,270],[960,270],[180,300],[210,300],[240,300],[270,300],
        [300,300],[420,300],[480,300],[690,300],[720,300],[750,300],[810,300],[840,300],[870,300],[900,300],[960,300],[120,330],[180,330],
        [360,330],[420,330],[480,330],[510,330],[540,330],[570,330],[600,330],[630,330],[810,330],[870,330],[120,360],[180,360],[240,360],
        [300,360],[360,360],[420,360],[510,360],[690,360],[720,360],[750,360],[810,360],[870,360],[930,360],[960,360],[990,360],[120,390],
        [180,390],[240,390],[300,390],[360,390],[420,390],[480,390],[510,390],[540,390],[570,390],[630,390],[660,390],
        [690,390],[750,390],[780,390],[810,390],[870,390],[240,420],[270,420],[300,420],[330,420],[360,420],[420,420],[570,420],[750,420],
        [870,420],[930,420],[960,420],[90,450],[120,450],[150,450],[180,450],[240,450],[420,450],[480,450],[510,450],[570,450],[630,450],
        [660,450],[690,450],[750,270],[720,450],[750,450],[810,450],[840,450],[870,450],[930,450],[180,480],[240,480],[300,480],[330,480],
        [360,480],[390,480],[420,480],[480,480],[570,480],[690,480],[750,480],[780,480],[810,480],[930,480],[90,510],[120,510],[180,510],
        [210,510],[240,510],[300,510],[480,510],[540,510],[570,510],[630,510],[660,510],[690,510],[810,510],[930,510],[870,510],[900,510],
        [120,540],[360,540],[390,540],[420,540],[480,540],[630,540],[690,540],[720,540],[750,540],[810,540],[870,540],[900,540],
        [930,540],[960,540],[120,570],[180,570],[240,570],[270,570],[300,570],[330,570],[360,570],[420,570],[450,570],[480,570],[570,570],
        [630,570],[690,570],[810,570],[870,570],[930,570],[120,600],[180,600],[420,600],[540,600],[570,600],[600,600],[630,600],[690,600],
        [750,600],[810,600],[840,600],[870,600],[930,600],[960,600],[180,630],[420,630],[750,630],[60,660],[90,660],[120,660],[150,660],
        [180,660],[210,660],[240,660],[270,660],[300, 660],[330,660],[360,660],[390,660],[420,660],[450,660],[480,660],[510,660],[540,660],
        [570, 660],[600, 660],[630,660],[660,660],[690,660],[720,660],[750,660],[780, 660],[810, 660],[840,660],[870,660],[900,660],
        [930,660],[960,660],[990,660],[1020,660],[60,90], [60,120], [60,150], [60,180], [60,210], [60,240], [60,270], [60,300], [60,330],
        [60,360], [60,390], [60,420], [60,450], [60,480], [60,510], [60,540], [60,570], [60,600], [60,630],[60,660],
         ]

         for (let i = 0; i < this.bushes.length; i++) {
            this.bush = this.add.sprite(this.bushes[i][0], this.bushes[i][1], 'bush3');
            this.bush.setDisplaySize(this.bushSize,this.bushSize)
            this.bushes[i]=this.bush
        }

        this.physics.add.existing(this.player);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.checkCollision = function(x, y) {
            const playerBounds = this.player.getBounds();
            const playerNewBounds = new Phaser.Geom.Rectangle(x - playerBounds.width / 2, y - playerBounds.height / 2, playerBounds.width, playerBounds.height);
        
            let collided = false;
            this.bushes.forEach(bush => {
              
              const bushBounds = bush.getBounds();
              if (Phaser.Geom.Intersects.RectangleToRectangle(playerNewBounds, bushBounds)) {
                collided = true;
                return false; 
              }
            });
            return collided;
          };  
    }

    update(){
        this.speed = 3;

        this.monster.forEach(monster => {
          if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), monster.getBounds())) {
            let pressEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
            if (!monster.isDisabled && Phaser.Input.Keyboard.JustDown(pressEnter)) {
              monster.disableBody(true, true);
              this.monsterCount++;
              this.kill_text.setText(this.monsterCount+"/15");
              monster.isDisabled = true;
            } else if (!monster.isDisabled) {
              this.scene.start(CST.SCENES.LOSE3);
            }
          }
        });

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
    
        if (this.player.x > 1000) {
            if(this.coincount>14 && this.monsterCount>14){
            this.scene.start(CST.SCENES.WIN3,[this.coincount,this.monsterCount]);
            }
            else{
            this.scene.start(CST.SCENES.LOSE3)
            }
        } 


    }


}