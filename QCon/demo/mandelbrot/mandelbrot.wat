(module
 (table 0 anyfunc)
 (memory $0 59)
 (data (i32.const 12) "\b0\04\00\00")
 (data (i32.const 16) " \03\00\00")
 (export "memory" (memory $0))
 (export "colour" (func $colour))
 (export "iterateEquation" (func $iterateEquation))
 (export "scale" (func $scale))
 (export "mandelbrot" (func $mandelbrot))
 (export "getImage" (func $getImage))
 (func $colour (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.gt_s
      (tee_local $1
       (i32.rem_s
        (i32.add
         (i32.mul
          (get_local $2)
          (get_local $0)
         )
         (get_local $1)
        )
        (i32.const 1024)
       )
      )
      (i32.const 255)
     )
    )
    (set_local $2
     (get_local $1)
    )
    (br $label$0)
   )
   (set_local $2
    (i32.const 0)
   )
   (br_if $label$0
    (i32.gt_s
     (get_local $1)
     (i32.const 511)
    )
   )
   (set_local $2
    (i32.sub
     (i32.const 254)
     (get_local $1)
    )
   )
  )
  (i32.and
   (get_local $2)
   (i32.const 255)
  )
 )
 (func $iterateEquation (param $0 f64) (param $1 f64) (param $2 i32) (result i32)
  (local $3 f64)
  (local $4 f64)
  (local $5 f64)
  (local $6 f64)
  (local $7 f64)
  (local $8 i32)
  (block $label$0
   (br_if $label$0
    (i32.lt_s
     (get_local $2)
     (i32.const 1)
    )
   )
   (set_local $6
    (f64.const 0)
   )
   (set_local $8
    (i32.const 0)
   )
   (set_local $7
    (f64.const 0)
   )
   (block $label$1
    (loop $label$2
     (br_if $label$1
      (i32.or
       (f64.gt
        (tee_local $5
         (f64.add
          (tee_local $3
           (f64.mul
            (get_local $7)
            (get_local $7)
           )
          )
          (tee_local $4
           (f64.mul
            (get_local $6)
            (get_local $6)
           )
          )
         )
        )
        (f64.const 4)
       )
       (f64.ne
        (get_local $5)
        (get_local $5)
       )
      )
     )
     (set_local $6
      (f64.add
       (f64.mul
        (f64.add
         (get_local $7)
         (get_local $7)
        )
        (get_local $6)
       )
       (get_local $1)
      )
     )
     (set_local $7
      (f64.add
       (f64.sub
        (get_local $3)
        (get_local $4)
       )
       (get_local $0)
      )
     )
     (br_if $label$2
      (i32.lt_s
       (tee_local $8
        (i32.add
         (get_local $8)
         (i32.const 1)
        )
       )
       (get_local $2)
      )
     )
    )
   )
   (return
    (get_local $8)
   )
  )
  (i32.const 0)
 )
 (func $scale (param $0 f64) (param $1 f64) (param $2 f64) (param $3 f64) (result f64)
  (f64.add
   (f64.mul
    (f64.div
     (f64.sub
      (get_local $3)
      (get_local $2)
     )
     (get_local $2)
    )
    (get_local $1)
   )
   (get_local $0)
  )
 )
 (func $mandelbrot (param $0 i32) (param $1 f64) (param $2 f64) (param $3 f64)
  (local $4 f64)
  (local $5 f64)
  (local $6 i32)
  (local $7 i32)
  (local $8 f64)
  (local $9 i32)
  (local $10 i32)
  (local $11 f64)
  (set_local $4
   (f64.div
    (f64.mul
     (get_local $3)
     (f64.const 800)
    )
    (f64.const 1200)
   )
  )
  (set_local $8
   (f64.const 0)
  )
  (set_local $9
   (i32.const 0)
  )
  (loop $label$0
   (set_local $5
    (call $scale
     (get_local $1)
     (get_local $3)
     (f64.const 1200)
     (get_local $8)
    )
   )
   (set_local $10
    (i32.const 800)
   )
   (set_local $11
    (f64.const 0)
   )
   (loop $label$1
    (set_local $7
     (i32.trunc_s/f64
      (f64.mul
       (f64.add
        (f64.mul
         (get_local $11)
         (f64.const 1200)
        )
        (get_local $8)
       )
       (f64.const 4)
      )
     )
    )
    (block $label$2
     (block $label$3
      (br_if $label$3
       (i32.ne
        (tee_local $6
         (call $iterateEquation
          (get_local $5)
          (call $scale
           (get_local $2)
           (get_local $4)
           (f64.const 800)
           (get_local $11)
          )
          (get_local $0)
         )
        )
        (get_local $0)
       )
      )
      (set_local $6
       (i32.const 0)
      )
      (i32.store16 align=1
       (i32.add
        (get_local $7)
        (i32.const 32)
       )
       (i32.const 0)
      )
      (br $label$2)
     )
     (i32.store8
      (i32.add
       (get_local $7)
       (i32.const 32)
      )
      (call $colour
       (get_local $6)
       (i32.const 0)
       (i32.const 4)
      )
     )
     (i32.store8
      (i32.add
       (get_local $7)
       (i32.const 33)
      )
      (call $colour
       (get_local $6)
       (i32.const 128)
       (i32.const 4)
      )
     )
     (set_local $6
      (call $colour
       (get_local $6)
       (i32.const 356)
       (i32.const 4)
      )
     )
    )
    (i32.store8
     (i32.add
      (get_local $7)
      (i32.const 35)
     )
     (i32.const 255)
    )
    (i32.store8
     (i32.add
      (get_local $7)
      (i32.const 34)
     )
     (get_local $6)
    )
    (set_local $11
     (f64.add
      (get_local $11)
      (f64.const 1)
     )
    )
    (br_if $label$1
     (tee_local $10
      (i32.add
       (get_local $10)
       (i32.const -1)
      )
     )
    )
   )
   (set_local $8
    (f64.add
     (get_local $8)
     (f64.const 1)
    )
   )
   (br_if $label$0
    (i32.ne
     (tee_local $9
      (i32.add
       (get_local $9)
       (i32.const 1)
      )
     )
     (i32.const 1200)
    )
   )
  )
 )
 (func $getImage (result i32)
  (i32.const 32)
 )
)
