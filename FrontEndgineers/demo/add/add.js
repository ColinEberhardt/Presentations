const fs = require("fs");
const buf = fs.readFileSync("./add.wasm");
const wasmModule = new WebAssembly.Module(new Uint8Array(buf));
const wasmInstance = new WebAssembly.Instance(wasmModule);

console.log(wasmInstance.exports.add(2, 3));
