import Phaser from 'phaser';

<<<<<<< HEAD
export default class Customer extends Phaser.GameObjects.RenderTexture {
  //avater + food + thought bubble = personIcon
  constructor(scene, x, y, customerIcon) {
    super(scene, x, y);
    // scene.add.existing(this);
    // scene.physics.world.enableBody(this);
    // this.setCollideWorldBounds(true);
    // this.setScale(0.15);

    // scene.add.sprite(0, 0, customerIcon);
    // this.draw(scene.customerSprite, 0, 0);

    // this.scene.physics.moveToObject(this, this.scene.player, 100);
    // this.bubbleGraphics = this.add.graphics();

    return this;
  }

  update() {}

  drawBubble() {}
=======
export default class Customer extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, personIcon) {
    super(scene, x, y, personIcon);

    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.setCollideWorldBounds(true);
    this.setScale(0.5);

    return this;
  }
<<<<<<< Updated upstream
=======
>>>>>>> 9a2cf8b7789cdf0345c4fa94e0e78aa2003acc88
>>>>>>> Stashed changes
}

// const customer1 = new Customer(this.scene, 0, 0, 'person1');

// update() {
//     customer1.setX( )
// }
