/* ******************* */
/* declaring variables */
/* ******************* */

//variables to show time
var today = moment().format('MMMM Do YYYY, hh:mm:ss a');
console.log(today);

// holds user input for the symbol of stock to search up
var userInputSym = 'AAPL';

// jQuery grabbing elements
var $asidePEl = $('.p-aside');
var $mainPEl =  $('.main-p');
var $timePEl = $('.time');
var txt = $("<p></p>").text(moment().format('MMMM Do YYYY, hh:mm:ss a'))
var $headerEl1 = $('.header-el1')
var $headerEl2 = $('.header-el2')
var $headerEl3 = $('.header-el3')

var $techBtn = $('.tech');
var $financeBtn = $('.sci');

var $img1 = $('#img1');
var $img2 = $('#img2');
var $img3 = $('#img3');
var $a1 = $('#a1');
var $a2 = $('#a2');
var $a3 = $('#a3');

setInterval(function () {
  $($timePEl).text(moment().format('MMMM Do YYYY, hh:mm:ss a'));
}, 1000)


console.log(today);
console.log($asidePEl.text);


const secret = `sk_da0e19d152f54558b107737950eee80b`;
const pub = `pk_de2544713f8442618866a25c57e5e264`;


/* this is the onclick function for the stock search button */
$(`#stockSearchButton`).click(stockSearch);

function displayStockData(data) {
  $(`#stockName`).text(data.companyName);
  $(`#stockPrice`).text(data.latestPrice);
  $(`#stockChange`).text(`${data.change} ${data.changePercent}`);
  // lol jquery is too baby to do this
  let stockDataEl = document.getElementById('stockData');

  stockDataEl.innerHTML = '';

  console.log(data);

  stockDataEl.insertAdjacentHTML('beforeend', `
  <table>
    <tbody>
      <tr>
        <td>Previous Close</td>
        <td>${data.previousClose}</td>
      </tr>
      <tr>
        <td>Open</td>
        <td>${data.iexOpen}</td>
      </tr>
      <tr>
        <td>52 Week Range</td>
        <td>${data.week52High} - ${data.week52Low}</td>
      </tr>
      <tr>
        <td>Market Cap</td>
        <td>${bigNumberRounder(data.marketCap)}</td>
      </tr>
    </tbody>
  </table>
  `);
}

function bigNumberRounder(marketCap) {
  let numLength = marketCap.length; // i think this no work?

  if (numLength > 12) {
    return `${(marketCap / 1000000000000).toFixed(2)}T`;
  } else if (numLength > 9) {
    return `${(marketCap / 1000000000).toFixed(2)}B`;
  } else if (numLength > 6) {
    return `${(marketCap / 1000000).toFixed(2)}M`;
  } else {
    return `${(marketCap / 1000).toFixed(2)}K`;
  }

}

/* this is the iexCloud api function */
function stockSearch() {
  let $userInput = $(`.materialize-textarea`).val();
  console.log($userInput)
  // TODO: add validation to make sure user is entering valid ticker strings?

  // grabbing stuff from iexcloud API referencing user input
  $.get(`https://cloud.iexapis.com/stable/stock/${$userInput}/quote?token=${pub}`)
  // hands shaken, data taken
  .then(function (data) {
    let data0 = data;
    //console.log(data0);

    displayStockData(data0);

    // parsed data from the iexCloud api
    // let parsedData = {
    //   companyName: data0.companyName,
    //   pointChange: data0.change,
    //   percentChange: data0.changePercent,
    //   closePrice: data0.close,
    //   closeTime: moment.unix(date0.closeTime).format("dddd, Do MMM YYYY, h:mm:ss A"),
    //   afterHoursPointChange: data0.extendedChange,
    //   afterHoursPercentChange: data0.extendedChangePercent,
    //   afterHoursPrice: data0.extendedPrice,
    //   afterHoursTime: moment.unix(date0.extendedPriceTime).format("dddd, Do MMM YYYY, h:mm:ss A"),
    //   dayHigh: data0.high,
    //   dayLow: data0.low,
    //   isMarketOpen: data0.isUSMarketOpen,
    //   lastUpdated: data0.iexLastUpdated,
    // }
    // console.log(parsedData);
  })
}

/* grabbing the stock overview for a certain ticker */
fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${userInputSym}&apikey=U9H8L320ZL3GRGKS`)
  .then(function (res) {
    return res.json();
})
  .then(function (data) {
    // let results = data;
    // console.log(results);
    $('.p-aside').text = "hello";
    console.log($asidePEl); 
    console.log(data['52WeekHigh']);
    
})  
  .catch(function (err) {
    console.error(err);
});


// On button click technology fetch and display tech news
  fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&topics=technology&apikey=U9H8L320ZL3GRGKS`)
  .then(function (res) {
    return res.json();
})
  .then(function (data) {
    let results = data;
    console.log(results);
    let num = Math.floor(Math.random() * 50);
    let num1 = Math.floor(Math.random() * 50);
    let num2 = Math.floor(Math.random() * 50);

    if (num == num1 || num == num2) {
      num = Math.floor(Math.random() * 50)
    } if (num1 == num2) {
      num1 = Math.floor(Math.random() * 50)
    }


    $headerEl1.text(results.feed[num].title);
    $headerEl1.append('<hr>');
    $headerEl2.text(results.feed[num1].title);
    $headerEl2.append('<hr>');
    $headerEl3.text(results.feed[num2].title);

    $a1.attr('href', results.feed[num].url)
    $a2.attr('href', results.feed[num1].url)
    $a3.attr('href', results.feed[num2].url)
    $a1.attr('target', "_blank");
    $a2.attr('target', "_blank");
    $a3.attr('target', "_blank");
    $img1.attr('src', results.feed[num].banner_image)
    $img2.attr('src', results.feed[num1].banner_image)
    $img3.attr('src', results.feed[num2].banner_image)
    
})  
  .catch(function (err) {
    console.error(err);

});


// On finance button click fetch and display science news


 