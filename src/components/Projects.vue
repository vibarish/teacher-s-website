<template>
  <div>
    <h3>Расчет стоимости валюты</h3>
    <div class="app">
    <div class="popup">
      <p id="popup__text"></p>
    </div>
    <div id="tabs">
      <div class="currency-table">
        <span id="date"></span>
        <h4>Расчет по биржевому курсу </h4>
        <p id="today" v-html="vtoday"></p>
        <table id="stock-tab">
          <tr>
            <th></th>
            <th>Курс</th>
            <th>Сумма</th>
            <th>Сумма в рублях</th>
          </tr>
          <tr>
            <td class="icon"><i class="fas fa-dollar-sign"></i></td>
            <td id="usd-stock" v-html="vusd_stock"></td>
            <td>
              <form action="" id="usdInputForm" @submit="">
                <input type="number" id="usdInput" v-model="vusd_input">
              </form>
            </td> 
            <td class="" id="summaUSD" v-html="sumUSD"></td>
          </tr>
          <tr>
            <td class="icon"><i class="fas fa-euro-sign"></i></td>
            <td id="euro-stock" v-html="veuro_stock"></td>
            <td>
              <form id="euro-input-form">
                <input type="number" id="euro-input" v-model="veuro_input">
              </form>
            </td>
            <td class="" id="summaEUR" v-html="sumEuro"></td>
          </tr>
          <tr>
            <td class="icon"><i class="fas fa-yen-sign"></i></td>
            <td id="yuan-stock" v-html="vyuan_stock"></td>
            <td>
              <form id="yuan-input-form">
                <input type="number" id="yuan-input" v-model="vyuan_input">
              </form>
            </td>
            <td class="" id="summaYUAN" v-html="sumYuan"></td>
          </tr>
          <tr>
            <td colspan="3" >Итого:</td>
            <td id="resultSum" v-html="summ_all"></td>
          </tr>
        </table>
      </div>
      <div class="currency-table">
        <h4>Курс валют Центрального банка России</h4>
        <table>
          <tr>
            <th></th>
            <th>Курс ЦБ</th>
            <th>За 100 рублей</th>
            <th>Динамика курса</th>
          </tr>
          <tr>
            <td><i class="fas fa-dollar-sign"></i></td>
            <td id="usd" v-html="vusd"></td>
            <td id="one-rub-usd" v-html="vrub_usd"></td>
            <td id="usd-dynamic" v-html="vusd_dynamic"></td>
          </tr>
          <tr>
            <td><i class="fas fa-euro-sign"></i></td>
            <td id="euro" v-html="veuro"></td>
            <td id="one-rub-eur" v-html="vrub_euro"></td>
            <td id="euro-dynamic" v-html="veuro_dynamic"></td>
          </tr>
          <tr>
            <td>CNY<i class="fas fa-yen-sign"></i></td>
            <td id="yuan" v-html="vyuan"></td>
            <td id="one-rub-yuan" v-html="vrub_yuan"></td>
            <td id="yuan-dynamic" v-html="vyuan_dynamic"></td>
          </tr>
        </table>
        <h4>Изменение биржевого курса валюты</h4>
        <div class="chart-container">
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </div>
    <!-- Справочные значения -->
    <div class="history">
      <div>
        <h4>Узнать биржевой курс по дате</h4>
        <form id="calendar-form">
          <input id="calendar" type="date" v-model="vcalendar">
        </form>
      </div>
      <form id="currency-radio">
        <input type="radio" id="usd-radio"
          name="currency" value="USD" v-model="checked">
          <label for="contactChoice1">Доллар</label>

        <input type="radio" id="euro-radio"
          name="currency" value="EUR" v-model="checked">
          <label for="contactChoice2">Евро</label>
      </form>
      <div id="history-rate">
        <p id="history-rate__p" v-html="vhistory"></p>
      </div>

    </div>
  </div>
  </div>
