// Efeito de Partículas Neo Cílios Luxo
function initParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position: absolute; top: 0; left: 0; pointer-events: none; z-index: 2;';
    hero.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }

    function createParticles() {
        particles = [];
        const count = window.innerWidth < 768 ? 30 : 60; // Menos partículas no celular para performance
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: Math.random() * 0.5 + 0.3,
                r: Math.random() * 2.5 + 1,
                alpha: Math.random() * 0.6 + 0.2
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            // Reinicia a partícula no topo se ela sair da tela
            if (p.y > canvas.height) {
                p.y = -p.r;
                p.x = Math.random() * canvas.width;
            }
            if (p.x > canvas.width) p.x = 0;
            if (p.x < 0) p.x = canvas.width;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(236, 72, 153, ${p.alpha})`; // Cor var(--primary)
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });
    
    resize();
    createParticles();
    animate();
}