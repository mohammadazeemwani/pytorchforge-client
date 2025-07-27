# @tauri-apps/plugin-fs 

So i downloaded the plugin as 
```bash
npm i @tauri-apps/plugin-fs
```
same as `@tauri-apps/plugin-dialog` and I was **successfully** able to use it inside my typescript files but it was not registered on `src-tauri` side of things.

## How do I know it
I required this plugin to Download the python file in the file system which required the permission: `fs:allow-write-text-file` to be in the `src-tauri/capabilities/default.json` > permissions section and to my surprise, it was not showing the fs plugin there at all.

## Solution
The solution was a lot of digging but concluded with the fact that the `plugin-fs` was indeed installed but not got *initialized* and *registered* in the tauri app itself. So the following two fixes were done
1. Make the initialization
add this to the `src-tauri/Cargo.toml`
```toml
tauri-plugin-fs = "2"    # <-- ADD THIS LINE
```
2. Do the initialization
add this to the `src-tauri/src/lib.rs`
```rs
.plugin(tauri_plugin_fs::init())
```

After it, adding `fs:allow-write-text-file` in the permissions of `src-tauri/capabilities/default.json` was working like a charm + with the intellisense of permissions 🎉🎉🎉