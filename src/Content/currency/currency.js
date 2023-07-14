import { popupHandler } from './popup.js';

const usd = document.getElementById('usd');
const euro = document.getElementById('euro');
const yuan = document.getElementById('yuan');

const usdStock = document.getElementById('usd-stock');
const euroStock = document.getElementById('euro-stock');

const usdIn = document.getElementById('usdInputForm');
const usdInput = document.getElementById('usdInput');
const euroIn = document.getElementById('euro-input-form');
const euroInput = document.getElementById('euro-input');

const sumUSD = document.getElementById('summaUSD');
const sumEuro = document.getElementById('summaEUR');

const resultSum = document.getElementById('resultSum');

const usdDynamic = document.getElementById('usd-dynamic');
const euroDynamic = document.getElementById('euro-dynamic');
const yuanDynamic = document.getElementById('yuan-dynamic');

const oneRubUSD = document.getElementById('one-rub-usd');
const oneRubEur = document.getElementById('one-rub-eur');
const oneRubYuan = document.getElementById('one-rub-yuan');

let usdStockRate = 0;
let euroStockRate = 0;

fetch('https://www.cbr-xml-daily.ru/daily_json.js')
.then(res => res.json())
.then((out) => {
    let usdRate = 0;
    let euroRate = 0;
    let yuanRate = 0;

    let euroDynamicValue = 0;
    let usdDynamicValue = 0;
    let yuanDynamicValue = 0;

    let oneRubUSDVal = 0;
    let oneRubEurVal = 0;
    let oneRubYuanVal = 0;

    euroRate = out.Valute.EUR.Value;
    usdRate = out.Valute.USD.Value;
    yuanRate = out.Valute.CNY.Value / 10;

    euro.innerHTML = euroRate;
    usd.innerHTML = usdRate;
    yuan.innerHTML = yuanRate;

    euroDynamicValue = euroRate - out.Valute.EUR.Previous;
    usdDynamicValue = usdRate - out.Valute.USD.Previous; 
    yuanDynamicValue = yuanRate - out.Valute.CNY.Previous / 10;
    
    const oneRubVal = (rate) => 1 / rate;  
    
    oneRubUSDVal =  oneRubVal(usdRate);
    oneRubEurVal = oneRubVal(euroRate);
    oneRubYuanVal = oneRubVal(yuanRate);

    euroDynamic.innerHTML = `${euroDynamicValue.toFixed(2)} рублей`;
    usdDynamic.innerHTML = `${usdDynamicValue.toFixed(2)} рублей`;
    yuanDynamic.innerHTML = `${yuanDynamicValue.toFixed(2)} рублей`;

    oneRubUSD.innerHTML = `${oneRubUSDVal.toFixed(4)}`;
    oneRubEur.innerHTML = `${oneRubEurVal.toFixed(4)}`;  
    oneRubYuan.innerHTML = `${oneRubYuanVal.toFixed(4)}`;   

    if (euroDynamicValue > 0) {
        euroDynamic.classList.add('currency-dynamic-more');
    } else euroDynamic.classList.add('currency-dynamic-less');

    if (usdDynamicValue > 0) {
        usdDynamic.classList.add('currency-dynamic-more');
    } else usdDynamic.classList.add('currency-dynamic-less');

    if (yuanDynamicValue > 0) {
        yuanDynamic.classList.add('currency-dynamic-more');
    } else yuanDynamic.classList.add('currency-dynamic-less');
}).catch(err => console.error(err))

fetch('https://openexchangerates.org/api/latest.json?app_id=3cd2a00ebc2b49978ecfdb19ce68cecf')
    .then(res => res.json())
    .then((out) => {
        // console.log(out);
        euroStockRate = out.rates.RUB / out.rates.EUR;
        usdStockRate = out.rates.RUB;

        euroStock.innerHTML = euroStockRate.toFixed(3);
        usdStock.innerHTML = usdStockRate.toFixed(3);
}).catch(err => console.error(err));

function currencyInputHandler(inputValue) {
    if (inputValue.value > 0) {
        resultHandler();
        sumUSD.innerText = (usdStockRate * usdInput.value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        sumEuro.innerHTML = (euroStockRate * euroInput.value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    else {
        popupHandler(inputValue, 'Введите корректные данные!');
        usdInput.value = '';
        euroInput.value = '';
    }
}

usdIn.addEventListener('submit', (event) => {
    event.preventDefault();
    currencyInputHandler(usdInput);
});

euroIn.addEventListener('submit', (event) => {
    event.preventDefault();
    currencyInputHandler(euroInput);
});

const resultHandler = () => {
    let result = 0;

    result = usdInput.value * usdStockRate + euroStockRate * euroInput.value;
    resultSum.innerHTML = `${result.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} рублей`;
};

const openCbrWebSite = () => {
    window.open('https://www.cbr.ru/key-indicators/', '_blank');
}

usd.addEventListener('click', openCbrWebSite);
euro.addEventListener('click', openCbrWebSite);






