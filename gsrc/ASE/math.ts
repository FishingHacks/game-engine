export default class Math {
  static pow(a: number, b: number): number {
    if (isNaN(a) || isNaN(b)) return NaN;
    if (a < 0 || b < 0) return NaN;
    return a ** b;
  }

  static sqrt(x: number) {
    if (isNaN(x)) return NaN;
    if (x < 0) return NaN;
    return x ** 0.5;
  }

  static abs(x: number) {
    if (isNaN(x)) return NaN;
    return x < 0 ? x * -1 : x;
  }

  static min(...numbers: number[]) {
    if (numbers.includes(NaN)) return NaN;
    return numbers.reduce((el, acc) => (el < acc ? el : acc), Infinity);
  }

  static max(...numbers: number[]) {
    if (numbers.includes(NaN)) return NaN;
    return numbers.reduce((el, acc) => (el > acc ? el : acc), -Infinity);
    }

  static PI: number = 3.141592653589793;
  static pi: number = 3.141592653589793;
}