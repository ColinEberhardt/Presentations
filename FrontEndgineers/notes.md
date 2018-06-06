MVP agreed, browsers can ship on-by-default, Feb 2017
https://lists.w3.org/Archives/Public/public-webassembly/2017Feb/0002.html

My toolchain:
http://blog.golovin.in/how-to-start-using-webassembly-today/

More complete toolchain:
https://github.com/dcodeIO/webassembly

Compiling C++ with clang:
https://stackoverflow.com/questions/9148488/how-do-i-compile-c-with-clang

Setting up the stack:
https://github.com/WebAssembly/binaryen/issues/340

You can actually cache web assembly modules:
https://developer.mozilla.org/en-US/docs/WebAssembly/Caching_modules

A first look at WASM performance - performance is comparable to JavaScript, n-body simulation
"Seems like Javascript VMs are already pretty good at simple numeric code.
For the other browsers WebAssembly couldn’t beat the javascript versions yet."
http://www.stefankrause.net/wp/?p=405

AssemblyScript - claims a x89 speed increase!!! - simple fibonacci algorithm
https://medium.com/@BenedekGagyi/the-simplest-way-to-get-started-with-webassembly-1f92f6f90d24

WASM 30% faster, d3 pack algorithm
https://hackernoon.com/screamin-speed-with-webassembly-b30fac90cd92

Fibonacci - Best C implementation is 375% faster than best JS implementation.
https://hackernoon.com/how-to-get-a-performance-boost-using-webassembly-8844ec6dd665

A warning against micro-benchmarking, debunking the x30 claim "Don’t write tiny WebAssembly functions expecting them to be faster than JS. You’ll most likely be paying for the call overhead and that will outweigh whatever speed benefit you get from WebAssembly in the first place."
https://medium.com/@mbebenita/webassembly-is-30x-faster-than-javascript-c71ea54d2f96

x10 faster - 3d character animation
https://www.lucidchart.com/techblog/2017/05/16/webassembly-overview-so-fast-so-fun-sorta-difficult/

https://pspdfkit.com/blog/2017/webassembly-a-new-hope/

About BinaryEnd - wasm-specific optimisations from BinaryEn
"Emscripten's WebAssembly support depends on Binaryen,"
https://kripken.github.io/talks/binaryen.html#/2

http://www.mono-project.com/news/2017/08/09/hello-webassembly/

Being able to debug the typescript before wasm assembly is fantastic! e.g. NRE when accessing links[23]

Benchmarks
Mandelbrot, 1200 x 800, 10000 iterations

Chrome
wasm - 983ms
JS - 548ms (793ms)
emscripten - 553ms
AssemblyScript - 614ms
asmjs - 830ms


FF
asmjs - 566ms
JS - 559ms
emscripten - 525ms
AssemblyScript - 595ms
wasm - 595ms

Safari
wasm - 572ms
JS - 542ms (793ms)
emscripten - 533ms
AssemblyScript - 588ms
asmjs - 535ms

C - 494ms (gcc / O3), 464ms (Ofast)

~~~c
int increment(int input)
{
  return input + 1;
}
~~~

http://webassembly.org/docs/semantics/
> WebAssembly code can be considered a structured stack machine; a machine where most computations use a stack of values, but control flow is expressed in structured constructs such as blocks, ifs, and loops.

> A linear memory is a contiguous, byte-addressable range of memory spanning from offset 0 and extending up to a varying memory size. This size is always a multiple of the WebAssembly page size, which is fixed to 64KiB

> it is unspecified how embedders map this array into their process’ own virtual memory. Linear memory is sandboxed;

> Linear memories (default or otherwise) can either be imported or defined inside the module.

The stack can be used to perform operations on the four WASM types (two integer, two floating point).
NOTE: This means that you can't pass in pointers!

In the 'wat' text format, a module is represented as one big S-expression

the function with its signature:
>  (func $increment (param $0 i32) (result i32)

pushes a value to the stack
> (get_local $0)

pops two values from the stack and adds them
> i32.add

Define, and export, a single page of memory
> (memory $0 1)
> (export "memory" (memory $0))

store function references in a table and pass around table indices
`anyfunc` declares that the element type of these references
> (table 0 anyfunc)

typically preceeded with an `elem` section which populates the table, then used as follows:
>  get_local $i
>  call_indirect $return_i32

~~~
(module
 (table 0 anyfunc)
 (memory $0 1)
 (export "memory" (memory $0))
 (export "increment" (func $increment))
 (func $increment (param $0 i32) (result i32)
  (i32.add
   (get_local $0)
   (i32.const 1)
  )
 )
)

~~~

don't actually need a lot of that junk

~~~
(module
 (export "increment" (func $increment))
 (func $increment (param $0 i32) (result i32)
  (i32.add
   (get_local $0)
   (i32.const 1)
  )
 )
)
~~~

s2wasm --allocate-stack 1000000

~~~
(module
 (table 0 anyfunc)
 (memory $0 16)
 (data (i32.const 4) "PB\0f\00")
 (export "memory" (memory $0))
 (export "iterateEquation" (func $iterateEquation))
 (func $iterateEquation (result i32)
  (i32.const 22)
 )
)
~~~


# memory allocation

can be allocated via `S2WASM --initial-memory 262144`

memory required = 300 * 150 * 4 = 180,000 = 2.7 pages of 64KBytes



10,000 iterations => 1149ms (JS 562ms)

kirsten
ac meeting,
