import { useEffect, useRef } from "react";

export function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particlesArray = [];

    const mouse = {
      x: null,
      y: null,
      radius: 150 // Antigravity repel radius
    };

    const handleMouseMove = (event) => {
      // Disable interaction if hovering over the footer or any major box/card
      if (event.target && event.target.closest('footer, .group, #code-editor-section, .rounded-xl')) {
        mouse.x = null;
        mouse.y = null;
        return;
      }
      mouse.x = event.x;
      mouse.y = event.y;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);

    const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#8b5cf6', '#3b82f6', '#0ea5e9'];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1.2;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off walls
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        // Antigravity (Repel from mouse)
        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            // Push away
            this.x -= forceDirectionX * force * 4;
            this.y -= forceDirectionY * force * 4;
          }
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        // Give particles a slight glow
        ctx.shadowBlur = 4;
        ctx.shadowColor = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        // Reset shadow for lines
        ctx.shadowBlur = 0;
      }
    }

    const init = () => {
      particlesArray = [];
      const numberOfParticles = Math.min(150, Math.floor((canvas.width * canvas.height) / 8000));
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };

    const connectNodes = () => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distanceSq = dx * dx + dy * dy;

          if (distanceSq < 15000) {
            const distance = Math.sqrt(distanceSq);
            let opacity = 1 - distance / 120;
            if (opacity < 0) opacity = 0;

            // Tech connecting lines
            ctx.strokeStyle = `rgba(130, 150, 180, ${opacity * 0.25})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      // Trail effect
      ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
      if (document.documentElement.classList.contains("dark")) {
        ctx.fillStyle = "rgba(10, 10, 10, 0.2)";
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      connectNodes();
      animationFrameId = requestAnimationFrame(animate);
    };

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    // Boot
    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);
    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1] w-full h-full dark:opacity-80"
    />
  );
}
