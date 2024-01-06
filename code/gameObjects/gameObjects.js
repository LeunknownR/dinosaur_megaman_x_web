import { sprites } from '../graphics/sprites.js';
import { keys } from '../input/keyboard.js';
import { canvas } from '../main/canvas.js';

export const mathFunctions = {
    minus: (pos1, pos2) => {
        return { 
            x: pos1.x - pos2.x, 
            y: pos1.y - pos2.y 
        };
    },
    plus: (pos1, pos2) => {
        return {
            x: pos1.x + pos2.x,
            y: pos1.y + pos2.y
        };
    },
    getMagnitude: pos => {
        const { pow } = Math;
        return (
            Math.sqrt(pow(pos.x, 2) + pow(pos.y, 2))
        );
    },
    getHeading: angle => {
        const radianAngle = angle* Math.PI/180;
        return { x: Math.cos(radianAngle), y: Math.sin(radianAngle) };
    },
    scaleProduct: (position, scale) => {
        return { x: position.x*scale, y: position.y*scale };
    }
}

export class Background 
{
    constructor() {
        this.sprite = sprites.background;
        this.width = this.sprite.width; 
        this.height = this.sprite.height*1.55;
        this.posX = [
            0,  
            this.width
        ];
    }
    calculate(i, delta, calculator) {
        calculator();
        if (this.posX[i] - delta <= -this.width)
            this.posX[i] = this.width;
        this.posX[i]-= delta;
    }
    Update(delta) {
        this.calculate(0, delta, () => {
            const difference = this.posX[1] - (this.posX[0] + this.width);
            if (difference >= 0 && difference < 100)
                this.posX[1] = this.posX[0] + this.width;
        });
        this.calculate(1, delta, () => {
            const difference = this.posX[0] - (this.posX[1] + this.width);
            if (difference >= 0 && difference < 100)
                this.posX[0] = this.posX[0] + this.width;
        });
    }
    Draw(context2D) {
        const sprite = this.sprite;
        for (let i = 0; i < this.posX.length; i++)
        {
            context2D.drawImage(
                sprite, 
                0, 0, 
                sprite.width, sprite.height,
                this.posX[i], 0,
                this.width, this.height 
            );
        }
        // context2D.fillStyle = '#f00';
        // context2D.fillRect(this.posX.x1, 0, 2, canvas.height);
        // context2D.fillRect(this.posX.x2, 0, 2, canvas.height);
    }
}
export class UI 
{
    constructor(hiScore) {
        this.score = 0;
        this.hiScore = `HI ${hiScore}`;
        this.font = `bold 35px Impact`;
        this.positionScore = { 
            x: 0,
            y: this.fontHeight,
        };
        this.drawGameOver = false;
        this.tmrScore = new TimerX();
    }
    setFontHeight(fontHeight) {
        this.font = `bold ${fontHeight}px Impact`;
    }
    Update() {
        this.tmrScore.Invoke(() => this.score++, 120);
    }
    Draw(context2D = new CanvasRenderingContext2D()) {
        //SCORE
        let fontHeight = 35;
        this.setFontHeight(fontHeight);
        const score = `${this.score}`
        let metrics = context2D.measureText(score).width;

        this.positionScore.x = canvas.width - metrics*4;
        this.positionScore.y =  35;
        this.DrawTextIU(
            context2D, 
            score,
            this.font, 
            {
                c1: '#004',
                c2: '#00f'
            },
            this.positionScore);

        metrics = context2D.measureText(this.hiScore).width;
        this.positionScore.x-= metrics*1.2;
        this.DrawTextIU(
            context2D, 
            this.hiScore,
            this.font, 
            {
                c1: '#400',
                c2: '#f00'
            },
            this.positionScore);
        //--
        
        if (this.drawGameOver)
        {
            //Drawing GameOver
            fontHeight = 85;
            this.setFontHeight(fontHeight);
            const posAux = {
                x: canvas.width/2 - context2D.measureText('GAME OVER').width*1.15,
                y: canvas.height/2 + fontHeight/2
            }
            this.DrawTextIU(
                context2D, 
                'GAME OVER', 
                this.font,
                {
                    c1: '#400',
                    c2: '#f00'
                },
                posAux
            );
        }
    }
    DrawTextIU(context2D, text, font, { c1, c2 }, position) {
        DrawText(
            context2D, 
            text,
            font, 
            c1,
            position
        );
        DrawText(
            context2D, 
            text,
            this.font, 
            c2,
            position,
            true
        );
    }
}


export const DrawText = (context2D, text, font, color, position, withStroke = false) => {
    context2D.font = font;
    const { x, y } = position;

    if (withStroke)
    {
        context2D.strokeStyle = color;
        context2D.strokeText(text, x, y);
    }
    else 
    {   
        context2D.fillStyle = color;
        context2D.fillText(text, x, y);
    }
}

