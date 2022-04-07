import Phaser from '../../_snowpack/pkg/phaser.js';

export default class Bubble extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'bubble');

    scene.add.existing(this);
    this.setScale(0.2);

    return this;
  }
}
