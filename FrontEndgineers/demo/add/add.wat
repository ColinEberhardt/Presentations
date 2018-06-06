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
