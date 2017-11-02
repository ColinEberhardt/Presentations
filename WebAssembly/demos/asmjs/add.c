float power(float number, int pow) {
  float res = number;
  for (int i = 0;i < pow - 1; i++) {
    res *= number;
  }
  return res;
}
