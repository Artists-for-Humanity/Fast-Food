import Phaser from 'phaser';
import Customer from '../Sprites/Customer';
import Line from '../Sprites/Line';
import Player from '../Sprites/Player';
import Counter from '../Sprites/Counter';
import LaserGroup from '../Sprites/Projectile'
import Projectile from '../Sprites/Projectile'
import Heart from '../Sprites/Heart';
import WebFont from 'webfontloader';
import { colors } from '../constants';

export default class GameScene extends Phaser.Scene {
  player;
  container;

  constructor() {
    super({
      key: 'GameScene',
    });
    this.customers = [];
    this.customerSprites = [];
    this.foodSprites = [];
    this.spawnZone;
    this.customerTextures = [];
    this.numCustomers = 10;
    this.laserGroup;
    this.hearts = [];
  }

  preload() {
    this.load.image('player', new URL('../../assets/player.png', import.meta.url).href);
    this.load.image('counter', new URL('../../assets/counter.png', import.meta.url).href);
    this.load.image('line', new URL('../../assets/line.png', import.meta.url).href);
    this.load.image('heart', new URL('../../assets/heart.png', import.meta.url).href);
    this.load.image('person1', new URL('../../assets/person1.png', import.meta.url).href);
    this.load.image('person2', new URL('../../assets/person2.png', import.meta.url).href);
    this.load.image('person3', new URL('../../assets/person3.png', import.meta.url).href);
    this.load.image('person4', new URL('../../assets/person4.png', import.meta.url).href);
    this.load.image('person5', new URL('../../assets/person5.png', import.meta.url).href);
    this.load.image('person6', new URL('../../assets/person6.png', import.meta.url).href);
    this.load.image('person7', new URL('../../assets/person7.png', import.meta.url).href);
    this.load.image('person8', new URL('../../assets/person8.png', import.meta.url).href);
    this.load.image('bubble', new URL('../../assets/thought-bubble.png', import.meta.url).href);

    this.load.image('food1', new URL('../../assets/food1.png', import.meta.url).href);
    this.load.image('food2', new URL('../../assets/food2.png', import.meta.url).href);
    this.load.image('food3', new URL('../../assets/food3.png', import.meta.url).href);
    this.load.image('projectile', new URL('../../assets/food4.png', import.meta.url).href);
  }

  create() {
    this.counter = new Counter(this, this.game.config.width / 2, this.game.config.height / 2);
    this.player = new Player(this, this.game.config.width / 2, this.game.config.height / 2);
    this.line = new Line(this, this.game.config.width / 2, this.game.config.height / 2);
    this.createSpawnZone();


    this.laserGroup = new LaserGroup(this);
    this.addEvents();
  }

  addEvents() {
    this.input.on('pointerdown', pointer =>{
      this.shootLaser();
    })
  }
  shootLaser() {
    this.laserGroup.fireLaser(this.player.x, this.player.y, this.line.getAngle());

    //
    // use for loop
    //loop this.player.health time
    for (var i = 0; i < this.player.health; i++) {
      this.hearts.push(new Heart(this, (i + 1) * 60, 50));
    }

    this.bubble = this.add.sprite(0, 0, 'bubble').setScale(0.15).setVisible(false);
    this.foodSprites = [
      this.add.sprite(2, 0, 'food1').setScale(0.1).setVisible(false),
      this.add.sprite(2, 0, 'food2').setScale(0.1).setVisible(false),
      this.add.sprite(2, 0, 'food3').setScale(0.1).setVisible(false),
      this.add.sprite(2, 0, 'food4').setScale(0.1).setVisible(false),
    ];
    this.customerSprites = [
      this.add.sprite(-50, 55, 'person1').setScale(0.15).setVisible(false),
      this.add.sprite(-50, 55, 'person2').setScale(0.15).setVisible(false),
      this.add.sprite(-50, 55, 'person3').setScale(0.15).setVisible(false),
      this.add.sprite(-50, 55, 'person4').setScale(0.15).setVisible(false),
      this.add.sprite(-50, 55, 'person5').setScale(0.15).setVisible(false),
      this.add.sprite(-50, 55, 'person6').setScale(0.15).setVisible(false),
      this.add.sprite(-50, 55, 'person7').setScale(0.15).setVisible(false),
      this.add.sprite(-50, 55, 'person8').setScale(0.15).setVisible(false),
    ];

    WebFont.load({
      custom: {
        families: ['Play'],
      },
      active: () => {
        this.add
          .text(this.game.config.width - 100, 20, `Score: ${40}`, {
            fontFamily: 'Play',
            fontSize: '32px',
            fontStyle: 'bold',
            fill: colors.black,
            align: 'right',
          })
          .setOrigin(1, 0);
      },
    });
    // if(difficulty = 'easy') {
    //   easyCustomrs = ['c1', 'c2']
    // }
    // else if (difficulty = 'medium')
    //this.customers = [new Customer, new Customer]

    this.createCustomers();
  }

  update() {
    this.line.update();
    this.customers.map((customer) => {
      customer.update();
    });
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
    const { height, width } = this.game.config;
    const counterBody = this.counter.body;

    // extended this further than Counter
    const counterPositions = [
      [width / 2 - counterBody.width / 2 - 100, height / 2 - counterBody.height / 2 - 100],
      [width / 2 - counterBody.width / 2 - 100, height / 2 + counterBody.height / 2 + 100],
      [width / 2 + counterBody.width / 2 + 100, height / 2 + counterBody.height / 2],
      [width / 2 + counterBody.width / 2 + 100, height / 2 - counterBody.height / 2 - 100],
    ];

    var polygon = new Phaser.Geom.Polygon([
      [0, 0],
      [width, 0],
      [width, height],
      [0, height],
      [0, 0],
      counterPositions[0],
      counterPositions[1],
      counterPositions[2],
      counterPositions[3],
      counterPositions[0],
      [0, 0],
    ]);

    this.spawnZone = polygon;
  }

  createCustomers() {
    for (let i = 0; i < this.numCustomers; i++) {
      let rt = this.add.renderTexture(-100, -100, 140, 140);
      const customerSprite = this.customerSprites[Math.floor(Math.random() * 8)];

      const foodSprite = this.foodSprites[Math.floor(Math.random() * 4)];

      rt.draw(this.bubble, rt.width / 2 + 30, rt.height / 2 - 25);
      rt.draw(foodSprite, rt.width / 2 + 32, rt.height / 2 - 25);
      rt.draw(customerSprite, rt.width / 2 - 25, rt.height / 2 + 25);
      this.customerTextures.push(rt.saveTexture('doodle' + i));

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
      const customer = new Customer(this, position.x, position.y, this.customerTextures[i]); /// accessing the key (using the index)
      this.customers.push(customer);

      const collider = this.physics.add.overlap(this.counter, customer, (counter, customer) => {
        this.physics.world.removeCollider(collider);

        this.hearts[this.player.health - 1].destroy();
        this.player.health--;
        customer.body.stop();
      });
    });
  }

}

