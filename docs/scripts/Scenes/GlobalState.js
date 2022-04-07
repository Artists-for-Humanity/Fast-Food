import Phaser from '../../snowpack/pkg/phaser.js';

class GlobalState extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.score = 0;
    }

    incrementScore() {
        this.score++;
    }

    resetScore() {
        this.score = 0;
    }
}

export default GlobalState;