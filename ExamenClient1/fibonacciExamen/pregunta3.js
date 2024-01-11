function fibonacciSeries(from, to) {
    // Inicialitza la seqüència amb els primers dos valors de Fibonacci.
    let secuencia = [0, 1];
    // Genera la seqüència fins al to indicat per l'usuari.
    for (let i = 2; i <= to; i++) {
        let nextValue = secuencia[i - 1] +  secuencia[i - 2];
        secuencia.push(nextValue);
    }
    // Retorna la porció de la seqüència entre les posicions from i to.
    return secuencia.slice(from - 1, to - 1);
}
const res = fibonacciSeries(5, 10);
console.log(res);
