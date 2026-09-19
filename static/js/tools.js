// Wrench Rush - Tool Arsenal & Progression System
const TOOLS = [
  {
    id: 'ratchet',
    name: 'Rusted 3/8" Ratchet',
    desc: 'Found in the gravel lot. Takes elbow grease, but gets it done.',
    price: 0,
    spinDuration: 0.95, // seconds per bolt
    rustStruggle: 1.8,  // multiplier on rusty bolts
    color: '#94a3b8',
    sparkColor: '#f59e0b',
    soundType: 'ratchet',
    unlocked: true,
    icon: '🔧'
  },
  {
    id: 'breaker_bar',
    name: '24" Chrome Breaker Bar',
    desc: 'Heavy leverage. Snaps stubborn rusted bolts loose with one solid heave.',
    price: 250,
    spinDuration: 0.65,
    rustStruggle: 1.1, // barely slowed by rust!
    color: '#cbd5e1',
    sparkColor: '#fbbf24',
    soundType: 'snap',
    unlocked: false,
    icon: '🦯'
  },
  {
    id: 'drill',
    name: '12V Compact Cordless Drill',
    desc: 'Battery powered speed. Zips light 10mm bolts off like butter.',
    price: 650,
    spinDuration: 0.42,
    rustStruggle: 1.4,
    color: '#38bdf8',
    sparkColor: '#38bdf8',
    soundType: 'impact',
    unlocked: false,
    icon: '🪛'
  },
  {
    id: 'm18_impact',
    name: 'M18 Fuel 1/2" High-Torque',
    desc: '1,400 ft-lbs of nut-busting torque. Sledgehammer strikes with flying sparks.',
    price: 1600,
    spinDuration: 0.22,
    rustStruggle: 1.0,
    color: '#ef4444',
    sparkColor: '#f97316',
    soundType: 'impact',
    unlocked: false,
    icon: '⚡'
  },
  {
    id: 'pneumatic',
    name: 'Pro-Shop Pneumatic Air Gun',
    desc: 'Wired directly to the yard compressor. Ear-shattering 8,000 RPM unbolting.',
    price: 3800,
    spinDuration: 0.12,
    rustStruggle: 0.9,
    color: '#10b981',
    sparkColor: '#10b981',
    soundType: 'impact',
    unlocked: false,
    icon: '💨'
  },
  {
    id: 'plasma',
    name: 'Industrial Plasma Torch',
    desc: 'Why unbolt when you can vaporize? Melts hardened Grade 8 steel on contact.',
    price: 9500,
    spinDuration: 0.04,
    rustStruggle: 0.5,
    color: '#a855f7',
    sparkColor: '#c084fc',
    soundType: 'plasma',
    unlocked: false,
    icon: '🔥'
  }
];

class ToolManager {
  constructor() {
    this.tools = TOOLS;
    this.currentToolId = 'ratchet';
    this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem('wrench_rush_tools');
      if (saved) {
        const data = JSON.parse(saved);
        this.currentToolId = data.currentToolId || 'ratchet';
        if (Array.isArray(data.unlocked)) {
          this.tools.forEach(t => {
            if (data.unlocked.includes(t.id)) t.unlocked = true;
          });
        }
      }
    } catch (e) {
      console.warn('Error loading tools state:', e);
    }
  }

  saveState() {
    try {
      const unlockedIds = this.tools.filter(t => t.unlocked).map(t => t.id);
      localStorage.setItem('wrench_rush_tools', JSON.stringify({
        currentToolId: this.currentToolId,
        unlocked: unlockedIds
      }));
    } catch (e) {}
  }

  getCurrentTool() {
    return this.tools.find(t => t.id === this.currentToolId) || this.tools[0];
  }

  selectTool(id) {
    const tool = this.tools.find(t => t.id === id);
    if (tool && tool.unlocked) {
      this.currentToolId = id;
      this.saveState();
      return true;
    }
    return false;
  }

  unlockTool(id, currentCash) {
    const tool = this.tools.find(t => t.id === id);
    if (tool && !tool.unlocked && currentCash >= tool.price) {
      tool.unlocked = true;
      this.currentToolId = id;
      this.saveState();
      return { success: true, cost: tool.price };
    }
    return { success: false, cost: 0 };
  }
}

window.toolManager = new ToolManager();
