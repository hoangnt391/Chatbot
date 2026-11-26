# ASHNA AI CHAT v0.3.0 — WebView Edition

Unofficial client wrapper for the official website https://app.ashna.ai/.
Native Tauri window loads the HTTPS website directly. Enter credentials only on the official login page. No credentials, token extraction, JavaScript injection, custom IPC commands or remote capabilities. WebView may persist website cookies according to OS and site settings. Use the website's logout function on shared devices.

The earlier local demo UI remains available in Git history (v0.2.0). This version uses the website's own interface and chat history. Browser preview is a landing page, not an embedded website.

## Windows
Install Node 22, Rust stable, Visual Studio C++ Build Tools and WebView2.
Run npm install, npm run tauri -- icon assets/icon.svg, npm run tauri dev.
Installer: npm run tauri -- build --bundles nsis.

## Android
Install Android SDK/NDK and JDK 17, set NDK_HOME, install Rust aarch64-linux-android target.
Run npm install, npm run tauri -- android init, npm run tauri -- icon assets/icon.svg, npm run tauri -- android build --debug --apk --target aarch64.

## CI and limitations
Actions builds Windows NSIS and ARM64 debug APK. Native builds, login, OAuth redirects, cookie persistence, and website WebView compatibility have not been verified. Some identity providers block embedded login; use the official website in a normal browser if blocked. Internet required. No claim of official Ashna endorsement or supported third-party session integration. Windows installer unsigned; Android debug signed.
