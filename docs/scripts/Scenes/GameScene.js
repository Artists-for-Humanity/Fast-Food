import * as __SNOWPACK_ENV__ from '../../snowpack/env.js';
import.meta.env = __SNOWPACK_ENV__;

import Phaser from '../../snowpack/pkg/phaser.js';
import Customer from '../Sprites/Customer.js';
import Line from '../Sprites/Line.js';
import Player from '../Sprites/Player.js';
import Counter from '../Sprites/Counter.js';
import Projectile from '../Sprites/Projectile.js'

import Heart from '../Sprites/Heart.js';
import {
  colors
} from '../constants.js';
import LevelpassedScene from './LevelpassedScene.js';
export default class GameScene extends Phaser.Scene {
  player;
  container;
  scoreText;

  constructor() {
    super({
      key: 'GameScene',
    });
    this.customers = [];
    this.customerSprites = [];
    this.foodSprites = [];
    this.spawnZone;
    this.customerTextures = [];
    this.numCustomers;
    this.laserGroup;
    this.hearts = [];
    this.scoreText;
    this.selectedFood;
    this.selectFood1;
    this.selectFood2;
    this.selectFood3;
    this.selectFood4;
    this.delay = 0;
    this.isOverlapping = false;
  }

  preload() {
    this.load.image('player', new URL('../../assets/player.png',
      import.meta.url).href);
    this.load.image('counter', new URL('../../assets/counter.png',
      import.meta.url).href);
    this.load.image('line', new URL('../../assets/line.png',
      import.meta.url).href);
    this.load.image('heart', new URL('../../assets/heart.png',
      import.meta.url).href);
    this.load.image('person1', new URL('../../assets/person1.png',
      import.meta.url).href);
    this.load.image('person2', new URL('../../assets/person2.png',
      import.meta.url).href);
    this.load.image('person3', new URL('../../assets/person3.png',
      import.meta.url).href);
    this.load.image('person4', new URL('../../assets/person4.png',
      import.meta.url).href);
    this.load.image('person5', new URL('../../assets/person5.png',
      import.meta.url).href);
    this.load.image('person6', new URL('../../assets/person6.png',
      import.meta.url).href);
    this.load.image('person7', new URL('../../assets/person7.png',
      import.meta.url).href);
    this.load.image('person8', new URL('../../assets/person8.png',
      import.meta.url).href);
    this.load.image('bubble', new URL('../../assets/thought-bubble.png',
      import.meta.url).href);
    this.load.image('food1', new URL('../../assets/food1.png',
      import.meta.url).href);
    this.load.image('projectile', new URL('../../assets/food1.png',
      import.meta.url).href);
    this.load.image('food2', new URL('../../assets/food2.png',
      import.meta.url).href);
    this.load.image('food3', new URL('../../assets/food3.png',
      import.meta.url).href);
    this.load.image('food4', new URL('../../assets/food4.png',
      import.meta.url).href);
  }

  resetGame() {
    this.selectedFood = 'food1';
    this.numCustomers = 5;
  }

