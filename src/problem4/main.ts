// Implementation using a loop
// Time complexity: O(n)
// Space complexity: O(1)
function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// Implementation using the formula for the sum of the first n natural numbers
// Time complexity: O(1)
// Space complexity: O(1)
function sum_to_n_b(n: number): number {
    return n * (n + 1) / 2;
}

// Implementation using recursion
// Time complexity: O(n)
// Space complexity: O(n) due to the call stack
function sum_to_n_c(n: number): number {
    if (n <= 1) {
        return n;
    }
    return n + sum_to_n_c(n - 1);
}