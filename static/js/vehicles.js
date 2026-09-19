// Wrench Rush - Vehicles & Salvage Engine Bays
const VEHICLES = [
  {
    id: 'civic_98',
    name: "'98 Honda Civic EK Hatch",
    badge: "TUNER ICON",
    engine: "1.6L B16 VTEC Swap",
    bodyColor: "#f1f5f9",
    bayBg: "#1e293b",
    difficulty: "Easy",
    timeLimit: 55, // seconds before crusher drops
    parts: [
      {
        id: 'turbo',
        name: 'Garrett T28 Turbocharger',
        category: 'Forced Induction',
        value: 290,
        x: 430, y: 310, w: 110, h: 90,
        color: '#f59e0b',
        bolts: [
          { x: 400, y: 285, rust: 0.6, removed: false, progress: 0 },
          { x: 470, y: 285, rust: 0.8, removed: false, progress: 0 },
          { x: 400, y: 345, rust: 0.7, removed: false, progress: 0 },
          { x: 470, y: 345, rust: 0.5, removed: false, progress: 0 }
        ],
        pulled: false
      },
      {
        id: 'valve_cover',
        name: 'VTEC Red Valve Cover',
        category: 'Engine Dress-Up',
        value: 210,
        x: 270, y: 270, w: 130, h: 100,
        color: '#dc2626',
        bolts: [
          { x: 230, y: 245, rust: 0.2, removed: false, progress: 0 },
          { x: 310, y: 245, rust: 0.3, removed: false, progress: 0 },
          { x: 230, y: 305, rust: 0.1, removed: false, progress: 0 },
          { x: 310, y: 305, rust: 0.3, removed: false, progress: 0 }
        ],
        pulled: false
      },
      {
        id: 'strut_bar',
        name: 'Anodized Gold Strut Bar',
        category: 'Chassis Bracing',
        value: 140,
        x: 300, y: 155, w: 280, h: 26,
        color: '#eab308',
        bolts: [
          { x: 180, y: 155, rust: 0.2, removed: false, progress: 0 },
          { x: 205, y: 155, rust: 0.3, removed: false, progress: 0 },
          { x: 395, y: 155, rust: 0.2, removed: false, progress: 0 },
          { x: 420, y: 155, rust: 0.1, removed: false, progress: 0 }
        ],
        pulled: false
      },
      {
        id: 'radiator',
        name: 'Mishimoto Aluminum Radiator',
        category: 'Cooling',
        value: 160,
        x: 300, y: 440, w: 220, h: 42,
        color: '#94a3b8',
        bolts: [
          { x: 210, y: 440, rust: 0.1, removed: false, progress: 0 },
          { x: 390, y: 440, rust: 0.2, removed: false, progress: 0 }
        ],
        pulled: false
      }
    ]
  },
  {
    id: 'tahoe_04',
    name: "'04 Chevy Tahoe Z71 4x4",
    badge: "WORKHORSE",
    engine: "5.3L LS Vortec V8",
    bodyColor: "#475569",
    bayBg: "#18202c",
    difficulty: "Medium",
    timeLimit: 50,
    parts: [
      {
        id: 'cats',
        name: 'OEM Dual Catalytic Converters',
        category: 'Precious Metals',
        value: 420,
        x: 210, y: 410, w: 85, h: 100,
        color: '#b45309',
        bolts: [
          { x: 185, y: 380, rust: 0.95, removed: false, progress: 0 },
          { x: 235, y: 380, rust: 0.9, removed: false, progress: 0 },
          { x: 185, y: 445, rust: 0.95, removed: false, progress: 0 },
          { x: 235, y: 445, rust: 0.85, removed: false, progress: 0 }
        ],
        pulled: false
      },
      {
        id: 'alternator',
        name: '160-Amp High-Output Alternator',
        category: 'Electrical',
        value: 115,
        x: 410, y: 250, w: 90, h: 80,
        color: '#0284c7',
        bolts: [
          { x: 385, y: 230, rust: 0.5, removed: false, progress: 0 },
          { x: 435, y: 270, rust: 0.6, removed: false, progress: 0 }
        ],
        pulled: false
      },
      {
        id: 'ls_intake',
        name: 'LS Vortec Intake & DBW Throttle',
        category: 'Intake',
        value: 190,
        x: 300, y: 250, w: 110, h: 90,
        color: '#334155',
        bolts: [
          { x: 270, y: 220, rust: 0.4, removed: false, progress: 0 },
          { x: 330, y: 220, rust: 0.4, removed: false, progress: 0 },
          { x: 270, y: 280, rust: 0.3, removed: false, progress: 0 },
          { x: 330, y: 280, rust: 0.5, removed: false, progress: 0 }
        ],
        pulled: false
      },
      {
        id: 'radiator_hd',
        name: 'Heavy-Duty Towing Radiator',
        category: 'Cooling',
        value: 175,
        x: 300, y: 460, w: 240, h: 38,
        color: '#64748b',
        bolts: [
          { x: 200, y: 460, rust: 0.4, removed: false, progress: 0 },
          { x: 400, y: 460, rust: 0.3, removed: false, progress: 0 }
        ],
        pulled: false
      }
    ]
  },
  {
    id: 'mustang_91',
    name: "'91 Foxbody Mustang 5.0 GT",
    badge: "AMERICAN MUSCLE",
    engine: "5.0L High Output Pushrod V8",
    bodyColor: "#b91c1c",
    bayBg: "#1c1917",
    difficulty: "Hard",
    timeLimit: 45,
    parts: [
      {
        id: 'carb',
        name: 'Holley 4-Barrel Carburetor',
        category: 'Fuel Delivery',
        value: 285,
        x: 300, y: 250, w: 100, h: 90,
        color: '#ca8a04',
        bolts: [
          { x: 270, y: 225, rust: 0.6, removed: false, progress: 0 },
          { x: 330, y: 225, rust: 0.7, removed: false, progress: 0 },
          { x: 270, y: 275, rust: 0.5, removed: false, progress: 0 },
          { x: 330, y: 275, rust: 0.6, removed: false, progress: 0 }
        ],
        pulled: false
      },
      {
        id: 'headers',
        name: 'Ceramic Shorty Headers',
        category: 'Exhaust',
        value: 360,
        x: 420, y: 350, w: 80, h: 120,
        color: '#ea580c',
        bolts: [
          { x: 400, y: 310, rust: 0.85, removed: false, progress: 0 },
          { x: 440, y: 340, rust: 0.9, removed: false, progress: 0 },
          { x: 400, y: 380, rust: 0.8, removed: false, progress: 0 },
          { x: 440, y: 410, rust: 0.85, removed: false, progress: 0 }
        ],
        pulled: false
      },
      {
        id: 'distributor',
        name: 'MSD Pro-Billet Distributor',
        category: 'Ignition',
        value: 195,
        x: 300, y: 175, w: 65, h: 65,
        color: '#ef4444',
        bolts: [
          { x: 285, y: 175, rust: 0.3, removed: false, progress: 0 },
          { x: 315, y: 175, rust: 0.4, removed: false, progress: 0 }
        ],
        pulled: false
      },
      {
        id: 'radiator_fox',
        name: '3-Row Aluminum Racing Rad',
        category: 'Cooling',
        value: 180,
        x: 300, y: 450, w: 210, h: 40,
        color: '#94a3b8',
        bolts: [
          { x: 215, y: 450, rust: 0.3, removed: false, progress: 0 },
          { x: 385, y: 450, rust: 0.4, removed: false, progress: 0 }
        ],
        pulled: false
      }
    ]
  },
  {
    id: 'supra_94',
    name: "'94 Toyota Supra Turbo",
    badge: "HOLY GRAIL",
    engine: "3.0L Twin-Turbo 2JZ-GTE",
    bodyColor: "#7f1d1d",
    bayBg: "#111827",
    difficulty: "Expert",
    timeLimit: 42,
    parts: [
      {
        id: 'twin_turbos',
        name: 'Sequential Twin 2JZ Turbos',
        category: 'Forced Induction',
        value: 750,
        x: 430, y: 300, w: 120, h: 130,
        color: '#f97316',
        bolts: [
          { x: 395, y: 260, rust: 0.95, removed: false, progress: 0 },
          { x: 460, y: 260, rust: 0.9, removed: false, progress: 0 },
          { x: 395, y: 315, rust: 0.85, removed: false, progress: 0 },
          { x: 460, y: 315, rust: 0.95, removed: false, progress: 0 },
          { x: 425, y: 360, rust: 0.8, removed: false, progress: 0 }
        ],
        pulled: false
      },
      {
        id: 'intercooler',
        name: 'HKS Front-Mount Intercooler',
        category: 'Cooling',
        value: 480,
        x: 300, y: 470, w: 260, h: 48,
        color: '#38bdf8',
        bolts: [
          { x: 190, y: 470, rust: 0.6, removed: false, progress: 0 },
          { x: 240, y: 470, rust: 0.5, removed: false, progress: 0 },
          { x: 360, y: 470, rust: 0.5, removed: false, progress: 0 },
          { x: 410, y: 470, rust: 0.7, removed: false, progress: 0 }
        ],
        pulled: false
      },
      {
        id: 'carbon_strut',
        name: 'TRD Carbon Strut Tower Brace',
        category: 'Chassis',
        value: 340,
        x: 300, y: 155, w: 290, h: 28,
        color: '#1e293b',
        bolts: [
          { x: 175, y: 155, rust: 0.3, removed: false, progress: 0 },
          { x: 200, y: 155, rust: 0.2, removed: false, progress: 0 },
          { x: 400, y: 155, rust: 0.2, removed: false, progress: 0 },
          { x: 425, y: 155, rust: 0.4, removed: false, progress: 0 }
        ],
        pulled: false
      },
      {
        id: 'intake_plenum',
        name: 'Polished GReddy Intake Plenum',
        category: 'Intake',
        value: 410,
        x: 230, y: 300, w: 90, h: 120,
        color: '#e2e8f0',
        bolts: [
          { x: 205, y: 260, rust: 0.4, removed: false, progress: 0 },
          { x: 255, y: 260, rust: 0.5, removed: false, progress: 0 },
          { x: 205, y: 340, rust: 0.6, removed: false, progress: 0 },
          { x: 255, y: 340, rust: 0.5, removed: false, progress: 0 }
        ],
        pulled: false
      }
    ]
  }
];

