import { states } from './states.js';
import { canvas, initCanvas, clearCanvas } from './canvas.js';
import { initKeys } from '../input/keyboard.js';
import { startSprites } from '../graphics/sprites.js';

class LoopGame {
    static FPS = 35;
    constructor() {
        this.startLoop();
    }
    async startLoop() {
        initKeys();
        await startSprites();
        initCanvas();
        setInterval(this.iterate, 1000/LoopGame.FPS);
    }
    iterate() {
        clearCanvas();
        states.game.Update();
        states.game.Draw(canvas.context2D);
    }
}
new LoopGame();