# Pocket Var Camera (iOS Preview App)

A sleek, premium camera preview application built with React Native and Expo. This app is designed for iOS devices, featuring a high-end dark mode UI inspired by professional video gear, and integrates essential camera features.

---

## 📱 Project Overview & Features

- **Live Camera Viewfinder**: High-performance camera preview using the modern `expo-camera` API.
- **Interactive Controls**:
  - **Camera Flip**: Smoothly switch between front and back camera lenses.
  - **Torch/Flash Switch**: Dynamic toggle control for the device's torch.
  - **Rule-of-Thirds Grid Overlay**: Toggleable framing guide lines to help frame shots perfectly.
  - **iOS-style Shutter**: A custom circular shutter button with premium visual feedback.
  - **Premium Dark HUD Theme**: Visual badges (`REC PREVIEW`, active lens label) for a high-end look.
- **iOS Permission Request flow**: Custom, stylized dark permission check screen before triggering the native OS camera permission dialog.

---

## 🛠 Tech Stack & Versions

- **Expo SDK Version**: `~54.0.35`
- **React Native Version**: `0.81.5`
- **React Version**: `19.1.0`

### Installed Packages

These packages were installed to support modern camera functionality and premium styling:
* **`expo-camera` (`~17.0.10`)**: The core library providing camera preview components and lens/torch configuration APIs.
* **`@expo/vector-icons` (`^15.0.3`)**: Library for integrating iOS-style Ionicons for control buttons.

---

## 🚀 How to Run the Project

### 1. Install Dependencies
Ensure you have Node.js installed. Open your terminal in the project folder and run:
```bash
npm install
```

### 2. Start the Expo Server
Launch the Expo development server:
```bash
npm run start
```
*Alternatively, you can run `npx expo start`.*

### 3. Run on iOS

#### Option A: Using the Expo Go App (Physical iPhone)
1. Download the **Expo Go** app from the App Store on your iPhone.
2. Ensure your computer and iPhone are on the **same Wi-Fi network**.
3. Scan the QR code displayed in your terminal using the iOS Camera app (or directly within the Expo Go app).

#### Option B: iOS Simulator (Mac required)
1. Ensure Xcode is installed on your Mac.
2. In the terminal where the Expo server is running, press **`i`** to automatically launch and run the app on the iOS Simulator.

---

## 📂 Project Structure

- **`App.js`**: Holds the main application logic, permissions handler, camera views, controls, and styles.
- **`app.json`**: Expo configuration specifying application details, iOS-specific camera plugins, and user permissions descriptions.
- **`package.json`**: Contains script configurations, dependencies, and metadata.
