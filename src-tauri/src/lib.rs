// The remote website has no registered application IPC commands.
// Authentication and session storage are handled by the official website and OS WebView.
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error running ASHNA AI CHAT");
}
