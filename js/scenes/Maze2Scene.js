class Maze2Scene extends Phaser.Scene{
    constructor(){
        super({
            key:CST.SCENES.MAZE2
        })
    }

    preload(){
        this.coincount = 0;
        this.timer;
        this.timerText;
        this.timeInSeconds = 30;
        this.wallet_text;
        this.load.image('player','js/scenes/assets/walking.png');
        this.load.image('bush','js/scenes/assets/bush.png');  
        this.load.spritesheet('coin', 'js/scenes/assets/tile001.png', {
            frameWidth: 50,
            frameHeight: 50
        });
    }

    create(){

        this.player = this.add.sprite(135,135,'player');
        this.player.setDisplaySize(20,30)

        this.wallet_text = this.add.text(130, 50, this.coincount+"/10", { fontFamily: 'Arial', fontSize: '20px', fill: 'white' });
        this.score_coin = this.physics.add.sprite(100, 60, 'coin');
        this.score_coin.play('round');

        this.timerText = this.add.text(850, 50, 'Time: 30s', {
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
               this.scene.start(CST.SCENES.LOSE2);
            }
          }

        function collectCoin(player,coin){
            coin.disableBody(true, true);
            this.coincount+=1;
            this.wallet_text.setText(this.coincount+"/10");
          }

        this.coin =[
            this.physics.add.sprite(418,278,'coin'),
            this.physics.add.sprite(768,275,'coin'),
            this.physics.add.sprite(905,315,'coin'),
            this.physics.add.sprite(945,135,'coin'),
            this.physics.add.sprite(940,595,'coin'),
            this.physics.add.sprite(940,520,'coin'),
            this.physics.add.sprite(800,595,'coin'),
            this.physics.add.sprite(870,595,'coin'),
            this.physics.add.sprite(730,485,'coin'),
            this.physics.add.sprite(770,485,'coin'),
            this.physics.add.sprite(135,595,'coin'),
            this.physics.add.sprite(350,595,'coin'),
            this.physics.add.sprite(200,525,'coin'),
            this.physics.add.sprite(380,525,'coin'),
            this.physics.add.sprite(420,525,'coin'),
            this.physics.add.sprite(200,420,'coin'),
            this.physics.add.sprite(205,315,'coin'),
            this.physics.add.sprite(555,278,'coin'),
            this.physics.add.sprite(625,315,'coin'),
            this.physics.add.sprite(418,205,'coin'),
            this.physics.add.sprite(800,205,'coin'),
        ];

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

        this.bushSize = 35;

        this.bushes = [
            [100, 100],[100, 135],[100, 170],[100, 205],[100, 240],[100, 275],[100, 310],[100, 345],[100, 380],[100, 415],[100, 450],
            [100, 485],[100, 520],[100, 555],[100, 590],[100, 625],[135, 625],[170, 625],[205, 625],[240, 625],[275, 625],[310, 625],[345, 625],[380, 625],
            [415, 625],[450, 625],[485, 625],[520, 625],[555, 625],[590, 625],[625, 625],[660, 625],[695, 625],[730, 625],[765, 625],[800, 625],[835, 625],
            [870, 625],[905, 625],[940, 625],[975, 625],[975, 555],[975, 520],[975, 485],[975, 450],[975, 415],[975, 380],[975, 345],[975, 310],
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

        for (let i = 0; i < this.bushes.length; i++) {
            this.bush = this.add.sprite(this.bushes[i][0], this.bushes[i][1], 'bush');
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
            if(this.coincount>9){
            this.scene.start(CST.SCENES.WIN2,this.coincount);
            }
            else{
            this.scene.start(CST.SCENES.LOSE2)
            }
        } 

    }
}
