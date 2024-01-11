function telephoneCheck(str) {
      // Definim una expressió regular (regex) per validar números de telèfon als Estats Units.
    const patro = /^(1\s?)?(\(\d{3}\)|\d{3})([\s\-]?)\d{3}([\s\-]?)\d{4}$/;

      // Comprovem si la cadena compleix amb el patró de la regex.
    if (patro.test(str)) {
    // Si la cadena coincideix amb el patró, retornem true .
        return true;
    }      
    // Si no coincideix amb el patró, retornem false .
    return false;
}
telephoneCheck("555-555-5555");



