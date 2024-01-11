

const string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const words = string.replace(/[.,]/g,"").split(" ");

words.toLowerCase;

//Hem de dir cuantes vegades apareix cada paraula i eliminam els valors de puntuacio i ha de reconeixer igual la paraula amb mayusculas i minusculas.
const resStr = words.reduce((repetidas,paraulaActual) => {
    if(paraulaActual in repetidas) {
        repetidas[paraulaActual] += 1;
    } else {
        contador = 1;
        repetidas[paraulaActual] = 1;
    }
    return repetidas;
},{});

console.log(resStr);

const frequencies = {};
//Imperatiu
for(let i = 0; i < words.length; i++) {
    const word = words[i];
    frequencies[word] = frequencies[word] == null 
    ? 1 
    :frequencies[word] +1;
}
console.log(frequencies);

//funcional
words.forEach((word) => {
    frequencies[word] = frequencies[word] == null 
    ? 1 
    :frequencies[word] +1;
});