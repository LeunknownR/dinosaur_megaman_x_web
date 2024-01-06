import { states } from './states.js';
import { canvas, initCanvas, clearCanvas } from './canvas.js';
import { initKeys } from '../input/keyboard.js';
import { startSprites } from '../graphics/sprites.js';

const loop = {
    FPS: 35,
    iterate: async () => {
        if (!canvas.element)
        {
            initCanvas();
            initKeys();
            return;
        }
        clearCanvas();
        states.game.Update();
        states.game.Draw(canvas.context2D);
    }
};

async function startLoop() {
    await startSprites();
    setInterval(loop.iterate, 1000/loop.FPS);
}
startLoop();