// Wrench Rush - Particle Physics & Visual Juice System
class ParticleSystem {
  constructor() {
    this.particles = [];
    this.floatingTexts = [];
  }

  reset() {
    this.particles = [];
    this.floatingTexts = [];
  }

  // Burst of bright hot electrical/friction sparks when an impact gun or plasma torch spins
  addSparks(x, y, count = 12, color = '#f59e0b') {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        life: 1.0,
        decay: 0.02 + Math.random() * 0.04,
        size: 1.5 + Math.random() * 2.5,
        color: color,
        type: 'spark',
        gravity: 0.18
      });
    }
  }

  // Puffs of red/brown rust powder flying when breaking loose a stubborn bolt
  addRustDust(x, y, count = 10) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 2.5;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5,
        life: 1.0,
        decay: 0.015 + Math.random() * 0.025,
        size: 3 + Math.random() * 5,
        color: Math.random() > 0.5 ? '#b45309' : '#78350f',
        type: 'rust',
        gravity: 0.04
      });
    }
  }

  // Flying 3D spinning hex bolt when unbolted
  addFlyingBolt(x, y) {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.2;
    const speed = 6 + Math.random() * 5;
    this.particles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      rotation: 0,
      vRot: (Math.random() - 0.5) * 0.5,
      life: 1.0,
      decay: 0.018,
      size: 7,
      color: '#94a3b8',
      type: 'bolt',
      gravity: 0.35
    });
  }

  // Floating score, cash bonus, combo text (e.g. "+$350!", "RUST CRACKED!", "3X COMBO!")
  addFloatingText(text, x, y, color = '#10b981', size = 20, weight = '900') {
    this.floatingTexts.push({
      text: text,
      x: x + (Math.random() - 0.5) * 20,
      y: y,
      vy: -2.2,
      life: 1.0,
      decay: 0.016,
      color: color,
      size: size,
      weight: weight
    });
  }

  // PB Blaster penetrating fluid aerosol spray mist
  addSprayMist(x, y, count = 16) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: x + (Math.random() - 0.5) * 25,
        y: y + (Math.random() - 0.5) * 25,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        life: 1.0,
        decay: 0.03 + Math.random() * 0.04,
        size: 4 + Math.random() * 6,
        color: '#38bdf8',
        type: 'mist',
        gravity: -0.02
      });
    }
  }

  update() {
    // Update physics particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.life -= p.decay;
      if (p.type === 'bolt') {
        p.rotation += p.vRot;
      }
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }

    // Update floating texts
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const t = this.floatingTexts[i];
      t.y += t.vy;
      t.life -= t.decay;
      if (t.life <= 0) {
        this.floatingTexts.splice(i, 1);
      }
    }
  }

  draw(ctx) {
    // Draw particles
    for (const p of this.particles) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      
      if (p.type === 'spark') {
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'rust') {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (2 - p.life), 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'mist') {
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'bolt') {
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        // Hexagon bolt shape
        ctx.beginPath();
        for (let a = 0; a < 6; a++) {
          const rad = (a * Math.PI) / 3;
          const hx = Math.cos(rad) * p.size;
          const hy = Math.sin(rad) * p.size;
          if (a === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Bolt center recess
        ctx.fillStyle = '#475569';
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // Draw floating texts with pop drop shadow
    for (const t of this.floatingTexts) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, t.life);
      ctx.font = `${t.weight} ${t.size}px 'Inter', sans-serif`;
      ctx.textAlign = 'center';

      // Outline/glow for contrast
      ctx.shadowColor = '#000';
      ctx.shadowBlur = 6;
      ctx.strokeStyle = 'rgba(0,0,0,0.85)';
      ctx.lineWidth = 4;
      ctx.strokeText(t.text, t.x, t.y);

      ctx.fillStyle = t.color;
      ctx.fillText(t.text, t.x, t.y);
      ctx.restore();
    }
  }
}

window.particleSystem = new ParticleSystem();
