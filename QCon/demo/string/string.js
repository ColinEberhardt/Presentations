const fs = require("fs");
const { TextDecoder } = require("util");

const buf = fs.readFileSync("./string.wasm");

const wasmModule = new WebAssembly.Module(new Uint8Array(buf));
const wasmInstance = new WebAssembly.Instance(wasmModule);

const linearMemory = wasmInstance.exports.memory;
const offset = wasmInstance.exports.getMessageRef();
const buffer = new Uint8Array(linearMemory.buffer, offset, 12);

const str = new TextDecoder("utf-8").decode(buffer);

console.log(str);
