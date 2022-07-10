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
var $headerEl = $('.header-el')

setInterval(function () {
  $($timePEl).text(moment().format('MMMM Do YYYY, hh:mm:ss a'));
}, 1000)


console.log(today);
console.log($asidePEl.text);


const secret = `sk_da0e19d152f54558b107737950eee80b`;
const pub = `pk_de2544713f8442618866a25c57e5e264`;


/* this is the onclick function for the stock search button */
$(`#stockSearchButton`).click(stockSearch);

/* this is the iexCloud api function */
function stockSearch() {
  let $userInput = $(`.materialize-textarea`).val();
  console.log($userInput)
  // TODO: add validation to make sure user is entering valid ticker strings

  // grabbing stuff from iexcloud API referencing user input
  fetch(`https://cloud.iexapis.com/stable/stock/${$userInput}/quote?token=${pub}`)
  // handshake function
  .then(function (response) {
    return response.json();
  })
  // hands shaken, data taken
  .then(function (data) {
    let data0 = data;
    console.log(data0);
  })
  // catch bucket for errors (thanks micheal)
  .catch(function (err) {
    $stockPH = $('#stock-placeholder');
    if (err) {
      $stockPH.text('Oops! Enter a symbol for a stock');
    }
  });

  let parsedData = {
    companyName: data0.companyName,
    pointChange: data0.change,
    percentChange: data0.changePercent,
    closePrice: data0.close,
    closeTime: moment.unix(date0.closeTime).format("dddd, Do MMM YYYY, h:mm:ss A"),
    afterHoursPointChange: data0.extendedChange,
    afterHoursPercentChange: data0.extendedChangePercent,
    afterHoursPrice: data0.extendedPrice,
    afterHoursTime: moment.unix(date0.extendedPriceTime).format("dddd, Do MMM YYYY, h:mm:ss A"),
    dayHigh: data0.high,
    dayLow: data0.low,
    isMarketOpen: data0.isUSMarketOpen,
    lastUpdated: data0.iexLastUpdated,

  }
  // console.log(parsedData);
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

/* grabbing news data from the alpha vantage api */
fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&topics=technology&apikey=U9H8L320ZL3GRGKS`)
  .then(function (res) {
    return res.json();
})
  .then(function (data) {
    let results = data;
    // console.log(results);
    const keys = Object.keys(results);
    console.log(keys.length);
    console.log(results);
    let num = Math.floor(Math.random() * 50);
    let num1 = Math.floor(Math.random() * 50);
    let num2 = Math.floor(Math.random() * 50);

    if (num == num1 || num == num2) {
      num = Math.floor(Math.random() * 50)
    } if (num1 == num2) {
      num1 = Math.floor(Math.random() * 50)
    }


    $headerEl.text(results.feed[num].title);
    $headerEl.append('<hr>');
    $headerEl.append(results.feed[num1].title);
    $headerEl.append('<hr>');
    $headerEl.append(results.feed[num2].title);
})  
  .catch(function (err) {
    console.error(err);

});






//modal event listener



 