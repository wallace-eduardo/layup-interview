# How to run
This was made using deno and no external libraries.
To run the command `deno main.ts` was used inside `/layup/Layup Sequence`

# Explanation

I tried three different approaches with varying time and space complexities. The first approach was simply a copy and paste of the document, converted to code. The second approach came after I realized that this problem is a variation of the Fibonacci sequence, so I tried dynamic programming with memoization. After staring at the problem a bit longer, I realized that we only need the last two values, so we don't need to keep all previous values in memory, which led me to the third (iterative) approach. I left all attempts in the code because I thought plotting the graph would be interesting.

## Naive Approach

**time complexity: O($2^n$)** Each call generates 2 more calls

**space complexity: O(n)** Call stack grows linearly with input

```typescript
function S(n: number): bigint {
    if (n === 1) return BigInt(n);
    if (n === 2) return BigInt(n);
    if (n % 2 === 0) return S(n - 1) + S(n - 2);
    else return BigInt(2) * S(n - 1) - S(n - 2);
};
```

## With Memoization

**time complexity O(n)** need to go trough all the values once, calls are not recalculated because of the cache

**space complexity O(n)** need to store all values in a cache

```typescript
function S(n: number): bigint {
    if (cache[n]) return cache[n];
    return cache[n] = n % 2 === 0 ? S(n - 1) + S(n - 2) : BigInt(2) * S(n - 1) - S(n - 2);
};
```

## Iterative

**time complexity O(n)** need to go trough all the values once, use the last 2 values to calcualte current value

**space complexity O(1)** only needs a constant amount of memory

```typescript
function S(n: number): bigint {
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
```
## Run data
Note I did not run the naive version for n > 50 because it was too slow
| Input Size | Naive Time (ms) | Memoization Time (ms)| Iteration Time (ms)|
|------------|-----------------|----------------------|--------------------|
| 1          | 0.0198          | 0.0302               | 0.0254             |
| 5          | 0.0030          | 0.0091               | 0.0091             |
| 10         | 0.0022          | 0.0032               | 0.0021             |
| 50         | 247223.5893     | 0.0354               | 0.0166             |
| 100        | -               | 0.0201               | 0.0058             |
| 500        | -               | 0.0734               | 0.0184             |
| 1000       | -               | 0.0289               | 0.0504             |
| 5000       | -               | 0.7760               | 0.2405             |
| 10000      | -               | 1.0206               | 1.7987             |

Line graph was not helpful because the values are too extreme

![Runs of S(n)](plot.png)