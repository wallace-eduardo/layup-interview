const canvas = document.getElementById("simulationCanvas");
const ctx = canvas.getContext("2d");

const yawInput = document.getElementById("yawInput");
const speedInput = document.getElementById("speedInput");

const airplaneImage = new Image();
airplaneImage.src = 'assets/plane.png';

let airplane = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    yaw: yawInput.value,
    speed: speedInput.value,
    trail: [],
};

document.addEventListener('keydown', (event) => {
    if (event.key === 'w' || event.key === 'W') {
        // Speed can't go above 1000
        speedInput.value = Math.min(parseFloat(speedInput.value) + 10, 1000);
    }

    if (event.key === 's' || event.key === 'S') {
        // Speed can't go below 0
        speedInput.value = Math.max(parseFloat(speedInput.value) - 10, 0);
    }

    if (event.key === 'a' || event.key === 'A') {
        yawInput.value = parseFloat(yawInput.value) - 10;
    }

    if (event.key === 'd' || event.key === 'D') {
        yawInput.value = parseFloat(yawInput.value) + 10;
    }
});

function updateAirplane() {
    airplane.yaw = parseFloat(yawInput.value);
    // Caping the speed even if entered manually
    airplane.speed = Math.min(Math.max(parseFloat(speedInput.value), 0), 1000) / 100;

    // Convert yaw to radians
    const yawRadians = (airplane.yaw * Math.PI) / 180;

    // Update position
    airplane.x += airplane.speed * Math.sin(yawRadians);
    airplane.y -= airplane.speed * Math.cos(yawRadians);

    // Boundary wrapping
    if (airplane.x > canvas.width) airplane.x = 0;
    if (airplane.x < 0) airplane.x = canvas.width;
    if (airplane.y > canvas.height) airplane.y = 0;
    if (airplane.y < 0) airplane.y = canvas.height;

    airplane.trail.push({ x: airplane.x, y: airplane.y });
    // Limit trail length
    if (airplane.trail.length > 800)
        airplane.trail.shift();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw trail
    ctx.beginPath();
    ctx.strokeStyle = "orange";
    ctx.lineWidth = 20;
    for (let i = 1; i < airplane.trail.length; i++) {
        // If the points are too far we probably wrapped, don't draw trail
        if(Math.abs(airplane.trail[i - 1].x - airplane.trail[i].x) > 100 ||
          Math.abs(airplane.trail[i - 1].y - airplane.trail[i].y) > 100) continue
        // move the pen to location and draw a line at location
        ctx.moveTo(airplane.trail[i - 1].x, airplane.trail[i - 1].y);
        ctx.lineTo(airplane.trail[i].x, airplane.trail[i].y);
    }
    ctx.stroke();

    // Draw airplane
    ctx.save();
    ctx.translate(airplane.x, airplane.y);
    ctx.rotate((airplane.yaw * Math.PI) / 180);
    ctx.drawImage(
        airplaneImage,
        -airplaneImage.width / 2,
        -airplaneImage.height / 2
    );
    ctx.restore();
}

function animate() {
    updateAirplane();
    draw();
    requestAnimationFrame(animate);
}

// Wait for image to load before starting
airplaneImage.onload = () => {
    animate();
};
