#[tauri::command]
fn demo_reply(message: String) -> Result<String, String> {
 let text = message.trim();
 if text.is_empty() || text.chars().count() > 8000 { return Err("Invalid message length".into()); }
 Ok(format!("Demo (không phải AI): {}", text))
}
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() { tauri::Builder::default().invoke_handler(tauri::generate_handler![demo_reply]).run(tauri::generate_context!()).expect("error running application"); }
