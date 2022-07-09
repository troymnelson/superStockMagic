/* ******************* */
/* declaring variables */
/* ******************* */
var today = moment().format('MMMM Do YYYY, hh:mm:ss a');
console.log(today);
var userInputSym = 'AAPL';
var $asidePEl = $('.p-aside');
var $mainPEl =  $('.main-p')
var newPElText = today;
var pEl = $('#time');
console.log($asidePEl.text);
const secret = `sk_da0e19d152f54558b107737950eee80b`;
const pub = `pk_de2544713f8442618866a25c57e5e264`;
$('.p-aside').text="hello";
$(pEl).text(today);

// this is the onclick function for the stock search button
$(`#stockSearchButton`).click(stockSearch);

function stockSearch() {
  let $userInput = $(`.materialize-textarea`).val();

  // TODO add a validation to make sure the user is only typing in the ticker

  /* grabbing stuff from iexcloud API */
  // first requesting the data referencing the user input and our api token
  fetch(`https://cloud.iexapis.com/stable/stock/${$userInput}/quote?token=${pub}`)
  // processing the handshake 
  .then(function (response) {
    return response.json();
  })
  // hands shaken, data taken
  .then(function (data) {
    let data0 = data;
    console.log(data0);
  })
  // catchall error bucket (thanks micheal!)
  .catch(function(err) {
    console.error(err);
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
    console.log(results);
})  
  .catch(function (err) {
    console.error(err);
});






//modal event listener
