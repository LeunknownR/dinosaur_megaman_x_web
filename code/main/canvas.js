import { states, Game } from './states.js';
import { loadImages } from '../graphics/sprites.js';

export const canvas = {
    element: null,
    context2D: null,
    width: 900,
    height: 380
};

export const initCanvas = () => {
    canvas.element = document.getElementById('canvas-game');
    canvas.context2D = canvas.element.getContext('2d');
    loadImages();
    states.game = new Game();
}
export const clearCanvas = () => {
    canvas.element.width = canvas.width;
    canvas.element.height = canvas.height;
}