const fs = require("fs");
function loadJSON(filePath) {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}
function decodeValue(base, value) {
    let b = BigInt(base);
    let result = 0n;
    const digits = "0123456789abcdefghijklmnopqrstuvwxyz";
    for (let ch of value.toLowerCase()) {
        let digit = BigInt(digits.indexOf(ch));
        result = result * b + digit;
    }
    return result;
}
function computeConstant(roots) {
    let product = 1n;
    for (let r of roots) {
        product *= r;
    }

    if (roots.length % 2 === 1) {
        product = -product;
    }

    return product;
}
function solvePolynomial(jsonPath) {
    const data = loadJSON(jsonPath);
    const k = data.keys.k;
    let roots = [];
    for (let i = 1; i <= k; i++) {
        let entry = data[String(i)];
        let base = entry.base;
        let value = entry.value;

        let decoded = decodeValue(base, value);
        roots.push(decoded);
    }
    const C = computeConstant(roots);
    console.log(String(C));   
}
solvePolynomial("./input.json");
