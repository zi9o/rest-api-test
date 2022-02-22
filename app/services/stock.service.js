
function stockNames() {
    return [
        'AA',
        'A',
        'ABA',
        'CAC40',
        'NASDAQ'
    ]
}

function generateStocks() {
    let stocks = [];
    const stockList = stockNames();
    for (let i = 0; i < 100; i++) {
        stocks.push({
            timestamp: new Date(new Date().setDate(new Date().getDate() - i)),
            index: i,
            name: stockList[parseInt((Math.random() * stockList.length - 1), 10)],
            stocks: `${(Math.random() * 10 + 15 - (i / 100) * 15).toFixed(3)}`
        });
    }
    return stocks;
}

module.exports = {
    generateStocks: generateStocks,
    stockNames: stockNames
}