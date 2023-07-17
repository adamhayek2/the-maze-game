class Maze3WinScene extends Phaser.Scene{
    constructor(){
        super({
            key:CST.SCENES.WIN3
        })
    }

    init(data){
        this.coincount = data[0]
        this.monsterCount = data[1]
    }

    preload(){
        this.load.image('win3', 'resources/assets/win3.png');
    }

    create(){
        this.add.image(470,50,'win3').setOrigin(0,0).setDisplaySize(150,150);

        this.add.text(540, 250, 'CONGRATIOLATIONS', { fontSize: '64px', fill: 'gold', fontWeight: 'bold' }).setOrigin(0.5);
        
        this.add.text(540, 380, 'You completed all Levels', { fontSize: '64px', fill: '#ffffff' }).setOrigin(0.5);

        this.add.text(540, 480, 'Coins Collected: ' + this.coincount+"/15", {
            fontSize: '32px',
            color: 'yellow'
          }).setOrigin(0.5);
        
        this.add.text(540, 530, 'Ghosts Killed: ' + this.monsterCount+"/15", {
            fontSize: '32px',
            color: 'red'
          }).setOrigin(0.5);
        this.add.text(540, 600, 'Press Enter to Exit Game', {
        fontSize: '24px',
        color: '#ffffff'
        }).setOrigin(0.5);;  
    }

    update(){
        let pressEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        if(pressEnter.isDown){
        this.scene.start(CST.SCENES.MENU);
        }
    }
}
