# Wrench Rush: Junkyard Stripper — Google Play Publishing & Monetization Guide

**Wrench Rush: Junkyard Stripper** is an adrenaline-fueled mobile salvage game designed to capture the hyper-casual car enthusiast & mechanic audience on Google Play.

---

## 📱 App Specifications

| Field | Setting |
| :--- | :--- |
| **App Title** | Wrench Rush: Junkyard Stripper |
| **Short Description** | Crack rusty bolts, pull turbos, and beat the descending crusher in the junkyard! |
| **Full Description** | Grab your impact wrench and hit the salvage yard! Fresh donor cars just rolled into the pull bay. Unbolt high-value turbos, catalytic converters, pushrod intake manifolds, and 4-piston big brakes before the hydraulic overhead crusher compacts the car to scrap metal.<br><br>• Real Web Audio impact gun zips, ratchet clicks, and rust snaps.<br><br>• Upgrade from a rusted 3/8" ratchet to RedVolt M18 Fuel impact and industrial plasma cutting torches.<br><br>• Spray penetrating Rust Blaster to dissolve seized bolts.<br><br>• Cash out your haul at the U-Pull cashier window! |
| **Package ID** | `com.radday.wrenchrush` |
| **Category** | Games / Casual / Arcade / Simulation |
| **Content Rating** | Everyone |
| **Store Assets** | 512x512 High-Res Icon & 1024x500 Feature Graphic (ready in `static/assets/`) |

---

## 🚀 3-Step Google Play Package Generation (PWABuilder / TWA)

Because Wrench Rush has a complete PWA Web Manifest (`manifest.json`), 512x512 maskable icons, and an offline Service Worker (`sw.js`), generating a Google Play `.aab` package requires zero Android code:

### Step 1: Host Publicly or via Cloudflare Tunnel
1. Host the game via your Pi's Cloudflare Tunnel (or GitHub Pages at `radday5/wrenchrush`).
2. Verify the public URL loads cleanly on mobile.

### Step 2: Package with PWABuilder
1. Go to [PWABuilder.com](https://www.pwabuilder.com).
2. Enter your live URL.
3. Click **"Package for Stores"** ➔ Choose **Google Play**.
4. Configure Package settings:
   - **Package ID:** `com.radday.wrenchrush`
   - **App Name:** Wrench Rush
   - **Theme color:** `#070a11`
   - **Full screen:** Enabled (Immersive gaming mode)
   - **Signing key:** Let PWABuilder generate your new release keystore (or upload your existing keystore).
5. Click **"Generate Package"** to download your signed `.aab` file!

---

## 💰 Monetization Model (Google Play)

1. **Free with Rewarded Video / Interstitials:**
   - Players get 1 free "Crusher Jammer (+15s)" by watching a 5-second ad.
2. **In-App Purchase ($0.99 One-Time):**
   - **Product ID:** `wrench_rush_pro_99`
   - **Perks:** Removes all ads forever + Unlocks the **Gold 10mm Socket Magnet (1.5x Cash Forever)** + 5 Free PB Blaster Cans.
   - Payout: Google takes 15%, you net **~$0.84 pure profit** on every single $0.99 upgrade!

---

## 🕹️ Live Play / Local Testing

* **Raspberry Pi Docker Container:** `http://192.168.1.14:8090/` (Up and running!)
* **Local Windows Dev Server:** `http://192.168.1.11:8090/` (or `http://localhost:8090/`)
* **Touch & Haptics:** Open on any phone connected to your home WiFi to test authentic bolt vibration and audio!
