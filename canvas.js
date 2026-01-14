/* ===============================
   PREMIUM STEAM CURSOR – FOUR COFFEE
   =============================== */

const cursor = document.getElementById('cursor');

/* ===== Disable on Mobile ===== */
if (window.innerWidth < 768) {
    if (cursor) cursor.style.display = 'none';
    document.body.style.cursor = 'default';
} else {

    /* ===== Canvas Setup ===== */
    const steamCanvas = document.createElement('canvas');
    document.body.appendChild(steamCanvas);

    steamCanvas.style.position = 'fixed';
    steamCanvas.style.top = 0;
    steamCanvas.style.left = 0;
    steamCanvas.style.pointerEvents = 'none';
    steamCanvas.style.zIndex = 9998;

    const ctx = steamCanvas.getContext('2d');

    let width = steamCanvas.width = window.innerWidth;
    let height = steamCanvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = steamCanvas.width = window.innerWidth;
        height = steamCanvas.height = window.innerHeight;
    });

    /* ===== Mouse Tracking ===== */
    let mouseX = width / 2;
    let mouseY = height / 2;
    let curX = mouseX;
    let curY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    /* ===== Smooth Cursor Movement ===== */
    function moveCursor() {
        curX += (mouseX - curX) * 0.15;
        curY += (mouseY - curY) * 0.15;
        cursor.style.transform = `translate(${curX}px, ${curY}px)`;
        requestAnimationFrame(moveCursor);
    }
    moveCursor();

    /* ===== Steam Particle System ===== */
    const steamParticles = [];
    const maxParticles = 18;

    function Particle(x, y) {
        this.x = x + Math.random() * 10 - 5;
        this.y = y + Math.random() * 10 - 5;
        this.size = Math.random() * 8 + 4;
        this.alpha = 0.6;
        this.speedY = Math.random() * -0.8 - 0.3;
        this.speedX = Math.random() * 0.4 - 0.2;
    }

    Particle.prototype.update = function () {
        this.y += this.speedY;
        this.x += this.speedX;
        this.alpha -= 0.008;
    };

    Particle.prototype.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 230, 200, ${this.alpha})`;
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(255,220,180,0.4)';
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    };

    /* ===== Animation Loop ===== */
    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Detect section under cursor (disable on map)
        const section = document.elementFromPoint(mouseX, mouseY)?.closest('.panel');
        if (!section || section.classList.contains('location')) {
            requestAnimationFrame(animate);
            return;
        }

        // Add particles
        if (steamParticles.length < maxParticles) {
            steamParticles.push(new Particle(curX, curY));
        }

        // Update particles
        for (let i = steamParticles.length - 1; i >= 0; i--) {
            const p = steamParticles[i];
            p.update();
            p.draw();
            if (p.alpha <= 0) steamParticles.splice(i, 1);
        }

        requestAnimationFrame(animate);
    }

    animate();
}
