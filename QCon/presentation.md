layout: true

---
class: center, middle, chapter

# WebAssembly
## and the death of JavaScript?
• • •
## @ColinEberhardt, Scott Logic


---
class: center, middle, chapter

# A brief history of the web

---
class: center, middle

# JavaScript
## (created in 10 days in May 1995, by Brendan Eich)

---
class: center, middle

# Java Applets

---
class: center, middle

# ActiveX

---
class: center, middle

# Flash

---
class: center, middle

# Silverlight

---
class: center, middle

# Dart

---
class: center, middle

# 2018 - JavaScript (still!)

--

## ... but the way we are using it has changed

---
class: center, middle

# We are writing a *lot* of JavaScript

```console
$ npx create-react-app my-app
$ cd my-app
$ find . -name '*.js' | xargs wc -l | tail -1
   79905 total
```

---
class: image, middle

![addition](assets/minified-js.png)

JavaScript is the Assembly Language of the Web

---
class: center, middle

# JavaScript isn't a very good Assembly Language!

---
class: image, middle

![](assets/jit-diagram.png)

https://blog.mozilla.org/luke/2014/01/14/asm-js-aot-compilation-and-startup-performance/

---
class: image, middle

What does JavaScript execution look like today?

![](assets/javascript-execution.png)

https://hacks.mozilla.org/2017/02/a-cartoon-intro-to-webassembly/

---
class: center, middle

> the Web has become the most ubiquitous application platform ever, and yet by historical accident the only natively supported programming language for that platform is JavaScript!

---
class: center, middle, chapter

# WebAssembly

> WebAssembly or wasm is a new portable, size- and load-time-efficient format suitable for compilation to the web.

---
class: center, middle

# asm.js

<!--
A Mozilla experiment, effectively creating a new virtual machine from JavaScript
Let's have a look at it in practice ...
-->

---

~~~c
float power(float number, int pow) {
  float res = number;
  for (int i = 0;i < pow - 1; i++) {
    res = res * number;
  }
  return res;
}
~~~

~~~
emcc power.c -O3  -s ONLY_MY_CODE=1 -s EXPORTED_FUNCTIONS="['_power']"
~~~

~~~javascript
"use asm";
function X(a, b) {
 a = +a;
 b = b | 0;
 var c = 0.0, d = 0;
 d = b + -1 | 0;
 if ((b | 0) > 1) {
  b = 0;
  c = a;
 } else return +a;
 do {
  c = c * a;
  b = b + 1 | 0;
 } while ((b | 0) != (d | 0));
 return +c;
}
~~~

---
class: image, middle

asm.js optimised execution

![](assets/aot-diagram.png)

---
class: image, middle

![](assets/unreal.jpg)

---
class: center, offtop, image

# WebAssembly Roadmap

- 2015 - WebAssembly Community Group formed
- 2017 - WebAssembly MVP released
- 2018 - W3C public draft published

<br/>
<br/>
![](assets/browsers.png)

---
class: image, middle

![](assets/can-i-use-wasm.png)

---
class: center, middle, chapter

# WebAssembly In Practice

---
class: center, middle, chapter

# WebAssembly In Practice

---
class: offtop

~~~c
float power(float number, int pow) {
  float res = number;
  for (int i = 0;i < pow - 1; i++) {
    res = res * number;
  }
  return res;
}

~~~

---
class: offtop

