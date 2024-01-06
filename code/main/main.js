import { states } from './states.js';
import { canvas, initCanvas, clearCanvas } from './canvas.js';
import { initKeys } from '../input/keyboard.js';

const loop = {
    FPS: 35,
    iterate: () => {
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
setInterval(loop.iterate, 1000/loop.FPS);