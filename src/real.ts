export class Real {
  public value: number;

  constructor(value: number) {
    this.value = value;
  }

  static NaN = new Real(NaN);
  static E = new Real(Math.E);
  static PI = new Real(Math.PI);
  static LN2 = new Real(Math.LN2);
  static LN10 = new Real(Math.LN10);
  static SQRT1_2 = new Real(Math.SQRT1_2);
  static SQRT2 = new Real(Math.SQRT2);

  static isNaN(x: Real) {
    return x.value === NaN;
  }

  static from(x: RealCompatible) {
    if (x instanceof Real) {
      return x;
    }
    if (typeof x === "number") {
      return new Real(x);
    }
    return this.NaN;
  }

  static add(x: RealCompatible, y: RealCompatible) {
    const real1 = Real.from(x);
    const real2 = Real.from(y);
    return new Real(real1.value + real2.value);
  }

  static subtract(x: RealCompatible, y: RealCompatible) {
    const real1 = Real.from(x);
    const real2 = Real.from(y);
    return new Real(real1.value - real2.value);
  }

  static multiply(x: RealCompatible, y: RealCompatible) {
    const real1 = Real.from(x);
    const real2 = Real.from(y);
    return new Real(real1.value * real2.value);
  }

  static divide(x: RealCompatible, y: RealCompatible) {
    const real1 = Real.from(x);
    const real2 = Real.from(y);
    return new Real(real1.value / real2.value);
  }

  static abs (x: RealCompatible) {
    const real = Real.from(x)
    return new Real(Math.abs(real.value))
  }

  static acos (x: RealCompatible) {
    const real = Real.from(x)
    return new Real(Math.acos(real.value))
  }

  static acosh (x: RealCompatible) {
    const real = Real.from(x)
    return new Real(Math.acosh(real.value))
  }

  static asin (x: RealCompatible) {
    const real = Real.from(x)
    return new Real(Math.asin(real.value))
  }

  static asinh (x: RealCompatible) {
    const real = Real.from(x)
    return new Real(Math.asinh(real.value))
  }

  static atan (x: RealCompatible) {
    const real = Real.from(x)
    return new Real(Math.atan(real.value))
  }

  static atan2 (y: RealCompatible, x: RealCompatible) {
    const real1 = Real.from(x);
    const real2 = Real.from(y);
    return new Real(Math.atan2(real1.value, real2.value));
  }

  static atanh (x: RealCompatible) {
    const real = Real.from(x)
    return new Real(Math.atanh(real.value))
  }

  static cbrt (x: RealCompatible) {
    const real = Real.from(x)
    return new Real(Math.cbrt(real.value))
  }

  static ceil (x: RealCompatible) {
    const real = Real.from(x)
    return new Real(Math.ceil(real.value))
  }

  static clz32 (x: RealCompatible) {
    const real = Real.from(x)
    return Math.clz32(real.value)
  }

  static cos (x: RealCompatible) {
    const real = Real.from(x)
    return new Real(Math.cos(real.value))
  }

  static cosh (x: RealCompatible) {
    const real = Real.from(x)
    return new Real(Math.cosh(real.value))
  }

  static exp (x: RealCompatible) {
    const real = Real.from(x)
    return new Real(Math.exp(real.value))
  }

  static expm1 (x: RealCompatible) {
    const real = Real.from(x)
    return new Real(Math.expm1(real.value))
  }

  static fround (x: RealCompatible) {
    const real = Real.from(x)
    return new Real(Math.fround(real.value))
  }

  static hypot (...values: RealCompatible[]) {
    const reals = values.map((value: RealCompatible) => Real.from(value))
    const realValues = reals.map((real) => real.value)
    return new Real(Math.hypot(...realValues))
  }

  static imul (y: RealCompatible, x: RealCompatible) {
    const real1 = Real.from(x);
    const real2 = Real.from(y);
    return new Real(Math.imul(real1.value, real2.value));
  }

  static log (x: RealCompatible) {
    const real = Real.from(x)
    return new Real(Math.log(real.value))
  }

  static log10 (x: RealCompatible) {
    const real = Real.from(x)
    return new Real(Math.log10(real.value))
  }

  static log1p (x: RealCompatible) {
    const real = Real.from(x)
    return new Real(Math.log1p(real.value))
  }

  static log2 (x: RealCompatible) {
    const real = Real.from(x)
    return new Real(Math.log2(real.value))
  }

  static min (...values: RealCompatible[]) {
    const reals = values.map((value: RealCompatible) => Real.from(value))
    const realValues = reals.map((real) => real.value)
    return new Real(Math.min(...realValues))
  }

  static max (...values: RealCompatible[]) {
    const reals = values.map((value: RealCompatible) => Real.from(value))
    const realValues = reals.map((real) => real.value)
    return new Real(Math.max(...realValues))
  }

  static pow (y: RealCompatible, x: RealCompatible) {
    const real1 = Real.from(x);
    const real2 = Real.from(y);
    return new Real(Math.pow(real1.value, real2.value));
  }

  static random () {
    return new Real(Math.random())
  }

  static sign (x: RealCompatible) {
    const real = Real.from(x)
    return new Real(Math.sign(real.value))
  }

  static sin (x: RealCompatible) {
    const real = Real.from(x)
    return new Real(Math.sin(real.value))
  }

  static sinh (x: RealCompatible) {
    const real = Real.from(x)
    return new Real(Math.sinh(real.value))
  }

  static sqrt (x: RealCompatible) {
    const real = Real.from(x)
    return new Real(Math.sqrt(real.value))
  }

  static tan (x: RealCompatible) {
    const real = Real.from(x)
    return new Real(Math.tan(real.value))
  }

  static tanh (x: RealCompatible) {
    const real = Real.from(x)
    return new Real(Math.tanh(real.value))
  }

  static trunc (x: RealCompatible) {
    const real = Real.from(x)
    return new Real(Math.trunc(real.value))
  }

  isNaN() {
    return Real.isNaN(this);
  }

  add(x: RealCompatible) {
    return Real.add(this, x);
  }

  subtract(x: RealCompatible) {
    return Real.subtract(this, x);
  }

  multiply(x: RealCompatible) {
    return Real.multiply(this, x);
  }

  divide(x: RealCompatible) {
    return Real.divide(this, x);
  }
}

type RealCompatible = Real | number;
