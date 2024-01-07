import { getResourceJpgPath, getResourcePng } from "./helpers.js"

export const sprites = {
    background: null,
    obstacles: {
        auto: [],
        stormEagle: []
    },
    megamanX: {
        running: [],
        jumping: [],
        dashing: [],
        death: {
            X: [],
            particles: []
        }
    }
};

const fillSprites = () => {
    sprites.background = new Image();
    sprites.background.src = getResourceJpgPath("/background");
    let i = 0;
    for (i = 0; i < 3; i++)
    {
        sprites.obstacles.auto[i] = new Image();
        sprites.obstacles.auto[i].src = getResourcePng(`/obstacles/auto/${i}`);
    }
    for (i = 0; i < 2; i++)
    {
        sprites.obstacles.stormEagle[i] = new Image();
        sprites.obstacles.stormEagle[i].src = getResourcePng(`/obstacles/stormEagle/${i}`);
    }
    for (i = 0; i < 9; i++)
    {
        sprites.megamanX.running[i] = new Image();
        sprites.megamanX.running[i].src = getResourcePng(`/X/running/${i}`);
    }
    for (i = 0; i < 7; i++)
    {
        sprites.megamanX.jumping[i] = new Image();
        sprites.megamanX.jumping[i].src = getResourcePng(`/X/jumping/${i}`);
    }
    for (i = 0; i < 6; i++)
    {
        sprites.megamanX.dashing[i] = new Image();
        sprites.megamanX.dashing[i].src = getResourcePng(`/X/dashing/${i}`);
    }
    for (i = 0; i < 2; i++)
    {
        sprites.megamanX.death.X[i] = new Image();
        sprites.megamanX.death.X[i].src = getResourcePng(`/X/death/${i}`);
    }
    for (i = 0; i < 5; i++)
    {
        sprites.megamanX.death.particles[i] = new Image();
        sprites.megamanX.death.particles[i].src =  getResourcePng(`/X/death/particles/${i}`);
    }
}

// Bullshit
// const fillSprites = () => {
//     sprites.background = new Image();
//     sprites.background.src = "/public/resources/background.jpg";
//     let i = 0;
//     for (i = 0; i < 3; i++)
//     {
//         sprites.obstacles.auto[i] = new Image();
//         sprites.obstacles.auto[i].src = "/public/resources/obstacles/auto/" + i + ".png";
//     }
//     for (i = 0; i < 2; i++)
//     {
//         sprites.obstacles.stormEagle[i] = new Image();
//         sprites.obstacles.stormEagle[i].src = "/public/resources/obstacles/stormEagle/" + i + ".png";
//     }
//     for (i = 0; i < 9; i++)
//     {
//         sprites.megamanX.running[i] = new Image();
//         sprites.megamanX.running[i].src = "/public/resources/X/running/" + i + ".png";
//     }
//     for (i = 0; i < 7; i++)
//     {
//         sprites.megamanX.jumping[i] = new Image();
//         sprites.megamanX.jumping[i].src = "/public/resources/X/jumping/" + i + ".png";
//     }
//     for (i = 0; i < 6; i++)
//     {
//         sprites.megamanX.dashing[i] = new Image();
//         sprites.megamanX.dashing[i].src = "/public/resources/X/dashing/" + i + ".png";        
//     }
//     for (i = 0; i < 2; i++)
//     {
//         sprites.megamanX.death.X[i] = new Image();
//         sprites.megamanX.death.X[i].src = "/public/resources/X/death/" + i + ".png";
//     }
//     for (i = 0; i < 5; i++)
//     {
//         sprites.megamanX.death.particles[i] = new Image();
//         sprites.megamanX.death.particles[i].src = "/public/resources/X/death/particles/" + i + ".png";
//     }
// }

const loadSprites = async () => {
    await Promise.all(
        [
            sprites.background,
            ...sprites.megamanX.dashing,
            ...sprites.megamanX.jumping,
            ...sprites.megamanX.running,
            ...sprites.megamanX.death.X,
            ...sprites.megamanX.death.particles,
            ...sprites.obstacles.auto,
            ...sprites.obstacles.stormEagle
        ].map(sprite => new Promise(res => {
            sprite.addEventListener("load", () => res());
        }))
    );
}
export const startSprites = async () => {
    fillSprites();
    await loadSprites();
}