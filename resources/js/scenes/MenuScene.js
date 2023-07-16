

 class MenuScene extends Phaser.Scene{
    constructor(){
        super({
            key:CST.SCENES.MENU
        })
    }

    preload(){
        this.load.image("level1","https://github.com/adamhayek2002/the-maze-game/blob/main/resources/assets/teaser1.JPG");
        this.load.image("level2","https://github.com/adamhayek2002/the-maze-game/blob/main/resources/assets/teaser2.JPG");
        this.load.image("level3","https://github.com/adamhayek2002/the-maze-game/blob/main/resources/assets/teaser3.JPG")
    }
    create(){

        this.level1 = this.add.image(120,250,'level1').setOrigin(0,0).setDisplaySize(250,200).setInteractive();
        this.level2 = this.add.image(420,250,'level2').setOrigin(0,0).setDisplaySize(250,200).setInteractive();
        this.level3 = this.add.image(720,250,'level3').setOrigin(0,0).setDisplaySize(250,200).setInteractive();
        this.add.text(250, 480, 'Easy', { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(550, 480, 'Medium', { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(850, 480, 'Hard', { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(550, 80, 'MAZE RAIDER', { fontSize: '64px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(550, 200, 'Choose level', { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);
        


        this.level1.on("pointerdown", function() {
            this.scene.start(CST.SCENES.MAZE1);
        }, this);

        this.level2.on("pointerdown", function() {
            this.scene.start(CST.SCENES.MAZE2);
        }, this);

        this.level3.on("pointerdown", function() {
            this.scene.start(CST.SCENES.MAZE3);
        }, this);

        };
    
}
