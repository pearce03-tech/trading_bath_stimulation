let accountBalance = 10000;
let currentPrice = 100;
let tradeHistory = [];
let isBotRunning = false;
let interval;

function startBot() {
  if (isBotRunning) return;

  isBotRunning = true;
  document.getElementById('bot-status').textContent = 'Running';
  document.getElementById('start-bot').disabled = true;
  document.getElementById('stop-bot').disabled = false;

  interval = setInterval(() => {
    simulateTrade();
  }, 1000); // Simulate a trade every second
}

function stopBot() {
  if (!isBotRunning) return;

  isBotRunning = false;
  document.getElementById('bot-status').textContent = 'Stopped';
  document.getElementById('start-bot').disabled = false;
  document.getElementById('stop-bot').disabled = true;

  clearInterval(interval);
}

function simulateTrade() {
  // Randomize the price a little to simulate market changes
  currentPrice += (Math.random() - 0.5) * 10;
  currentPrice = Math.max(1, currentPrice); // Ensure price doesn't go below 1
  
  // Update current price
  document.getElementById('current-price').textContent = currentPrice.toFixed(2);

  // Simple buy low, sell high algorithm
  if (accountBalance >= currentPrice && Math.random() < 0.5) {
    // Buy
    accountBalance -= currentPrice;
    tradeHistory.push(`Bought at $${currentPrice.toFixed(2)}`);
    updateTradeLog();
  } else if (Math.random() < 0.5 && accountBalance < 10000) {
    // Sell (we assume the user has some amount of assets)
    accountBalance += currentPrice;
    tradeHistory.push(`Sold at $${currentPrice.toFixed(2)}`);
    updateTradeLog();
  }

  // Update account balance
  document.getElementById('account-balance').textContent = accountBalance.toFixed(2);
}

function updateTradeLog() {
  const tradeLog = document.getElementById('trade-log');
  tradeLog.innerHTML = '';
  tradeHistory.forEach(trade => {
    const listItem = document.createElement('li');
    listItem.textContent = trade;
    tradeLog.appendChild(listItem);
  });
}