import fs from 'fs'
import path from 'path'

// Get version from package.json
const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));
const version = pkg.version;

// Path to tauri.conf.json
const tauriConfPath = path.resolve("src-tauri", "tauri.conf.json");
console.log(tauriConfPath)

// Load tauri.conf.json
const tauriConf = JSON.parse(fs.readFileSync(tauriConfPath, "utf8"));

// Set the version
tauriConf.version = version;

// Save it back
fs.writeFileSync(tauriConfPath, JSON.stringify(tauriConf, null, 2));

console.log(`✔ Updated tauri.conf.json to version ${version}`);
