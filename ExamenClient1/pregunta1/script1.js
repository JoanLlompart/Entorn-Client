function partition(string, n) {
    const result = [];
    for (let i = 0; i < string.length; i += n) {
        result.push(string.slice(i, i + n).split(''));
    }
    return result;
}
const result = partition("Hello world!", 3);
console.log(result);
