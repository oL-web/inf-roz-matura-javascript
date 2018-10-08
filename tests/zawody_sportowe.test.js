import { highestStreak, minMaxArr, streaksHigherThan } from "../src/zawody_sportowe";
import { performance } from "perf_hooks";

const isNumber = (foo) => !isNaN(foo);

describe("highestStreak", () => {
  test('returns a number', () => {
    const wins = [100, 200, 300];
    const highestValue = highestStreak(wins).highestValue;
    expect(isNumber(highestValue)).toBe(true);
  });

  test('return 3 on three wins', () => {
    const wins = [100, 200, 300];
    const highestValue = highestStreak(wins).highestValue;
    expect(highestValue).toEqual(3);
  });

  test('returns 1 on one win', () => {
    const wins = [100, 50, 0];
    const highestValue = highestStreak(wins).highestValue;
    expect(highestValue).toEqual(1);
  });

  test('returns 0 wins on zero wins', () => {
    const wins = [];
    const highestValue = highestStreak(wins).highestValue;
    expect(highestValue).toEqual(0);
  });

  test('it just works', () => {
    const wins = [0, 0, 0, 10, 0, 0, 30, 0, 50, 0, 100, 200, 300, 400, 0];
    const highestValue = highestStreak(wins).highestValue;
    expect(highestValue).toEqual(4);
  });

  test('it just works2', () => {
    const wins = [50, 50, 50, 50, 0, 10, 20];
    const highestValue = highestStreak(wins).highestValue;
    expect(highestValue).toEqual(2);
  });

  test('returns the difference', () => {
    const wins = [100, 200, 300, 1000, 0, 1, 2, 3, 1000000];
    const difference = highestStreak(wins).difference;
    expect(difference).toEqual(900);
  });

  test('returns the difference2', () => {
    const wins = [-1000, -500, 0];
    const difference = highestStreak(wins).difference;
    expect(difference).toEqual(1000);
  });
});


describe("minMaxArr", () => {
  test('returns an object with min/max properties', () => {
    const obj = minMaxArr();
    expect(obj).toMatchObject({});
    expect(obj).toHaveProperty("max");
    expect(obj).toHaveProperty("min");
  });

  test('returns -1 on empty array', () => {
    const wins = [];
    const min = minMaxArr(wins).min;
    const max = minMaxArr(wins).max;
    expect(min).toEqual(-1);
    expect(max).toEqual(-1);
  });

  test('returns the index of the highest value', () => {
    const wins = [1, 2, 3, 2, 1];
    const max = minMaxArr(wins).max;
    expect(max).toEqual(2);
  });

  test('returns the index of the lowest value', () => {
    const wins = [-400, 1, 2, -600, 2, 1, -20];
    const min = minMaxArr(wins).min;
    expect(min).toEqual(3);
  });

  test('is faster than sort', () => {
    const wins1 = [-400, 1, 2, 3, 2, 1, -20, -400, 1, 2, 3, 2, 1, -20, -400, 1, 2, 3, 2, 1, -20];
    const wins2 = [-400, 1, 2, 3, 2, 1, -20, -400, 1, 2, 3, 2, 1, -20, -400, 1, 2, 3, 2, 1, -20];

    const a1 = performance.now();
    wins1.sort((a, b) => a - b);
    const min1 = wins1[0];
    const a2 = performance.now() - a1;

    const b1 = performance.now();
    const min2 = minMaxArr(wins2).min;
    const b2 = performance.now() - b1;

    console.info("SORTING TOOK", a2, "ms");
    console.info("MINMAXARR TOOK", b2, "ms");
    expect(b2).toBeLessThan(a2);
  });
});


describe("streaksHigherThan", () => {
  test('returns a number', () => {
    const wins = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3];
    expect(isNumber(streaksHigherThan(wins,3))).toBe(true);
  });

  test('calculates the amount of streaks correctly', () => {
    const wins = [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3],
      [3, 2, 1, 0, -1, -2, -3],
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4],
      [1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10, 11, 1],
    ];

    expect(streaksHigherThan(wins[0], 3)).toEqual(2);
    expect(streaksHigherThan(wins[1], 3)).toEqual(0);
    expect(streaksHigherThan(wins[1], 1)).toEqual(0);
    expect(streaksHigherThan(wins[2], 5)).toEqual(1);
    expect(streaksHigherThan(wins[3], 5)).toEqual(0);
    expect(streaksHigherThan(wins[4], 5)).toEqual(2);
  });
});