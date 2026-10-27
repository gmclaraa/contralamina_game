const keys = {
    a: { pressed: false },
    d: { pressed: false },
    w: { pressed: false, hold: false },
    space: { pressed: false },
}

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowLeft':
        case 'a':
            keys.a.pressed = true
            player.lastKeyPressed = e.key
            break
        case 'ArrowRight':
        case 'd':
            keys.d.pressed = true
            player.lastKeyPressed = e.key
            break
        case 'ArrowUp':
        case 'w':
            keys.w.pressed = true
            break
    }
})

window.addEventListener('keyup', e => {
    switch (e.key) {
        case 'ArrowLeft':
        case 'a':
            keys.a.pressed = false
            break
        case 'ArrowRight':
        case 'd':
            keys.d.pressed = false
            break
        case 'ArrowUp':
        case 'w':
            keys.w.pressed = false
            keys.w.hold = false
            break
    }
})

function handleControls() {
    movement()

    function movement() {
        player.velocity.x = 0

        if (keys.a.pressed && ['a', 'ArrowLeft'].includes(player.lastKeyPressed)) {
            player.velocity.x = -1.5 * 3.4
        }

        if (keys.d.pressed && ['d', 'ArrowRight'].includes(player.lastKeyPressed)) {
            player.velocity.x = 1.5 * 3.4
        }

        if (keys.w.pressed && !keys.w.hold) {
            player.jump()
            keys.w.hold = true
        }
    }
}