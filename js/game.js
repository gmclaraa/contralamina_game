const canvasWidth = 1824;
const canvasHeight = 576;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

let prevTime = performance.now();

animate();

function animate() {
    window.requestAnimationFrame(animate);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    player.update();
    player2.update()

    const now = performance.now();
    const fps = 1000 / (now - prevTime);
    prevTime = now;
    console.log(`FPS: ${fps.toFixed(0)}`);
}