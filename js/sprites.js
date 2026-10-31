const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const backgroundSpritePath = './assets/background/placeholder.png'

const gravity = 0.6;

class Sprite {
    constructor({ position, velocity, dimensions = { width: 0, height: 0 }, source }) {
        this.position = position;
        this.velocity = velocity;
        this.width = dimensions.width;
        this.height = dimensions.height

        if (source) {
            this.image = new Image()
            this.image.src = source
        }
    }

    draw() {
        if (this.image) {
            ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        } else {
            ctx.fillStyle = 'white';
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }

        if (this.isAttacking) {
            ctx.fillStyle = 'red'
            ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }

    update() {
        this.draw()
    }
}

class Fighter extends Sprite {
    constructor({ position, velocity, dimensions }) {
        super({
            position,
            velocity,
            dimensions
        })

        this.velocity = velocity
        this.width = dimensions.width
        this.height = dimensions.height

        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: 125,
            height: 50
        }
        this.isAttacking = false
        this.onAttackCoolDown = false

        this.lastKeyPressed
        this.onGround
    }

    update() {
        if (Math.ceil(this.position.y + this.height) >= canvas.height) {
            this.onGround = true
        } else {
            this.onGround = false
        }

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.position.y = canvas.height - this.height
            this.velocity.y = 0
        } else {
            if (!this.onGround) this.velocity.y += gravity
        }

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.attackBox.position.x = this.position.x
        this.attackBox.position.y = this.position.y

        this.draw()
    }

    attack() {
        if (this.onAttackCoolDown) return
        this.isAttacking = true
        this.onAttackCoolDown = true

        setTimeout(() => {
            this.isAttacking = false
        }, 100)

        setTimeout(() => {
            this.onAttackCoolDown = false
        }, 500)
    }

    jump() {
        if (!this.onGround) return
        this.velocity.y = -16
    }
}

const player = new Fighter({
    position: { x: 100, y: 0 },
    velocity: { x: 0, y: 0 },
    dimensions: { width: 50, height: 150 }
});

const player2 = new Fighter({
    position: { x: 500, y: 20 },
    velocity: { x: 0, y: 10 },
    dimensions: { width: 50, height: 200 }
})

const background = new Sprite({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    dimensions: { width: 1024, height: 576 },
    source: backgroundSpritePath
})