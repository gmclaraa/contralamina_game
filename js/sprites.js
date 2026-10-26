const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const gravity = 0.2;

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

    update() {
        if (this.position.y + this.height >= canvas.height) {
            this.velocity.y = canvas.height - (this.position.y+this.height);
        } else {
            this.velocity.y += gravity;
        }

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        this.draw();
    }
}

const player = new Sprite({
    position: { x: 100, y: 0 },
    velocity: { x: 0, y: 0 },
    dimensions: { width: 50, height: 150 }
});

const player2 = new Sprite({
    position: { x: 500, y: 20 },
    velocity: { x: 0, y: 10 },
    dimensions: { width: 50, height: 200 }
});