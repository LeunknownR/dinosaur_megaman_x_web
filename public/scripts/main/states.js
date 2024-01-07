import { Background, MegamanX, UI, DeathParticlesX, Obstacle1 } from "../gameObjects/gameObjects.js";
import { keys } from "../input/keyboard.js";

export const states = {
    game: null
};

//#region STATES
export class Game 
{
    static hiScore = 0;
    constructor() {
        this.background = new Background();
        //Physics Objects
        this.obstacles = [
            new Obstacle1(225, 7.3),
            new Obstacle1(225, 7.3, 1),
            new Obstacle1(225, 7.3, 2),
            new Obstacle1(140, 0.85, 3)
        ];
        this.megamanX = new MegamanX(207);
        this.deathParticlesX = new DeathParticlesX(this.megamanX);
        this.STORM_EAGLE_INDEX = 3;
        this.currentObstacle = null;
        //Variables 
        this.speedDelta = 13;
        this.isGameOver = false;
        this.setCurrentObstacle();
        //UI
        this.ui = new UI(Game.hiScore);
    }
    checkGameOver() {
        this.isGameOver = this.currentObstacle
            .boxCollider
            .CollisionWith(this.megamanX.boxCollider);
    }
    generateObstacleRandomIndex() {
        return Math.floor(Math.random()*this.obstacles.length);
    }
    getSpeedOffset(obstacleIndex) {
        return obstacleIndex === this.STORM_EAGLE_INDEX ? 2 : 0;
    }
    setCurrentObstacle() {
        const randomIndex = this.generateObstacleRandomIndex();
        this.currentObstacle = this.obstacles[randomIndex];
        this.currentObstacle.SetSpeedDelta(
            this.speedDelta + this.getSpeedOffset(randomIndex)
        );
    }
    checkObstacleRespawn() {
        if (this.currentObstacle.isRespawn()) 
            this.setCurrentObstacle();
    }
    inGame() {
        this.background.Update(this.speedDelta);
        this.ui.Update();
        this.checkObstacleRespawn();
        this.currentObstacle.Update();
        this.megamanX.Update();
        this.checkGameOver();
    }
    checkHighScoreReached() {
        if (this.ui.score > Game.hiScore)
            Game.hiScore = this.ui.score;
    }
    checkGameReset() {
        if (!keys.jumping) return;
        this.checkHighScoreReached();
        states.game = new Game();
    }
    gameOver() {
        this.ui.drawGameOver = true;
        this.deathParticlesX.Update();
        this.checkGameReset();
    }
    Update() {
        if (this.isGameOver) this.gameOver();
        else this.inGame();
    }
    Draw(context2D) {
        this.background.Draw(context2D);
        this.ui.Draw(context2D);
        this.currentObstacle.Draw(context2D);
        this.megamanX.Draw(context2D);

        if (this.megamanX.death) this.deathParticlesX.Draw(context2D);
    }
}
//#endregion