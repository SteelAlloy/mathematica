import { NumberSet } from "./numberSet.ts";
import { Real, RealCompatible } from "./real.ts"

export class Complex extends NumberSet {
  public re: Real;
  public im: Real;

  constructor(re: RealCompatible, im: RealCompatible) {
    super();
    this.re = Real.from(re);
    this.im = Real.from(im);
  }

  static mod(x: ComplexCompatible) {
    const complex = Complex.from(x)
    const xx = Real.multiply(complex.re, complex.re)
    const yy = Real.multiply(complex.im, complex.im)
    return Real.sqrt(Real.add(xx, yy))
  }

  static arg(x: ComplexCompatible) {
    const complex = Complex.from(x)
    return Real.atan2(complex.im, complex.re)
  }

  get mod() {
    return Complex.mod(this)
  }

  set mod(mod: RealCompatible) {
    const newComplex = Complex.fromEuler(mod, this.arg)
    this.re = newComplex.re
    this.im = newComplex.im
  }

  get arg() {
    return Complex.arg(this)
  }

  set arg(arg: RealCompatible) {
    const newComplex = Complex.fromEuler(this.mod, arg)
    this.re = newComplex.re
    this.im = newComplex.im
  }

  static NaN = new Complex(NaN, NaN);
  static ZERO = new Complex(0, 0)
  static ONE = new Complex(1, 0);
  static I = new Complex(0, 1);
  static E = new Complex(Math.E, 0);
  static PI = new Complex(Math.PI, 0);
  static LN2 = new Complex(Math.LN2, 0);
  static LN10 = new Complex(Math.LN10, 0);
  static SQRT1_2 = new Complex(Math.SQRT1_2, 0);
  static SQRT2 = new Complex(Math.SQRT2, 0);

  static isNaN(x: Complex) {
    return x.re.isNaN() && x.im.isNaN();
  }

  static from(x: ComplexCompatible) {
    if (x instanceof Complex) {
      return x;
    }
    if (x instanceof Real) {
      return new Complex(x.value, 0);
    }
    if (typeof x === "number") {
      return new Complex(x, 0);
    }
    return this.NaN;
  }

  static fromEuler(mod: RealCompatible, arg: RealCompatible) {
    const realMod = Real.from(mod)
    const realArg = Real.from(arg)
    if (realMod.value < 0) {
      return this.NaN
    }
    if (realMod.value === 0) {
      return this.ZERO
    }
    const re = realMod.multiply(realArg.cos())
    const im = realMod.multiply(realArg.sin())
    return new Complex(re, im)
  }
}

type ComplexCompatible = Complex | Real | number
