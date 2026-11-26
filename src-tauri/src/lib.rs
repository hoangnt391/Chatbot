// Use the OS-managed persistent WebView profile (non-incognito).
// Keep the app identifier and window label stable across upgrades.
// Never clear browsing data on exit or copy credentials/cookies into Rust.
// Remote content has no application IPC commands or capabilities.
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error running ASHNA AI CHAT");
}
