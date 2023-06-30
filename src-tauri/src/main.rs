// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::path;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn search(path: &str) -> Vec<std::string::String> {
    let target = path::PathBuf::from(path);
    let files = target.read_dir().expect("このパスは存在しません");
    return files.map(|i| {
        i.unwrap().path().to_string_lossy().to_string()
    })
    .collect::<Vec<String>>();
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_window::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![search])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
