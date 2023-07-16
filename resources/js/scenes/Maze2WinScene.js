class Maze2WinScene extends Phaser.Scene{
    constructor(){
        super({
            key:CST.SCENES.WIN2
        })
    }
    
    init(data){
        this.coincount = data[0]
        this.monsterCount = data[1]
    }

    preload(){
        this.load.image('win', 'resources/assets/win.png');
    }

    create(){

        this.add.image(200,0,'win').setOrigin(0,0);

        this.add.text(540, 400, 'Coins Collected: ' + this.coincount+"/10", {
            fontSize: '32px',
            color: 'yellow'
          }).setOrigin(0.5);

        this.add.text(540, 430, 'Gift Boxes Collected: ' + this.monsterCount+"/10", {
            fontSize: '32px',
            color: 'red'
          }).setOrigin(0.5);

        this.add.text(540, 500, 'Press Enter to Continue', {
        fontSize: '24px',
        color: '#ffffff'
        }).setOrigin(0.5);;  
    }

    update(){
        let pressEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        if(pressEnter.isDown){
        this.scene.start(CST.SCENES.MAZE3);
        }
    }

}