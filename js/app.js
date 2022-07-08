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
$(`#stockSearchButton`).click(function() {
  console.log($(`.materialize-textarea`).val());
});


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
