import * as __SNOWPACK_ENV__ from '../../../_snowpack/env.js';
import.meta.env = __SNOWPACK_ENV__;

import * as __SNOWPACK_ENV__ from '../../_snowpack/env.js';
__SNOWPACK_ENV__ = __SNOWPACK_ENV__;

import Phaser from '../../_snowpack/pkg/phaser.js';
import WebFont from '../../_snowpack/pkg/webfontloader.js';
import { colors } from '../constants.js';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameOverScene',
    });
  }

  preload() {
    this.load.image('image', new URL('../../assets/fired.png', import.meta.url).href);
    this.load.image('title', new URL('../../assets/yourFired.png', import.meta.url).href);
    this.load.image('menu', new URL('../../assets/menuButton.png', import.meta.url).href);
    this.playAgain = this.load.image('playAgain', new URL('../../assets/playAgainButton.png', import.meta.url).href);
    this.load.image('quit', new URL('../../assets/quitButton.png', import.meta.url).href);
  }

  create() {
    this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'image');;
    this.add.image(this.game.config.width / 2, this.game.config.height / 5, 'title');
    this.menu = this.add.image(this.game.config.width / 2, this.game.config.height / 1.1, 'menu');
    this.menu.setInteractive(); 
    this.playAgain = this.add.image(this.game.config.width / 2, this.game.config.height / 1.3, 'playAgain');
    this.playAgain.setInteractive();
    this.quit = this.add.image(this.game.config.width - 75, 50, 'quit');
    this.quit.setInteractive();

    this.quit.on('pointerdown', () => {
      console.log('reachme 00')
      this.scene.start('MenuScene');

    });

    this.menu.on('pointerdown', () => {
      console.log('reachme 00')
      this.scene.start('LevelPassedScene');

    });

    this.playAgain.on('pointerdown', () => {
      console.log('reachme 00')
      this.scene.start('GameScene');

    });

    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('MenuScene');
    });
  }

  // onObjectClicked(this)
  //   {
  //     console.log('reachme 00')
  //     this.scene.start('MenuScene');
  //   }
}
