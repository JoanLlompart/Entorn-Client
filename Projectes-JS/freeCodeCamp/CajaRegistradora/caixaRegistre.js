function checkCashRegister(price, cash, cid) {
    // Definir las denominaciones y sus valores en centavos
    const denominations = [
        { name: "PENNY", value: 0.01 },
        { name: "NICKEL", value: 0.05 },
        { name: "DIME", value: 0.1 },
        { name: "QUARTER", value: 0.25 },
        { name: "ONE", value: 1 },
        { name: "FIVE", value: 5 },
        { name: "TEN", value: 10 },
        { name: "TWENTY", value: 20 },
        { name: "ONE HUNDRED", value: 100 }
    ];

    // Calcular el cambio que se debe dar
    let change = cash - price;

    // Calcular el total en efectivo disponible en caja
    let totalCid = 0;
    for (let i = 0; i < cid.length; i++) {
        totalCid += cid[i][1];
    }
    totalCid = totalCid.toFixed(2);

    // Comprobar si el efectivo en caja es igual al cambio necesario
    if (Number(totalCid) === change) {
        return { status: "CLOSED", change: cid };
    }

    // Inicializar un arreglo para el cambio
    let changeArray = [];

    // Recorrer las denominaciones en orden descendente
    for (let i = denominations.length - 1; i >= 0; i--) {
        const coinName = denominations[i].name;
        const coinValue = denominations[i].value;
        const availableCoins = cid[i][1];
        const coinCount = Math.floor(availableCoins / coinValue);
        const coinSum = coinCount * coinValue;

        // Calcular la cantidad de monedas de esta denominación a dar como cambio
        let coinsToGive = 0;
        while (change >= coinValue && coinsToGive < coinCount) {
            change -= coinValue;
            change = change.toFixed(2);
            coinsToGive++;
        }

        // Calcular el valor total de las monedas de esta denominación a dar como cambio
        let changeValue = coinsToGive * coinValue;
        if (changeValue > 0) {
            changeArray.push([coinName, changeValue]);
        }
    }

    // Comprobar si se puede dar el cambio exacto
    if (change === "0.00") {
        return { status: "OPEN", change: changeArray };
    }

    // Si no se puede dar el cambio exacto, devuelve "INSUFFICIENT_FUNDS"
    return { status: "INSUFFICIENT_FUNDS", change: [] };
}

// Ejemplo de uso
const result = checkCashRegister(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
]);
console.log(result);