import Phaser from 'phaser';
import WebFont from 'webfontloader';
import Customer from '../Sprites/Customer';
import Line from '../Sprites/Line';
import Player from '../Sprites/Player';
// import Counter from '../Sprites/Counter';
import Heart from '../Sprites/Heart';
import { colors } from '../constants';

export default class GameScene extends Phaser.Scene {
  player;

  constructor() {
    super({
      key: 'GameScene',
    });
  }

  preload() {
    this.load.image('player', new URL('../../assets/player.png', import.meta.url).href);
    this.load.image('line', new URL('../../assets/line.png', import.meta.url).href);
    this.load.image('start', new URL('../../assets/burger.png', import.meta.url).href);
    this.load.image('person1', new URL('../../assets/person1.png', import.meta.url).href);
    this.load.image('person2', new URL('../../assets/person2.png', import.meta.url).href);
    this.load.image('person3', new URL('../../assets/person3.png', import.meta.url).href);
    this.load.image('person4', new URL('../../assets/person4.png', import.meta.url).href);
    this.load.image('person5', new URL('../../assets/person5.png', import.meta.url).href);
    this.load.image('person6', new URL('../../assets/person6.png', import.meta.url).href);
    this.load.image('person7', new URL('../../assets/person7.png', import.meta.url).href);
    this.load.image('person8', new URL('../../assets/person8.png', import.meta.url).href);
    // this.load.image('bubble', new URL('../../assets/thought-bubble.png', import.meta.url).href);
    this.load.image('heart', new URL('../../assets/heart.png', import.meta.url).href);
  }

  create() {
    this.player = new Player(this, this.game.config.width / 2, this.game.config.height / 2);
    this.line = new Line(this, this.game.config.width / 2, this.game.config.height / 2);
    // if(difficulty = 'easy') {
    //   easyCustomrs = ['c1', 'c2']
    // }
    // else if (difficulty = 'medium')
    //this.customers = [new Customer, new Customer]
    // }

    this.heart1 = new Heart(this, 60, 50);
    this.heart2 = new Heart(this, 120, 50);
    this.heart3 = new Heart(this, 180, 50);

    this.customerSprite = this.add.sprite('person1', 0, 0);

    this.createSpawnZone();

    const customerPositions = [];
    for (let i = 1; i < 9; i++) {
      const position = this.getRandomPosition();
      customerPositions.push({
        x: position.x,
        y: position.y,
        img: 'person' + i,
      });
    }

    customerPositions.map((position) => {
      const customer = new Customer(this, position.x, position.y, position.img);
      this.customers.push(customer);
      const collider = this.physics.add.overlap(this.counter, customer, (counter, customer) => {
        this.physics.world.removeCollider(collider);
        customer.body.stop();
      });
    });

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
  }

  update() {
    this.line.update();
  }
}