~~~
$ xxd add.wasm
00000000: 0061 736d 0100 0000 0107 0160 027d 7f01  .asm.......`.}..
00000010: 7d03 0201 0004 0401 7000 0005 0301 0001  }.......p.......
00000020: 0712 0206 6d65 6d6f 7279 0200 0570 6f77  ....memory...pow
00000030: 6572 0000 0a33 0131 0101 7d02 4020 0141  er...3.1..}.@ .A
00000040: 0248 0d00 2001 417f 6a21 0120 0021 0203  .H.. .A.j!. .!..
00000050: 4020 0220 0094 2102 2001 417f 6a22 010d  @ . ..!. .A.j"..
00000060: 000b 2002 0f0b 2000 0b                   .. ... ..
~~~

---
class: middle, small

~~~
(module
 (table 0 anyfunc)
 (memory $0 1)
 (export "memory" (memory $0))
 (export "power" (func $power))
 (func $power (param $0 f32) (param $1 i32) (result f32)
  (local $2 f32)
  (block $label$0
   (br_if $label$0
    (i32.lt_s
     (get_local $1)
     (i32.const 2)
    )
   )
   (set_local $1
    (i32.add
     (get_local $1)
     (i32.const -1)
    )
   )
   (set_local $2
    (get_local $0)
   )
   (loop $label$1
    (set_local $2
     (f32.mul
      (get_local $2)
      (get_local $0)
     )
    )
    (br_if $label$1
     (tee_local $1
      (i32.add
       (get_local $1)
       (i32.const -1)
      )
     )
    )
   )
   (return
    (get_local $2)
   )
  )
  (get_local $0)
 )
)
~~~

---
class: center, offtop

~~~javascript
// read the binary into a buffer
const fs = require("fs");
const buf = fs.readFileSync("./add.wasm");

// create a wasm module
const wasmModule = new WebAssembly.Module(new Uint8Array(buf));

// construct an instance of the module
const wasmInstance = new WebAssembly.Instance(wasmModule);

// invoke the exported function
const result = wasmInstance.exports.power(2, 3)
console.log(result);
~~~

---
class: center, offtop

~~~c
char *message = "hello wasm!";

char *getMessageRef()
{
  return message;
}
~~~

---
class: center, offtop

~~~javascript
const { TextDecoder } = require("util");

// read the binary into a buffer
const fs = require("fs");
const buf = fs.readFileSync("./string.wasm");

// create a module and an instance
const wasmModule = new WebAssembly.Module(new Uint8Array(buf));
const wasmInstance = new WebAssembly.Instance(wasmModule);

// obtain a reference to linear and read the string
const linearMemory = wasmInstance.exports.memory;
const offset = wasmInstance.exports.getMessageRef();
const buffer = new Uint8Array(linearMemory.buffer, offset, 12);

// decode and log
const str = new TextDecoder("utf-8").decode(buffer);
console.log(str);
~~~

---
class: center, offtop

# WebAssembly Architecture

- A stack machine, 4 types, 67 instructions
- Designed to support streaming compilation
- Simple validation rules
- Exports / imports functions
- Linear memory is shared with JavaScript

---
class: center, offtop

# WebAssembly Future

- Garbage collector
- Threads
- Host bindings
- SIMD
- Exception handling
<!-- todo: find out more about host bindings -->

---
class: center, middle, chapter

# WebAssembly Language Support
## (and what people are doing with it)

---
class: center, offtop

# C / C++

- Emscripten
- Based on LLVM
- Originally used to create asm.js

---
class: image

![addition](assets/pspdfkit.png)

https://pspdfkit.com/blog/2017/webassembly-a-new-hope/

---
class: image

![addition](assets/jsc.png)

https://mbbill.github.io/JSC.js/

---
class: image

![addition](assets/activ-option-chain.png)


---
class: center, offtop

# Java / C&#35;

- More challenging, these languages require a GC

--
- Blazor, experimental project, using Mono
 - Testing interpreted mode, vs. AOT (with runtime for GC etc …)
 - Blazor is an SPA framework

---
class: center, offtop

# JavaScript

- Needs a GC and isn’t statically typed

--
- “Walt is a JavaScript-like syntax for WebAssembly text format”

--
- AssemblyScript - a TypeScript to WebAssembly compiler
 - Awaiting GC before it can really become powerful

---
class: image

![d3-force](assets/d3-force.png)

https://bl.ocks.org/ColinEberhardt/6ceb7ca74aabac9c8534d7120d31b382

---
class: center, offtop

~~~javascript
simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

function ticked() {
  simulation.tick();
  link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);

  node
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);
}

setInterval(ticked, 25);
~~~

---
class: center, offtop

# Rust

- Doesn’t require a GC
- Originally used Emscripten, but moved to a simpler toolchain

> We're poised to be THE language of choice for wasm.


---
class: image

![](assets/emulator.png)

<small>http://blog.scottlogic.com/2017/12/13/chip8-emulator-webassembly-rust.html</small>

---
class: image

![d3-force](assets/source-maps.png)

https://hacks.mozilla.org/2018/01/oxidizing-source-maps-with-rust-and-webassembly/

---
class: center, middle, chapter

# Crystal Ball Gazing
# 🔮🔮🔮🔮

---
class: center, offtop

# 2018

- Rust, C, C++ used in production for performance critical, algorithmic tasks

--
- Webpack

--
- Java, C#, Typescript lots of creative experiments / POCs

--
- Native node modules

--
- GC support

---
class: center, offtop

# 2019

- Host bindings, SIMD, threading, ...

--
- Java, C&#35; become production ready

--
- Another wave of mobile, desktop and server-side UI frameworks will re-target the web
  - write once, run everywhere

--
- Performance gains fail to materialise, with backlash from early adopters

--
- Heavyweight productivity tools start moving to the web (e.g. Photoshop, AutoCAD)

---
class: center, offtop

# 2020 - and beyond

- JavaScript will compile directly to WebAssembly, `"use wasm"`

--
- Native Android apps die-out in favour of Progressive Web Apps (PWA) running on WebAssembly

--
- Windows store moves to PWA / WASM

--
- A new DOM alternative will emerge?

--
- JavaScript's monopoly will be lost, and it's popularity will fade

--
- The ubiquity of the web extends further still

---
class: center, middle, chapter

# WebAssembly
## and the death of JavaScript?
• • •
## Colin Eberhardt
