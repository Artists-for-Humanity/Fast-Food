import Phaser from 'phaser';


export default class LevelPassedScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'LevelPassedScene',
    });
  }

  preload() {
    this.load.image('image', new URL('../../assets/moneyJar.png', import.meta.url).href);
    this.load.image('title', new URL('../../assets/levelPassed.png', import.meta.url).href);
    this.menu = this.load.image('menu', new URL('../../assets/menuButton.png', import.meta.url).href);
    // this.menu.setInteractive();
    this.nextLevel = this.load.image('nextLevel', new URL('../../assets/nextLevelButton.png', import.meta.url).href);
    // this.nextLevel.setInteractive();
    this.quit = this.load.image('quit', new URL('../../assets/quitButton.png', import.meta.url).href);
    // this.quit.setInteractive();
    this.load.image('tip', new URL('../../assets/tip.png', import.meta.url).href);
    this.load.image('total', new URL('../../assets/total.png', import.meta.url).href);
  }

  create() {
    this.add.image(this.game.config.width / 3, this.game.config.height / 2, 'image');
    this.add.image(this.game.config.width / 2, this.game.config.height / 5, 'title');
    this.add.image(this.game.config.width / 2, this.game.config.height / 1.1, 'menu');
    this.add.image(this.game.config.width / 2, this.game.config.height / 1.3, 'nextLevel');
    this.add.image(this.game.config.width - 75, 50, 'quit');
    this.add.image(this.game.config.width / 1.8, this.game.config.height / 2.3, 'tip');
    this.add.image(this.game.config.width / 1.8, this.game.config.height / 1.8, 'total');


    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('MenuScene');
    });

    this.menu.on('pointerdown', () => {
      console.log('menu')
      this.scene.start('MenuScene');


    });
  }
}
