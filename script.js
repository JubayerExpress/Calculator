const API_URL = 'https://api.exchangerate-api.com/v4/latest/';
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const resultText = document.getElementById('result');
const swapBtn = document.getElementById('swapBtn');
const datePicker = document.getElementById('datePicker');
const historicalRateText = document.getElementById('historicalRate');
const loader = document.querySelector('.loader');

// Fetch exchange rates and populate the dropdowns
async function fetchExchangeRates(baseCurrency) {
    showLoader();
    const response = await fetch(API_URL + baseCurrency);
    const data = await response.json();
    populateCurrencyOptions(data.rates);
    hideLoader();
}

// Populate currency dropdowns
function populateCurrencyOptions(rates) {
    const currencies = Object.keys(rates);
    fromCurrency.innerHTML = '';
    toCurrency.innerHTML = '';

    currencies.forEach(currency => {
        fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
        toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
    });

    fromCurrency.value = 'USD';
    toCurrency.value = 'EUR';
}

// Convert currency in real time
function convertCurrency() {
    const amount = amountInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (amount === '' || isNaN(amount)) {
        resultText.textContent = 'Please enter a valid amount';
        return;
    }

    fetch(API_URL + from)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[to];
            const convertedAmount = (amount * rate).toFixed(2);
            resultText.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
        });
}

// Swap currencies
swapBtn.addEventListener('click', () => {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    convertCurrency();
});

// Fetch historical exchange rate
async function fetchHistoricalRate(date) {
    const baseCurrency = fromCurrency.value;
    const response = await fetch(`https://api.exchangerate-api.com/v4/${date}/${baseCurrency}`);
    const data = await response.json();
    const historicalRate = data.rates[toCurrency.value];
    historicalRateText.textContent = `Rate on ${date}: 1 ${baseCurrency} = ${historicalRate} ${toCurrency.value}`;
}

// Show loader
function showLoader() {
    loader.classList.remove('hidden');
}

// Hide loader
function hideLoader() {
    loader.classList.add('hidden');
}

// Event Listeners
amountInput.addEventListener('input', convertCurrency);
fromCurrency.addEventListener('change', convertCurrency);
toCurrency.addEventListener('change', convertCurrency);
datePicker.addEventListener('change', () => fetchHistoricalRate(datePicker.value));

// Load initial data
window.addEventListener('load', () => {
    const today = new Date().toISOString().split('T')[0];
    datePicker.value = today;
    fetchExchangeRates('USD');
});
