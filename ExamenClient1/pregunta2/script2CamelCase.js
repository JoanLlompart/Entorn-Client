
function camelCase(string) {
    return string.split(' ').map((paraula, index) => {
        if (index === 0) {
            return paraula.toLowerCase();
        }
        return paraula.charAt(0).toUpperCase() + paraula.slice(1).toLowerCase();
    }).join('');
}

const result = camelCase("Update user email");
console.log(result);
