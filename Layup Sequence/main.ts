const functions: Record<string, (number) => bigint> = {};

// time complexity O(2^n) Each call generates 2 more calls for values greater than 2
// space complexity O(n) Call stack grows linearly with input
functions["S-naive"] = function S(n: number): bigint {
    if (n === 1) return BigInt(n);
    if (n === 2) return BigInt(n);
    if (n % 2 === 0) return S(n - 1) + S(n - 2);
    else return 2n * S(n - 1) - S(n - 2);
};

// time complexity O(n) need to go through all the values in linear fashion
// space complexity O(n) need to store all values in a cache, call stack grows linearly with input
// need to call with deno --v8-flags=--stack-size=8192 main.ts to increase stack size to 8 mb
let cache = { 1: 1n, 2: 2n };
functions["S-memoization"] = function S(n: number): bigint {
    if (cache[n]) return cache[n];
    return cache[n] = n % 2 === 0 ? S(n - 1) + S(n - 2) : 2n * S(n - 1) - S(n - 2);
};

// time complexity O(n) need to go through all the values in linear fashion
// space complexity O(1) only neds a constant amount of memory
functions["S-iteration"] = function S(n: number): bigint {
    if (n < 3) return BigInt(n);

    let antepenultimate = 1n;
    let penultimate = 2n;
    let ultimate = 0n;

    for (let i = 3; i <= n; i++) {
        ultimate = i % 2 === 0
            ? penultimate + antepenultimate
            : 2n * penultimate - antepenultimate;
        antepenultimate = penultimate;
        penultimate = ultimate;
    }
    return ultimate;
};

// S - naive - 1 - 0.0198 milliseconds
// S - naive - 5 - 0.0030 milliseconds
// S - naive - 10 - 0.0079 milliseconds
// S - naive - 50 - 247223.5893 milliseconds
// S - memoization - 1000 - 0.1521 milliseconds
// S - iteration - 1000 - 0.1157 milliseconds
// S - memoization - 2000 - 0.2359 milliseconds
// S - iteration - 2000 - 0.1647 milliseconds
// S - memoization - 3000 - 0.5688 milliseconds
// S - iteration - 3000 - 0.2349 milliseconds
// S - memoization - 4000 - 0.4640 milliseconds
// S - iteration - 4000 - 0.2884 milliseconds
// S - memoization - 5000 - 1.2236 milliseconds
// S - iteration - 5000 - 0.5278 milliseconds
// S - memoization - 6000 - 0.7731 milliseconds
// S - iteration - 6000 - 0.4594 milliseconds
// S - memoization - 7000 - 1.0722 milliseconds
// S - iteration - 7000 - 0.6167 milliseconds
// S - memoization - 8000 - 0.9716 milliseconds
// S - iteration - 8000 - 0.5534 milliseconds
// S - memoization - 9000 - 1.6937 milliseconds
// S - iteration - 9000 - 1.4813 milliseconds
// S - memoization - 10000 - 1.7586 milliseconds
// S - iteration - 10000 - 1.0222 milliseconds
const inputSizes = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10_000];
for (const input of inputSizes) {
    for (const [name, func] of Object.entries(functions)) {
        if (name === 'S-naive' && input > 50) continue
        cache = { 1: 1n, 2: 2n };
        const start = performance.now();
        try {
            func(input);
        } catch (error) {
            console.log(name, error.message);
        }
        const end = performance.now();
        console.log(
            `${name} - ${input} - ${(end - start).toFixed(4)} milliseconds`,
        );
    }
}
