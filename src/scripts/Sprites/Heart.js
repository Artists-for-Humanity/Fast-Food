import Phaser from 'phaser';

export default class Heart extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'heart');

    scene.add.existing(this);
    // scene.physics.world.enableBody(this);
    // this.setCollideWorldBounds(true);
    this.setScale(0.1);

    return this;
  }
}
