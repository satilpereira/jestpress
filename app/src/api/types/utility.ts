// src/types/utility.ts

/**
 * A utility type that generates a union of numeric literals from 0 to N-1.
 *
 * @template N - The number up to which the union of numeric literals is generated.
 * @template Acc - An accumulator array used to build the union of numeric literals.
 * @returns A union of numeric literals from 0 to N-1.
 *
 * @example
 * type NumbersUpToFive = Enumerate<5>; // 0 | 1 | 2 | 3 | 4
 */
export type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

/**
 * Represents a range of numbers from `F` to `T`, excluding the numbers from `T`.
 *
 * @template F - The starting number of the range (inclusive).
 * @template T - The ending number of the range (exclusive).
 */
export type Range<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;