export class DeathParticlesX
{
    constructor() {
        this.quantityParticles = 16,
        this.headings = [];
        this.animator = new Animator(sprites.megamanX.death.particles, 20);
        this.position = { x: canvas.width/2, y: canvas.height/2 };
        this.deltaPosition = 0;

        const scale = 5;
        const sprite = this.animator.getFrame(0);
        this.dimension = { width: sprite.width/scale, height: sprite.height/scale };

        //Defining headings
        const { getHeading } = mathFunctions;
        const difference = 360/this.quantityParticles;
        this.angles = [];
        let angle = 0;
        for (let i = 0; i < this.quantityParticles; i++)
        {
            this.headings[i] = getHeading(angle);
            this.angles[i] = angle;
            angle+= difference;
        };
    }
    Update() {
        this.animator.Update();
        const { getHeading } = mathFunctions;
        
        for (let i = 0; i < this.quantityParticles; i++)
        {
            this.headings[i] = getHeading(this.angles[i]);
            this.angles[i]+= 3.5;
        };        
        this.deltaPosition+= 4;
    }
    Draw(context2D = new CanvasRenderingContext2D()) {
        const { scaleProduct, plus } = mathFunctions;
        const { position, headings, deltaPosition, animator } = this;
        for (let i = 0; i < headings.length; i++)
        {
            const { x, y } = plus(position, scaleProduct(headings[i], deltaPosition));
            const { width, height } = this.dimension;
            const sprite = animator.getUpdatedFrame();
            context2D.drawImage(
                sprite,
                0, 0,
                sprite.width, sprite.height,
                x, y,
                width, height
            );
        }
    }
};

