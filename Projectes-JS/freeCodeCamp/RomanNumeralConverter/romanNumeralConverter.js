function convertToRoman(num) {

    //Comproba que el tipus de entrada es un numero int
    if (typeof num != 'number' || !Number.isInteger(num)) {
        return null;
    }
    if(num >= 4000) return console.log("Numero no valido, introduce un numero menor de 4000");
    
    let result = "";
    while (num > 0) {
        if (num >= 1000) {
            num -= 1000;
            result += "M";
        } else if (num >= 900) {
            num -= 900;
            result += "CM";
        } else if (num >= 500) {
            num -= 500;
            result += "D";
        } else if (num >= 400) {
            num -= 400;
            result += "CD";
        } else if (num >= 100) {
            num -= 100;
            result += "C";
        } else if (num >= 90) {
            num -= 90;
            result += "XC";
        } else if (num >= 50) {
            num -= 50;
            result += "L";
        } else if (num >= 40) {
            num -= 40;
            result += "XL";
        } else if (num >= 10) {
            num -= 10;
            result += "X";
        } else if (num >= 9) {
            num -= 9;
            result += "IX";
        } else if (num >= 5) {
            num -= 5;
            result += "V";
        } else if (num >= 4) {
            num -= 4;
            result += "IV";
        } else if (num >= 1) {
            num -= 1;
            result += "I";
        } else {
            console.log("El numero introduit no es correcte -> "  + num);
        }
    }
    return result;
}


/**
 * function convertirARomano() {
    var numeroInput = document.getElementById("numeroInput");
    var numero = parseInt(numeroInput.value);
    
    var numeralRomano = convertToRoman(numero);

    var resultadoElement = document.getElementById("resultado");
    resultadoElement.textContent = "El número " + numero + " en numeral romano es: " + numeralRomano;
} 
 */



convertToRoman(36);