import Phaser from 'phaser';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameOverScene',
    });
  }

  preload() {
    this.load.image('gameoverimage', new URL('../../assets/fired.png', import.meta.url).href);
    this.load.image('gameovertitle', new URL('../../assets/yourFired.png', import.meta.url).href);
    this.load.image('menu', new URL('../../assets/menuButton.png', import.meta.url).href);
    this.playAgain = this.load.image('playAgain', new URL('../../assets/playAgainButton.png', import.meta.url).href);
    this.load.image('quit', new URL('../../assets/quitButton.png', import.meta.url).href);
  }

  create() {
    console.log("Did this run?")
    this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'gameoverimage');;
    this.add.image(this.game.config.width / 2, this.game.config.height / 5, 'gameovertitle');
    this.menu = this.add.image(this.game.config.width / 2, this.game.config.height / 1.1, 'menu');
    this.menu.setInteractive(); 
    this.playAgain = this.add.image(this.game.config.width / 2, this.game.config.height / 1.3, 'playAgain');
    this.playAgain.setInteractive();
    this.quit = this.add.image(this.game.config.width - 75, 50, 'quit');
    this.quit.setInteractive();

    this.quit.on('pointerdown', () => {
      console.log('menu')
      this.scene.start('MenuScene');

    });

    this.menu.on('pointerdown', () => {
      console.log('level passed')
      this.scene.start('MenuScene');

    });

    this.playAgain.on('pointerdown', () => {
      this.scene.start('GameScene');
    });

    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('MenuScene');
    });
  }
}
