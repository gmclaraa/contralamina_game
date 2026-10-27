const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const gravity = 0.6;

class Sprite {
    constructor({ position, velocity, dimensions }) {
        this.position = position;
        this.velocity = velocity;
        this.width = dimensions.width;
        this.height = dimensions.height;
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
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

        this.lastKeyPressed
        this.onGround
    }

    update() {
        this.onGround = Math.ceil(this.position.y + this.height) >= canvas.height

        if (this.onGround && this.velocity.y >=0) {
            this.position.y = canvas.height - this.height
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity
        }

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.draw()
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
});