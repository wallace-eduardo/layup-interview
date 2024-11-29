const functions: Record<string, (number) => bigint> = {};

// time complexity O(2^n) Each call generates 2 more calls for values greater than 2
// space complexity O(n) Call stack grows linearly with input
functions["S-naive"] = function S(n: number): bigint {
    if (n === 1) return BigInt(n);
    if (n === 2) return BigInt(n);
    if (n % 2 === 0) return S(n - 1) + S(n - 2);
    else return BigInt(2) * S(n - 1) - S(n - 2);
};

// time complexity O(n) need to go through all the values in linear fashion
// space complexity O(n) need to store all values in a cache, call stack grows linearly with input
const cache = { 1: BigInt(1), 2: BigInt(2) };
functions["S-memoization"] = function S(n: number): bigint {
    if (cache[n]) return cache[n];
    return cache[n] = n % 2 === 0 ? S(n - 1) + S(n - 2) : BigInt(2) * S(n - 1) - S(n - 2);
};

// time complexity O(n) need to go through all the values in linear fashion
// space complexity O(1) only neds a constant amount of memory
functions["S-iteration"] = function S(n: number): bigint {
    if (n < 3) return BigInt(n);

    let antepenultimate = BigInt(1);
    let penultimate = BigInt(2);
    let ultimate = BigInt(0);

    for (let i = 3; i <= n; i++) {
        ultimate = i % 2 === 0
            ? penultimate + antepenultimate
            : BigInt(2) * penultimate - antepenultimate;
        antepenultimate = penultimate;
        penultimate = ultimate;
    }
    return ultimate;
};

// S - naive - 1 - 0.0198 milliseconds
// S - memoization - 1 - 0.0302 milliseconds
// S - iteration - 1 - 0.0254 milliseconds
// S - naive - 5 - 0.0030 milliseconds
// S - memoization - 5 - 0.0091 milliseconds
// S - iteration - 5 - 0.0022 milliseconds
// S - naive - 10 - 0.0079 milliseconds
// S - memoization - 10 - 0.0032 milliseconds
// S - iteration - 10 - 0.0021 milliseconds
// S - naive - 50 - 247223.5893 milliseconds
// S - memoization - 50 - 0.0354 milliseconds
// S - iteration - 50 - 0.0166 milliseconds
// S - memoization - 100 - 0.0201 milliseconds
// S - iteration - 100 - 0.0058 milliseconds
// S - memoization - 500 - 0.0734 milliseconds
// S - iteration - 500 - 0.0184 milliseconds
// S - memoization - 1000 - 0.0289 milliseconds
// S - iteration - 1000 - 0.0504 milliseconds
// S - memoization - 5000 - 0.7760 milliseconds
// S - iteration - 5000 - 0.2405 milliseconds
// S - memoization - 10000 - 1.0206 milliseconds
// S - iteration - 10000 - 1.7987 milliseconds
const inputSizes = [1, 5, 10, 50, 100, 500, 1_000, 5_000, 10_000];
for (const input of inputSizes) {
    for (const [name, func] of Object.entries(functions)) {
        if (name === 'S-naive' && input > 50) continue
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
