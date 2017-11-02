Module["asm"] = (function(global, env, buffer) {
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
 return {
  _power: X
 };
});