  create() {
    this.resetGame();
    this.selectfood1 = this.add.sprite(this.game.config.width / 2, 660, 'food1').setScale(0.1).setDepth(1).setVisible(true);
    this.selectfood2 = this.add.sprite(this.game.config.width / 2, 660, 'food2').setScale(0.1).setDepth(1).setVisible(false);
    this.selectfood3 = this.add.sprite(this.game.config.width / 2, 660, 'food3').setScale(0.1).setDepth(1).setVisible(false);
    this.selectfood4 = this.add.sprite(this.game.config.width / 2, 660, 'food4').setScale(0.1).setDepth(1).setVisible(false);

    this.counter = new Counter(this, this.game.config.width / 2, this.game.config.height / 1.2);
    this.player = new Player(this, this.game.config.width / 2, this.game.config.height / 1.2);
    this.line = new Line(this, this.game.config.width / 2, this.game.config.height / 1.2);
    var r1 = this.add.rectangle(this.game.config.width / 2, 0, this.game.config.width, 175, 0x964B00).setDepth(1);
    this.createSpawnZone();

    this.bubble = this.add.sprite(0, 0, 'bubble').setScale(0.15).setVisible(false);
    this.foodSprites = [
      this.add.sprite(this.game.config.width / 2, 800, 'food1').setScale(0.1).setVisible(false),
      this.add.sprite(this.game.config.width / 2, 800, 'food2').setScale(0.1).setVisible(false),
      this.add.sprite(this.game.config.width / 2, 800, 'food3').setScale(0.1).setVisible(false),
      this.add.sprite(this.game.config.width / 2, 800, 'food4').setScale(0.1).setVisible(false),
    ];
    this.customerSprites = [
      this.add.sprite(-1000, -1000, 'person1').setScale(0.15).setVisible(false),
      this.add.sprite(-1000, -1000, 'person2').setScale(0.15).setVisible(false),
      this.add.sprite(-1000, -1000, 'person3').setScale(0.15).setVisible(false),
      this.add.sprite(-1000, -1000, 'person4').setScale(0.15).setVisible(false),
      this.add.sprite(-1000, -1000, 'person5').setScale(0.15).setVisible(false),
      this.add.sprite(-1000, -1000, 'person6').setScale(0.15).setVisible(false),
      this.add.sprite(-1000, -1000, 'person7').setScale(0.15).setVisible(false),
      this.add.sprite(-1000, -1000, 'person8').setScale(0.15).setVisible(false),
    ];
    this.Qkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.Wkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.Ekey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.Rkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    for (var i = 0; i < this.player.health; i++) {
      this.hearts.push(new Heart(this, (i + 1) * 60, 50).setDepth(1));
    }

    this.scoreText = this.add.text(this.game.config.width - 200, 30, '', {
      fontFamily: 'Space Mono',
      fontSize: '24px',
      fontStyle: 'bold',
      fill: colors.white,
      align: 'center',
    }).setDepth(1);

    this.globalState.resetScore();
    this.setScoreText();
    this.createCustomers();
    this.laserGroup = this.physics.add.group();
    this.addEvents();

    this.physics.add.overlap(this.laserGroup, this.customers, (customer, laser) => {

      laser.destroy();
      // Need to add conditionals for other food types, food2, food3, food 4
      //       // Need to add conditionals for other food types, food2, food3

      if (customer.foodSprite === laser.foodSprite) {
        this.globalState.incrementScore();
        this.setScoreText();
        customer.destroy();
        this.numCustomers--;
      }

    });


  }

  addEvents() {
    this.input.on('pointerdown', (pointerdown) => {
      this.shootLaser();
    })
  }

  addPickEvent() {
    if (this.Qkey.isDown) {
      this.selectedFood = 'food1';
      this.selectfood1.visible = true;
      this.selectfood2.visible = false;
      this.selectfood3.visible = false;
      this.selectfood4.visible = false;
    }
    if (this.Wkey.isDown) {
      this.selectedFood = 'food2';
      this.selectfood1.visible = false;
      this.selectfood2.visible = true;
      this.selectfood3.visible = false;
      this.selectfood4.visible = false;
    }
    if (this.Ekey.isDown) {
      this.selectedFood = 'food3';
      this.selectfood1.visible = false;
      this.selectfood2.visible = false;
      this.selectfood3.visible = true;
      this.selectfood4.visible = false;
    }
    if (this.Rkey.isDown) {
      this.selectedFood = 'food4';
      this.selectfood1.visible = false;
      this.selectfood2.visible = false;
      this.selectfood3.visible = false;
      this.selectfood4.visible = true;
    }
  }

  shootLaser() {
    const projectile = new Projectile(this, this.player.x, this.player.y, this.selectedFood);
    this.laserGroup.add(projectile);
    projectile.fire(this.line.getAngle());
  }

  setScoreText() {
    this.scoreText.setText(`SCORE: ${this.globalState.score}`);
  }

  update(time, delta) {
    this.delay += delta;
    this.timer();

    this.line.update();
    this.customers.map((customer) => {
      customer.update();
    });
    this.addPickEvent();

    if (this.numCustomers === 0) {
      this.scene.start('LevelpassedScene');
    }

    if (this.player.health === 0) {
      this.scene.start('GameOverScene');

      this.hearts = [];
      for (var i = 0; i < this.customers.length; i++) {
        this.customers[i].destroy();
      }
      for (var i = 0; i < this.player.health; i++) {
        this.hearts.push(new Heart(this, (i + 1) * 60, 50));
      }
    }
    //check if customer is destroyed + count value
    // check if num of customers detsroyed = num on customer spawned
    //play level passed scene
  }

  getRandomPosition() {
    const position = {
      x: Math.floor(Math.random() * 960),
      y: Math.floor(Math.random() * 720),
    };
    const isInZone = this.spawnZone.contains(position.x, position.y);
    if (!isInZone) {
      return this.getRandomPosition();
    }

    return position;
  }

