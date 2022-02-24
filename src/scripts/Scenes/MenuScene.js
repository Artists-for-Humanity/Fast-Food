import Phaser from 'phaser';
import WebFont from 'webfontloader';
import { colors } from '../constants';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  preload() {
    this.load.image('burger', new URL('../../assets/burger.png', import.meta.url).href);
  }

  create() {
    this.add.image(200, 650, 'burger');

    WebFont.load({
      custom: {
        families: ['Play'],
      },
      active: () => {
        this.add
          .text(
            this.game.config.width - 250,
            this.game.config.height - 300,
            // this.game.config.width / 2,
            // this.game.config.height / 2,
            'PRESS SPACEBAR TO START',
            {
              fontFamily: 'Play',
              fontSize: '50px',
              fill: colors.black,
              align: 'center',
              backgroundColor: 'white',
              shadowColor: 'red',
            }
          )
          .setOrigin(0.5);
      },
    });

    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('GameScene');
    });
  }
}
