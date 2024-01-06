export const sprites = {
    background: new Image(),
    cloud: new Image(),
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

export const loadImages = () => {
    sprites.background.src = "../resources/background.jpg";
    let i = 0;
    for (i = 0; i < 3; i++)
    {
        sprites.obstacles.auto[i] = new Image();
        sprites.obstacles.auto[i].src = "../resources/obstacles/auto/" + i + ".png";
    }
    for (i = 0; i < 2; i++)
    {
        sprites.obstacles.stormEagle[i] = new Image();
        sprites.obstacles.stormEagle[i].src = "../resources/obstacles/stormEagle/" + i + ".png";
    }
    for (i = 0; i < 9; i++)
    {
        sprites.megamanX.running[i] = new Image();
        sprites.megamanX.running[i].src = "../resources/X/running/" + i + ".png";
    }
    for (i = 0; i < 7; i++)
    {
        sprites.megamanX.jumping[i] = new Image();
        sprites.megamanX.jumping[i].src = "../resources/X/jumping/" + i + ".png";
    }
    for (i = 0; i < 6; i++)
    {
        sprites.megamanX.dashing[i] = new Image();
        sprites.megamanX.dashing[i].src = "../resources/X/dashing/" + i + ".png";        
    }
    for (i = 0; i < 2; i++)
    {
        sprites.megamanX.death.X[i] = new Image();
        sprites.megamanX.death.X[i].src = "../resources/X/death/" + i + ".png";
    }
    for (i = 0; i < 5; i++)
    {
        sprites.megamanX.death.particles[i] = new Image();
        sprites.megamanX.death.particles[i].src = "../resources/X/death/particles/" + i + ".png";
    }
}