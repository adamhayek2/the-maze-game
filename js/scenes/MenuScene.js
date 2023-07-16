

 class MenuScene extends Phaser.Scene{
    constructor(){
        super({
            key:CST.SCENES.MENU
        })
    }

    preload(){
        this.load.image("level1","assets/teaser1.jpg");
        this.load.image("level2","assets/teaser2.jpg");
        this.load.image("level3","assets/teaser3.jpg")
    }
    create(){

        this.add.image(200,200,'level1').setOrigin(0,0).setDisplaySize(200,150)
        this.add.image(450,200,'level2').setOrigin(0,0).setDisplaySize(200,150)
        this.add.image(700,200,'level3').setOrigin(0,0).setDisplaySize(200,150)
        this.add.text(300, 380, 'Easy', { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(550, 380, 'Medium', { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(800, 380, 'Hard', { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(550, 80, 'MAZE RAIDER', { fontSize: '64px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(550, 170, 'Choose level', { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(540, 500, 'Press Enter to Start', { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);


        this.choice = "1";

        this.input.on("pointerdown",function(pointer, level){

            if (level.texture.key === 'level1') {
                
                console.log('Level 1 clicked');
            } else if (level.texture.key === 'level2') {
                
                console.log('Level 2 clicked');
            } else if (level.texture.key === 'level3') {
                
                console.log('Level 3 clicked');
            }

        },this);



        };

    update(){

        
        let pressEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        if(pressEnter.isDown){
            this.scene.start(CST.SCENES.MAZE1);
        }
    }
    
}
