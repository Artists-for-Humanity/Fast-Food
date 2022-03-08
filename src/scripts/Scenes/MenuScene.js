import Phaser from 'phaser';
import WebFont from 'webfontloader';
import { colors } from '../constants';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  preload() {
    this.load.image('menu-scene', new URL('../../assets/burger.png', import.meta.url).href);
  }

  create() {
    this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'menu-scene');

    WebFont.load({
      custom: {
        families: ['Play'],
      },
      active: () => {
        this.add
          .text(
            this.game.config.width / 2,
            this.game.config.height - 50,
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

    // Stops scrolling when you click spacebar
    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.input.keyboard.on('keydown-SPACE', (event) => {
      this.scene.start('GameScene');
    });
  }
}