class VehicleManager {
  constructor() {
    this.vehicles = VEHICLES;
    this.currentIndex = 0;
  }

  getCurrentVehicle() {
    return this.vehicles[this.currentIndex % this.vehicles.length];
  }

  nextVehicle() {
    this.currentIndex++;
    this.resetVehicle(this.getCurrentVehicle());
    return this.getCurrentVehicle();
  }

  resetVehicle(vehicle) {
    vehicle.parts.forEach(part => {
      part.pulled = false;
      part.bolts.forEach(bolt => {
        bolt.removed = false;
        bolt.progress = 0;
      });
    });
  }

  // Draw authentic engine bay blueprint with struts, battery, radiator, parts, and hex bolts
  drawEngineBay(ctx, vehicle, scaleX, scaleY, activePB) {
    const v = vehicle;
    
    // Draw bay background
    ctx.save();
    ctx.fillStyle = v.bayBg;
    ctx.fillRect(80 * scaleX, 110 * scaleY, 440 * scaleX, 400 * scaleY);

    // Inner bay bevel / strut towers
    ctx.fillStyle = '#0f172a';
    // Left strut tower
    ctx.beginPath();
    ctx.arc(170 * scaleX, 230 * scaleY, 55 * scaleX, 0, Math.PI * 2);
    ctx.fill();
    // Right strut tower
    ctx.beginPath();
    ctx.arc(430 * scaleX, 230 * scaleY, 55 * scaleX, 0, Math.PI * 2);
    ctx.fill();

    // Fender wings (outer car color)
    ctx.fillStyle = v.bodyColor;
    ctx.fillRect(40 * scaleX, 80 * scaleY, 40 * scaleX, 440 * scaleY);
    ctx.fillRect(520 * scaleX, 80 * scaleY, 40 * scaleX, 440 * scaleY);

    // Radiator support header bar
    ctx.fillStyle = '#334155';
    ctx.fillRect(80 * scaleX, 480 * scaleY, 440 * scaleX, 35 * scaleY);

    // Firewall back wall
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(80 * scaleX, 100 * scaleY, 440 * scaleX, 30 * scaleY);

    // Draw non-pulled parts
    v.parts.forEach(part => {
      if (part.pulled) return;

      const px = part.x * scaleX;
      const py = part.y * scaleY;
      const pw = part.w * scaleX;
      const ph = part.h * scaleY;

      // Check if all bolts are off -> highlight part as READY TO YANK!
      const allBoltsOff = part.bolts.every(b => b.removed);

      ctx.save();
      if (allBoltsOff) {
        // Pulsing green/gold ready-to-yank glow!
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 15;
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
      } else {
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 8;
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
      }

      ctx.fillStyle = part.color;
      // Rounded part housing
      const r = 8 * scaleX;
      ctx.beginPath();
      ctx.roundRect(px - pw / 2, py - ph / 2, pw, ph, r);
      ctx.fill();
      ctx.stroke();

      // Part label & value banner
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.max(10, 11 * scaleX)}px 'Inter', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowBlur = 4;
      ctx.shadowColor = '#000';
      ctx.fillText(part.name, px, py - 4 * scaleY);

      // Part $$$ value pill
      ctx.fillStyle = allBoltsOff ? '#10b981' : '#f59e0b';
      ctx.font = `900 ${Math.max(10, 12 * scaleX)}px 'Inter', sans-serif`;
      ctx.fillText(`$${part.value} ${allBoltsOff ? '⚡ TAP TO PULL!' : ''}`, px, py + 12 * scaleY);

      ctx.restore();

      // Draw mounting bolts
      part.bolts.forEach(bolt => {
        if (bolt.removed) return;

        const bx = bolt.x * scaleX;
        const by = bolt.y * scaleY;
        const boltRadius = 13 * scaleX;

        ctx.save();
        // Bolt shadow
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.beginPath();
        ctx.arc(bx + 2, by + 2, boltRadius, 0, Math.PI * 2);
        ctx.fill();

        // Bolt base color (rusted vs clean vs PB-blasted)
        let boltColor = '#94a3b8';
        if (activePB) {
          boltColor = '#38bdf8'; // frozen/loosened blue
        } else if (bolt.rust > 0.7) {
          boltColor = '#b45309'; // heavy rust red
        } else if (bolt.rust > 0.4) {
          boltColor = '#d97706'; // medium amber rust
        }

        ctx.fillStyle = boltColor;
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;

        // Draw 6-sided hex head
        ctx.beginPath();
        for (let a = 0; a < 6; a++) {
          const rad = (a * Math.PI) / 3;
          const hx = bx + Math.cos(rad) * boltRadius;
          const hy = by + Math.sin(rad) * boltRadius;
          if (a === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Inner bolt washer
        ctx.fillStyle = '#475569';
        ctx.beginPath();
        ctx.arc(bx, by, boltRadius * 0.45, 0, Math.PI * 2);
        ctx.fill();

        // If currently unbolting -> draw active circular progress ring
        if (bolt.progress > 0) {
          ctx.beginPath();
          ctx.arc(bx, by, boltRadius + 5, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * bolt.progress);
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 4;
          ctx.shadowColor = '#10b981';
          ctx.shadowBlur = 8;
          ctx.stroke();
        }

        ctx.restore();
      });
    });

    ctx.restore();
  }
}

window.vehicleManager = new VehicleManager();
