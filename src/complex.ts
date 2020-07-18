import { NumberSet, id } from "./numberSet.ts";
import { Real, RealCompatible } from "./real.ts";

export class Complex extends NumberSet {
  public re: Real;
  public im: Real;

  constructor(re: RealCompatible, im: RealCompatible) {
    super();
    this.re = Real.from(re);
    this.im = Real.from(im);
  }

  get [id]() {
    return "Complex";
  }

  static readonly NaN = new Complex(NaN, NaN);
  static readonly ZERO = new Complex(0, 0);
  static readonly ONE = new Complex(1, 0);
  static readonly I = new Complex(0, 1);

  static readonly E = new Complex(Math.E, 0);
  static readonly PI = new Complex(Math.PI, 0);
  static readonly LN2 = new Complex(Math.LN2, 0);
  static readonly LN10 = new Complex(Math.LN10, 0);
  static readonly SQRT1_2 = new Complex(Math.SQRT1_2, 0);
  static readonly SQRT2 = new Complex(Math.SQRT2, 0);

  static from(x: ComplexCompatible) {
    if (x instanceof this) {
      return x;
    }
    if (typeof x === "number") {
      return new Complex(x, 0);
    }
    if (x[id] === "Real") {
      return new Complex(x.value, 0);
    }
    return this.NaN;
  }

  static copy(x: ComplexCompatible) {
    if (x instanceof this) {
      return new Complex(x.re, x.im);
    }
    if (typeof x === "number") {
      return new Complex(x, 0);
    }
    if (x[id] === "Real") {
      return new Complex(x.value, 0);
    }
    return this.NaN;
  }

  // #######################

  static isFinite(x: ComplexCompatible) {
    const X = Complex.from(x);
    return Real.isFinite(X.re) && Real.isFinite(X.im);
  }

  static isInteger(x: ComplexCompatible) {
    const X = Complex.from(x);
    return Real.isInteger(X.re) && Real.isInteger(X.im);
  }

  static isNaN(x: ComplexCompatible) {
    const X = Complex.from(x);
    return Real.isNaN(X.re) || Real.isNaN(X.im);
  }

  static isSafeInteger(x: ComplexCompatible) {
    const X = Complex.from(x);
    return Real.isSafeInteger(X.re) && Real.isSafeInteger(X.im);
  }

