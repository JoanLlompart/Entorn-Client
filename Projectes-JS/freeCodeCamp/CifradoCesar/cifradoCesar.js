function rot13(str) {

   // var alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    //Array per guardar les lletres que conte el string
    var cadena_desco = "";

    for(var i =0;i < str.length;i++) {
        //caracterActual guarda el caracter 
        var codiCharActual = str.charCodeAt(i);
        if(codiCharActual >=65 && codiCharActual <= 90) {
            codiCharActual = ((codiCharActual - 65 + 13) %26) + 65;
        }
        cadena_desco += String.fromCharCode(codiCharActual);
        console.log(cadena_desco);
    }

    


    return cadena_desco;
}

/*
        if(/^[A-Z]$/.test(caracterActual)) {
            //si el codi es una lletra mayuscula 
            var codiAscii = str.charCodeAt(i);
            console.log(codiAscii);
        }
        */


        

    
    /*
    for (var caracterActual in str) {
        //Si el caracterActual de entrada es una lletra amb mayuscula entra.
        if(caracterActual === alfabeto) {
            //guardam a la variable la posicio actual de el valor de la lletra en unicode
            var posicio = str.charCodeAt();
            if() {

            }
            console.log(posicio);
            cadena_descodificado += alfabeto[(posicio -13)%26];

        } else {
            //Si el caracter actual no es una lletra amb mayuscula la afegirem directament a el String de descodificat.
            cadena_descodificado += caracterActual;
            }

    }

    */

rot13("SERR PBQR PNZC");