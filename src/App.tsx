import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import * as commands from "./types/bindings"; // This should point to the file we export from Rust

function App() {
  const [files, setFiles] = useState<string[]>([]);
  const [path, setPath] = useState<string>("");

  async function search() {
    setFiles(await commands.search(path));
  }

  return (
    <div className="container">
      <h1>Search Duplicate Movies</h1>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          search();
        }}
      >
        <input
          id="search-input"
          onChange={(e) => setPath(e.currentTarget.value)}
          placeholder="Enter a folder path"
        />
        <button type="submit">search</button>
      </form>

      <p>{files.map((file,idx) => {
        return <div key={idx}>{file}</div>
      })}</p>
    </div>
  );
}

export default App;
