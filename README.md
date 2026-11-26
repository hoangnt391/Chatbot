# ASHNA AI CHAT

Phase 01: React + TypeScript + Tauri 2 + Rust starter for Windows and Android.

## Development
Install Node.js 22, Rust stable, and Windows C++ Build Tools and WebView2. Run `npm install`, `npm run dev` for browser preview or `npm run tauri dev` for desktop. Run `npm run build` to type-check and bundle. For Android install Android Studio, SDK/NDK and JDK, then run `npm run tauri android init` and `npm run tauri android build`.

## Scope
Local chat history and settings, demo provider only. No real Ashna authentication or undocumented session access. Official integration must be verified before enabling a live provider. Local history is not encrypted; do not store sensitive information. Build and device tests are pending.
