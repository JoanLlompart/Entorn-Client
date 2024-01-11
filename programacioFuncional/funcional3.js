//Functional Programing

//map() 
const array = [1,2,3];
//const result = array.map((item) => item * 2);
const result =[];

/*for(let i = 0; i < array.length; i++) {
    const item = array[i];
    result.push(item * 2);
}
*/

//versio normal 
for (const items of array) {
    result.push(items *2);
};
// Versio funcional
array.forEach((item) => result.push(item * 2));

console.log(result);


//callback es especific de javaScript
const callbackFunction = function (item) {
    console.log(item);
};

array.forEach(callbackFunction);

//Versio en Imperative Programming
for (let i = 0; i < array.length; i++) {
    const item = array[i];
    
};

//Imprimeix directament tots els elements de el array en una sola linea
array.forEach(console.log);

const resultM = array.map((x) => x);
console.log(resultM);

// Se utiliza cuant volem iterar tots els items de un array i a mes volem crear un nou array amb els items 
//que podem transformar o operar  de el primer array
const arr = [1.1, 2.3, 3];

const resultMap = arr.map(Math.round);
console.log(resultMap);

//descartam els valors que no ens interesen, BASICAMENT FILTRA
const res = arr.filter((items) => items > 2 && items < 3);

//versio funcional
const between2and3 = (item) => {
    return item > 2 && item < 3;
};

//imperativa 
/*
const resImp = [];
for (const item of arr) {
    if(between2and3(item)) {
        resImp.push(item);
    };
}
*/
console.log(res);

//Volem filtrar els numeros majors a 2 i arrodoneix a numeros enters
const res2 = arr.filter((item) => item > 2 ,Math.round(item));

const res3 = arr
    .filter((n) => n >2)
    .map((item) => Math.round(item));
console.log(res2 + "Arr");

const res4= [];
for(let i= 0; i < array10.length; i++){
    if(array10[i] > 2){
        res.push(Math.round(array10[i])); 
    }
}
