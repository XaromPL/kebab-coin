const ctx = document.getElementById('cryptoChart').getContext('2d');
let currentPrice = 5000; // Initial value
let priceData = [];
let labels = [];
let budget = 10000; // Initial budget
let cryptoOwned = 0; // Amount of cryptocurrency owned
let increasePrice = false; // Flag to control price increase after purchase
let decreasePrice = false; // Flag to control price decrease after sale
let startTime = Date.now(); // Variable to track time

// Populate the initial 10 data points
for (let i = 0; i < 10; i++) {
    const randomChange = (Math.random() - 0.5) * 200; // Random price change
    currentPrice = Math.max(1000, currentPrice + randomChange); // Ensure price >= 1000
    priceData.push(currentPrice);
    labels.push(i); // Use the index as the label for now
}

// Chart
const cryptoChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Kebab-Coin (USD)',
            data: priceData,
            borderColor: '#3498db',
            borderWidth: 2,
            fill: false,
        }]
    },
    options: {
        scales: {
            x: {
                title: { display: true, text: 'Time (s)' }
            },
            y: {
                title: { display: true, text: 'Price (USD)' },
                beginAtZero: false,
                min: 1000, // Initial price >= 1000
                max: 7000, // Price does not exceed 7000
            }
        }
    }
});

// Function to update the chart
function updateChart() {
    cryptoChart.update();
}

// Function to simulate price change
function changePrice() {
    let randomChange = (Math.random() - 0.5) * 200; // Random price change in a larger range
    if (increasePrice) {
        randomChange = Math.abs(randomChange) * 1.5; // Increase price more dynamically
        increasePrice = false; // Stop increase after one iteration
    }
    if (decreasePrice) {
        randomChange = -Math.abs(randomChange) * 1.5; // Decrease price more dynamically
        decreasePrice = false; // Stop decrease after one iteration
    }

    currentPrice = Math.max(1000, currentPrice + randomChange); // Price >= 1000
    priceData.push(currentPrice);

    // Update X-axis labels
    let currentTime = Math.floor((Date.now() - startTime) / 1000);
    labels.push(currentTime);

    // Limit the length of data on the chart
    if (priceData.length > 10) {
        priceData.shift();
        labels.shift();
    }

    updateChart();
}

// Change price every 2 seconds
setInterval(changePrice, 2000);

// Function to display action logs
function updateActionLog(message) {
    const logContainer = document.getElementById('actionLog');
    const logMessage = document.createElement('p');
    logMessage.textContent = message;
    logContainer.insertBefore(logMessage, logContainer.firstChild);
    if (logContainer.children.length > 5) {
        logContainer.removeChild(logContainer.lastChild);
    }
}

// Buy/Sell button handlers
document.getElementById('buyBtn').addEventListener('click', () => {
    const amountToBuy = parseFloat(prompt(`You have $${budget.toFixed(2)}.\nHow many Kebab-Coin would you like to buy at $${currentPrice.toFixed(2)} per coin?`));
    if (isNaN(amountToBuy) || amountToBuy <= 0) {
        alert('Invalid amount.');
        return;
    }

    const totalCost = amountToBuy * currentPrice;
    if (totalCost > budget) {
        alert(`You don't have enough money. Your budget is $${budget.toFixed(2)}.`);
        return;
    }

    budget -= totalCost;
    cryptoOwned += amountToBuy;
    increasePrice = true; // Trigger price increase after purchase
    updateActionLog(`Bought ${amountToBuy} Kebab-Coin for $${totalCost.toFixed(2)}. Remaining budget: $${budget.toFixed(2)}`);
    updateBudgetDisplay();
});

document.getElementById('sellBtn').addEventListener('click', () => {
    if (cryptoOwned === 0) {
        alert('You don\'t own any Kebab-Coin to sell.');
        return;
    }

    const amountToSell = parseFloat(prompt(`You own ${cryptoOwned.toFixed(2)} Kebab-Coin.\nHow many coins would you like to sell at $${currentPrice.toFixed(2)} per coin?`));
    if (isNaN(amountToSell) || amountToSell <= 0 || amountToSell > cryptoOwned) {
        alert('Invalid amount.');
        return;
    }

    const totalRevenue = amountToSell * currentPrice;
    budget += totalRevenue;
    cryptoOwned -= amountToSell;
    decreasePrice = true; // Trigger price decrease after sale
    updateActionLog(`Sold ${amountToSell} Kebab-Coin for $${totalRevenue.toFixed(2)}. Remaining budget: $${budget.toFixed(2)}`);
    updateBudgetDisplay();
});

// Function to display the current budget and amount of cryptocurrency
function updateBudgetDisplay() {
    document.getElementById('budget').textContent = `Budget: $${budget.toFixed(2)} | Crypto Owned: ${cryptoOwned.toFixed(2)}`;
}

// Initial chart update
updateChart();
