import { Background, MegamanX2, UI, DeathParticlesX, Obstacle1 } from "../gameObjects/gameObjects.js";
import { keys } from "../input/keyboard.js";

export const states = {
    game: null
};
let hiScore = 0;

//#region STATES
export class Game 
{
    constructor() {
        this.background = new Background();
        //Physics Objects
        this.obstacles = [
            new Obstacle1(225, 7.3),
            new Obstacle1(225, 7.3, 1),
            new Obstacle1(225, 7.3, 2),
            new Obstacle1(140, 0.85, 3)
        ];
        this.iObstacles = parseInt(Math.random()*4);
        this.megamanX2 = new MegamanX2(207);
        this.deathParticlesX = new DeathParticlesX();
        //Variables 
        this.speedDelta = 11.5;
        this.gameOver = false;
        //UI
        this.ui = new UI(hiScore);
    }
    managementGameOver() {
        this.gameOver = this.obstacles[this.iObstacles].boxCollider.CollisionWith(this.megamanX2.boxCollider);
    }
    Update() {
        if (!this.gameOver)
        {
            this.background.Update(this.speedDelta);
            this.ui.Update();
            //Obstacles
            if (this.obstacles[this.iObstacles].isRespawn())
                this.iObstacles = parseInt(Math.random()*4);

            if (this.iObstacles === 3)
                this.obstacles[3].Update(this.speedDelta + 2);
            else
                this.obstacles[this.iObstacles].Update(this.speedDelta);

            //MegamanX
            this.megamanX2.Update();

            //Extra
            this.managementGameOver();
        }
        else {
            this.ui.drawGameOver = true;

            const { position, dimension } = this.megamanX2;
            this.deathParticlesX.position = { 
                x: position.x + dimension.width/3, 
                y: position.y + dimension.height/2
            };
            if (!this.megamanX2.death) this.megamanX2.UpdateDeath();
            else this.deathParticlesX.Update();

            if (keys.jumping)
            {
                if (this.ui.score > hiScore)
                    hiScore = this.ui.score;
                states.game = new Game();
            }
        }
    }
    Draw(context2D) {
        this.background.Draw(context2D);
        this.ui.Draw(context2D);

        this.obstacles[this.iObstacles].Draw(context2D);
        this.megamanX2.Draw(context2D);

        if (this.megamanX2.death) this.deathParticlesX.Draw(context2D);
    }
}
//#endregion