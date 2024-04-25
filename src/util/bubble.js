

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velocityX = Math.random() * 5;
        this.velocityY = Math.random() * 5;
        this.mass = Math.random() * 5;
        this.charge = Math.floor(Math.random() * 2);
        this.isCharged = this.charge !== 0;
        this.energyLossFactor = 0.995; // Factor to simulate energy loss per second
        this.life = Math.random() * 500;
        this.lastTime = Date.now();
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

            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.lineTo(x1, y1);
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.stroke();
        }
    }
}


export function init(canvas) {
    const particles = []
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); 

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

        // Add random particles
        if (Math.random() < 0.1) {
            particles.push(new Particle(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
            ));
        }


        particles.forEach((particle, index) => {
            particle.draw(ctx, 0.005);
            if (particle.life < 0) {
                particles.splice(index, 1);
            }
        });

        requestAnimationFrame(draw);
    }

    draw();
}
