// Wrench Rush - Power-Ups & Yard Perks
const PERKS = [
  {
    id: 'pb_blaster',
    name: 'PB Blaster Rust Penetrant',
    desc: 'Dissolves stubborn rust welds instantly across the entire car for 10 seconds.',
    price: 150,
    type: 'consumable',
    count: 2,
    icon: '🥫'
  },
  {
    id: 'crusher_jammer',
    name: 'Crusher Jammer',
    desc: 'Emergency stop bypass valve. Freezes the descending crusher for +15 seconds.',
    price: 300,
    type: 'consumable',
    count: 1,
    icon: '🛑'
  },
  {
    id: 'gold_10mm',
    name: 'Gold 10mm Socket Magnet',
    desc: 'The mythical socket that never gets lost. Grants 1.5x Cash Multiplier on all parts.',
    price: 1200,
    type: 'passive',
    owned: false,
    icon: '✨'
  },
  {
    id: 'steel_wagon',
    name: 'Heavy-Duty Yard Wagon',
    desc: '4-wheel pneumatic cart. Boosts yard pull combo score and unlocks VIP vehicle tiers.',
    price: 850,
    type: 'passive',
    owned: false,
    icon: '🛒'
  }
];

class PerkManager {
  constructor() {
    this.perks = PERKS;
    this.activePBTimer = 0; // remaining active seconds
    this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem('wrench_rush_perks');
      if (saved) {
        const data = JSON.parse(saved);
        this.perks.forEach(p => {
          if (data[p.id] !== undefined) {
            if (p.type === 'consumable') p.count = data[p.id];
            if (p.type === 'passive') p.owned = data[p.id];
          }
        });
      }
    } catch (e) {}
  }

  saveState() {
    try {
      const data = {};
      this.perks.forEach(p => {
        data[p.id] = p.type === 'consumable' ? p.count : p.owned;
      });
      localStorage.setItem('wrench_rush_perks', JSON.stringify(data));
    } catch (e) {}
  }

  getPerk(id) {
    return this.perks.find(p => p.id === id);
  }

  usePBBlaster() {
    const perk = this.getPerk('pb_blaster');
    if (perk && perk.count > 0 && this.activePBTimer <= 0) {
      perk.count--;
      this.activePBTimer = 10; // 10 seconds of rust-free unbolting!
      this.saveState();
      return true;
    }
    return false;
  }

  useCrusherJammer() {
    const perk = this.getPerk('crusher_jammer');
    if (perk && perk.count > 0) {
      perk.count--;
      this.saveState();
      return true;
    }
    return false;
  }

  buyPerk(id, currentCash) {
    const perk = this.getPerk(id);
    if (!perk) return { success: false, cost: 0 };

    if (perk.type === 'consumable') {
      if (currentCash >= perk.price) {
        perk.count += 2;
        this.saveState();
        return { success: true, cost: perk.price };
      }
    } else if (perk.type === 'passive') {
      if (!perk.owned && currentCash >= perk.price) {
        perk.owned = true;
        this.saveState();
        return { success: true, cost: perk.price };
      }
    }
    return { success: false, cost: 0 };
  }

  update(dt) {
    if (this.activePBTimer > 0) {
      this.activePBTimer = Math.max(0, this.activePBTimer - dt);
    }
  }

  hasMultiplier() {
    const gold = this.getPerk('gold_10mm');
    return gold && gold.owned ? 1.5 : 1.0;
  }
}

window.perkManager = new PerkManager();
