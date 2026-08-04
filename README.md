# Pocket VAR (iOS Version)

Here’s a clear summary of Pocket VAR from your Notion + a practical plan to start building the iOS version today.

---

## ⚽ What Pocket VAR is

**Tagline**: Bringing tech to grassroots football.

It’s a mobile-first system that turns multiple smartphones into synchronized cameras so grassroots football (schools, academies, local leagues, tournaments) can have:
- **Affordable multi-angle video replay** (like a cheap VAR for referees)
- **Easy multi-angle highlight export** for coaches/players

### Core Idea
Several phones record the same match from different angles. Videos are synced so people can jump to a moment, switch angles, slow-mo, and export clean multi-angle clips.

### Two Recording Modes (MVP)
1. **Full Match** – Continuous recording.
2. **Action-Clip Mode** – Rolling buffer. When someone taps an event button (Goal, Foul, etc.), it saves ~40s before + ~40s after that moment (saves storage and makes highlights faster).

### Target Users
Academies, schools/universities, local leagues, tournament organizers, referees, coaches, players.

### MVP Must-Haves
- Auth
- Create/Join match
- Multi-device recording (~4 cameras target)
- Event buttons
- Video sync
- Multi-angle replay + slow-mo
- Timeline/bookmarks
- Multi-angle highlight export
- Upload that survives disconnects
- Match history

---

## 🛠 Tech Stack & Versions

- **Expo SDK Version**: `~54.0.35`
- **React Native Version**: `0.81.5`
- **React Version**: `19.1.0`

### Installed Packages
- **`expo-camera` (`~17.0.10`)**: Component for live camera preview, zoom, and lens/torch configuration.
- **`@expo/vector-icons` (`^15.0.3`)**: Premium icons for camera settings and UI controls.

---

## 🚀 How to Run the Project

### 1. Install Dependencies
Run this in the project root:
```bash
npm install
```

### 2. Start the Expo Server
```bash
npm run start
```

### 3. Run on iOS
- **Expo Go App (Physical iPhone)**: Download "Expo Go" from the App Store. Connect your iPhone and computer to the same Wi-Fi network, and scan the terminal's QR code.
- **iOS Simulator (Mac)**: Press **`i`** in the terminal to launch the app on the simulator.