</template>
<script>
import { ref, onMounted, computed, watch } from 'vue'
export default {
  setup() {
    let veuro = ref();
    let veuro_dynamic = ref();
    let vrub_euro = ref();
    let vusd = ref();
    let vusd_dynamic = ref();
    let vrub_usd = ref();
    let vyuan = ref();
    let vrub_yuan = ref();
    let vyuan_dynamic = ref();

    const  today = new Date();
    const mydate = today.getDate() + '-' + (today.getMonth()+1) + '-'+ today.getFullYear();
    const vtoday = ref('Сегодня ' + mydate);
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();
    let vcalendar = ref(`${currentYear}-0${currentMonth}-${currentDay}`);
    // console.log(vcalendar.value);
    let checked = ref();

    let vhistory;
    // vhistory = computed(() => {
    //   // return vcalendar.value;
    //   return checked.value;
    // })
     
      const stockFetch = (currentDate) => fetch(`https://openexchangerates.org/api/historical/${currentDate}.json?app_id=3cd2a00ebc2b49978ecfdb19ce68cecf`)
      .then(res => res.json())
      .then((out) => {
          // if (flag == 'USD')
          //   historyRate.innerHTML = `${(out.rates.RUB).toFixed(2)} рублей`;
          // if (flag == 'EUR')  
          //   historyRate.innerHTML = `${(out.rates.RUB / out.rates.EUR).toFixed(2)} рублей`;
          // watch(()=> {
            if (checked.value == 'USD')
                console.log(`${ (out.rates.RUB).toFixed(2)} рублей`)
                vhistory = computed(() => {
                  return checked.value;
                })
            if (checked.value == 'EUR')
              console.log(`${(out.rates.RUB / out.rates.EUR).toFixed(2)} рублей`)
              vhistory = 'EUR'
          // })
      }).catch(err => console.error(err));
     
      watch(()=> {
        stockFetch(vcalendar.value)
      })

    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    .then(res => res.json())
    .then((out) => {
    let usdRate = 0;
    let euroRate = 0;
    let yuanRate = 0;

    let usdDynamicValue = 0;
    let yuanDynamicValue = 0;

    // let oneRubUSDVal = 0;
    // let oneRubYuanVal = 0;

    euroRate = out.Valute.EUR.Value;
    usdRate = out.Valute.USD.Value;
    yuanRate = out.Valute.CNY.Value;

    vusd.value = usdRate.toFixed(2);
    vyuan.value = yuanRate.toFixed(2);
    veuro.value = euroRate.toFixed(2);

    veuro_dynamic.value = (euroRate - out.Valute.EUR.Previous).toFixed(2) + ' рубля';
    vusd_dynamic.value = (usdRate - out.Valute.USD.Previous).toFixed(2) + ' рубля';
    vyuan_dynamic.value = (yuanRate - out.Valute.CNY.Previous).toFixed(2) + ' рубля';
    
    const oneRubVal = (rate) => 1 / rate;  
    
    vrub_usd.value = (oneRubVal(usdRate) * 100).toFixed(2)
    vrub_euro.value = (oneRubVal(euroRate) * 100).toFixed(2)
    vrub_yuan.value = (oneRubVal(yuanRate) * 100).toFixed(2)

    // oneRubUSD.innerHTML = `${oneRubUSDVal.toFixed(4)}`;
    // oneRubEur.innerHTML = `${oneRubEurVal.toFixed(4)}`;  
    // oneRubYuan.innerHTML = `${oneRubYuanVal.toFixed(4)}`;   

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
    
    let vusd_stock = ref();
    let veuro_stock = ref();
    let vyuan_stock = ref();

    fetch('https://openexchangerates.org/api/latest.json?app_id=3cd2a00ebc2b49978ecfdb19ce68cecf')
    .then(res => res.json())
    .then((out) => {
        veuro_stock.value = (out.rates.RUB / out.rates.EUR).toFixed(3);
        vusd_stock.value = (out.rates.RUB).toFixed(3);
        vyuan_stock.value = (out.rates.RUB / out.rates.CNY).toFixed(3);

    }).catch(err => console.error(err));

    // function currencyInputHandler(inputValue) {
    //   if (inputValue.value > 0) {
    //       resultHandler();
    //       sumUSD.innerText = (usdStockRate * usdInput.value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    //       sumEuro.innerHTML = (euroStockRate * euroInput.value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    //   }
    //   else {
    //       popupHandler(inputValue, 'Введите корректные данные!');
    //       usdInput.value = '';
    //       euroInput.value = '';
    //   }
    // }

    let vusd_input = ref()
    let sumUSD = computed(() => {
      let result
      if (vusd_input.value) {
        result = Number(vusd_input.value) * Number(vusd_stock.value)
      } else result = 0
      return result.toFixed(2)
    })

    let veuro_input = ref()
    let sumEuro = computed(() => {
      let result
      if (veuro_input.value) {
        result = Number(veuro_input.value) * Number(veuro_stock.value)
      } else result = 0
      return result.toFixed(2)
    })

    let vyuan_input = ref()
    let sumYuan = computed(() => {
      let result
      if (vyuan_input.value) {
        result = Number(vyuan_input.value) * Number(vyuan_stock.value)
      } else result = 0
      return result.toFixed(2)
    })

    let summ_all = computed(() => {
      return (Number(sumEuro.value) + Number(sumUSD.value) + Number(sumYuan.value)).toFixed(2)
    })

    return { veuro, veuro_dynamic, vrub_euro, vusd, vrub_usd, vusd_dynamic, vyuan, vrub_yuan, vyuan_dynamic, vtoday,
    vusd_stock, veuro_stock, vyuan_stock, sumUSD, vusd_input, veuro_input, sumEuro,vyuan_input, sumYuan, summ_all ,
    vcalendar, vhistory, checked}
  }
}
</script>
<style scoped>
   /* :root {
  --theme-color: rgb(114, 35, 84);
  font-family: 'Sunflower', sans-serif;
  margin: 0;
  padding: 0;
}
body {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  font-family: 'Comfortaa', cursive, Arial, Helvetica, sans-serif;
  padding: 0;
  margin: 0;
  background-color: rgba(236, 231, 255, 0.995);
}
.app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  border-style: outset;
  border-radius: 2%;
  transition: all 0.5s ease-in ;
  background-color: white;
  padding: 5px;
  width: 90%;
}
header {
  color: rgb(114, 35, 84);
}
.currency-table {
  display: flex;
  flex-direction: column;
  justify-self: center;
  justify-content: space-around;
  align-content: center;
  align-items: center;
  font-size: 18px;
  margin: 15px 0;
}
input {
  display: flex;
  padding: 0.6rem;
  margin: 0.4rem;
  border-radius: 5%;
  font-size: 20px;
  width: 60%;
  border-style: dotted;
}
#calendar {
  width: 180px;
}

table, th, td {
  border: 0.5px ridge var(--theme-color);
  text-align: center;
  margin: 10px;
  border-collapse: collapse;
}

#stock-tab {
  min-width: 450px;
}

th, td {
  padding: 5px;
}

.icon {
  font-size: 25px;
}

th {
  background-color: var(--theme-color);
  color: white;
}

tr:hover {
  background-color: rgb(114, 35, 84);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease-in;
}

.currency-dynamic-less {
  color: red;
}

.currency-dynamic-more {
  color: green;
}

.history {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
}
#history-rate {
  font-size: 25px;
  color: var(--theme-color);
  width: 200px;
  height: 50px;
}

h4, p {
  margin: 5px;
}

#currency-radio {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin: 5px;
}

#euro-radio, #usd-radio {
  height: 25px;
}

h2 {
  text-align: center;
}

.popup {
  display: none;
  border-radius: 5%;
  position: absolute;
  z-index: 2;
  background-color: rgb(221, 201, 201);
  width: 100px;
  height: 70px;
  padding: 2px;
  font-size: 14px;
}
.visible {
  display: flex;
}

.chart-container {
  position: relative;
  /* max-height: 400px;
  max-width: 400px; */
  /* width: 90%;
} */ 
</style>