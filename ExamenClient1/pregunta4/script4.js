/*
Implementa function pairsToObject(array), que donat un array d'objects amb els camps "name" i "value", retorni un objecte amb totes aquestes propietats i el seu valor corresponent.
pairsToObject([{ name: "username", value: "pere" }, { name: "nom", value: "Pere Negre" }]) => { username: "pere", nom: "Pere Negre" }
*/

function pairsToObject(array) {
    const resultat = {};
    array.forEach(item => {
        //programacio funcional per no fer un for convencional o un for IN
        resultat[item.name] = item.value;
    });
    return resultat;
}
// Exemple d'ús:
const arrayEntrada = [
    { name: "username", value: "pere" },
    { name: "nom", value: "Pere Negre" }
];
const objecteSortida = pairsToObject(arrayEntrada);
console.log(objecteSortida);
