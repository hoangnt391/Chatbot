# ASHNA AI CHAT v0.2.0
Phase 02: responsive UI, multiple local chats, light/dark theme, demo Rust provider.
## Windows
Install Node 22, Rust stable, Visual Studio C++ Build Tools and WebView2.
Run npm install, npm run tauri -- icon assets/icon.svg, npm run tauri dev.
For installer: npm run tauri -- build --bundles nsis.
## Android
Install Android SDK/NDK and JDK 17, set NDK_HOME, install Rust aarch64-linux-android target.
Run npm install, npm run tauri -- icon assets/icon.svg, npm run tauri -- android init, npm run tauri -- android build --debug --apk --target aarch64.
## CI
Actions builds frontend, Windows NSIS installer and ARM64 debug APK. Download artifacts from successful workflow runs. Windows installer is unsigned; APK uses debug signing, not for Play Store. Builds pending verification. Dependencies are not lockfile-pinned yet.
## Privacy
Local storage is unencrypted. No real Ashna integration or authentication yet.
