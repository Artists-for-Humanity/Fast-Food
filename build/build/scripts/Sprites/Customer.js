import Phaser from '../../_snowpack/pkg/phaser.js';

export default class Customer extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, personIcon, foodSprite, customerSprite) {
    super(scene, x, y, personIcon);

    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    // this.setCollideWorldBounds(true);
    this.setScale(0.75);

    this.scene.physics.moveToObject(this, this.scene.player, 25);

    this.foodSprite = foodSprite;
    this.customerSprite = customerSprite;
    this.setSize(50, 50);
    this.setOffset(25, 75);
    return this;
  }

  update() {}
}