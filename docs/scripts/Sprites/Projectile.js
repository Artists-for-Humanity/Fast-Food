export default class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, foodSprite) {
        super(scene, x, y, foodSprite);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.foodSprite = foodSprite;
        this.setScale(0.1);
    }
    fire(angle) {
        this.arcade = new Phaser.Physics.Arcade.ArcadePhysics(this.scene);
        const vel = this.scene.physics.velocityFromRotation(angle - Phaser.Math.DegToRad(90), 300);
        this.setVelocity(vel.x, vel.y);
    }
}

// export default class LaserGroup extends Phaser.Physics.Arcade.Group
// {
//     constructor(scene) {
//         super(scene.physics.world, scene);

//         // const key = []; 

//         this.createMultiple({
//             classType: Projectile,
//             frameQuantity: 300,
//             active: false,
//             visible: false,
//             key: 'player'

//         })
//     }
//     fireLaser(x, y, angle) {
//         const projec = this.getFirstDead(false);
//         if(projec) {
//             projec.fire(x,y,angle);
//         }
//     }
// }