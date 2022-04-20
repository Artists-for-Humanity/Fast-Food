import Phaser from 'phaser';


export default class LevelpassedScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'LevelpassedScene',
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
    this.menu = this.add.image(this.game.config.width / 2, this.game.config.height / 1.1, 'menu');
    this.menu.setInteractive();
    this.nextLevel = this.add.image(this.game.config.width / 2, this.game.config.height / 1.3, 'nextLevel');
    this.nextLevel.setInteractive();
    this.quit = this.add.image(this.game.config.width - 75, 50, 'quit');
    this.quit.setInteractive();
    this.add.image(this.game.config.width / 1.8, this.game.config.height / 2.3, 'tip');
    this.add.image(this.game.config.width / 1.8, this.game.config.height / 1.8, 'total');

    this.menu.on('pointerdown', () => {
      console.log("menu");
      this.scene.start('MenuScene');
    })

    this.nextLevel.on('pointerdown',() => {
      console.log("game");
      this.scene.start('GameScene');
    });

    this.quit.on('pointerdown',() => {
      console.log("menu");
      this.scene.start('MenuScene');
    });
  }
}
