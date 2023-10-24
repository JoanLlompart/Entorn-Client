//first-class Functions
/*function square(n) {
    return n **2;
}

const a = [1,2,3];
const squares = a.map(square);
*/
const a = [1,2,3];
const square = a.map(function (item,index,array) {
    console.log(item,index,array);
    return item ** 2;
});

console.log(JSON.stringify(squares));

//Anonymous function expression
//no te nom la funcio
const x = function (x) {
    return x;
}


//Function declaration
function timesTwo(n) {
    return n*2;

}
//Function expression
const f = function square(item) {
    return item **2;
}

//Arrow function (sempre son anonimas les funcions) --> Serveixen per crear funcions anonimas com una expressio.
const arrow = (item) => {
    return item ** 2;
}

//Shorthand arrow function (return implicit)
const shorthand = (item) => item ** 2;





let y = indentify(1); //"Hoisting" - > La daclaracio se executa antes que se comensi a executar el programa
console.log(y)

//Function declaration
function identify(n) {
    return n;
}




