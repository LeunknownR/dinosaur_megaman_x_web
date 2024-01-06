export const keys = {
    jumping: false,
    dashing: false,
    left: false,
    right: false
};

export const initKeys = () => {
    window.addEventListener('keypress', e => {
        if (e.key === 'w')
            keys.jumping = true;
        else if (e.key === 's')
            keys.dashing = true;
        else if (e.key === 'a')
            keys.left = true;
        else if (e.key === 'd')
            keys.right = true;
    });
    window.addEventListener('keyup', e => {
        if (e.key === 'w')
            keys.jumping = false;
        else if (e.key === 's')
            keys.dashing = false;
        else if (e.key === 'a')
            keys.left = false;
        else if (e.key === 'd')
            keys.right = false;
    });
}