

 class MenuScene extends Phaser.Scene{
    constructor(){
        super({
            key:CST.SCENES.MENU
        })
    }

    create(){

        this.add.text(540, 300, 'Welcome TO Mazer', { fontSize: '64px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(540, 400, 'Press Enter to Start', { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);

        };

    update(){
        let pressEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        if(pressEnter.isDown){
            this.scene.start(CST.SCENES.MAZE3);
        }
    }
    
}
