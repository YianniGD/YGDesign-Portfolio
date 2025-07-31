import { getTheme } from './theme/theme.js';
import { debounce } from '../lib/utils.js';

class Particle {
    constructor(x, y, size, speedX, speedY, color, canvasWidth, canvasHeight) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }

    update() {
        if (this.x > this.canvasWidth || this.x < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y > this.canvasHeight || this.y < 0) {
            this.speedY = -this.speedY;
        }
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

export default function createParticleBackground() {
    const canvas = document.createElement('canvas');
    // The canvas now has the background color, ensuring it's visible.
    canvas.className = "fixed top-0 left-0 w-full -z-10 pointer-events-none bg-slate-50 dark:bg-primary";
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let particles = [];
    const particleCount = 100;

    const reinitialize = () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }

        // Use the full scrollable height of the document
        const pageHeight = document.documentElement.scrollHeight;
        canvas.width = window.innerWidth;
        canvas.height = pageHeight;
        // Explicitly set the CSS height to match
        canvas.style.height = `${pageHeight}px`;

        particles = [];
        const theme = getTheme();
        const particleColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)';
        
        for (let i = 0; i < particleCount; i++) {
            const size = Math.random() * 2 + 0.5;
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const speedX = (Math.random() * 0.4 - 0.2);
            const speedY = (Math.random() * 0.4 - 0.2);
            particles.push(new Particle(x, y, size, speedX, speedY, particleColor, canvas.width, canvas.height));
        }

        animate();
    };

    const animate = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw(ctx);
        }
        animationFrameId = requestAnimationFrame(animate);
    };
    
    // Defer the initial run to allow the page layout to settle.
    setTimeout(reinitialize, 100);

    const debouncedReinitialize = debounce(reinitialize, 250);

    // Listen for window resize and content changes
    window.addEventListener('resize', debouncedReinitialize);
    const observer = new ResizeObserver(debouncedReinitialize);
    observer.observe(document.body);

    // Re-initialize when the theme changes
    window.addEventListener('themeChanged', reinitialize);

    return canvas;
}