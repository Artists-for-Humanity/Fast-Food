import Phaser from 'phaser';

export default class Customer extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, personIcon) {
    super(scene, x, y, personIcon);

    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.setCollideWorldBounds(true);
    this.setScale(0.5);

    return this;
  }
}

// const customer1 = new Customer(this.scene, 0, 0, 'person1');

// update() {
//     customer1.setX( )
// }
