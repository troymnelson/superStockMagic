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
    console.log(data);
    
  })
  // catch bucket for errors (thanks micheal)
  .catch(function (err) {
    $stockPH = $('#stock-placeholder');
    if (err) {
      $stockPH.text('Oops! Enter a symbol for a stock');
    }
  });

  let parsedData = {
    // all my this code that I spent hours on was deleted so I'm despressed
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
    const num = Math.floor(Math.random() * 50);
    $asidePEl.append(results.feed[num].summary);
    $asidePEl.append(results.feed[num].summary);
    $asidePEl.append(results.feed[num].summary);
})  
  .catch(function (err) {
    console.error(err);

});



/* grabbing stuff from iexcloud API */
fetch(`https://cloud.iexapis.com/stable/stock/${userInputSym}/quote?token=${pub}`)
  .then(function (response) {
    let data0 = response;
    console.log(data0);
    return data0.json();
})
  .then(function (data) {
    let results = data;
    console.log(results);
});



//modal event listener



