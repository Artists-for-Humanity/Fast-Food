i

export default class Projectile extends Phaser.Physics.Arcade.Sprite  {
    constructor(scene, x, y) {
        super(scene, x, y, 'food1');
    }
    fire(x,y,angle) {
        this.body.reset(x,y);
        this.setActive(true);
        this.setVisible(true);
        this.arcade = new Phaser.Physics.Arcade.ArcadePhysics(this.scene);
        this.setScale(0.1);
        // const angleVec = this.arcade.velocityFromAngle(angle)
        // console.log(angleVec)
        const vel = this.scene.physics.velocityFromRotation(angle - Phaser.Math.DegToRad(90), 300);
        // console.log(angle, vel);
        this.setVelocity(vel.x, vel.y);
        
    }
}




export default class LaserGroup extends Phaser.Physics.Arcade.Group
{
    constructor(scene) {
        super(scene.physics.world, scene);

        // const key = []; 

        this.createMultiple({
            classType: Projectile,
            frameQuantity: 300,
            active: false,
            visible: false,
            key: 'player'

        })
    }
    fireLaser(x, y, angle) {
        const projec = this.getFirstDead(false);
        if(projec) {
            projec.fire(x,y,angle);
        }
    }
}