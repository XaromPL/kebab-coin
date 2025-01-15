// Global variables 
let currentPrice = 5500;
let bigosPrice = 1500;
let pierogPrice = 3000;
let priceData = [];
let bigosData = [];
let pierogData = [];
let labels = [];
let budget = 10000;
let cryptoOwned = 0;
let bigosOwned = 0;
let pierogOwned = 0;
let startTime = Date.now();

// Initial chart setup 
for (let i = 0; i < 20; i++) {
    const randomChange = (Math.random() - 0.5) * 200;
    currentPrice = Math.max(1000, currentPrice + randomChange);
    bigosPrice = Math.max(1000, bigosPrice + randomChange);
    pierogPrice = Math.max(1000, pierogPrice + randomChange);
    priceData.push(currentPrice);
    bigosData.push(bigosPrice);
    pierogData.push(pierogPrice);
    labels.push(i);
}

// Functions to update chart
const ctx = document.getElementById('cryptoChart').getContext('2d');
const cryptoChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [
            {
                label: 'Kebab-Coin (USD)',
                data: priceData,
                borderColor: '#3498db',
                borderWidth: 2,
                fill: false,
            },
            {
                label: 'Bigos-Coin (USD)',
                data: bigosData,
                borderColor: '#e74c3c',
                borderWidth: 2,
                fill: false,
            },
            {
                label: 'Pierog-Coin (USD)',
                data: pierogData,
                borderColor: '#2ecc71',
                borderWidth: 2,
                fill: false,
            },
        ],
    },
    options: {
        scales: {
            x: {
                title: { display: true, text: 'Time (s)' },
            },
            y: {
                title: { display: true, text: 'Price (USD)' },
                beginAtZero: false,
                min: 0,
                max: 10000,
            },
        },
    },
});

// Functions to change prices 
function changePriceKebab() {
    const randomChange = (Math.random() - 0.5) * 750;
    currentPrice = Math.max(1000, currentPrice + randomChange);
    priceData.push(currentPrice);

    let currentTime = Math.floor((Date.now() - startTime) / 1000);
    labels.push(currentTime);

    if (priceData.length > 20) {
        priceData.shift();
        labels.shift();
    }

    cryptoChart.update();
}

function changePriceBigos() {
    const randomChange = (Math.random() - 0.5) * 250;
    bigosPrice = Math.max(1000, bigosPrice + randomChange);
    bigosData.push(bigosPrice);

    let currentTime = Math.floor((Date.now() - startTime) / 1000);
    labels.push(currentTime);

    if (bigosData.length > 20) {
        bigosData.shift();
        labels.shift();
    }

    cryptoChart.update();
}

function changePricePierog() {
    const randomChange = (Math.random() - 0.5) * 100;
    pierogPrice = Math.max(1000, pierogPrice + randomChange);
    pierogData.push(pierogPrice);

    let currentTime = Math.floor((Date.now() - startTime) / 1000);
    labels.push(currentTime);

    if (pierogData.length > 20) {
        pierogData.shift();
        labels.shift();
    }

    cryptoChart.update();
}

// Update prices every 5 seconds
setInterval(changePriceKebab, 5000);
setInterval(changePriceBigos, 5000);
setInterval(changePricePierog, 5000);

// Function to display logs
function updateActionLog(message) {
    const logContainer = document.getElementById('actionLog');
    const logMessage = document.createElement('p');
    logMessage.textContent = message;
    logContainer.insertBefore(logMessage, logContainer.firstChild);
    if (logContainer.children.length > 5) {
        logContainer.removeChild(logContainer.lastChild);
    }
}

// Handling the Buy button
document.getElementById('buyBtn').addEventListener('click', () => {
    const currency = document.getElementById('cryptoList').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (isNaN(amount) || amount <= 0) {
        alert('Invalid amount.');
        return;
    }

    let price;
    let owned;
    let currencyName;

    switch (currency) {
        case 'kebab-coin':
            price = currentPrice;
            owned = cryptoOwned;
            currencyName = 'Kebab-Coin';
            break;
        case 'bigos-coin':
            price = bigosPrice;
            owned = bigosOwned;
            currencyName = 'Bigos-Coin';
            break;
        case 'pierog-coin':
            price = pierogPrice;
            owned = pierogOwned;
            currencyName = 'Pierog-Coin';
            break;
    }

    const totalCost = amount * price;

    if (totalCost > budget) {
        alert(`You don't have enough money. Your budget is $${budget.toFixed(2)}.`);
        return;
    }

    budget -= totalCost;

    if (currency === 'kebab-coin') cryptoOwned += amount;
    if (currency === 'bigos-coin') bigosOwned += amount;
    if (currency === 'pierog-coin') pierogOwned += amount;

    updateActionLog(`Bought ${amount} ${currencyName} for $${totalCost.toFixed(2)}. Remaining budget: $${budget.toFixed(2)}`);
    updateBudgetDisplay();
});

// Handling the Sell button
document.getElementById('sellBtn').addEventListener('click', () => {
    const currency = document.getElementById('cryptoList').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (isNaN(amount) || amount <= 0) {
        logToConsole('Invalid amount.'); 
        return;
    }

    let price;
    let owned;
    let currencyName;

    switch (currency) {
        case 'kebab-coin':
            price = currentPrice;
            owned = cryptoOwned;
            currencyName = 'Kebab-Coin';
            break;
        case 'bigos-coin':
            price = bigosPrice;
            owned = bigosOwned;
            currencyName = 'Bigos-Coin';
            break;
        case 'pierog-coin':
            price = pierogPrice;
            owned = pierogOwned;
            currencyName = 'Pierog-Coin';
            break;
    }

    if (amount > owned) {
        logToConsole(`You don't own enough ${currencyName} to sell.`);
        return;
    }

    const totalRevenue = amount * price;

    budget += totalRevenue;

    if (currency === 'kebab-coin') cryptoOwned -= amount;
    if (currency === 'bigos-coin') bigosOwned -= amount;
    if (currency === 'pierog-coin') pierogOwned -= amount;

    updateActionLog(`Sold ${amount} ${currencyName} for $${totalRevenue.toFixed(2)}. Remaining budget: $${budget.toFixed(2)}`);
    updateBudgetDisplay();
});

// Function to update the budget display
function updateBudgetDisplay() {
    document.getElementById('budget').textContent = `Budget: $${budget.toFixed(2)} | Kebab-Coin: ${cryptoOwned.toFixed(2)} | Bigos-Coin: ${bigosOwned.toFixed(2)} | Pierog-Coin: ${pierogOwned.toFixed(2)}`;
}

// Initialization
updateBudgetDisplay();