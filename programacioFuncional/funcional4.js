

const array = [1.1,2.3,3,2.5,1.5];
//reduce()
const suma = (a,b) =>a + b;
const result = array.reduce((total,item) => {
    return total + item;
},0);
// el valor de 0 es el valor que en aquest cas tendra total a l'inici, es el valor inicial.
console.log(result);


const res2 = array.reduce((res2,item,index,array) => {
    if(item >2) {
        res2.push(Math.round(item));
    }
    return res2;
},[]);
console.log(res2);


/*
const res3 = array.reduce((res3,item) => {
    item > 2 ? [...res3,Math.round(item)]:  res3,[]);
    */

    //Mirar si tiene los elementos,includes devuelve un booleano.TRUE O FALSE
const compro = array.includes(2.3);

//Some agafa una funcio y respon un boolea,comprovar si cada item compleix una condicio
const comprosome  = array.some((item) => item > 1 && item < 3);

//Comproba que tots els items del arrat compleixen
const comNaN = array.every((item) => typeof item === "number");


const res3 = array.sort((a,b) => a < b ? -1 : a > b ? 1 :0);
console.log(res3);


const array2 = [1.5,1,0,4,2];

// 1. Troba el valor maxim (emprant reduce())
const resEx = array2.reduce((max,item) => {
    if (item>max) {
        return item;
    } else {
        return max
    }
});
console.log(resEx);


// 2. Troba el valor minim (emprant reduce())
const resEx2 = array2.reduce((min,item) => {
    if (item<min) {
        return item;
    } else {
        return min
    }
});
console.log(resEx2);
// 3. Troba el valor maxim i maxim (emprant reduce())
// Retorna un array on el primer valor és el minim i el segon es el maxim, per exemple: [0,4];
const resEx3 = array2.reduce((acum,item) => {
    return[Math.min(acum[0],item) ,Math.max(acum[1],item)];
},[Infinity,-Infinity]); // es valor minim que pot ser

console.log(resEx3);


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

// Hem de tenir molt clar si una funcio es pura o impura en aquest cas el callback 
//es impur perque se inicializa a dins el reduce a la declaracio{}