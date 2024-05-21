

class Particle {
    constructor(x, y) {
        const speedFactor = 5;

        this.x = x;
        this.y = y;
        this.velocityX = speedFactor/2 - Math.random() * speedFactor;
        this.velocityY = speedFactor/2 - Math.random() * speedFactor;
        this.mass = Math.random() * 3;
        this.charge = Math.floor(Math.random() * 2);
        this.isCharged = this.charge !== 0;
        this.energyLossFactor = 0.995; // Factor to simulate energy loss per second
        this.life = Math.random() * 500;
        this.startLife = this.life;
        this.lastTime = Date.now();

        if (this.isCharged && Math.random() < 0.5) {
            this.charge = -1;
        }
    }

    update(magneticField) {
        if (this.isCharged) {
            // Apply energy loss
            let speed = Math.sqrt(this.velocityX**2 + this.velocityY**2);
            speed *= this.energyLossFactor

            const omega = (this.charge * magneticField) / this.mass;
            const radius = (this.mass * speed) / (Math.abs(this.charge) * magneticField);

            const velocityAngle = Math.atan2(this.velocityY, this.velocityX) + (Math.PI / 2);
            const centerX = this.x - radius * Math.cos(velocityAngle);
            const centerY = this.y - radius * Math.sin(velocityAngle);

            // Update position based on reduced speed
            const angle = Math.atan2(this.y - centerY, this.x - centerX) + omega;
            this.x = centerX + radius * Math.cos(angle);
            this.y = centerY + radius * Math.sin(angle);

            // Update velocities to reflect new speed
            this.velocityX = speed * Math.cos(angle - (Math.PI / 2));
            this.velocityY = speed * Math.sin(angle - (Math.PI / 2));
        } else {
            // Move in a straight line for uncharged particles
            this.x += this.velocityX;
            this.y += this.velocityY;
        }
        this.life -= 1;
    }

    draw(ctx, magneticField) {
        while (this.life >= 0) {
            const [x0, y0] = [this.x, this.y];
            this.update(magneticField);
            const [x1, y1] = [this.x, this.y];

            if (this.startLife - this.life > 3) {
                ctx.beginPath();
                ctx.moveTo(x0, y0);
                ctx.lineTo(x1, y1);
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
                ctx.lineWidth = 3;
                ctx.stroke();
            }
        }
    }
}


export function init(canvas) {
    let isMouseOverWindow = false;
    let mouseX = 0;
    let mouseY = 0;
    const ctx = canvas.getContext('2d');

    // Make sure canvas fills window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); 
    

    // Event listener for mouse entering the window
    window.document.addEventListener('mouseenter', function() {
        isMouseOverWindow = true;
    });

    // Event listener for mouse leaving the window
    window.document.addEventListener('mouseleave', function() {
        isMouseOverWindow = false;
    });

    // Listen to mousemove event
    window.addEventListener('mousemove', function(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    let lastDraw = 0;

    function draw() {
        const w = canvas.width;
        const h = canvas.height;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';

        // Fade Canvas
        const delta = Date.now() - lastDraw;
        if (delta > 300) {
            ctx.fillRect(0, 0, w, h);
            lastDraw = Date.now();
        }

        const particles = []

        // Add random particles
        if (Math.random() < 0.025) {
            particles.push(new Particle(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
            ));
        }

        // If mouse over window
        if (isMouseOverWindow && Math.random() < 0.1) {
            particles.push(new Particle(mouseX, mouseY));
        }

        particles.forEach((particle) => {
            particle.draw(ctx, 0.005);
        });

        requestAnimationFrame(draw);
    }

    draw();
}
