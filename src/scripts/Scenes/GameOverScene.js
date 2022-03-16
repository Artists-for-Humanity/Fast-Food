import Phaser from 'phaser';
import WebFont from 'webfontloader';
import {
  colors
} from '../constants';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameOverScene'
    });
  }

  preload() {
    this.load.image('end-scene', new URL('../../assets/fired.png',
      import.meta.url).href);
  }

  create() {

    this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'end-scene')

    WebFont.load({
      custom: {
        families: ['Play Bold'],
      },
      active: () => {
        this.add
          .text(
            this.game.config.width / 2,
            this.game.config.height - 600,
            'YOU\'RE FIRED', {
              fontFamily: 'Play Bold',
              fontSize: '65px',
              fill: colors.black,
              align: 'center',
              shadowColor: 'red',
            }
          )
          .setOrigin(0.5);
      },
    });

    WebFont.load({
      custom: {
        families: ['Play Bold'],
      },
      active: () => {
        this.add
          .text(
            this.game.config.width / 2,
            (this.game.config.height / 2) + 200,
            'PLAY AGAIN', {
              fontFamily: 'Play Bold',
              fontSize: '70px',
              fill: colors.black,
              align: 'center',
              shadowColor: 'red',
              backgroundColor: 'red',
            }
          )
          .setOrigin(0.5);
      },
    });

    WebFont.load({
      custom: {
        families: ['Play Bold'],
      },
      active: () => {
        this.add
          .text(
            this.game.config.width / 2,
            (this.game.config.height / 2) + 300,
            'MENU', {
              fontFamily: 'Play Bold',
              fontSize: '50px',
              fontStyle: 'bold',
              fill: colors.black,
              align: 'center',
              backgroundColor: 'white',
            })
          .setOrigin(0.5);
      },
    });

    WebFont.load({
      custom: {
        families: ['Play'],
      },
      active: () => {
        this.add
          .text(
            this.game.config.width - 850,
            this.game.config.height - 100,
            'QUIT', {
              fontFamily: 'Play Bold',
              fontSize: '40px',
              fill: colors.black,
              align: 'center',
              shadowColor: 'red',
              backgroundColor: 'white',
            }
          )
          .setOrigin(0.5);
      },
    });

    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('MenuScene');

    });
  }
}