  createSpawnZone() {
    const {
      height,
      width
    } = this.game.config;
    const counterBody = this.counter.body;

    // extended this further than Counter
    // const counterPositions = [
    //   [width / 2 - counterBody.width / 2 - 100, height / 2 - counterBody.height / 2 - 100],
    //   [width / 2 - counterBody.width / 2 - 100, height / 2 + counterBody.height / 2 + 100],
    //   [width / 2 + counterBody.width / 2 + 100, height / 2 + counterBody.height / 2],
    //   [width / 2 + counterBody.width / 2 + 100, height / 2 - counterBody.height / 2 - 100],
    // ];

    var polygon = new Phaser.Geom.Polygon([
      [0, 0],
      [width, 0],
      [width, 300],
      [0, 300],
      [0, 0],

      // counterPositions[0],
      // counterPositions[1],
      // counterPositions[2],
      // counterPositions[3],
      // counterPositions[0],
    ]);

    this.spawnZone = polygon;
  }

  createCustomers() {
    for (let i = 0; i < this.numCustomers; i++) {
      // let rt = this.add.renderTexture(-100, -100, 140, 140);
      let rt = this.add.renderTexture(100, 100, 140, 140);
      const customerSprite = this.customerSprites[Math.floor(Math.random() * 8)];
      const foodSprite = this.foodSprites[Math.floor(Math.random() * 3)];

      rt.draw(this.bubble, rt.width / 2 + 30, rt.height / 2 - 25);
      rt.draw(foodSprite, rt.width / 2 + 32, rt.height / 2 - 25);
      rt.draw(customerSprite, rt.width / 2 - 25, rt.height / 2 + 25);
      this.customerTextures.push({
        texture: rt.saveTexture('doodle' + i),
        customer: customerSprite.texture.key,
        food: foodSprite.texture.key
      });

      rt.setVisible(false);
    }
    this.drawCanvas();
  }

  drawCanvas() {
    // Generate an array of random positions for the customers to spawn
    const customerPositions = [];
    for (let i = 0; i < this.numCustomers; i++) {
      const position = this.getRandomPosition();
      customerPositions.push({
        x: position.x,
        y: position.y,
      });
    }

    customerPositions.map((position, i) => {
      const texture = this.customerTextures[i];
      const customer = new Customer(this, position.x, position.y, texture.texture, texture.food, texture.customer); /// accessing the key (using the index)

      this.customers.push(customer);

      const collider = this.physics.add.overlap(this.counter, customer, (counter, customer) => {
        customer.body.stop();


        this.physics.world.removeCollider(collider);
        // this.hearts[this.player.health - 1].destroy();
        // this.player.health--;
        // if (this.player.health === 0) {
        //   for (let i = 0; i < this.numCustomers; i++) {
        //     this.customers.pop();
        //   }
        //   // this.customers.forEach((customer) => {
        //   //   customer.destroy();

        //   // });

        //   return;
        // }

      });
    });


  }

  timer() {
    this.physics.add.overlap(this.customers, this.counter, (a, b) => {
      if (this.isOverlapping === false) {
        this.isOverlapping = true;
        this.delay = 0;
      }
      if (this.isOverlapping === true && this.delay > 1000) {
        a.destroy();
        this.replaceCustomer(a);
        this.loseHealth();
        this.delay -= 1000;
        this.isOverlapping = false;
      }
    })
  }


  replaceCustomer(cust) {
    const rPosition = this.getRandomPosition();

    const texture1 = this.customerTextures[Phaser.Math.Between(0, 4)];
    // const texture1 = this.customerTextures[0];

    const customer1 = new Customer(this, rPosition.x, rPosition.y, texture1.texture, texture1.food, texture1.customer); /// accessing the key (using the index)

    this.customers.push(customer1);

    const collider1 = this.physics.add.overlap(this.counter, customer1, (counter, customer) => {
      customer.body.stop();


      this.physics.world.removeCollider(collider1);;


    });
    // cust.tintBottomLeft = colors.red;
    // cust.setTint(Phaser.Display.Color.GetColor(50, 50, 50));
    // cust.y = rPosition.y
    // cust.x = rPosition.x
  }

  loseHealth() {
    this.hearts[this.player.health - 1].destroy();
    this.player.health--;
    if (this.player.health === 0) {
      for (let i = 0; i < this.numCustomers; i++) {
        this.customers.pop();
      }
      // this.customers.forEach((customer) => {
      //   customer.destroy();

      // });

      return;
    }
  }


}


//TODO: health bar for customers
//    - create bar using draw function in phaser
//    - 
//    - 
//TODO: timer for cool down
//    - run a constant clock
//    - measure time from when object hits counter + delay (5s)
//    - .destroy custumer once timer is up
//    - make sure every customer is running it's opwn timer (if one customer hits it shouldnt start the timer for all enemies to destroy after 5 s--> case by case)