//#region BoxCollider 
class BoxCollider {
    constructor(position, dimension) {
        this.position = position;
        this.dimension = dimension;
    }
    CollisionWith(boxCollider = new BoxCollider({position: null, dimension: null})) {
        //If any of the points of rectangle is contained inside of current rectangle then they've collisioned
        const x1 = this.position.x;
        const y1 = this.position.y;
        const width1 = this.dimension.width;
        const height1 = this.dimension.height;

        const x2 = boxCollider.position.x;
        const y2 = boxCollider.position.y;
        const width2 = boxCollider.dimension.width;
        const height2 = boxCollider.dimension.height;

        return (
            x1 + width1 >= x2 && 
            x2 + width2 >= x1 && 
            y2 <= y1 + height1 && 
            y2 + height2 >= y1);
    }
}
export class MegamanX2
{
    constructor(y) {
        //Animation
        this.timers = {
            running: new TimerX(),
            jumping: new TimerX(),
            dashing: new TimerX(),
            death: new TimerX()
        };
        this.iSprite = {
            iR: 0,
            iJ: 0,
            iD: 0,
            iDeath: 0
        };
        this.sprites = {
            running: [...sprites.megamanX.running],
            jumping: [...sprites.megamanX.jumping],
            dashing: [...sprites.megamanX.dashing],
            death: [...sprites.megamanX.death.X]
        };
        this.sprite = this.sprites.running[0];
        //Physics
        this.position = { x: 100, y };
        this.initialPos = y;
        this.speedY = 0;
        this.speedYMax = 7;
        this.gravityForce = 2.1;
        this.jumpForce = 26;
        this.jumping = false;
        this.death = false;
        const scale = 8.6;
        this.dimension = { width: this.sprite.width/scale, height: this.sprite.height/scale }
        //Collision
        this.boxCollider = new BoxCollider(
            { 
                x: this.position.x + 20, 
                y: this.position.y + 10
            }, 
            { 
                width: this.dimension.width - 36, 
                height: this.dimension.height - 20
            }
        );
        this.styleX = '#0f0';
    }
    testCollider(context2D) {
        context2D.fillStyle = this.styleX;
        const { boxCollider } = this;
        context2D.fillRect(boxCollider.position.x, boxCollider.position.y, boxCollider.dimension.width, boxCollider.dimension.height);
    }
    managementCollision() {
        this.boxCollider.position = { 
            x: this.position.x + 20, 
            y: this.position.y + 12
        };
        this.boxCollider.dimension = { 
            width: this.dimension.width/2.4, 
            height: this.dimension.height/1.4
        };
        if (keys.dashing && !this.jumping) {
            this.boxCollider.position = { 
                x: this.position.x + 25, 
                y: this.position.y + 30
            };
            this.boxCollider.dimension = { 
                width: this.dimension.width/1.4, 
                height: this.dimension.height/2
            };
        }
    }
    UpdateDeath() {
        this.sprite = this.sprites.death[this.iSprite.iDeath];
        if (this.iSprite.iDeath <= this.sprites.death.length) 
            this.timers.death.Invoke(() => {
                if (this.iSprite.iDeath < this.sprites.death.length) 
                    this.iSprite.iDeath++;
                else 
                    this.death = true;
            }, 100);
        
    }
    Update() {
        this.jump();
        this.gravity();
        this.animation();
        this.managementCollision();
    }
    Draw(context2D = new CanvasRenderingContext2D()) {
        const sprite = this.sprite;
        const { width, height } = this.dimension;
        const { x, y } = this.position;
        
        //this.testCollider(context2D);

        if (sprite)
            context2D.drawImage(
                sprite, 
                0, 0, 
                sprite.width, sprite.height, 
                x, y, 
                width, height 
            );
    }
    animation() {
        if (!this.jumping)
        {
            //Running
            if (!keys.dashing) {
                this.radio = 30;
                this.iSprite.iJ = 0;
                this.iSprite.iD = 0;

                this.timers.running.Invoke(() => {
                    this.sprite = this.sprites.running[this.iSprite.iR];
                    this.iSprite.iR++;
                    if (this.iSprite.iR > sprites.megamanX.jumping.length)
                        this.iSprite.iR = 0;
                }, 55);
            }
            //Dashing
            else {
                this.radio = 25;
                this.iSprite.iR = 0;
                this.iSprite.iJ = 0;

                this.timers.dashing.Invoke(() => {
                    this.sprite = this.sprites.dashing[this.iSprite.iD];
                    this.iSprite.iD++;
                    if (this.iSprite.iD > sprites.megamanX.dashing.length - 1) 
                            this.iSprite.iD = 1;
                }, 40);
            }
        }
        //Jumping
        else if (this.jumping) {
            this.iSprite.iR = 0;
            this.iSprite.iD = 0;

            if (this.iSprite.iJ > this.sprites.running.length - 1)
                this.iSprite.iJ = this.sprites.running.length - 1;
            else {
                this.timers.jumping.Invoke(() => {
                    this.sprite = this.sprites.jumping[this.iSprite.iJ];
                    this.iSprite.iJ++;
                }, 90);
            }
        }
    }
    jump() {
        if (keys.jumping && !this.jumping) 
        {
            this.jumping = true;
            this.speedY = this.jumpForce;
        }
   }
    gravity() {
        if (this.jumping)
        {
            if (this.position.y - this.speedY - this.gravityForce > this.initialPos)
            {
                this.jumping = false;
                this.speedY = 0;
                this.position.y = this.initialPos;
                return;
            }
            this.speedY -= this.gravityForce;
            this.position.y -= this.speedY;            
        }
    }
} 
export class Obstacle1 {
    constructor(y, scale, typeEnemy = 0) {
        //Animation
        let spritesAnim = null;
        if (typeEnemy === 3)
            spritesAnim = sprites.obstacles.stormEagle;
        else
            spritesAnim = [sprites.obstacles.auto[typeEnemy]];
        this.animator = new Animator(spritesAnim, 100);

        this.dimension = { width: spritesAnim[0].width/scale, height: spritesAnim[0].height/scale };
        //Physics
        this.position = { x: canvas.width, y };
        //Collision
        this.typeEnemy = typeEnemy;
        let x = this.position.x;
        let newY = this.position.y + 8;
        let width = this.dimension.width - 22;
        let height = this.dimension.height - 14;
        if (typeEnemy === 3)
        {
            x = this.position.x + 20;
            newY += 5;
            width = this.dimension.width - 70;
            height-= 10;
        }
        // console.log(keys.dashing);
        this.boxCollider = new BoxCollider(
            { 
                x, newY
            }, 
            { 
                width, height
            }
        );
    }
    testCollider(context2D) {
        context2D.fillStyle = '#0f0';
        const { boxCollider } = this;
        context2D.fillRect(boxCollider.position.x, boxCollider.position.y, boxCollider.dimension.width, boxCollider.dimension.height);
    }
    managementCollision() {
        let x = this.position.x;
        let y = this.position.y + 8;

        if (this.typeEnemy === 3)
        {
            x = this.position.x + 8;
            y += 5;
        }
        this.boxCollider.position = { 
            x,
            y
        };
    }
    Update(delta) {
        this.managementCollision();
        this.respawn();
        this.animator.Update();
        this.position.x-= delta;
    }
    Draw(context2D) {
        const { x, y } = this.position;
        const { width, height } = this.dimension;
        const sprite = this.animator.getUpdatedFrame();

        //this.testCollider(context2D);

        context2D.drawImage(
            sprite, 
            0, 0,
            sprite.width, sprite.height,
            x, y,
            width, height
        );
    }
    respawn() {
        if (this.position.x <= -this.dimension.width)
            this.position.x = canvas.width + this.dimension.width;
    }
    isRespawn() {
        return this.position.x <= -this.dimension.width;
    }
}
//#endregion

class TimerX {
    constructor() {
        this.do = true;
    }
    Invoke(f, interval) {
        if (this.do)
        {
            setTimeout(() => {
                f();
                this.do = true;
            }, interval);
            this.do = false;
        }
    }
}

class Animator 
{
        constructor(sprites = [], interval)
        {
            this.noAnimate = sprites.length === 0;
            this.interval = interval;
            this.sprites = sprites;
            this.iSprites = 0;
            this.timer = new TimerX();
        }
        getUpdatedFrame()
        {
            return this.sprites[this.iSprites];
        }
        getFrame(index)
        {
            return this.sprites[index];
        }
        Update()
        {
            if (!this.noAnimate)
                this.timer.Invoke(() => {
                    this.iSprites++;
                    if (this.iSprites >= this.sprites.length)
                        this.iSprites = 0;
                }, this.interval);
        }
}