class Maze2LostScene extends Phaser.Scene{
    constructor(){
        super({
            key:CST.SCENES.LOSE2
        })
    }
    

    create(){
        this.add.text(540, 360, 'Game Over!', { fontSize: '64px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(540, 470, 'Press Enter to Play again', {
            fontSize: '24px',
            color: '#ffffff'
          }).setOrigin(0.5);
             
    }

    update(){

        let pressEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
  
        if(pressEnter.isDown){
        this.scene.start(CST.SCENES.MAZE2);
        }

    }

}