  static regex =
    /^(?=[iI.\d+-])([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?(?![iI.\d]))?([+-]?(?:(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?)?[iI])?$/;

  static parseFloat(str: string) {
    const match = str.match(this.regex);
    if (match) {
      const re = Number.parseFloat(match[1]);
      const im = Number.parseFloat(match[2]);
      const x = new Complex(re, im);
      return Complex.isNaN(x) ? this.NaN : x;
    }
    return this.NaN;
  }

  static parseInt(str: string) {
    const match = str.match(this.regex);
    if (match) {
      const re = Number.parseInt(match[1]);
      const im = Number.parseInt(match[2]);
      const x = new Complex(re, im);
      return Complex.isNaN(x) ? this.NaN : x;
    }
    return this.NaN;
  }

  static toExponential(x: ComplexCompatible) {
    const X = Complex.from(x);
    const mod2 = Real.add(Real.multiply(X.re, X.re), Real.multiply(X.im, X.im));
    const mod = Real.sqrt(mod2);
    const arg = Complex.arg(x);
    if (mod.value && arg.value) {
      const nPI = arg.value / Math.PI;
      const mod_ = mod.value === 1
        ? ""
        : (mod.isInteger()
          ? mod.toString()
          : (mod2.isInteger() ? `√${mod2.value}` : mod.toString()));
      if (nPI.toString().length < 5) {
        return `${mod_} exp(${nPI === 1 ? "" : nPI} iπ)`;
      }
      return `${mod_} exp(${arg} i)`;
    }
    if (mod2.value) {
      return `${Real.sqrt(mod2)}`;
    }
    return "0";
  }

  // TODO
  static toExponentialFixed(x: ComplexCompatible, fractionDigits?: number) {
    const mod = Complex.mod(x);
    const arg = Complex.arg(x);
    if (mod.value && arg.value) {
      const nPI = arg.value / Math.PI;
      if (nPI.toString().length < Math.min(5, fractionDigits || 5)) {
        return `${mod.value === 1 ? "" : mod} exp(${nPI === 1 ? "" : nPI} iπ)`;
      }
      return `${mod.value === 1 ? "" : mod.toFixed(fractionDigits)} exp(${
        arg.toFixed(fractionDigits)
      } i)`;
    }
    if (mod.value) {
      return `${mod.toFixed(fractionDigits)}`;
    }
    return "0";
  }

  static toFixed(x: ComplexCompatible, fractionDigits?: number) {
    const X = Complex.from(x);
    if (X.re.value && X.im.value) {
      return `${X.re.toFixed(fractionDigits)}${
        Real.sign(X.im) === 1 ? "+" : ""
      }${X.im.toFixed(fractionDigits)}i`;
    }
    if (X.re.value) {
      return `${X.re.toFixed(fractionDigits)}`;
    }
    if (X.im.value) {
      return X.im.value === 1 ? "i" : `${X.im.toFixed(fractionDigits)}i`;
    }
    return "0";
  }

  static toLocaleString(
    x: ComplexCompatible,
    locales?: string | string[] | undefined,
    options?: Intl.NumberFormatOptions | undefined,
  ) {
    const X = Complex.from(x);
    if (X.re.value && X.im.value) {
      return `${X.re.toLocaleString(locales, options)}${
        Real.sign(X.im) === 1 ? "+" : ""
      }${X.im.toLocaleString(locales, options)}i`;
    }
    if (X.re.value) {
      return `${X.re.toLocaleString(locales, options)}`;
    }
    if (X.im.value) {
      return X.im.value === 1
        ? "i"
        : `${X.im.toLocaleString(locales, options)}i`;
    }
    return "0";
  }

  static toPrecision(x: RealCompatible, precision?: number | undefined) {
    const X = Complex.from(x);
    if (X.re.toString().length < 5 && X.im.toString().length < 5) {
      return Complex.toFixed(X, precision);
    }
    return Complex.toExponentialFixed(X, precision);
  }

  static toString(x: ComplexCompatible) {
    const X = Complex.from(x);
    if (X.re.value && X.im.value) {
      return `${X.re}${Real.sign(X.im) === 1 ? "+" : ""}${X.im}i`;
    }
    if (X.re.value) {
      return `${X.re}`;
    }
    if (X.im.value) {
      return X.im.value === 1 ? "i" : `${X.im}i`;
    }
    return "0";
  }

  toString() {
    return Complex.toString(this);
  }

  // #######################

  static mod(x: ComplexCompatible) {
    const X = Complex.from(x);
    return Real.hypot(X.re, X.im);
  }

  static arg(x: ComplexCompatible) {
    const X = Complex.from(x);
    return Real.atan2(X.im, X.re);
  }

  get mod() {
    return Complex.mod(this);
  }

  set mod(mod: Real) {
    const newComplex = Complex.fromEuler(mod, this.arg);
    this.re = newComplex.re;
    this.im = newComplex.im;
  }

  get arg() {
    return Complex.arg(this);
  }

  set arg(arg: Real) {
    const newComplex = Complex.fromEuler(this.mod, arg);
    this.re = newComplex.re;
    this.im = newComplex.im;
  }

  static fromEuler(mod: RealCompatible, arg: RealCompatible) {
    const realMod = Real.from(mod);
    const realArg = Real.from(arg);
    if (realMod.value < 0) {
      return this.NaN;
    }
    if (realMod.value === 0) {
      return this.ZERO;
    }
    const re = Real.multiply(realMod, Real.cos(realArg));
    const im = Real.multiply(realMod, Real.sin(realArg));
    return new Complex(re, im);
  }

  static add(x: ComplexCompatible, y: ComplexCompatible) {
    const X = Complex.from(x);
    const Y = Complex.from(y);
    const re = Real.add(X.re, Y.re);
    const im = Real.add(X.im, Y.im);
    return new Complex(re, im);
  }

  static subtract(x: ComplexCompatible, y: ComplexCompatible) {
    const X = Complex.from(x);
    const Y = Complex.from(y);
    const re = Real.subtract(X.re, Y.re);
    const im = Real.subtract(X.im, Y.im);
    return new Complex(re, im);
  }

  static multiply(x: ComplexCompatible, y: ComplexCompatible) {
    const X = Complex.from(x);
    const Y = Complex.from(y);
    const re = Real.subtract(
      Real.multiply(X.re, Y.re),
      Real.multiply(X.im, Y.im),
    );
    const im = Real.add(
      Real.multiply(X.re, Y.im),
      Real.multiply(X.im, Y.re),
    );
    return new Complex(re, im);
  }

  // TODO
  static divide(x: ComplexCompatible, y: ComplexCompatible) {
    const X = Complex.from(x);
    const Y = Complex.from(y);
    const re = Real.add(X.re, Y.re);
    const im = Real.add(X.im, Y.im);
    return new Complex(re, im);
  }

  static inverse(x: ComplexCompatible) {
    const X = Complex.from(x);
    if (X.re.value !== 0 || X.im.value !== 0) {
      const denominator = Real.add(
        Real.multiply(X.re, X.re),
        Real.multiply(X.im, X.im),
      );
      const conjugate = Complex.conjugate(X);
      return Complex.divide(conjugate, denominator);
    }
  }

  static conjugate(x: ComplexCompatible) {
    const X = Complex.from(x);
    return new Complex(X.re, -X.im);
  }

  static ceil(x: ComplexCompatible) {
    const complex = Complex.from(x);
    const re = Real.ceil(complex.re);
    const im = Real.ceil(complex.im);
    return new Complex(re, im);
  }

  static cos(x: ComplexCompatible) {
    const complex = Complex.from(x);
  }

  static exp(x: ComplexCompatible) {
    const complex = Complex.from(x);
  }
}

export type ComplexCompatible = Complex | Real | number;

const z = new Complex(3, 3);
console.log(z);
console.log(Complex.toExponential(z));
