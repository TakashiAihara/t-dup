import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [files, setFiles] = useState([]);
  const [path, setPath] = useState("");

  async function search() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setFiles(await invoke("search", { path }));
  }

  return (
    <div className="container">
      <h1>Search Duplicate Movies</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

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
