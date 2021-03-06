import Phaser from '../../snowpack/pkg/phaser.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');

    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.setCollideWorldBounds(true);
    this.setScale(0.5);

    this.health = 5;
    return this;
  }
}