import { NumberSet, id } from "./numberSet.ts";
import { Complex } from "./complex.ts";

export class Real extends NumberSet {
  public value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }

  get [id]() {
    return "Real";
  }

  static readonly NaN = new Real(NaN);
  static readonly ZERO = new Real(0);
  static readonly ONE = new Real(1);

  static readonly E = new Real(Math.E);
  static readonly PI = new Real(Math.PI);
  static readonly LN2 = new Real(Math.LN2);
  static readonly LN10 = new Real(Math.LN10);
  static readonly SQRT1_2 = new Real(Math.SQRT1_2);
  static readonly SQRT2 = new Real(Math.SQRT2);

  static readonly EPSILON = new Real(Number.EPSILON);
  static readonly MAX_SAFE_INTEGER = new Real(Number.MAX_SAFE_INTEGER);
  static readonly MAX_VALUE = new Real(Number.MAX_VALUE);
  static readonly MIN_SAFE_INTEGER = new Real(Number.MIN_SAFE_INTEGER);
  static readonly MIN_VALUE = new Real(Number.MIN_VALUE);
  static readonly NEGATIVE_INFINITY = new Real(Number.NEGATIVE_INFINITY);
  static readonly POSITIVE_INFINITY = new Real(Number.POSITIVE_INFINITY);

  static from(x: RealCompatible) {
    if (x instanceof this) {
      return x;
    }
    if (typeof x === "number") {
      return new Real(x);
    }
    if (x[id] === "Complex") {
      if (x.im.value !== 0) {
        return this.NaN;
      }
      return x.re;
    }
    return this.NaN;
  }

  static copy(x: RealCompatible) {
    if (x instanceof this) {
      return new Real(x.value);
    }
    if (typeof x === "number") {
      return new Real(x);
    }
    if (x[id] === "Complex") {
      if (x.im.value !== 0) {
        return this.NaN;
      }
      return x.re;
    }
    return this.NaN;
  }

  // #######################

  static isFinite(x: RealCompatible) {
    const X = Real.from(x);
    return Number.isFinite(X.value);
  }

  static isInteger(x: RealCompatible) {
    const X = Real.from(x);
    return Number.isInteger(X.value);
  }

  static isNaN(x: RealCompatible) {
    const X = Real.from(x);
    return Number.isNaN(X.value);
  }

  static isSafeInteger(x: RealCompatible) {
    const X = Real.from(x);
    return Number.isSafeInteger(X.value);
  }

  static parseFloat(str: string) {
    const X = Number.parseFloat(str);
    return Real.from(X);
  }

  static parseInt(str: string) {
    const X = Number.parseInt(str);
    return Real.from(X);
  }

  static toExponential(x: RealCompatible) {
    const X = Real.from(x);
    return X.value.toExponential();
  }

  static toFixed(x: RealCompatible, fractionDigits?: number) {
    const X = Real.from(x);
    return X.value.toFixed(fractionDigits);
  }

  static toLocaleString(
    x: RealCompatible,
    locales?: string | string[] | undefined,
    options?: Intl.NumberFormatOptions | undefined,
  ) {
    const X = Real.from(x);
    return X.value.toLocaleString(locales, options);
  }

  static toPrecision(x: RealCompatible, precision?: number) {
    const X = Real.from(x);
    return X.value.toPrecision(precision);
  }

  static toString(x: RealCompatible) {
    const X = Real.from(x);
    return X.value.toString();
  }

  static valueOf(x: RealCompatible) {
    const X = Real.from(x);
    return X.value.valueOf();
  }

  // #######################

  static add(x: RealCompatible, y: RealCompatible) {
    const X = Real.from(x);
    const Y = Real.from(y);
    return new Real(X.value + Y.value);
  }

  static subtract(x: RealCompatible, y: RealCompatible) {
    const X = Real.from(x);
    const Y = Real.from(y);
    return new Real(X.value - Y.value);
  }

  static multiply(x: RealCompatible, y: RealCompatible) {
    const X = Real.from(x);
    const Y = Real.from(y);
    return new Real(X.value * Y.value);
  }

  static divide(x: RealCompatible, y: RealCompatible) {
    const X = Real.from(x);
    const Y = Real.from(y);
    return new Real(X.value / Y.value);
  }

  static inverse(x: RealCompatible) {
    const X = Real.from(x);
    return new Real(1 / X.value);
  }

  /** Returns the absolute value of a real
   * (the value without regard to whether it is positive or negative).
   * For example, the absolute value of -5 is the same as the absolute value of 5. */
  static abs(x: RealCompatible) {
    const X = Real.from(x);
    return new Real(Math.abs(X.value));
  }

  /** Returns the arc cosine (or inverse cosine) of a real. */
  static acos(x: RealCompatible) {
    const X = Real.from(x);
    return new Real(Math.acos(X.value));
  }

  /** Returns the inverse hyperbolic cosine of a number. */
  static acosh(x: RealCompatible) {
    const X = Real.from(x);
    return new Real(Math.acosh(X.value));
  }

  /** Returns the arcsine of a number. */
  static asin(x: RealCompatible) {
    const X = Real.from(x);
    return new Real(Math.asin(X.value));
  }

  static asinh(x: RealCompatible) {
    const X = Real.from(x);
    return new Real(Math.asinh(X.value));
  }

  static atan(x: RealCompatible) {
    const X = Real.from(x);
    return new Real(Math.atan(X.value));
  }

  static atan2(y: RealCompatible, x: RealCompatible) {
    const X = Real.from(x);
    const Y = Real.from(y);
    return new Real(Math.atan2(Y.value, X.value));
  }

  static atanh(x: RealCompatible) {
    const X = Real.from(x);
    return new Real(Math.atanh(X.value));
  }

  static cbrt(x: RealCompatible) {
    const X = Real.from(x);
    return new Real(Math.cbrt(X.value));
  }

  static ceil(x: RealCompatible) {
    const X = Real.from(x);
    return new Real(Math.ceil(X.value));
  }

  static clz32(x: RealCompatible) {
    const X = Real.from(x);
    return Math.clz32(X.value);
  }

  static cos(x: RealCompatible) {
    const X = Real.from(x);
    return new Real(Math.cos(X.value));
  }

  static cosh(x: RealCompatible) {
    const X = Real.from(x);
    return new Real(Math.cosh(X.value));
  }

  static exp(x: RealCompatible) {
    const X = Real.from(x);
    return new Real(Math.exp(X.value));
  }

  static expm1(x: RealCompatible) {
    const X = Real.from(x);
    return new Real(Math.expm1(X.value));
  }

  static fround(x: RealCompatible) {
    const X = Real.from(x);
    return new Real(Math.fround(X.value));
  }

  static hypot(...values: RealCompatible[]) {
    const reals = values.map((value: RealCompatible) => Real.from(value));
    const realValues = reals.map((real) => real.value);
    return new Real(Math.hypot(...realValues));
  }

  static imul(x: RealCompatible, y: RealCompatible) {
    const X = Real.from(x);
    const Y = Real.from(y);
    return new Real(Math.imul(X.value, Y.value));
  }

  static log(x: RealCompatible) {
    const X = Real.from(x);
    return new Real(Math.log(X.value));
  }

  static log10(x: RealCompatible) {
    const X = Real.from(x);
    return new Real(Math.log10(X.value));
  }

  static log1p(x: RealCompatible) {
    const X = Real.from(x);
    return new Real(Math.log1p(X.value));
  }

  static log2(x: RealCompatible) {
    const X = Real.from(x);
    return new Real(Math.log2(X.value));
  }

  static min(...values: RealCompatible[]) {
    const reals = values.map((value: RealCompatible) => Real.from(value));
    const realValues = reals.map((real) => real.value);
    return new Real(Math.min(...realValues));
  }

  static max(...values: RealCompatible[]) {
    const reals = values.map((value: RealCompatible) => Real.from(value));
    const realValues = reals.map((real) => real.value);
    return new Real(Math.max(...realValues));
  }

  static pow(y: RealCompatible, x: RealCompatible) {
    const X = Real.from(x);
    const Y = Real.from(y);
    return new Real(Math.pow(X.value, Y.value));
  }

  static random() {
    return new Real(Math.random());
  }

  static sign(x: RealCompatible) {
    const X = Real.from(x);
    return Math.sign(X.value);
  }

  static sin(x: RealCompatible) {
    const X = Real.from(x);
    return new Real(Math.sin(X.value));
  }

  static sinh(x: RealCompatible) {
    const X = Real.from(x);
    return new Real(Math.sinh(X.value));
  }

  static sqrt(x: RealCompatible) {
    const X = Real.from(x);
    return new Real(Math.sqrt(X.value));
  }

  static tan(x: RealCompatible) {
    const X = Real.from(x);
    return new Real(Math.tan(X.value));
  }

  static tanh(x: RealCompatible) {
    const X = Real.from(x);
    return new Real(Math.tanh(X.value));
  }

  static trunc(x: RealCompatible) {
    const X = Real.from(x);
    return new Real(Math.trunc(X.value));
  }

  // #######################

  isFinite() {
    return Number.isFinite(this.value);
  }

  isInteger() {
    return Number.isInteger(this.value);
  }

  isNaN() {
    return Number.isNaN(this.value);
  }

  isSafeInteger() {
    return Number.isSafeInteger(this.value);
  }

  toExponential() {
    return this.value.toExponential();
  }

  toFixed(fractionDigits?: number | undefined) {
    return this.value.toFixed(fractionDigits);
  }

  toLocaleString(
    locales?: string | string[] | undefined,
    options?: Intl.NumberFormatOptions | undefined,
  ) {
    return this.value.toLocaleString(locales, options);
  }

  toPrecision(precision?: number | undefined) {
    return this.value.toPrecision(precision);
  }

  toString() {
    return this.value.toString();
  }

  valueOf() {
    return this.value.valueOf();
  }

  // #######################

  add(x: RealCompatible) {
    const X = Real.from(x);
    this.value += X.value;
    return this;
  }

  subtract(x: RealCompatible) {
    const X = Real.from(x);
    this.value -= X.value;
    return this;
  }

  multiply(x: RealCompatible) {
    const X = Real.from(x);
    this.value *= X.value;
    return this;
  }

  divide(x: RealCompatible) {
    const X = Real.from(x);
    this.value /= X.value;
    return this;
  }

  inverse() {
    this.value = 1 / this.value;
    return this;
  }

  /** Returns the absolute value of a real
   * (the value without regard to whether it is positive or negative).
   * For example, the absolute value of -5 is the same as the absolute value of 5. */
  abs() {
    this.value = Math.abs(this.value);
    return this;
  }

  /** Returns the arc cosine (or inverse cosine) of a real. */
  acos() {
    this.value = Math.acos(this.value);
    return this;
  }

  /** Returns the inverse hyperbolic cosine of a number. */
  acosh() {
    this.value = Math.acosh(this.value);
    return this;
  }

  /** Returns the arcsine of a number. */
  asin() {
    this.value = Math.asin(this.value);
    return this;
  }

  asinh() {
    this.value = Math.asinh(this.value);
    return this;
  }

  atan() {
    this.value = Math.atan(this.value);
    return this;
  }

  atan2(y: RealCompatible) {
    const Y = Real.from(y);
    this.value = Math.atan2(Y.value, this.value);
    return this;
  }

  atanh() {
    this.value = Math.atanh(this.value);
    return this;
  }

  cbrt() {
    this.value = Math.cbrt(this.value);
    return this;
  }

  ceil() {
    this.value = Math.ceil(this.value);
    return this;
  }

  clz32() {
    this.value = Math.clz32(this.value);
    return this;
  }

  cos() {
    this.value = Math.cos(this.value);
    return this;
  }

  cosh() {
    this.value = Math.cosh(this.value);
    return this;
  }

  exp() {
    this.value = Math.exp(this.value);
    return this;
  }

  expm1() {
    this.value = Math.expm1(this.value);
    return this;
  }

  fround() {
    this.value = Math.fround(this.value);
    return this;
  }

  imul(x: RealCompatible) {
    const X = Real.from(x);
    this.value = Math.imul(this.value, X.value);
    return this;
  }

  log() {
    this.value = Math.log(this.value);
    return this;
  }

  log10() {
    this.value = Math.log10(this.value);
    return this;
  }

  log1p() {
    this.value = Math.log1p(this.value);
    return this;
  }

  log2() {
    this.value = Math.log2(this.value);
    return this;
  }

  pow(x: RealCompatible) {
    const X = Real.from(x);
    this.value = Math.pow(this.value, X.value);
    return this;
  }

  random() {
    this.value = Math.random();
    return this;
  }

  sign() {
    this.value = Math.sign(this.value);
    return this;
  }

  sin() {
    this.value = Math.sin(this.value);
    return this;
  }

  sinh() {
    this.value = Math.sinh(this.value);
    return this;
  }

  sqrt() {
    this.value = Math.sqrt(this.value);
    return this;
  }

  tan() {
    this.value = Math.tan(this.value);
    return this;
  }

  tanh() {
    this.value = Math.tanh(this.value);
    return this;
  }

  trunc() {
    this.value = Math.trunc(this.value);
    return this;
  }
}

export type RealCompatible = Real | Complex | number;
