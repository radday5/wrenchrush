// Wrench Rush: Junkyard Stripper - Main Game Engine
class WrenchRushGame {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    this.state = 'TITLE'; // TITLE, PLAYING, CHECKOUT, CRUSHED
    this.cash = 0;
    this.highScore = 0;
    this.lastTime = 0;

    // Active round state
    this.timeLeft = 50;
    this.totalRoundTime = 50;
    this.activeVehicle = null;
    this.activeBolt = null;
    this.activePart = null;
    this.isPressing = false;
    this.pulledHaul = [];
    this.roundCash = 0;

    // Combos & Shakes
    this.comboCount = 0;
    this.comboTimer = 0;
    this.cameraShake = 0;

    // Scale factors
    this.scaleX = 1;
    this.scaleY = 1;

    this.init();
  }

  init() {
    this.loadSave();
    this.setupResize();
    this.setupEvents();
    this.updateUI();

    // Start render loop
    requestAnimationFrame(t => this.loop(t));
  }

  loadSave() {
    try {
      this.cash = parseInt(localStorage.getItem('wrench_rush_cash')) || 100;
      this.highScore = parseInt(localStorage.getItem('wrench_rush_highscore')) || 0;
    } catch (e) {}
  }

  saveGame() {
    try {
      localStorage.setItem('wrench_rush_cash', this.cash);
      if (this.roundCash > this.highScore) {
        this.highScore = this.roundCash;
        localStorage.setItem('wrench_rush_highscore', this.highScore);
      }
    } catch (e) {}
  }

  setupResize() {
    const resize = () => {
      const rect = this.canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      // Target logical width 600 x 600
      this.canvas.width = rect.width * dpr;
      this.canvas.height = rect.height * dpr;
      this.canvas.style.width = `${rect.width}px`;
      this.canvas.style.height = `${rect.height}px`;

      this.ctx.scale(dpr, dpr);
      this.scaleX = rect.width / 600;
      this.scaleY = rect.height / 600;
    };
    window.addEventListener('resize', resize);
    resize();
  }

  setupEvents() {
    const getPos = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) / this.scaleX,
        y: (clientY - rect.top) / this.scaleY
      };
    };

    const handlePointerDown = (e) => {
      if (this.state !== 'PLAYING') return;
      const pos = getPos(e);
      this.isPressing = true;
      this.handleTouchStart(pos.x, pos.y);
    };

    const handlePointerUp = () => {
      this.isPressing = false;
      this.activeBolt = null;
    };

    this.canvas.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      handlePointerDown(e);
    }, { passive: false });
    window.addEventListener('touchend', handlePointerUp);
  }

  startRound() {
    window.soundFX.init();
    this.activeVehicle = window.vehicleManager.getCurrentVehicle();
    window.vehicleManager.resetVehicle(this.activeVehicle);

    this.totalRoundTime = this.activeVehicle.timeLimit;
    this.timeLeft = this.totalRoundTime;
    this.pulledHaul = [];
    this.roundCash = 0;
    this.comboCount = 0;
    this.comboTimer = 0;
    this.activeBolt = null;
    this.isPressing = false;

    window.particleSystem.reset();
    this.state = 'PLAYING';

    document.getElementById('titleScreen').style.display = 'none';
    document.getElementById('checkoutScreen').style.display = 'none';
    document.getElementById('crushedScreen').style.display = 'none';
    document.getElementById('inGameHUD').style.display = 'flex';

    this.updateHUD();
  }

  handleTouchStart(x, y) {
    if (!this.activeVehicle) return;

    // Check if player clicked a part that is already unbolted -> YANK IT!
    for (const part of this.activeVehicle.parts) {
      if (part.pulled) continue;
      const allBoltsOff = part.bolts.every(b => b.removed);
      if (allBoltsOff) {
        const dx = Math.abs(x - part.x);
        const dy = Math.abs(y - part.y);
        if (dx <= part.w / 2 + 10 && dy <= part.h / 2 + 10) {
          this.yankPart(part);
          return;
        }
      }
    }

    // Otherwise check if player tapped on an unremoved bolt
    for (const part of this.activeVehicle.parts) {
      if (part.pulled) continue;
      for (const bolt of part.bolts) {
        if (bolt.removed) continue;
        const dist = Math.hypot(x - bolt.x, y - bolt.y);
        if (dist <= 26) {
          this.activeBolt = bolt;
          this.activePart = part;
          return;
        }
      }
    }
  }

  yankPart(part) {
    part.pulled = true;

    // Audio & Haptics
    window.soundFX.playPartYank();
    setTimeout(() => window.soundFX.playCash(), 80);
    if (navigator.vibrate) navigator.vibrate([40, 20, 70]);

    // Combos
    this.comboCount++;
    this.comboTimer = 3.5; // seconds to chain next part
    let multiplier = 1.0;
    if (this.comboCount >= 3) multiplier = 2.0;
    else if (this.comboCount >= 2) multiplier = 1.5;

    // Gold 10mm perk multiplier
    multiplier *= window.perkManager.hasMultiplier();

    const earnings = Math.round(part.value * multiplier);
    this.roundCash += earnings;
    this.cash += earnings;
    this.saveGame();

    this.pulledHaul.push({
      name: part.name,
      value: earnings,
      base: part.value
    });

    // Particle FX
    window.particleSystem.addSparks(part.x * this.scaleX, part.y * this.scaleY, 20, '#10b981');
    window.particleSystem.addFloatingText(
      `+$${earnings}!`,
      part.x * this.scaleX,
      part.y * this.scaleY,
      '#10b981',
      24
    );

    if (this.comboCount >= 2) {
      window.particleSystem.addFloatingText(
        `${this.comboCount}X STREAK! 🔥`,
        part.x * this.scaleX,
        (part.y - 30) * this.scaleY,
        '#f59e0b',
        18
      );
    }

    this.updateHUD();

    // Check if entire vehicle stripped
    const allStripped = this.activeVehicle.parts.every(p => p.pulled);
    if (allStripped) {
      window.soundFX.playFanfare();
      window.particleSystem.addFloatingText('BAY STRIPPED CLEAN! 🏆', 300 * this.scaleX, 250 * this.scaleY, '#38bdf8', 26);
      setTimeout(() => this.checkoutRound(), 1200);
    }
  }

  usePBBlasterPowerUp() {
    if (window.perkManager.usePBBlaster()) {
      window.soundFX.playSpray();
      window.particleSystem.addSprayMist(300 * this.scaleX, 300 * this.scaleY, 40);
      window.particleSystem.addFloatingText('PB BLASTER ACTIVE! 🥫', 300 * this.scaleX, 200 * this.scaleY, '#38bdf8', 22);
      this.updateHUD();
    }
  }

  useJammerPowerUp() {
    if (window.perkManager.useCrusherJammer()) {
      this.timeLeft = Math.min(this.totalRoundTime, this.timeLeft + 15);
      window.soundFX.playFanfare();
      window.particleSystem.addFloatingText('+15s CRUSHER JAMMED! 🛑', 300 * this.scaleX, 180 * this.scaleY, '#f59e0b', 22);
      this.updateHUD();
    }
  }

  checkoutRound() {
    this.state = 'CHECKOUT';
    this.saveGame();
    window.soundFX.playCash();

    document.getElementById('inGameHUD').style.display = 'none';
    const screen = document.getElementById('checkoutScreen');
    screen.style.display = 'flex';

    // Populate U-Pull receipt items
    const listEl = document.getElementById('receiptItems');
    listEl.innerHTML = this.pulledHaul.map(item => `
      <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px dashed rgba(255,255,255,0.15); font-size: 13px;">
        <span>${item.name}</span>
        <span style="color: var(--green); font-weight: 700;">+$${item.value}</span>
      </div>
    `).join('') || '<div style="color: var(--text-muted); font-size: 13px;">No parts pulled before the crusher!</div>';

    document.getElementById('receiptTotal').textContent = `$${this.roundCash}`;
    document.getElementById('totalBankDisplay').textContent = `$${this.cash}`;

    // Auto advance to next vehicle for next round
    window.vehicleManager.nextVehicle();
  }

  crushCar() {
    this.state = 'CRUSHED';
    this.cameraShake = 25;
    window.soundFX.playCrushCrash();
    if (navigator.vibrate) navigator.vibrate([100, 50, 150, 50, 200]);

    document.getElementById('inGameHUD').style.display = 'none';
    const screen = document.getElementById('crushedScreen');
    screen.style.display = 'flex';

    document.getElementById('crushHaulSaved').textContent = `$${this.roundCash}`;
  }

  updateHUD() {
    document.getElementById('hudTimer').textContent = `${Math.ceil(this.timeLeft)}s`;
    document.getElementById('hudCash').textContent = `$${this.roundCash}`;
    
    // Vehicle & Tool tags
    const curTool = window.toolManager.getCurrentTool();
    document.getElementById('hudTool').textContent = `${curTool.icon} ${curTool.name}`;
    if (this.activeVehicle) {
      document.getElementById('hudVehicle').textContent = this.activeVehicle.name;
    }

    // Consumables counter
    const pb = window.perkManager.getPerk('pb_blaster');
    document.getElementById('btnPBBlaster').innerHTML = `🥫 PB Spray (${pb ? pb.count : 0})`;
    const jam = window.perkManager.getPerk('crusher_jammer');
    document.getElementById('btnJammer').innerHTML = `🛑 Jammer (${jam ? jam.count : 0})`;
  }

  updateUI() {
    const cashEls = document.querySelectorAll('.user-cash-val');
    cashEls.forEach(el => el.textContent = `$${this.cash}`);
  }

  loop(currentTime) {
    const dt = Math.min((currentTime - this.lastTime) / 1000, 0.1);
    this.lastTime = currentTime;

    this.update(dt);
    this.render();

    requestAnimationFrame(t => this.loop(t));
  }

  update(dt) {
    window.perkManager.update(dt);
    window.particleSystem.update();

    if (this.cameraShake > 0) {
      this.cameraShake = Math.max(0, this.cameraShake - dt * 40);
    }

    if (this.state === 'PLAYING') {
      // Countdown
      this.timeLeft -= dt;
      if (this.timeLeft <= 0) {
        this.timeLeft = 0;
        this.crushCar();
        return;
      }

      // Warning siren when timer low
      if (this.timeLeft <= 10 && Math.floor(this.timeLeft) !== Math.floor(this.timeLeft + dt)) {
        window.soundFX.playWarningBuzzer();
        this.cameraShake = 4;
      }

      // Combo expiration
      if (this.comboTimer > 0) {
        this.comboTimer -= dt;
        if (this.comboTimer <= 0) this.comboCount = 0;
      }

      // Active unbolting progress
      if (this.isPressing && this.activeBolt && !this.activeBolt.removed) {
        const tool = window.toolManager.getCurrentTool();
        const activePB = window.perkManager.activePBTimer > 0;
        
        let rustFactor = 1.0;
        if (!activePB && this.activeBolt.rust > 0.3) {
          rustFactor = this.activeBolt.rust * tool.rustStruggle;
        }

        const rate = (1.0 / tool.spinDuration) / Math.max(0.5, rustFactor);
        this.activeBolt.progress += dt * rate;

        // Sound & sparks
        if (Math.random() < 0.35) {
          if (tool.soundType === 'ratchet') {
            window.soundFX.playRatchetClick();
          } else {
            window.soundFX.playImpactGun();
          }
          if (navigator.vibrate) navigator.vibrate(18);
        }

        window.particleSystem.addSparks(
          this.activeBolt.x * this.scaleX,
          this.activeBolt.y * this.scaleY,
          2,
          tool.sparkColor
        );

        if (this.activeBolt.rust > 0.4 && Math.random() < 0.25) {
          window.particleSystem.addRustDust(
            this.activeBolt.x * this.scaleX,
            this.activeBolt.y * this.scaleY,
            2
          );
        }

        // Bolt completed!
        if (this.activeBolt.progress >= 1.0) {
          this.activeBolt.progress = 1.0;
          this.activeBolt.removed = true;

          window.soundFX.playBoltSnap();
          if (navigator.vibrate) navigator.vibrate([30, 20, 50]);

          window.particleSystem.addFlyingBolt(
            this.activeBolt.x * this.scaleX,
            this.activeBolt.y * this.scaleY
          );
          window.particleSystem.addRustDust(
            this.activeBolt.x * this.scaleX,
            this.activeBolt.y * this.scaleY,
            12
          );
          window.particleSystem.addFloatingText(
            'SNAP!',
            this.activeBolt.x * this.scaleX,
            this.activeBolt.y * this.scaleY,
            '#fbbf24',
            16
          );

          // Check if parent part is now ready to yank!
          if (this.activePart && this.activePart.bolts.every(b => b.removed)) {
            window.particleSystem.addFloatingText(
              'READY TO YANK! ⚡',
              this.activePart.x * this.scaleX,
              this.activePart.y * this.scaleY,
              '#10b981',
              20
            );
          }

          this.activeBolt = null;
        }
      }

      this.updateHUD();
    }
  }

  render() {
    const ctx = this.ctx;
    const w = 600 * this.scaleX;
    const h = 600 * this.scaleY;

    ctx.clearRect(0, 0, w, h);

    // Apply camera shake
    ctx.save();
    if (this.cameraShake > 0) {
      const sx = (Math.random() - 0.5) * this.cameraShake;
      const sy = (Math.random() - 0.5) * this.cameraShake;
      ctx.translate(sx, sy);
    }

    // Draw active engine bay
    if (this.activeVehicle && (this.state === 'PLAYING' || this.state === 'TITLE')) {
      const activePB = window.perkManager.activePBTimer > 0;
      window.vehicleManager.drawEngineBay(ctx, this.activeVehicle, this.scaleX, this.scaleY, activePB);
    }

    // Draw Overhead Crusher Claw Bar (descending hazard compactor!)
    if (this.state === 'PLAYING') {
      const progress = 1 - (this.timeLeft / this.totalRoundTime);
      const crusherY = (50 + progress * 60) * this.scaleY;

      ctx.save();
      // Hazard yellow/black diagonal warning stripes
      ctx.fillStyle = '#eab308';
      ctx.fillRect(40 * this.scaleX, 0, 520 * this.scaleX, crusherY);

      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 12 * this.scaleX;
      ctx.beginPath();
      for (let x = -50; x < 650; x += 40) {
        ctx.moveTo(x * this.scaleX, 0);
        ctx.lineTo((x + 40) * this.scaleX, crusherY);
      }
      ctx.stroke();

      // Heavy steel compactor plate
      ctx.fillStyle = '#334155';
      ctx.fillRect(35 * this.scaleX, crusherY - 14 * this.scaleY, 530 * this.scaleX, 14 * this.scaleY);

      // Warning text & siren strobe
      ctx.fillStyle = progress > 0.75 ? '#ef4444' : '#ffffff';
      ctx.font = `900 ${14 * this.scaleX}px 'Inter', sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(`⚠️ OVERHEAD CRUSHER: ${Math.round((1 - progress) * 100)}% CLEARANCE ⚠️`, 300 * this.scaleX, crusherY - 20 * this.scaleY);

      ctx.restore();
    }

    // Draw particles & floating numbers
    window.particleSystem.draw(ctx);

    ctx.restore();
  }
}

// Global instance
window.addEventListener('DOMContentLoaded', () => {
  window.game = new WrenchRushGame();
});
