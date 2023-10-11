function checkCashRegister(price, cash, cid) {
    let change = cash - price;

    let totalCid = 0;
    for (let i = 0; i < cid.length; i++) {
        totalCid += cid[i][1];
    }
    totalCid = totalCid.toFixed(2);

    if (change == totalCid) {
        return { status: "CLOSED", change: cid };
    } else if (change > totalCid) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    } else {
        for (let i = cid.length - 1; i >= 0; i--) {
            let cidName = cid[i][0];
            let cidValue = cid[i][1];
            if (change < cidValue) {
                
            }
            console.log(cidName);
            console.log(cidValue);
        }
        return { status: "OPEN", change: [] }
    }
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);