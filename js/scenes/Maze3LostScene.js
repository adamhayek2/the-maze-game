class Maze3LostScene extends Phaser.Scene{
    constructor(){
        super({
            key:CST.SCENES.LOSE3
        })
    }

    create(){
        this.add.text(540, 290, 'Game Over!', { fontSize: '72px', fill: 'red', fontWeight: 'bold' }).setOrigin(0.5);
        this.add.text(540, 370, 'Press Enter to Play again', {
            fontSize: '24px',
            color: 'white'
          }).setOrigin(0.5);
             
    }

    update(){

        let pressEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
  
        if(pressEnter.isDown){
        this.scene.start(CST.SCENES.MAZE3);
        }

    }

}