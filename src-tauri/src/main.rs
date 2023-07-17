// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::path;
use specta::{collect_types, specta};
use tauri_specta::*;

const BINDING_TYPES : &str = "../src/types/bindings.ts";

#[tauri::command]
#[specta]
fn search(path: &str) -> Vec<String> {
    let target = path::PathBuf::from(path);
    let files = target.read_dir().expect("このパスは存在しません");
    return files.map(|i| {
        i.unwrap().path().to_string_lossy().to_string()
    })
    .collect::<Vec<String>>();
}

fn main() {
    ts::export(
        collect_types![search],
        BINDING_TYPES,
    )
    .unwrap();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![search])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
