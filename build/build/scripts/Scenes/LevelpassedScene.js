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
    this.load.image('image', new URL('../../assets/moneyJar.png', import.meta.url).href);
    this.load.image('title', new URL('../../assets/levelPassed.png', import.meta.url).href);
    this.load.image('menu', new URL('../../assets/menuButton.png', import.meta.url).href);
    this.load.image('nextLevel', new URL('../../assets/nextLevelButton.png', import.meta.url).href);
    this.load.image('quit', new URL('../../assets/quitButton.png', import.meta.url).href);
    this.load.image('tip', new URL('../../assets/tip.png', import.meta.url).href);
    this.load.image('total', new URL('../../assets/total.png', import.meta.url).href);
  }

  create() {
    this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'image');
    this.add.image(this.game.config.width / 2, this.game.config.height / 5, 'title');
    this.add.image(this.game.config.width / 2, this.game.config.height / 1.1, 'menu');
    this.add.image(this.game.config.width / 2, this.game.config.height / 1.3, 'nextLevel');
    this.add.image(this.game.config.width - 75, 50, 'quit');
    this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'tip');
    this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'total');


    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('MenuScene');
    });
  }
}
